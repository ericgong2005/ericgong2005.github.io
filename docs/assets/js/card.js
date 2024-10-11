let slideshowInterval;

function openCard(JsonItem) {
    var item = JSON.parse(JsonItem.getAttribute('data-item'));
    var card = document.getElementById('projectCard');
    var cardTitle = document.getElementById('cardTitle');
    var cardSlideShow = document.getElementById('cardSlideShow');
    var cardMoreInfo = document.getElementById('cardMoreInfo');
    var cardDescription = document.getElementById('cardDescription');

    cardTitle.textContent = item.name;
    cardMoreInfo.href = item.info;
    cardDescription.textContent = item.full_description;

    cardSlideShow.innerHTML = '';
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
    item.images.forEach(function(imageSrc) {
        var img = document.createElement('img');
        img.src = imageSrc;
        img.alt = item.name;
        img.classList.add('single-img');
        cardSlideShow.appendChild(img);
    });

    card.style.display = "block";
    document.body.style.overflow = "hidden";
    startImageSlideshow();
}

function startImageSlideshow() {
    var images = document.querySelectorAll('.card-slideshow img');
    let currentIndex = 0;

    if (images.length > 0) {
        // Ensure all images are hidden initially except the first
        images.forEach((img, index) => {
            img.style.display = (index === 0) ? 'block' : 'none';
        });

        // Start the slideshow
        slideshowInterval = setInterval(function() {
            // Hide the current image
            images[currentIndex].style.display = 'none';

            // Move to the next image
            currentIndex = (currentIndex + 1) % images.length;

            // Show the new image
            images[currentIndex].style.display = 'block';
        }, 400);  // Switch every 3 seconds
    }
}

function closeCard() {
    var card = document.getElementById('projectCard');
    card.style.display = "none";
    document.body.style.overflow = "auto";
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
}

document.querySelector('.card-close').addEventListener('click', closeCard);

window.addEventListener('click', function(event) {
    var card = document.getElementById('projectCard');
    if (event.target == card) {
        closeCard()
    }
});
