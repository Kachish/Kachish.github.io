// Select the menu toggle button and the nav links
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Add an event listener to the menu toggle to show/hide the navigation links
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});
