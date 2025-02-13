function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
}


document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const logo = document.querySelector('.logo img');
    const navLinks = document.querySelectorAll('.nav-links a'); // Get all nav links

    if (!navbar) {
        console.log("Navbar element not found. Check if the id='navbar' is set correctly.");
        return;
    }
    if (!logo) {
        console.log("Logo element not found. Check if the logo element is correct.");
        return;
    }

    window.addEventListener('scroll', function() {
        console.log("Scroll event detected. ScrollY: " + window.scrollY);

        if (window.scrollY > 50) {
            console.log("Changing navbar, logo, and link styles.");
            navbar.classList.add('scrolled'); 
            navbar.style.backgroundColor = 'red'; 
            logo.style.filter = 'brightness(0) invert(1)'; // Turns the logo to black
        } else {
            console.log("Reverting navbar, logo, and link styles.");
            navbar.classList.remove('scrolled'); // Remove 'scrolled' class
            navbar.style.backgroundColor = 'white'; // Original navbar background color
            logo.style.filter = 'none'; // Revert logo to original color
        }
    });
});


// Toggle visibility of the section content
function toggleSection(element) {
    const content = element.nextElementSibling;
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}

// Close Page Button
function closePage() {
    window.history.back();
}
