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
