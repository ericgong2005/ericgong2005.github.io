function openCard(JsonItem) {
    var item = JSON.parse(JsonItem.getAttribute('data-item'));
    var card = document.getElementById('projectCard');
    var cardTitle = document.getElementById('cardTitle');
    var cardSlideShow = document.getElementById('cardSlideShow');
    var cardSlideShowDots = document.getElementById('cardSlideShowDots');
    var cardMoreInfo = document.getElementById('cardMoreInfo');
    var cardDescription = document.getElementById('cardDescription');

    cardTitle.textContent = item.name;
    cardMoreInfo.href = item.info;
    cardDescription.textContent = item.full_description;

    cardSlideShow.innerHTML = '';
    cardSlideShowDots.innerHTML = '';

    item.images.forEach(function(imageSrc, index) {
        var img = document.createElement('img');
        img.src = imageSrc;
        img.alt = item.name;
        img.classList.add('slideshow-slide');
        cardSlideShow.appendChild(img);
    
        var dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', function() {
            goToSlide(cardSlideShow, index + 1);
        });
        cardSlideShowDots.appendChild(dot);
    });

    card.style.display = "block";
    document.body.style.overflow = "hidden";

    if (slideIntervalId) {
        clearInterval(slideIntervalId);
    }

    let cardSlideIndex = 1;
    slideIntervalId = startSlideShow(cardSlideShow, cardSlideIndex); // Start slideshow

    document.querySelector('.card-close').addEventListener('click', function() {
        closeCard(card, slideIntervalId);
    });

    window.addEventListener('click', function(event) {
        if (event.target == card) {
            closeCard(card, slideIntervalId);
        }
    });
}

function closeCard(card, intervalId) {
    clearInterval(intervalId);
    card.style.display = "none";
    document.body.style.overflow = "auto";

    var cardSlideShow = document.getElementById('cardSlideShow');
    cardSlideShow.innerHTML = '';
}
