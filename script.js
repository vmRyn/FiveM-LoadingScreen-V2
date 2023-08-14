const slideshowContainer = document.getElementById('slideshow-container');
const fullscreenButton = document.getElementById('fullscreen-button');
let images = []; // Array to hold image URLs
let currentIndex = 0;
let transitioning = false;

// Add images to the slideshow container
function populateSlideshow() {
    // Clear existing images
    slideshowContainer.innerHTML = '';

    // Add images from the images array
    images.forEach((imageUrl, index) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.opacity = index === currentIndex ? '1' : '0';
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

const slideshowInterval = setInterval(showNextImage, 5000); // Change image every 5 seconds

// Toggle fullscreen mode
fullscreenButton.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen().catch((err) => {
            console.error('Error attempting to enable fullscreen:', err);
        });
    }
});

// Handle fullscreen change event
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenButton.textContent = 'Exit Fullscreen';
    } else {
        fullscreenButton.textContent = 'Toggle Fullscreen';
    }
});
