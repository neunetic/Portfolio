document.addEventListener('DOMContentLoaded', () => {

    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const thumbnailCards = document.querySelectorAll('.thumbnail-card');
    let currentIndex = 0;

    const images = Array.from(thumbnailCards).map(card => card.href);

    function showLightbox(index) {
        currentIndex = index;
        console.log('Attempting to show image at path:', images[currentIndex]);
        lightboxImg.src = images[currentIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showNextImage() {
        const nextIndex = (currentIndex + 1) % images.length;
        showLightbox(nextIndex);
    }

    function showPrevImage() {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        showLightbox(prevIndex);
    }

    // --- 3. ATTACH EVENT LISTENERS ---

    // Open the lightbox when a thumbnail is clicked
    thumbnailCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault(); // Stop the link from opening a new page
            const index = parseInt(card.dataset.index, 10);
            showLightbox(index);
        });
    });

    // Navigation buttons
    document.querySelector('.next-btn').addEventListener('click', showNextImage);
    document.querySelector('.prev-btn').addEventListener('click', showPrevImage);
    
    // Close the lightbox
    document.querySelector('.close-btn').addEventListener('click', hideLightbox);

    // Also close when clicking the dark background
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) { // Check if the click is on the background itself
            hideLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) { // Only act if the lightbox is open
            if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'Escape') {
                hideLightbox();
            }
        }
    });

    const gridItems = document.querySelectorAll('.thumbnail-card');

});