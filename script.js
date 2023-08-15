const slideshowContainer = document.getElementById('slideshow-container');
const fullscreenButton = document.getElementById('fullscreen-button');
let images = []; // Array to hold image URLs
let currentIndex = 0;
let transitioning = false;
const slideshowInterval = setInterval(showNextImage, 5000); // Change image every 5 seconds

function populateSlideshow() {
    // Clear existing images
    slideshowContainer.innerHTML = '';

    // Add images from the images array
    images.forEach((imageUrl, index) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.opacity = index === currentIndex ? '1' : '0';
        img.style.objectFit = 'cover'; // Ensure the image covers its container
        img.style.width = '100%';      // Adjust the image width
        img.style.height = '100%';     // Adjust the image height
        img.style.zIndex = index === currentIndex ? '1' : '0'; // Set zIndex based on opacity
        slideshowContainer.appendChild(img);
    });
}


// Set up automatic slideshow
function showNextImage() {
    if (transitioning) return;

    transitioning = true;
    const nextIndex = (currentIndex + 1) % images.length;
    const imagesList = slideshowContainer.getElementsByTagName('img');
    const currentImage = imagesList[currentIndex];
    const nextImage = imagesList[nextIndex];

    if (currentImage && nextImage) {
        const startTime = performance.now();
        const duration = 1000; // Transition duration in milliseconds

        function animate(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            currentImage.style.opacity = 1 - progress;
            nextImage.style.opacity = progress;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                transitioning = false;
                currentIndex = nextIndex;
            }
        }

        requestAnimationFrame(animate);
    }
}

async function fetchImagesFromDiscord() {
    // Use fetch or an API library to get image URLs from Discord
    // Example: const response = await fetch('YOUR_DISCORD_API_URL');
    // const data = await response.json();
    // images = data.imageUrls;

    // Dummy data for demonstration purposes
    images = [
        'img/image.png',
        'img/image2.png',
        'img/image3.png',
        'img/image4.png',
        'img/image5.png',
        'img/image6.png',
        'img/image7.png',
        'img/image8.png'
    ];

    console.log('Fetched image URLs:', images); // Add this line

    populateSlideshow();
}

// Fetch images initially
fetchImagesFromDiscord();

function updateImagesAndSlideshow() {
    // Use an array to hold the current and new image URLs
    const newImages = [
        'img/image.png',
        'img/image2.png',
        'img/image3.png',
        'img/image4.png',
        'img/image5.png',
        'img/image6.png',
        'img/image7.png',
        'img/image8.png'
    ];

    // Compare the newImages array with the current images array
    const addedImages = newImages.filter(newImage => !images.includes(newImage));

    if (addedImages.length > 0) {
        // Add new images to the images array
        images = images.concat(addedImages);
        console.log('New images added:', addedImages);
        populateSlideshow();
    }
}

function setupImageFolderObserver() {
    const observer = new MutationObserver(updateImagesAndSlideshow);

    // Define the configuration for the observer
    const config = {
        childList: true, // Watch for changes in the list of child nodes
        subtree: true,   // Watch for changes in the entire subtree
    };

    // Start observing the 'img' folder
    observer.observe(document.getElementById('img-folder'), config);
}

// Call the setupImageFolderObserver function
setupImageFolderObserver();

function setupImageFolderObserver() {
    const observer = new MutationObserver(updateImagesAndSlideshow);

    // Define the configuration for the observer
    const config = {
        childList: true, // Watch for changes in the list of child nodes
        subtree: true,   // Watch for changes in the entire subtree
    };

    // Start observing the 'img' folder
    observer.observe(document.getElementById('img-folder'), config);
}

// Call the setupImageFolderObserver function
setupImageFolderObserver();