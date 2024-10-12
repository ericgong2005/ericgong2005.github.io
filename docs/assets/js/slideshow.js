function startSlideShow(cardSlideShow, slideIndex) {
    const slides = cardSlideShow.getElementsByClassName("slideshow-slide");

    function showSlides(n) {
        slideIndex = (n > slides.length) ? 1 : (n < 1) ? slides.length : n;

        Array.from(slides).forEach(slide => {
            if (slide.style.display === "block") {
                slide.classList.remove("fade-in");
                slide.classList.add("fade-out");
                setTimeout(() => slide.style.display = "none", 450); // Wait for fade-out to complete
            }
        });
    
        // Show and fade in the current slide
        slides[slideIndex - 1].classList.remove("fade-out");
        slides[slideIndex - 1].classList.add("fade-in");
        setTimeout(() => slides[slideIndex - 1].style.display = "block", 450)
    }

    // Start the slideshow with an interval and return the interval ID for cleanup
    let intervalId = setInterval(function() {
        slideIndex++;
        showSlides(slideIndex);
    }, 3000); // 4 seconds interval

    // Show the first slide when the card is opened
    showSlides(slideIndex);

    return intervalId; // Return the interval ID for later clearing
}