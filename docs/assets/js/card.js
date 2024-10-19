function openCard(JsonItem) {
    var item = JSON.parse(JsonItem.getAttribute('data-item'));
    var card = document.getElementById('projectCard');
    var cardTitle = document.getElementById('cardTitle');
    var cardSlideShow = document.getElementById('cardSlideShow');
    var cardSlideShowDots = document.getElementById('cardSlideShowDots');
    var cardMoreInfo = document.getElementById('cardMoreInfo');
    var cardDescription = document.getElementById('cardDescription');
    var cardMedia = document.getElementById('cardMedia');

    cardTitle.textContent = item.name;
    cardMoreInfo.href = item.info;
    cardDescription.textContent = item.full_description;

    cardSlideShow.innerHTML = '';
    cardSlideShowDots.innerHTML = '';
    cardMedia.innerHTML = '';

    if (item.media && Array.isArray(item.media) && item.media.length > 0) {
        item.media.forEach(function(media, index){
            var headerDiv = document.createElement('div');
            headerDiv.className = 'header';
            headerDiv.textContent = media.name;

            var iframe = document.createElement('iframe');
            iframe.src = media.link;
            iframe.title = media.name;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.allowFullscreen = true;
            iframe.referrerPolicy = "strict-origin-when-cross-origin";

            var iframeBoxDiv = document.createElement('div');
            iframeBoxDiv.className = 'iframe-box';
            iframeBoxDiv.appendChild(iframe);


            cardMedia.appendChild(headerDiv);
            cardMedia.appendChild(iframeBoxDiv);
        })
    }

    item.images.forEach(function(imageSrc, index) {
        var img = document.createElement('img');
        img.src = imageSrc;
        img.alt = "Eric Gong's involvment in " + item.name;
        img.classList.add('slideshow-slide');
        img.setAttribute('draggable', 'false');
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
