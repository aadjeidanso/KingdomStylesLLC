const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define the booking schema
const bookingSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    service: String,
    app_date: String,
    app_time: String,
    payment_date: Date,
    status: { type: String, default: 'new' },  // new, confirmed, canceled, rescheduled
    new_app_date: String,
    new_app_time: String,
    completed: { type: Boolean, default: false }
});

// Create the booking model
const Booking = mongoose.model('Booking', bookingSchema);

// Define the block schema
const blockSchema = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
});

// Create the block model
const Block = mongoose.model('Block', blockSchema);

// MySQL connection
/*
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('MySQL connected');
});
*/

// Middleware
app.use(cors());

//app.use(bodyParser.json()); // Parse JSON bodies

// Serve static files from frontend
app.use(express.static('../frontend'));

// Stripe webhook endpoint
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log('Webhook event received:', event);

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        console.log('Checkout session completed:', session);

        const bookingData = {
            firstName: session.metadata.firstName,
            lastName: session.metadata.lastName,
            phone: session.metadata.phone,
            email: session.customer_email,
            service: session.metadata.service,
            app_date: session.metadata.appDate,
            app_time: session.metadata.appTime,
            payment_date: new Date(session.created * 1000),
        };

        console.log('Booking data to save:', bookingData);

        try {
            const booking = new Booking(bookingData);
            await booking.save();
            console.log('Booking saved:', booking);
        } catch (error) {
            console.error('Error saving booking:', error);
        }
    }

    res.json({ received: true });
});

app.use(bodyParser.json());

// Stripe checkout session creation endpoint
app.post('/create-checkout-session', async (req, res) => {
    const { firstName, lastName, phone, email, service, appDate, appTime } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Deposit Payment',
                    },
                    unit_amount: 1500, // Amount in cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:5001/booking.html#categories',
            cancel_url: 'http://localhost:5001/booking.html#appointment-form',
            customer_email: email,
            metadata: {
                firstName,
                lastName,
                phone,
                service,
                appDate,
                appTime
            }
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all bookings
app.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find({});
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to update booking status
app.post('/update-booking-status', async (req, res) => {
    const { bookingId, status, newDate, newTime } = req.body;

    try {
        const updateData = { status };

        if (status === 'rescheduled') {
            updateData.new_app_date = newDate;
            updateData.new_app_time = newTime;
        }

        await Booking.findByIdAndUpdate(bookingId, updateData);
        res.status(200).json({ message: 'Booking status updated successfully' });
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to update booking completion status
app.post('/update-booking-completion', async (req, res) => {
    const { bookingId, completed } = req.body;

    try {
        await Booking.findByIdAndUpdate(bookingId, { completed });
        res.status(200).json({ message: 'Booking completion status updated successfully' });
    } catch (error) {
        console.error('Error updating booking completion status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to block dates
app.post('/block-dates', async (req, res) => {
    const { startDate, endDate } = req.body;
    try {
        const block = new Block({ startDate, endDate });
        await block.save();
        res.status(200).json({ message: 'Dates blocked successfully' });
    } catch (error) {
        console.error('Error blocking dates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to open blocked dates
app.post('/open-dates', async (req, res) => {
    const { startDate, endDate } = req.body;
    try {
        await Block.deleteMany({ startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(startDate) } });
        res.status(200).json({ message: 'Dates opened successfully' });
    } catch (error) {
        console.error('Error opening dates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get blocked dates
app.get('/blocked-dates', async (req, res) => {
    try {
        const blockedDates = await Block.find({});
        res.json(blockedDates);
    } catch (error) {
        console.error('Error fetching blocked dates:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD);
console.log('MYSQL_DB:', process.env.MYSQL_DB);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('PORT:', process.env.PORT);
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY);
