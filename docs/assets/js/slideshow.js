function startSlideShow(cardSlideShow, slideIndex) {
    const slides = cardSlideShow.getElementsByClassName("slideshow-slide");

    function showSlides(n) {
        slideIndex = (n > slides.length) ? 1 : (n < 1) ? slides.length : n;

        Array.from(slides).forEach(slide => {
            if (slide.style.display === "block") {
                slide.classList.remove("fade-in");
                slide.classList.add("fade-out");
                setTimeout(() => slide.style.display = "none", 700);
            }
        });
    
        slides[slideIndex - 1].classList.remove("fade-out");
        slides[slideIndex - 1].classList.add("fade-in");
        setTimeout(() => slides[slideIndex - 1].style.display = "block", 700)
    }

    let intervalId = setInterval(function() {
        slideIndex++;
        showSlides(slideIndex);
    }, 4000);

    showSlides(slideIndex);

    return intervalId;
}