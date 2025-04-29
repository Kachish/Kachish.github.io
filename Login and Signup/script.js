// Handle Signup Form
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validate inputs
        if (!validateFullName(fullName) || !validateUsername(username) || !validateEmail(email) || !validatePassword(password)) {
            alert('Please fill out the form correctly.');
            return;
        }

        // Check if username already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.username === username)) {
            alert('Username already exists. Please choose a different one.');
            return;
        }

        // Save user data
        users.push({ fullName, username, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Signup successful! You can now log in.');
        signupForm.reset();
    });
}

// Handle Login Form
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Fetch user data
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            // Save logged-in user information
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            // Redirect to index.html
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });
}

// Handle Index Page Welcome Message
const welcomeMessage = document.getElementById('welcome-message');
if (welcomeMessage) {
    // Get the logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // Display personalized welcome message
        welcomeMessage.textContent = `Hello, ${loggedInUser.fullName}! Welcome back to your dashboard.`;
    } else {
        // Redirect to login page if no user is logged in
        window.location.href = 'login.html';
    }
}

// Logout Button Logic
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', function () {
        // Clear logged-in user data
        localStorage.removeItem('loggedInUser');

        // Redirect to login page
        window.location.href = 'login.html';
    });
}

// Validation Functions
function validateFullName(name) {
    return /^[A-Za-z\s]{3,}$/.test(name);
}

function validateUsername(username) {
    return /^[A-Za-z0-9]{4,15}$/.test(username);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}
