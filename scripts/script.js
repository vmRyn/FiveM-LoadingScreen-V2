const slideshowContainer = document.getElementById('slideshow-container');
const imgFolder = document.getElementById('img-folder');
const fullscreenButton = document.getElementById('fullscreen-button');
let images = [];
let currentIndex = 0;
let transitioning = false;
const slideshowInterval = setInterval(showNextImage, 5000);

function createImageElement(imageUrl, index) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.position = 'absolute';
    img.style.top = img.style.left = '0';
    img.style.opacity = index === currentIndex ? '1' : '0';
    img.style.objectFit = 'cover';
    img.style.width = img.style.height = '100%';
    img.style.zIndex = index === currentIndex ? '1' : '0';
    return img;
}

function populateSlideshow() {
    slideshowContainer.innerHTML = '';
    images.forEach((imageUrl, index) => {
        const img = createImageElement(imageUrl, index);
        slideshowContainer.appendChild(img);
    });
}

function animateTransition(currentImage, nextImage, startTime) {
    const duration = 1000;
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    currentImage.style.opacity = 1 - progress;
    nextImage.style.opacity = progress;

    if (progress < 1) {
        requestAnimationFrame(() => animateTransition(currentImage, nextImage, startTime));
    } else {
        transitioning = false;
        currentIndex = (currentIndex + 1) % images.length;
    }
}

function showNextImage() {
    if (transitioning) return;

    transitioning = true;
    const nextIndex = (currentIndex + 1) % images.length;
    const imagesList = slideshowContainer.getElementsByTagName('img');
    const currentImage = imagesList[currentIndex];
    const nextImage = imagesList[nextIndex];

    if (currentImage && nextImage) {
        animateTransition(currentImage, nextImage, performance.now());
    }
}

function fetchImagesFromFolder() {
    images = [];

    for (let i = 1; i <= 35; i++) {
        const imagePath = `img/image${i}.png`;
        images.push(imagePath);
    }

    const loadedImages = [];

    function loadImage(imagePath) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject();
            img.src = imagePath;
        });
    }

    async function loadImages() {
        for (const imagePath of images) {
            try {
                const loadedImage = await loadImage(imagePath);
                loadedImages.push(loadedImage);
            } catch {}
        }
    }

    loadImages();
    
    images.sort(() => Math.random() - 0.5); // Shuffle the images
    console.log('Shuffled Images:', images);
    populateSlideshow();
}

fetchImagesFromFolder();