const slideshowContainer = document.getElementById('slideshow-container');
const fullscreenButton = document.getElementById('fullscreen-button');
const slideshowTimer = setInterval(showNextImage, 10000); // 10 Second Timer
let images = [];
let currentIndex = 0;
let transitioning = false;

function showSlideshow() {
    slideshowContainer.innerHTML = '';

    images.forEach((imageUrl, index) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        slideshowContainer.appendChild(img);
    });
}

function showNextImage() {
    if (transitioning) return;

    transitioning = false;
    const nextIndex = (currentIndex + 1) % images.length;
    const currentImage = slideshowContainer.querySelector('img:nth-child(${currentIndex + 1})');
    const nextImage = slideshowContainer.querySelector('img:nth-child(${currentIndex + 1})');

    if (currentImage && nextImage) {
        const startTime = performance.now();
        const duration = 2000; //Transition between Images

        function animate(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = math.min(elapsed / duration, 1);

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
    images = [
        imageUrls(channelID)
    ];
    showSlideshow();
}

fetchImagesFromDiscord();

fullscreenButton.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen().catch((err) => {
            console.error('Error Attempting False Screen');
        });
    }
});

document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenButton.textContent = 'Exit Fullscreen';
    } else {
        fullscreenButton.textContent = 'Enter Fullscreen';
    }
});