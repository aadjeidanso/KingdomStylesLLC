document.addEventListener('DOMContentLoaded', () => {

// login button functionality

        document.getElementById('login-form').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the form from submitting normally
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Clear any previous error message
        const errorMessageElement = document.getElementById('error-message');
        errorMessageElement.textContent = '';
        errorMessageElement.style.display = 'none';

        // Check if the username and password are correct
        if (username === 'dollarss' && password === 'christdia#@789') {
            // Redirect to the admin.html page
            window.location.href = 'admin.html';
        } else {
            // Display error message
            errorMessageElement.textContent = 'Wrong username or password. Try again or click Forgot password to reset it.';
            errorMessageElement.style.display = 'block';
        }
    });



//back to top function
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


    const backendUrl = 'http://localhost:5001';  // Base URL for the backend


});
