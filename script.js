// Toggle the navigation menu on small devices
function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("active");
}

// Toggle the dropdown menu inside "Projects" on small devices
function toggleDropdown(event) {
  event.preventDefault(); // Prevents default link behavior
  const dropdown = event.target.parentElement;
  dropdown.classList.toggle("active");
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

// JavaScript to add floating motion to the image
const floatingImage = document.getElementById('floating-image');

// CSS Keyframes-like effect using JavaScript
let floatingUp = true;

function floatImage() {
let currentPosition = floatingImage.style.transform || 'translateY(0px)';
let currentY = parseInt(currentPosition.replace('translateY(', '').replace('px)', ''));

// Set the direction of motion (up/down)
if (floatingUp) {
  floatingImage.style.transform = `translateY(${currentY - 1}px)`;
  if (currentY <= -20) floatingUp = false; // Limit how far up it floats
} else {
  floatingImage.style.transform = `translateY(${currentY + 1}px)`;
  if (currentY >= 0) floatingUp = true; // Reset to initial position
}
}

// Run the floatImage function every 30ms to create a smooth animation
setInterval(floatImage, 30);


const galleries = [
  { element: document.querySelector('.gallery-left-1'), direction: -1 },
  { element: document.querySelector('.gallery-right-1'), direction: 1 },
  { element: document.querySelector('.gallery-left-2'), direction: -1 },
  { element: document.querySelector('.gallery-right-2'), direction: 1 },
];

// Track translation values for each gallery
const translateXValues = [0, 0, 0, 0];

window.addEventListener('wheel', (event) => {
  const delta = event.deltaY;

  galleries.forEach((gallery, index) => {
    const galleryElement = gallery.element;
    const containerWidth = galleryElement.parentElement.offsetWidth;
    const galleryWidth = galleryElement.scrollWidth;

    if (delta > 0) {
      translateXValues[index] += gallery.direction * 20;
    } else {
      translateXValues[index] -= gallery.direction * 20;
    }

    // Constrain the translateX values within bounds
    translateXValues[index] = Math.max(
      Math.min(translateXValues[index], 0),
      containerWidth - galleryWidth
    );

    galleryElement.style.transform = `translateX(${translateXValues[index]}px)`;
  });
});



// Run the floatImage function every 30ms to create a smooth animation
setInterval(floatImage, 30);



const container = document.querySelector('.testimonials-container');
const cards = document.querySelectorAll('.testimonial-card');

// Function to move the first card to the end for seamless looping
function loopCarousel() {
    const firstCard = container.firstElementChild;
    container.appendChild(firstCard);
    container.style.transition = "none"; // Temporarily disable transition for repositioning
    container.style.transform = "translateX(0)";
    setTimeout(() => {
        container.style.transition = "transform 10s linear"; // Re-enable transition
    });
}

// Detect when the animation ends and reorder the cards
container.addEventListener('animationiteration', loopCarousel);

// Stop all animations except the hovered card
cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        container.style.animationPlayState = 'paused';
        card.style.backgroundColor = 'linear-gradient(214.38deg, #ff8079 -2.24%, #ff1e1e 59.38%);';
    });
    card.addEventListener('mouseleave', () => {
        container.style.animationPlayState = 'running';
        card.style.backgroundColor = ''; // Reset background color
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Select all tabs and service sections
    const tabs = document.querySelectorAll(".tab");
    const sections = document.querySelectorAll(".services-container, .Web-design, .seo, .Social-media, .Amazon, .Modeling, .Video");
  
    // Function to hide all sections
    function hideAllSections() {
      sections.forEach((section) => {
        section.style.display = "none";
      });
    }
  
    // Function to remove active class from all tabs
    function removeActiveClass() {
      tabs.forEach((tab) => {
        tab.classList.remove("active");
      });
    }
  
    // Add event listener to each tab
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        // Hide all sections and remove active class
        hideAllSections();
        removeActiveClass();
  
        // Show the clicked section and set the active tab
        sections[index].style.display = "flex";
        tab.classList.add("active");
      });
    });
  
    // Initial state: Display the first section
    hideAllSections();
    sections[0].style.display = "flex";
    tabs[0].classList.add("active");
  });
  
  
  const carouselTrack = document.querySelector('.carousel-track');
  const parentWidth = carouselTrack.parentElement.offsetWidth;
  
  // Add enough copies to fill the mask area seamlessly
  while (carouselTrack.scrollWidth < parentWidth * 2) {
    carouselTrack.innerHTML += carouselTrack.innerHTML;
  }
  

document.addEventListener('scroll', function () {
  const scrollTop = window.scrollY;
  const background = document.querySelector('.background');

  // Move background up as the page scrolls
  background.style.transform = `translateY(${scrollTop * -0.5}px)`;
});

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousels");
  const slides = document.querySelectorAll(".slide");
  let currentIndex = 0;


  // Function to move the carousel
  function moveCarousel(index) {
    const offset = -index * 100; // Slide width is 100%
    carousel.style.transform = `translateX(${offset}%)`;
  }


  // Add navigation functionality (optional)
  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length; // Loop back to the first slide
    moveCarousel(currentIndex);
  };


  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Loop to the last slide
    moveCarousel(currentIndex);
  };


  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.addEventListener("click", nextSlide);
  document.body.appendChild(nextBtn);


  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.addEventListener("click", prevSlide);
  document.body.appendChild(prevBtn);
  
});

