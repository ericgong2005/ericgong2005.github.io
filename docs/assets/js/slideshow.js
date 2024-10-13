let slideIndex = 1;
let slideIntervalId = null;

function goToSlide(cardSlideShow, n) {
    const slides = cardSlideShow.getElementsByClassName("slideshow-slide");
    const dots = document.getElementById('cardSlideShowDots').getElementsByClassName("dot");

    clearInterval(slideIntervalId);

    Array.from(slides).forEach(slide => {
        slide.style.display = "none";
        slide.classList.remove("fade-out", "fade-in");
    });
    Array.from(dots).forEach(dot => {
        dot.classList.remove("active");
    });

    slideIndex = (n > slides.length) ? 1 : (n < 1) ? slides.length : n;

    dots[slideIndex - 1].classList.add("active");
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.add("fade-in");

    slideIntervalId = setInterval(function() {
        slideIndex++;
        showSlides(slideIndex, slides, dots, false);
    }, 3000);
}

function showSlides(n, slides, dots, isInitialLoad) {
    slideIndex = (n > slides.length) ? 1 : (n < 1) ? slides.length : n;

    Array.from(slides).forEach(slide => {
        if (slide.style.display === "block") {
            slide.classList.remove("fade-in");
            slide.classList.add("fade-out");
            setTimeout(() => slide.style.display = "none", 800);
        }
    });
    Array.from(dots).forEach(dot => {
        dot.classList.remove("active");
    });

    dots[slideIndex - 1].classList.add("active");

    if (isInitialLoad) {
        slides[slideIndex - 1].style.display = "block";
    } else {
        slides[slideIndex - 1].classList.remove("fade-out");
        slides[slideIndex - 1].classList.add("fade-in");
        setTimeout(() => slides[slideIndex - 1].style.display = "block", 800);
    }
}

function startSlideShow(cardSlideShow, initialSlideIndex) {
    const slides = cardSlideShow.getElementsByClassName("slideshow-slide");
    const dots = document.getElementById('cardSlideShowDots').getElementsByClassName("dot");

    slideIndex = initialSlideIndex;

    showSlides(slideIndex, slides, dots, true);

    slideIntervalId = setInterval(function() {
        slideIndex++;
        showSlides(slideIndex, slides, dots, false); // Use fade-in for subsequent slides
    }, 3000);

    return slideIntervalId;
}
