// proj5.js

// Function to open the lightbox and display the selected image
function openLightbox(imageSrc) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = imageSrc;
    lightbox.style.display = "flex"; // Show lightbox
}

// Function to close the lightbox
function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none"; // Hide lightbox
}

// Example of using createElement and appendChild to add new images dynamically
function addNewImage() {
    const newImage = document.createElement("img");
    newImage.src = "Arizona.jpg"; // Source for the new thumbnail
    newImage.alt = "Thumbnail for Image 4";
    newImage.className = "thumbnail";

    // Set the click event for the new thumbnail to open the lightbox
    newImage.onclick = function() {
        openLightbox("Arizona.jpg"); // Large image for the lightbox
    };

    // Append the new image to the gallery (or any specific container)
    document.body.appendChild(newImage);
}

// Call addNewImage function to add a new thumbnail image
addNewImage();