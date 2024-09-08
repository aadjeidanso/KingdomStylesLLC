document.addEventListener('DOMContentLoaded', () => {
    // Back to top function
    window.addEventListener('scroll', function () {
        const backToTopButton = document.getElementById('back-to-top');
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Smooth scroll to top
    document.getElementById('back-to-top').addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Main section for booking
    const categories = document.getElementById('categories');
    const subcategories = document.getElementById('subcategories');
    const appointmentDetails = document.getElementById('appointment-details');
    const dateAndTimeSection = document.getElementById('date-time-section');
    const appointmentForm = document.getElementById('appointment-form');
    const subcategoryTitle = document.getElementById('subcategory-title');
    const subcategoryList = document.getElementById('subcategory-list');
    const backToCategories = document.getElementById('back-to-categories');
    const appointmentInfo = document.getElementById('appointment-info');
    const combinedAppointmentInfo = document.getElementById('combined-appointment-info');
    const calendar = document.getElementById('calendar');
    const timeSlots = document.getElementById('time-slots');
    const payDepositBtn = document.getElementById('pay-deposit-btn');

    const subcategoriesData = {
        "A. Feed-In Braids | Cornrows | Stitch Braids": [
            { name: "Under wig cornrows", duration: "1 hour", price: "$60.00", image: "images/uwcornrows.jpg", description: "* Hair is included (1B, 4, 27, 33, 30, Burgundy)\n* Mid-Back Length\n* For a different length, please select below" },
            { name: "3 layer cornrows", duration: "4 hours 30 minutes", price: "$280.00", image: "images/cornrows.jpg", description: "* Hair is included (1B, 4, 27, 33, 30, Burgundy)\n* Mid-Back Length\n* For a different length, please select below" },
            { name: "2 Feed-In Braids", duration: "50 minutes", price: "$50.00", image: "images/feed-in.jpg", description: "* Not recommended for thick, natural or short hair\n* Mid back\n* Hair is included (1B, 4, 27, 33, 30, Burgundy)" },
            { name: "2 feed in braids (small braids)", duration: "1 hour", price: "$60.00", image: "images/tfbraid.jpg" },
            { name: "8 Feed-In Braids", duration: "2 hours 15 minutes", price: "$130.00", image: "images/efbraid.jpg", description: "* Hair is included (1B, 4, 27, 33, 30, Burgundy)" },
            { name: "10-15 Feed-In Braids", duration: "2 hours", price: "$195.00", image: "images/tenfbraid.jpg", description: "* Hair is included (1B, 4, 27, 33, 30, Burgundy)" }
        ],

        "B. Twists": [
            { name: " BOMB Twist", duration: "5 hours", price: "$220.00", image: "images/bbt.jpg", description: " if you are looking for a natural twist style , this is the style.\n* Hair not included \n*5 packs of X-Pression twist UP." },
            { name: " ISLAND twist", duration: "6 hours", price: "$300.00", image: "images/ist.jpg", description: "* curly hair not included \n* mid back Length \n* waist Length Will be extra." },
            { name: " Senegalese Twist - Medium", duration: "4 hours  ", price: "$200.00", image: "images/senmt.jpg", description: "* Not recommended for thin hair \n* hair Included \n* Medium Size \n*extra fee for small size" },
            { name: " Senegalese Twist - Small", duration: "6 hours 30 minutes", price: "$400.00", image: "images/senst.jpg", description: "* Medium Size \n* For a different length, please contact us" },
            { name: " Passion Twist", duration: "4 hours 30 minutes  ", price: "$250.00", image: "images/past.jpg", description: "* Not recommended for thin hair or short hair \n* Mid-back Length \n* Hair is NOT included \n*for the hair 10 to 11 packs of the Freetress braid water wave \n*extra $50 for waist length \n* Hair must be drop at least 2 days before the appt." },
            { name: " Spring Twist", duration: "5 hours", price: "$220.00", image: "images/spt.jpg", description: "* Not recommended for thin hair or short hair \n* Shoulder length \n* Hair is NOT included \n* HAIR : AMAZON /BEYOND BEAUTY 3 packs each pack contain 3 bundles" },
            { name: " Marley Twist ",  duration: "3 hours 20 minutes ", price: "$190.00", image: "images/mart.jpg" , description: "* Mid-Back Length \n* Hair is NOT included \n* 7 packs of Cuban twist hair"}
        ],

        "C. Box Braids & Knotless": [
            { name: " Medium /Large Knotless", duration: "3 hours", price: "$235.00", image: "images/mlk.jpg"},
            { name: " EXTRA Large Knotless", duration: "2 hours 30 minutes", price: "$180.00", image: "images/elk.jpg", description: "*mid back length \n*extra $30 for waist length" },
            { name: " Small-Medium Knotless Braids", duration: "6 hours",  price: "$325.00", image: "images/smk.jpg", description: "*this size isn’t small but in between medium and small" },
            { name: " French curl KNOTLESS ", duration: "6 hours 30 minutes", price: "$60.00", image: "images/fck.jpg", description: "*Medium Size \n* This style is ONLY available as KNOTLESS box braids \n*Hair can be purchased at shop"  },
            { name: " Small knotless braids", duration: "7 hours ", price: "$400.00", image: "images/skb.jpg", description: "*mid back length \n*extra $30 for waist length" },
            { name: " Medium Knotless Box Braids ", duration: "3 hours 30 minutes", price: "$200.00", image: "images/mkbb.jpg", description: "* Hair is included (1B, 4, 27, 33, 30, Burgundy)" },
            { name: " Large Knotless Braids", duration: "1 hour", price: "$60.00", image: "images/lk.jpg" },
            { name: " Box Braids - Small", duration: "6 hours ", price: "$280.00", image: "images/bbs.jpg", description: "* Mid-Back Length \n* For a different length, please select below" },
            { name: " Bohemian Box Braids", duration: "6 hours", price: "$350.00", image: "images/bbb.jpg", description: "* Mid back Length \n* Curly Hair is NOT Included \n* Bohemian : curly hair added in between the braids and at the end \n* Human hair 2 bundles of 24 inches or more or Free Tress (deep twist) 2 packs " }

        ],


        "D. Crochet": [
            { name: " Crochet Braids", duration: "2 hours 30 minutes", price: "$130.00", image: "images/crocb.jpg"},
            { name: " Crochet Individual", duration: "3 hours 30 minutes", price: "$160.00", image: "images/croci.jpg", description: "* Can only be DONE with the Faux Locs crochet " }
        ],



        "E. Bohemian / Gypsy Knotless Braids": [
            { name: " Medium Bohemian", duration: "7 hours", price: "$480.00", image: "images/mb.jpg", description: "* Human Hair not included.\n* 2 bundles of 22 inches or more. \n* Can be done with Synthetic hair."},

            { name: " Medium Bohemian knotless", duration: "6 hours ", price: "$180.00", image: "images/mbk.jpg", description: "* Human Hair not included. \n* 2 bundles of 22 inches or more. \n* Can be done with Synthetic hair."},

            { name: " Medium Boho", duration: "6 hours ", price: "$360.00", image: "images/mboho.jpg", description: "* Human Hair not included. \n* 2 bundles of 22 inches or more. \n* Can be done with Synthetic hair."},

            { name: " Medium GYPSY Braids (human hair only)", duration: "7 hours ", price: "$480.00", image: "images/mgb.jpg", description: "* Human Hair not included. \n* Requires 3-4 bundles of 24 inches or more." },

            { name: " Small-Medium GYPSY Braids (human hair only)", duration: "7 hours ", price: "$550.00", image: "images/smgb.jpg", description: "* Human Hair not included. \n* Requires 3-4 bundles of 24 inches or more." },
            { name: " Small GYPSY Braids (human hair only)", duration: "10 hours 30 minutes ", price: "$695.00", image: "images/sgb.jpg", description: "* Human Hair not included. \n* Requires 3-4 bundles of 24 inches or more." },
            { name: " Medium Bohemian Bob", duration: "5 hours", price: "$300.00", image: "images/mbb.jpg", description: "* Human Hair not included. \n* Requires 3-4 bundles of 24 inches or more." },
            { name: " SMALL Bohemian Knotless", duration: "6 hours 30 minutes  ", price: "$580.00", image: "images/sbk.jpg", description: "* Human Hair not included. \n* 2 bundles of 22 inches or more. \n* Can be done with Synthetic hair."
            },
            { name: " SMALL Boho Knotless", duration: "6 hours", price: "$480.00", image: "images/sbohok.jpg", description: "* Human Hair not included. \n* 2 bundles of 22 inches or more. \n* Can be done with Synthetic hair."},

  	        { name: " Medium Large Bohemian", duration: "4 hours 30 minutes  ", price: "$320.00", image: "images/mlb.jpg", description: "* Human Hair not included. \n* 2 bundles of 22 inches or more. \n* Can be done with Synthetic hair."}
            ],


            "F. Half Feed-in Half Box Braids (Tribal / Fulani Braids)" : [
            { name: " Half knotless/Half feed-in braids", duration: "5 hours", price: "$265.00", image: "images/hkhb.jpg", description: "*Hair included \n*medium size"},

            { name: " Flip-Over BRAIDS", duration: "6 hours ", price: "$300.00", image: "images/fo.jpg", description: "*mid back length \n*extra $30 for waist length \n*curly hair not included (select curly as add on)" },

            { name: " Half Feed-in Half Box Braids - Big", duration: "2 hours 30 minutes", price: "$135.00", image: "images/hfhb.jpg " },

            { name: " Half Feed-in Half Box Braids - medium", duration: "4 hours 30 minutes", price: "$250.00", image: "images/hfhbm.jpg " }         
            ],


            "G. Ponytail Braids": [
            { name: " Ponytail Braids - Big", duration: "1 hour 30 minutes", price: "$120.00", image: "images/pb.jpg", description: "*Big Size "},
            { name: " Ponytail Braids - Small", duration: "4 hours 30 minutes", price: "$250.00", image: "images/ps.jpg", description: "*Small Size "}
            
        ],

        "H. Kids Special": [
            { name: " Medium knotless", duration: "5 hours", price: "$195.00", image: "images/mk.jpg", description: "*Hair included \n*Mid back length"},
            { name: " Large Knotless braids", duration: "3 hours ", price: "$160.00", image: "images/lkb.jpg"},
            { name: " Natural Kids Cornrow", duration: "1 hour 30 minutes", price: "$95.00", image: "images/nkc.jpg ", description: " * Natural Hair Braiding \n* No extensions required"},
            { name: " Small Feed-In Braids / Cornrows", duration: "2 hours 30 minutes ", price: "$130.00", image: "images/sfbc.jpg " },
            { name: " Kids Box Braids", duration: "3 hours", price: "$145.00", image: "images/kbb.jpg " }         
                
        ],

        "I. Men's styles": [
            { name: " Men Box braids", duration: "1 hour 20 minutes", price: "$75.00", image: "images/mbxb.jpg"},
            { name: " Men Twist", duration: "1 hour 20 minutes ", price: "$90.00", image: "images/ment.jpg"},
            { name: " Men CORNROWS BYC ", duration: "1 hour 15 minutes ", price: "$75.00", image: "images/mencB.jpg " },
            { name: " Men Cornrows", duration: "4 hours 30 minutes ", price: "$250.00", image: "images/mencorn.jpg " }         
        ]



        // Add more categories and their subcategories here...
    };

    let blockedDates = [];

    const availabilityData = {
        "January": { weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], weekend: ["Saturday", "Sunday"], weekdayTimes: ["4:00pm"], weekendTimes: ["12:00pm", "5:00pm"] },
        "February": { weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], weekend: ["Saturday", "Sunday"], weekdayTimes: ["4:00pm"], weekendTimes: ["12:00pm", "5:00pm"] },
        "March": { weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], weekend: ["Saturday", "Sunday"], weekdayTimes: ["4:00pm"], weekendTimes: ["12:00pm", "5:00pm"] },
        "April": { weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], weekend: ["Saturday", "Sunday"], weekdayTimes: ["4:00pm"], weekendTimes: ["12:00pm", "5:00pm"] },
        "May": { weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], weekend: ["Saturday", "Sunday"], weekdayTimes: ["4:00pm"], weekendTimes: ["12:00pm", "5:00pm"] },
        "June": { weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], weekend: ["Saturday"], weekdayTimes: ["12:00pm", "5:00pm"], weekendTimes: ["12:00pm", "5:00pm"] },
        "July": { weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], weekend: ["Saturday"], weekdayTimes: ["12:00pm", "5:00pm"], weekendTimes: ["12:00pm", "5:00pm"] },
        "August": { weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], weekend: ["Saturday"], weekdayTimes: ["12:00pm", "5:00pm"], weekendTimes: ["12:00pm", "5:00pm"] },
        "September": { weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], weekend: ["Saturday", "Sunday"], weekdayTimes: ["4:00pm"], weekendTimes: ["12:00pm", "5:00pm"] },
        "October": { weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], weekend: ["Saturday", "Sunday"], weekdayTimes: ["4:00pm"], weekendTimes: ["12:00pm", "5:00pm"] },
        "November": { weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], weekend: ["Saturday", "Sunday"], weekdayTimes: ["4:00pm"], weekendTimes: ["12:00pm", "5:00pm"] },
        "December": { weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], weekend: ["Saturday", "Sunday"], weekdayTimes: ["4:00pm"], weekendTimes: ["12:00pm", "5:00pm"] }
    };

    document.querySelectorAll('.select-btn').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.parentElement.getAttribute('data-category');
            displaySubcategories(category);
        });
    });

    backToCategories.addEventListener('click', (e) => {
        e.preventDefault();
        subcategories.style.display = 'none';
        categories.style.display = 'block';
    });

    document.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'back-to-subcategories') {
            event.preventDefault();
            console.log('Back to subcategories link clicked');
            dateAndTimeSection.style.display = 'none';
            subcategories.style.display = 'block';
            console.log('Subcategories section displayed');
        } else if (event.target && event.target.id === 'back-to-date-time') {
            event.preventDefault();
            console.log('Back to previous page link clicked');
            appointmentForm.style.display = 'none';
            dateAndTimeSection.style.display = 'block';
            console.log('Date and time section displayed');
        }
    });

    function displaySubcategories(category) {
        categories.style.display = 'none';
        subcategories.style.display = 'block';
        subcategoryTitle.textContent = category;
        subcategoryList.innerHTML = '';

        const services = subcategoriesData[category];
        services.forEach(service => {
            const subcategory = document.createElement('div');
            subcategory.className = 'subcategory';
            subcategory.innerHTML = `
                ${service.image ? `<img src="${service.image}" alt="${service.name}">` : ''}
                <div>
                    <h3>${service.name}</h3>
                    <p>${service.duration} @ ${service.price}</p>
                    ${service.description ? `<p>${service.description.replace(/\n/g, '<br>')}</p>` : ''}
                    <button class="book-btn" data-service='${JSON.stringify(service)}'>Book</button>
                </div>
            `;
            subcategoryList.appendChild(subcategory);
        });

        document.querySelectorAll('.book-btn').forEach(button => {
            button.addEventListener('click', () => {
                const service = JSON.parse(button.getAttribute('data-service'));
                displayAppointmentDetails(service);
            });
        });
    }

    function displayAppointmentDetails(service) {
        subcategories.style.display = 'none';
        dateAndTimeSection.style.display = 'block';
        combinedAppointmentInfo.innerHTML = `
            <a href="#" id="back-to-subcategories"><i class="fas fa-arrow-left"></i> VIEW ALL APPOINTMENTS</a>
            ${service.image ? `<img src="${service.image}" alt="${service.name}">` : ''}
            <div>
                <h3>${service.name}</h3>
                <p>${service.duration} @ ${service.price}</p>
                ${service.description ? `<p>${service.description.replace(/\n/g, '<br>')}</p>` : ''}
            </div>
        `;
        console.log('Adding event listener to back-to-subcategories link:', document.getElementById('back-to-subcategories'));
        renderCalendar();
    }

    async function fetchBlockedDates() {
        try {
            const response = await fetch('/blocked-dates');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            blockedDates = await response.json();
        } catch (error) {
            console.error('Error fetching blocked dates:', error);
        }
    }

    function renderCalendar() {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        renderMonth(currentYear, currentMonth);
    }

    function renderMonth(year, month) {
        calendar.innerHTML = '';
        timeSlots.innerHTML = '';

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const today = new Date();

        const availability = availabilityData[monthNames[month]];

        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.innerHTML = `
            <button id="prev-month">&lt;</button>
            <span>${monthNames[month]} ${year}</span>
            <button id="next-month">&gt;</button>
        `;
        calendar.appendChild(header);

        const daysOfWeek = document.createElement('div');
        daysOfWeek.className = 'days-of-week';
        daysOfWeek.innerHTML = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => `<div>${d}</div>`).join('');
        calendar.appendChild(daysOfWeek);

        const daysGrid = document.createElement('div');
        daysGrid.className = 'days-grid';
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'empty-cell';
            daysGrid.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayOfWeek = date.getDay();
            const dayCell = document.createElement('div');
            dayCell.className = 'day-cell';
            dayCell.textContent = day;

            // Disable past dates
            if (date < today) {
                dayCell.classList.add('disabled');
            } else if (isBlockedDate(date)) {
                dayCell.classList.add('disabled');
            } else if (availability) {
                const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                // Exclude Sundays in June, July, and August
                if (isWeekend && dayOfWeek === 0 && ["June", "July", "August"].includes(monthNames[month])) {
                    dayCell.classList.add('disabled');
                } else if ((isWeekday && availability.weekdays) || (isWeekend && availability.weekend)) {
                    dayCell.classList.add('available');
                    dayCell.addEventListener('click', () => {
                        highlightSelectedDay(dayCell);
                        const times = isWeekday ? availability.weekdayTimes : availability.weekendTimes;
                        renderTimeSlots(times);
                    });
                }
            }
            daysGrid.appendChild(dayCell);
        }
        calendar.appendChild(daysGrid);

        document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1, year, month));
        document.getElementById('next-month').addEventListener('click', () => changeMonth(1, year, month));
    }

    function changeMonth(offset, year, month) {
        const newMonth = month + offset;
        if (newMonth < 0) {
            renderMonth(year - 1, 11);
        } else if (newMonth > 11) {
            renderMonth(year + 1, 0);
        } else {
            renderMonth(year, newMonth);
        }
    }

    function highlightSelectedDay(selectedCell) {
        document.querySelectorAll('.day-cell').forEach(cell => {
            cell.classList.remove('selected');
        });
        selectedCell.classList.add('selected');
    }

    function renderTimeSlots(times) {
        timeSlots.innerHTML = '';
        times.forEach(time => {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = time;
            timeSlot.addEventListener('click', () => {
                document.querySelectorAll('.time-slot').forEach(slot => {
                    slot.classList.remove('selected');
                });
                timeSlot.classList.add('selected');
                showAppointmentForm();
            });
            timeSlots.appendChild(timeSlot);
        });
    }

    function showAppointmentForm() {
        dateAndTimeSection.style.display = 'none';
        appointmentForm.style.display = 'block';
    }

    function isBlockedDate(date) {
        return blockedDates.some(block => {
            const start = new Date(block.startDate);
            const end = new Date(block.endDate);
            return date >= start && date <= end;
        });
    }

    

    //  Stripe public key insertion
    const stripe = Stripe('pk_test_51Pfa8URulhcv0A1B06Z3Z2NxhWU8OpV12Jd9kYXQf7vEtdJJIY8uKHSRVFtwg9AuLVrAJAoFi4sz5a8F1RyMvHoU00cX7jSRx5'); 
    payDepositBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.querySelector('.combined-box h3').textContent.trim();
        const appDate = document.querySelector('.day-cell.selected').textContent.trim() + ' ' + document.querySelector('.calendar-header span').textContent.trim();
        const appTime = document.querySelector('.time-slot.selected').textContent.trim();
        const warningMessage = document.getElementById('warning-message');

        if (!firstName || !lastName || !phone || !email || !service || !appDate || !appTime) {
            warningMessage.textContent = 'Please fill out all required fields.';
            warningMessage.style.display = 'block';
            return;
        }

        // Hide warning message if all fields are filled
        warningMessage.style.display = 'none';

        try {
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    phone,
                    email,
                    service,
                    appDate,
                    appTime
                }),
            });

            const session = await response.json();

            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                // Handle error
                console.error(result.error.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    fetchBlockedDates().then(renderCalendar);

});
