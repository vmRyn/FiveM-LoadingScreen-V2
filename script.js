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

function updateImagesAndSlideshow() {
    const imagesInFolder = Array.from(imgFolder.querySelectorAll('img'));
    const newImages = imagesInFolder.filter(image => !images.includes(image.src));

    if (newImages.length > 0) {
        images.push(...newImages.map(image => image.src));
        console.log('New images added:', newImages);
        populateSlideshow();
    } else {
        const missingImages = images.filter(image => !imagesInFolder.some(img => img.src === image));
        if (missingImages.length > 0) {
            console.log('Missing images:', missingImages);
            // Handle missing images here
        }
    }
}

async function fetchImagesFromFolder() {
    // Use fetch or an API library to get image URLs
    // images = await fetch('YOUR_DISCORD_API_URL').then(response => response.json());

    // Dummy data for demonstration purposes
    images = [
        'img/image1.png',
        'img/image2.png',
        'img/image3.png',
        'img/image4.png',
        'img/image5.png',
        'img/image6.png',
        'img/image7.png',
        'img/image8.png',
        'img/image9.png',
        'img/image10.png',
        'img/image11.png',
        'img/image12.png',
        'img/image13.png',
        'img/image14.png',
    ];
    
    console.log('Fetched images:', images);
    populateSlideshow();
    images.sort(() => Math.random() - 0.5); // Shuffle the images
    console.log('Shuffled Images:', images);
    populateSlideshow();
}

fetchImagesFromFolder();