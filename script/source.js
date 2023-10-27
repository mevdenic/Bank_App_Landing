"use strict";

///////////////////////////////////////
// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const openModal = (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

//SMOOTH SCROLL
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const section2 = document.querySelector("#section--2");
const section3 = document.querySelector("#section--3");
const sectionSignUp = document.querySelector(".section--sign-up");
btnScrollTo.addEventListener("click", (e) => {
    section1.scrollIntoView({
        behavior: "smooth",
    });
});

//TABBED COMPONENTs

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
tabsContainer.addEventListener("click", (e) => {
    e.preventDefault();
    const clicked = e.target.closest(".operations__tab");
    //guard clause
    if (!clicked) return;
    //active tab
    tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
    clicked.classList.add("operations__tab--active");

    //active content area
    tabsContent.forEach((tab) =>
        tab.classList.remove("operations__content--active")
    );
    document
        .querySelector(
            `.operations__content--${clicked.getAttribute("data-tab")}`
        )
        .classList.add("operations__content--active");
});

//Menu fade animation
const fadeFunc = (e, opacity) => {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = link
            .closest(".nav__links")
            .querySelectorAll(".nav__link");
        const logo = link.closest(".nav").querySelector("img");
        siblings.forEach((el) => {
            if (el !== link) el.style.opacity = opacity;
        });
        logo.style.opacity = opacity;
    }
};
const nav = document.querySelector(".nav");
nav.addEventListener("mouseover", (e) => fadeFunc(e, 0.5));
nav.addEventListener("mouseout", (e) => fadeFunc(e, 1));

//STICKY NAVIGATION: SCROLL
const header = document.querySelector(".header");
const stickyNav = (entries) => {
    const [entry] = entries;
    // console.log(entry);
    entry.isIntersecting === false
        ? nav.classList.add("sticky")
        : nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${nav.offsetHeight}px`,
});
headerObserver.observe(header);

//REVEALING SECTIONS ON SCROLL

const allSections = document.querySelectorAll(".section");
const revealSection = (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});
allSections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
});

//LAZY LOADING IMAGES

const lazyImgs = document.querySelectorAll(".lazy-img");
const revealImg = (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.getAttribute("data-src");
    entry.target.addEventListener("load", () =>
        entry.target.classList.remove("lazy-img")
    );
    observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(revealImg, {
    root: null,
    threshold: 0.8,
});
lazyImgs.forEach((img) => {
    imgObserver.observe(img);
});

//SLIDER COMPONENT

const sliderFunc = () => {
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector(".slider__btn--left");
    const btnRight = document.querySelector(".slider__btn--right");
    const dotContainer = document.querySelector(".dots");
    const createDots = () => {
        slides.forEach((_, i) => {
            dotContainer.insertAdjacentHTML(
                "beforeend",
                `<button class="dot" data-slide="${i}"></button>`
            );
        });
    };
    createDots();
    const dotActive = (currSlide) => {
        document.querySelectorAll(".dot").forEach((dot) => {
            dot.classList.remove("dot--active");
        });
        document
            .querySelector(`.dot[data-slide="${currSlide}"]`)
            .classList.add("dot--active");
    };
    const goToSlide = (currSlide) => {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${(i - currSlide) * 100}%)`;
            dotActive(currSlide);
        });
    };
    goToSlide(0);
    let currSlide = 0;
    const nextSlide = () => {
        currSlide++;
        if (currSlide > slides.length - 1) currSlide = 0; //2
        goToSlide(currSlide);
    };
    const prevSlide = () => {
        currSlide--;
        if (currSlide < 0) currSlide = slides.length - 1; //2
        goToSlide(currSlide);
    };
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);
    document.addEventListener("keydown", (e) => {
        // console.log(e);
        if (e.key === "ArrowLeft") prevSlide();
        else if (e.key === "ArrowRight") nextSlide();
    });
    dotContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("dot")) {
            const slide = Number(e.target.getAttribute("data-slide"));
            goToSlide(slide);
        }
    });
};
sliderFunc();
