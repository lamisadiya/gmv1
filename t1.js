let currentIndex = 0;
const slides = document.querySelectorAll(".testimonial-slide");
const totalSlides = slides.length;
const paginationContainer = document.querySelector(".testimonial-pagination");

// Create pagination dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    dot.classList.add("pagination-dot");
    dot.setAttribute("data-index", i);
    dot.addEventListener("click", () => goToSlide(i));
    paginationContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".pagination-dot");


function updateSlides() {
    // Reset all slides
    slides.forEach(slide => {
        slide.classList.remove("visible-left", "visible-center", "visible-right");
        slide.style.display = "none";
    });


    // Set new visible slides
    const leftIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    const centerIndex = currentIndex;
    const rightIndex = (currentIndex + 1) % totalSlides;


    slides[leftIndex].classList.add("visible-left");
    slides[leftIndex].style.display = "block";
    
    slides[centerIndex].classList.add("visible-center");
    slides[centerIndex].style.display = "block";
    
    slides[rightIndex].classList.add("visible-right");
    slides[rightIndex].style.display = "block";
    updatePagination();

}
function updatePagination() {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
}
function goToSlide(index) {
    currentIndex = index;
    updateSlides();
}

// Initialize the first three visible slides and pagination
updateSlides();

// Auto-slide every 5 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlides();
}, 5000);
