function openCard(JsonItem) {
    var item = JSON.parse(JsonItem.getAttribute('data-item'));
    var card = document.getElementById('projectCard');
    var cardTitle = document.getElementById('cardTitle');
    var cardImage = document.getElementById('cardImage');
    var cardMoreInfo = document.getElementById('cardMoreInfo');
    var cardDescription = document.getElementById('cardDescription');

    cardTitle.textContent = item.name;
    cardImage.src = item.image;
    cardMoreInfo.href = item.info;
    cardDescription.textContent = item.description;

    card.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeCard() {
    var card = document.getElementById('projectCard');
    card.style.display = "none";
    document.body.style.overflow = "auto";
}

document.querySelector('.card-close').addEventListener('click', closeCard);

window.addEventListener('click', function(event) {
    var card = document.getElementById('projectCard');
    if (event.target == card) {
        card.style.display = "none";
        document.body.style.overflow = "auto";
    }
});
