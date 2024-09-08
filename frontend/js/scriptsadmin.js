document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/bookings');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const bookings = await response.json();

        if (!Array.isArray(bookings)) {
            throw new Error('Bookings data is not an array');
        }

        const customerDetailsBody = document.getElementById('customer-details-body');
        const bookingsBody = document.getElementById('bookings-body');
        const pastBookingsBody = document.getElementById('past-bookings-body');
        const confirmedBookingsBody = document.getElementById('confirmed-bookings-body');
        const canceledBookingsBody = document.getElementById('canceled-bookings-body');
        const rescheduledBookingsBody = document.getElementById('rescheduled-bookings-body');
        let newBookingsCount = 0;
        let confirmedBookingsCount = 0;
        let canceledBookingsCount = 0;
        let rescheduledBookingsCount = 0;
        let pastBookingsCount = 0;

        bookings.forEach(booking => {
            const trCustomer = document.createElement('tr');
            trCustomer.innerHTML = `
                <td>${booking.firstName}</td>
                <td>${booking.lastName}</td>
                <td>${booking.phone}</td>
                <td>${booking.email}</td>
                <td>${booking.service}</td>
                <td>${booking.app_date}</td>
                <td>${booking.app_time}</td>
                <td>${new Date(booking.payment_date).toLocaleString()}</td>
            `;
            customerDetailsBody.prepend(trCustomer);

            if (booking.status === 'new') {
                const trBooking = document.createElement('tr');
                trBooking.innerHTML = `
                    <td><input type="checkbox"></td>
                    <td>${booking.firstName} ${booking.lastName}</td>
                    <td>${booking.phone}</td>
                    <td>${booking.email}</td>
                    <td>${booking.service}</td>
                    <td>${booking.app_date}</td>
                    <td>${booking.app_time}</td>
                    <td>${new Date(booking.payment_date).toLocaleString()}</td>
                    <td>
                        <button class="action-btn confirm-btn">Confirm</button>
                        <button class="action-btn cancel-btn">Cancel</button>
                        <button class="action-btn reschedule-btn">Reschedule</button>
                    </td>
                `;
                bookingsBody.prepend(trBooking);

                newBookingsCount++;

                // Add event listeners for the Confirm, Cancel, and Reschedule buttons
                trBooking.querySelector('.confirm-btn').addEventListener('click', () => {
                    updateBookingStatus(booking._id, 'confirmed', trBooking, 'new');
                });

                trBooking.querySelector('.cancel-btn').addEventListener('click', () => {
                    updateBookingStatus(booking._id, 'canceled', trBooking, 'new');
                });

                trBooking.querySelector('.reschedule-btn').addEventListener('click', () => {
                    // Display modal
                    const modal = document.getElementById('rescheduleModal');
                    modal.style.display = 'block';

                    const saveBtn = document.querySelector('#reschedule-form button[type="submit"]');
                    saveBtn.onclick = (event) => {
                        event.preventDefault();
                        const newDate = document.getElementById('new-app-date').value;
                        const newTime = document.getElementById('new-app-time').value;

                        updateBookingStatus(booking._id, 'rescheduled', trBooking, 'new', newDate, newTime);

                        // Close modal
                        modal.style.display = 'none';
                    };

                    const closeBtn = document.querySelector('.modal .close');
                    closeBtn.onclick = () => {
                        modal.style.display = 'none';
                    };

                    window.onclick = (event) => {
                        if (event.target === modal) {
                            modal.style.display = 'none';
                        }
                    };
                });
            } else if (booking.status === 'confirmed') {
                addConfirmedBookingRow(booking);
                confirmedBookingsCount++;
            } else if (booking.status === 'canceled') {
                addCanceledBookingRow(booking);
                canceledBookingsCount++;
            } else if (booking.status === 'rescheduled') {
                addRescheduledBookingRow(booking);
                rescheduledBookingsCount++;
            } else if (booking.status === 'past') {
                addPastBookingRow(booking);
                pastBookingsCount++;
            }
        });

        // Update new bookings count
        updateCounts();

        // Restore saved section state
        const savedSection = localStorage.getItem('savedSection');
        if (savedSection) {
            showSection(savedSection);
        } else {
            showSection('default-view');
        }

        function updateCounts() {
            document.querySelector('.new-bookings .booking-count').textContent = newBookingsCount;
            document.querySelector('.confirmed-bookings .booking-count').textContent = confirmedBookingsCount;
            document.querySelector('.canceled-bookings .booking-count').textContent = canceledBookingsCount;
            document.querySelector('.rescheduled-bookings .booking-count').textContent = rescheduledBookingsCount;
            document.querySelector('.past-bookings .booking-count').textContent = pastBookingsCount;
        }

        async function updateBookingStatus(bookingId, status, rowElement, currentStatus, newDate = null, newTime = null, stayOnRescheduled = false) {
            try {
                await fetch('/update-booking-status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bookingId, status, newDate, newTime })
                });
                rowElement.remove();
                const booking = bookings.find(b => b._id === bookingId);
                booking.status = status;
                if (status === 'confirmed') {
                    addConfirmedBookingRow(booking);
                    confirmedBookingsCount++;
                    newBookingsCount--;
                } else if (status === 'canceled') {
                    addCanceledBookingRow(booking);
                    canceledBookingsCount++;
                    if (currentStatus === 'confirmed') {
                        confirmedBookingsCount--;
                    }
                    if (currentStatus === 'new') {
                        newBookingsCount--;
                    }
                    if (currentStatus === 'rescheduled') {
                        rescheduledBookingsCount--;
                    }
                } else if (status === 'rescheduled') {
                    addRescheduledBookingRow(booking);
                    rescheduledBookingsCount++;
                    if (currentStatus === 'confirmed') {
                        confirmedBookingsCount--;
                    }
                    if (currentStatus === 'new') {
                        newBookingsCount--;
                    }
                } else if (currentStatus === 'new') {
                    newBookingsCount--;
                }
                updateCounts();
            } catch (error) {
                console.error('Error updating booking status:', error);
            }
        }

        async function updateBookingCompletionStatus(bookingId, completed, stayOnRescheduled = false) {
            try {
                await fetch('/update-booking-completion', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bookingId, completed })
                });
                const booking = bookings.find(b => b._id === bookingId);
                booking.completed = completed;
                if (completed) {
                    addPastBookingRow(booking);
                    pastBookingsCount++;
                } else {
                    const pastTr = pastBookingsBody.querySelector(`tr[data-booking-id="${booking._id}"]`);
                    if (pastTr) {
                        pastBookingsBody.removeChild(pastTr);
                        pastBookingsCount--;
                    }
                }
                updateCounts();
            } catch (error) {
                console.error('Error updating booking completion status:', error);
            }
        }

        function addConfirmedBookingRow(booking) {
            const confirmedTr = document.createElement('tr');
            confirmedTr.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${booking.firstName} ${booking.lastName}</td>
                <td>${booking.phone}</td>
                <td>${booking.email}</td>
                <td>${booking.service}</td>
                <td>${booking.app_date}</td>
                <td>${booking.app_time}</td>
                <td>${new Date(booking.payment_date).toLocaleString()}</td>
                <td><input type="checkbox" class="completed-checkbox" ${booking.completed ? 'checked' : ''}></td>
                <td>
                    <button class="action-btn cancel-btn">Cancel</button>
                    <button class="action-btn reschedule-btn">Reschedule</button>
                </td>
            `;
            confirmedBookingsBody.prepend(confirmedTr);

            confirmedTr.querySelector('.completed-checkbox').addEventListener('change', (event) => {
                const completed = event.target.checked;
                updateBookingCompletionStatus(booking._id, completed);
            });

            confirmedTr.querySelector('.cancel-btn').addEventListener('click', () => {
                updateBookingStatus(booking._id, 'canceled', confirmedTr, 'confirmed');
            });

            confirmedTr.querySelector('.reschedule-btn').addEventListener('click', () => {
                // Display modal
                const modal = document.getElementById('rescheduleModal');
                modal.style.display = 'block';

                const saveBtn = document.querySelector('#reschedule-form button[type="submit"]');
                saveBtn.onclick = (event) => {
                    event.preventDefault();
                    const newDate = document.getElementById('new-app-date').value;
                    const newTime = document.getElementById('new-app-time').value;

                    updateBookingStatus(booking._id, 'rescheduled', confirmedTr, 'confirmed', newDate, newTime);

                    // Close modal
                    modal.style.display = 'none';
                };

                const closeBtn = document.querySelector('.modal .close');
                closeBtn.onclick = () => {
                    modal.style.display = 'none';
                };

                window.onclick = (event) => {
                    if (event.target === modal) {
                        modal.style.display = 'none';
                    }
                };
            });

            // Add to past bookings if completed
            if (booking.completed) {
                addPastBookingRow(booking);
                pastBookingsCount++;
                updateCounts();
            }
        }

        function addCanceledBookingRow(booking) {
            const canceledTr = document.createElement('tr');
            canceledTr.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${booking.firstName} ${booking.lastName}</td>
                <td>${booking.phone}</td>
                <td>${booking.email}</td>
                <td>${booking.service}</td>
                <td>${booking.app_date}</td>
                <td>${booking.app_time}</td>
                <td>${new Date(booking.payment_date).toLocaleString()}</td>
            `;
            canceledBookingsBody.prepend(canceledTr);
        }

        function addRescheduledBookingRow(booking) {
            const rescheduledTr = document.createElement('tr');
            rescheduledTr.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${booking.firstName} ${booking.lastName}</td>
                <td>${booking.phone}</td>
                <td>${booking.email}</td>
                <td>${booking.service}</td>
                <td>${booking.app_date}</td>
                <td>${booking.app_time}</td>
                <td>${booking.new_app_date}</td>
                <td>${booking.new_app_time}</td>
                <td>${new Date(booking.payment_date).toLocaleString()}</td>
                <td><input type="checkbox" class="completed-checkbox" ${booking.completed ? 'checked' : ''}></td>
                <td>
                    <button class="action-btn cancel-btn">Cancel</button>
                </td>
            `;
            rescheduledBookingsBody.prepend(rescheduledTr);

            rescheduledTr.querySelector('.cancel-btn').addEventListener('click', () => {
                updateBookingStatus(booking._id, 'canceled', rescheduledTr, 'rescheduled', null, null, true);
            });

            rescheduledTr.querySelector('.completed-checkbox').addEventListener('change', (event) => {
                const completed = event.target.checked;
                updateBookingCompletionStatus(booking._id, completed, true);
            });

            // Add to past bookings if completed
            if (booking.completed) {
                addPastBookingRow(booking);
                pastBookingsCount++;
                updateCounts();
            }
        }

        function addPastBookingRow(booking) {
            const pastTr = document.createElement('tr');
            pastTr.innerHTML = `
                <td>${booking.firstName} ${booking.lastName}</td>
                <td>${booking.phone}</td>
                <td>${booking.email}</td>
                <td>${booking.service}</td>
                <td>${booking.app_date}</td>
                <td>${booking.app_time}</td>
                <td>${new Date(booking.payment_date).toLocaleString()}</td>
            `;
            pastTr.dataset.bookingId = booking._id; // Set a data attribute for later reference
            pastBookingsBody.prepend(pastTr);
        }

    } catch (error) {
        console.error('Error fetching and displaying bookings:', error);
    }
});

function showSection(sectionId) {
    const sections = ['default-view', 'customer-details', 'bookings', 'task-management', 'block-calendar', 'open-calendar'];
    sections.forEach(section => {
        document.getElementById(section).style.display = (section === sectionId) ? 'block' : 'none';
    });
    localStorage.setItem('savedSection', sectionId);
}

document.getElementById('customer-details-link').addEventListener('click', function (event) {
    event.preventDefault();
    showSection('customer-details');
});

document.getElementById('bookings-link').addEventListener('click', function (event) {
    event.preventDefault();
    showSection('bookings');
    document.getElementById('new-bookings').style.display = 'block';
    document.getElementById('past-bookings').style.display = 'none';
});

document.querySelector('.new-bookings').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('new-bookings').style.display = 'block';
    document.getElementById('past-bookings').style.display = 'none';
});

document.querySelector('.past-bookings').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('new-bookings').style.display = 'none';
    document.getElementById('past-bookings').style.display = 'block';
});

document.getElementById('task-management-link').addEventListener('click', function (event) {
    event.preventDefault();
    showSection('task-management');
    document.getElementById('confirmed-bookings').style.display = 'block';
    document.getElementById('canceled-bookings').style.display = 'none';
    document.getElementById('rescheduled-bookings').style.display = 'none';
});

document.querySelector('.confirmed-bookings').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('confirmed-bookings').style.display = 'block';
    document.getElementById('canceled-bookings').style.display = 'none';
    document.getElementById('rescheduled-bookings').style.display = 'none';
});

document.querySelector('.canceled-bookings').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('confirmed-bookings').style.display = 'none';
    document.getElementById('canceled-bookings').style.display = 'block';
    document.getElementById('rescheduled-bookings').style.display = 'none';
});

document.querySelector('.rescheduled-bookings').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('confirmed-bookings').style.display = 'none';
    document.getElementById('canceled-bookings').style.display = 'none';
    document.getElementById('rescheduled-bookings').style.display = 'block';
});

document.getElementById('block-calendar-link').addEventListener('click', function (event) {
    event.preventDefault();
    showSection('block-calendar');
});

document.getElementById('open-calendar-link').addEventListener('click', function (event) {
    event.preventDefault();
    showSection('open-calendar');
});

document.getElementById('block-calendar-btn').addEventListener('click', async () => {
    const startDate = document.getElementById('block-start-date').value;
    const endDate = document.getElementById('block-end-date').value;

    try {
        const response = await fetch('/block-dates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ startDate, endDate })
        });
        const result = await response.json();
        const blockMessage = document.getElementById('block-message');
        blockMessage.textContent = result.message;
        blockMessage.style.display = 'block';
        blockMessage.style.color = 'green';
    } catch (error) {
        console.error('Error blocking dates:', error);
        const blockMessage = document.getElementById('block-message');
        blockMessage.textContent = 'Failed to block dates';
        blockMessage.style.display = 'block';
        blockMessage.style.color = 'red';
    }
});

document.getElementById('open-calendar-btn').addEventListener('click', async () => {
    const startDate = document.getElementById('open-start-date').value;
    const endDate = document.getElementById('open-end-date').value;

    try {
        const response = await fetch('/open-dates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ startDate, endDate })
        });
        const result = await response.json();
        const openMessage = document.getElementById('open-message');
        openMessage.textContent = result.message;
        openMessage.style.display = 'block';
        openMessage.style.color = 'green';
    } catch (error) {
        console.error('Error opening dates:', error);
        const openMessage = document.getElementById('open-message');
        openMessage.textContent = 'Failed to open dates';
        openMessage.style.display = 'block';
        openMessage.style.color = 'red';
    }
});
