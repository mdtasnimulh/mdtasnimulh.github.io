function codeSnippetDropdown() {
    const button = document.getElementById('dropdownButton');
    const menu = document.getElementById('dropdownMenu');
    const buttonText = document.getElementById('buttonText');

    let isOpen = false;

    button.addEventListener('click', (e) => {
        e.stopPropagation();

        if (!isOpen) {
            menu.classList.remove('hidden', 'dropdown-slide-up');
            menu.classList.add('dropdown-slide-down');
            isOpen = true;
        } else {
            menu.classList.remove('dropdown-slide-down');
            menu.classList.add('dropdown-slide-up');
            setTimeout(() => menu.classList.add('hidden'), 200);
            isOpen = false;
        }
    });

    document.addEventListener('click', (event) => {
        if (!button.contains(event.target) && !menu.contains(event.target)) {
            if (isOpen) {
                menu.classList.remove('dropdown-slide-down');
                menu.classList.add('dropdown-slide-up');
                setTimeout(() => menu.classList.add('hidden'), 200);
                isOpen = false;
            }
        }
    });

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            buttonText.innerText = item.innerText;

            menu.classList.remove('dropdown-slide-down');
            menu.classList.add('dropdown-slide-up');
            setTimeout(() => menu.classList.add('hidden'), 200);
            isOpen = false;
        });
    });
}

let currentSplit = null;

function resetSplit() {
    if (currentSplit) {
        currentSplit.revert();
        currentSplit = null;
    }
}

function codeSnippetAnimation() {
    resetSplit();
    currentSplit = SplitText.create(".bg-gray-900 p", { type: "lines" });

    gsap.from(currentSplit.lines, {
        duration: 0.5,
        y: 50,
        autoAlpha: 0,
        stagger: 0.2,
    });
}

function codeSnippetAnimationForCodeButton() {
    const codeBtn = document.querySelector(".main_about_git_code_btn");

    codeBtn.addEventListener("click", function () {
        resetSplit();
        currentSplit = SplitText.create(".bg-gray-900 p", { type: "words, chars" });

        gsap.from(currentSplit.chars, {
            duration: 0.1,
            y: 100,
            autoAlpha: 0,
            stagger: 0.05
        });
    });
}

function codeSnippetAnimationForBlameButton() {
    const blameBtn = document.querySelector(".main_about_git_blame_btn");

    blameBtn.addEventListener("click", function () {
        resetSplit();
        currentSplit = SplitText.create(".bg-gray-900 p", { type: "words" }); // only words for blame

        gsap.from(currentSplit.words, {
            duration: 0.5,
            y: 100,
            autoAlpha: 0,
            stagger: 0.05,
            ease: "power3.out"
        });
    });
}

const SLIDE_COUNT = 4;
const AUTO_SCROLL_INTERVAL = 4000;
const ANIMATION_DURATION = 0.8;

const track = document.getElementById('slider-track');
const tabs = document.querySelectorAll('.tab-indicator');
const tabControls = document.getElementById('tab-controls');
const sliderBg = document.getElementById('tab-slider-bg');

let currentSlide = 0;
let autoScrollTimer;
let tabPositions = [];

function initializeTabSlider() {
    const controlsRect = tabControls.getBoundingClientRect();

    tabs.forEach((tab, index) => {
        const rect = tab.getBoundingClientRect();
        const x = rect.left - controlsRect.left;

        tabPositions.push({
            x: x,
            width: rect.width
        });
    });

    if (tabPositions.length > 0) {
        gsap.set(sliderBg, {
            x: tabPositions[0].x - 4,
            width: tabPositions[0].width
        });
    }
}

function updateTabs() {
    tabs.forEach((tab, index) => {
        const isActive = index === currentSlide;

        tab.classList.toggle('text-white/80', !isActive);
        tab.classList.toggle('hover:text-white', !isActive);
        tab.classList.toggle('text-black', isActive);
    });
}

function goToSlide(index) {
    if (index >= SLIDE_COUNT) {
        index = 0;
    } else if (index < 0) {
        index = SLIDE_COUNT - 1;
    }

    currentSlide = index;

    const xPercent = -currentSlide * (100 / SLIDE_COUNT);
    gsap.to(track, {
        x: `${xPercent}%`,
        duration: ANIMATION_DURATION,
        ease: "power2.out"
    });

    const target = tabPositions[currentSlide];

    gsap.to(sliderBg, {
        x: target.x - 4,
        width: target.width,
        duration: ANIMATION_DURATION * 0.7,
        ease: "power2.out"
    });

    updateTabs();
    resetAutoScroll();
}

function resetAutoScroll() {
    clearInterval(autoScrollTimer);
    autoScrollTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, AUTO_SCROLL_INTERVAL);
}

window.onload = function () {
    initializeTabSlider();

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const targetButton = e.target.closest('.tab-indicator');
            if (targetButton) {
                const index = parseInt(targetButton.dataset.slide);
                goToSlide(index);
            }
        });
    });

    goToSlide(0);
    console.log("GSAP Slider initialized with sliding tab background.");
}

window.addEventListener("DOMContentLoaded", () => {

});

codeSnippetDropdown();
codeSnippetAnimation();
codeSnippetAnimationForCodeButton();
codeSnippetAnimationForBlameButton();