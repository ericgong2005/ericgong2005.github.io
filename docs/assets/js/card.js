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

    cardSlideShow.innerHTML = ''; // Clear previous slides
    item.images.forEach(function(imageSrc) {
        var img = document.createElement('img');
        img.src = imageSrc;
        img.alt = item.name;
        img.classList.add('slideshow-slide');
        cardSlideShow.appendChild(img);
    });

    card.style.display = "block";
    document.body.style.overflow = "hidden";

    // Start slideshow specific to this card
    let cardSlideIndex = 1;
    let slideInterval = startSlideShow(cardSlideShow, cardSlideIndex);

    // Attach the close event handler to stop the slideshow and clean up
    document.querySelector('.card-close').addEventListener('click', function() {
        closeCard(card, slideInterval);
    });
}

function closeCard(card, intervalId) {
    clearInterval(intervalId); // Stop the slideshow interval when closing the card
    card.style.display = "none";
    document.body.style.overflow = "auto";

    // Clear the slideshow content (to stop interaction after the card is closed)
    var cardSlideShow = document.getElementById('cardSlideShow');
    cardSlideShow.innerHTML = '';
}