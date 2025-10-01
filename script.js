function navlinksAnimation() {
    var navlinks = document.querySelectorAll('header nav.main_nav div.nav_links a');

    navlinks.forEach(function (link) {
        var underline = link.querySelector(".underline");

        link.addEventListener("mouseenter", function () {
            gsap.to(link, {
                y: -8,
                duration: 0.5
            });
            gsap.to(underline, {
                width: "100%", duration: 0.5, ease: "power2.out"
            })
        });

        link.addEventListener("mouseleave", function () {
            gsap.to(link, {
                y: 0,
                duration: 0.5
            });
            gsap.to(underline, {
                width: "0%", duration: 0.5, ease: "power2.out"
            })
        });
    });
}

document.querySelector(".logo").addEventListener("click", function () {
    window.open("http://github.com/mdtasnimulh", "_blank")
})

function colorChangeHeroText() {
    var Passion1 = document.querySelector(".hero_box .passion_1 a");
    var Passion2 = document.querySelector(".hero_box .passion_2 a");
    var Passion1Outline = document.querySelector(".hero_box .passion_1_outline a");
    var Passion2Outline = document.querySelector(".hero_box .passion_2_outline");

    Passion2.addEventListener("mouseenter", function () {
        Passion1.style.color = "transparent";
        Passion2.style.color = "#191919";
        Passion1Outline.style.display = "none";
        Passion2Outline.style.display = "flex";
    })

    Passion2.addEventListener("mouseleave", function () {
        Passion1.style.color = "#191919";
        Passion2.style.color = "transparent";
        Passion1Outline.style.display = "block";
        Passion2Outline.style.display = "none";
    })
}

function heroImageAnimation() {
    var heroImage = document.querySelector(".herobox_image img");
    window.addEventListener("mousemove", function (e) {
        heroImage.style.left = 1 - e.clientX * 0.02 + "px";
        heroImage.style.top = 1 - e.clientY * 0.02 + "px";
    })
}

function animateCursor() {
    var main = document.querySelector("#main");
    var tabContainer = document.querySelector("#tabs-container");
    var cursor = document.querySelector("#cursor");

    main.addEventListener("mousemove", function (dets) {
        gsap.to(cursor, {
            x: dets.x,
            y: dets.y,
            xPercent: -50,
            yPercent: -50,
            duration: 0.4,
            ease: "power3.out"
        });
    });

    main.addEventListener("mouseover", function (element) {
        if (window.getComputedStyle(element.target).cursor === 'pointer') {
            gsap.to(cursor, {
                scale: 2,
                backgroundColor: "transparent",
                border: "1px solid black",
                boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                duration: 0.3
            });
        } else if (element.target.nodeType === Node.TEXT_NODE ||
            (element.target.nodeType === Node.ELEMENT_NODE && element.target.textContent.trim() !== '')) {
            gsap.to(cursor, {
                scale: 0.25,
                backgroundColor: "black",
                border: "0px solid transparent",
                boxShadow: "0 0 0px rgba(0,0,0,0)",
                duration: 0.3
            });
        } else {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: "black",
                border: "0px solid transparent",
                boxShadow: "0 0 0px rgba(0,0,0,0)",
                duration: 0.3
            });
        }
    });

    main.addEventListener("click", function () {
        let ripple = document.createElement("div");
        ripple.classList.add("ripple");
        cursor.appendChild(ripple);

        gsap.fromTo(ripple,
            { scale: 1, opacity: 1 },
            {
                scale: 2, opacity: 0, duration: 0.6, ease: "power2.out",
                onComplete: () => ripple.remove()
            }
        );
    });
}

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

let currentSplit = null; // keep track of the active SplitText

function resetSplit() {
    if (currentSplit) {
        currentSplit.revert(); // put DOM back to original state
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

// Configuration
const SLIDE_COUNT = 4;
const AUTO_SCROLL_INTERVAL = 4000; // 4 seconds
const ANIMATION_DURATION = 0.8; // GSAP animation duration in seconds

// DOM elements
const track = document.getElementById('slider-track');
const tabs = document.querySelectorAll('.tab-indicator');
const tabControls = document.getElementById('tab-controls');
const sliderBg = document.getElementById('tab-slider-bg');

let currentSlide = 0;
let autoScrollTimer;
let tabPositions = []; // To store pre-calculated {x, width} for smooth animation

/**
 * Calculates the position and width of each tab relative to its parent container.
 * This is essential for the smooth sliding background effect.
 */
function initializeTabSlider() {
    // Must wait for DOM elements to fully render for accurate measurements
    const controlsRect = tabControls.getBoundingClientRect();

    // The buttons are direct children of #tab-controls
    tabs.forEach((tab, index) => {
        const rect = tab.getBoundingClientRect();

        // Calculate the relative X position: tab.left - controls.left
        // The value '4' compensates for the initial 'top-1 left-1' (4px) offset of the sliderBg
        // We use the first button's position as a baseline reference.
        const x = rect.left - controlsRect.left;

        tabPositions.push({
            x: x,
            width: rect.width
        });
    });

    // The sliderBg is positioned with top-1 left-1 (4px offset)
    if (tabPositions.length > 0) {
        // Set initial state for the slider background
        gsap.set(sliderBg, {
            x: tabPositions[0].x - 4, // Initial position adjustment for left-1 (4px)
            width: tabPositions[0].width
        });
    }
}

/**
 * Updates the UI to reflect the current active slide (controls text color).
 */
function updateTabs() {
    tabs.forEach((tab, index) => {
        const isActive = index === currentSlide;

        // Inactive tabs: white text
        tab.classList.toggle('text-white/80', !isActive);
        tab.classList.toggle('hover:text-white', !isActive);

        // Active tab: black text (over white slider)
        tab.classList.toggle('text-black', isActive);
    });
}

/**
 * Animates the slider track and the tab background to the specified slide index using GSAP.
 * @param {number} index - The index of the slide to move to (0 to 3).
 */
function goToSlide(index) {
    // Ensure index wraps around if necessary
    if (index >= SLIDE_COUNT) {
        index = 0;
    } else if (index < 0) {
        index = SLIDE_COUNT - 1;
    }

    currentSlide = index;

    // --- 1. Image Track Animation ---
    const xPercent = -currentSlide * (100 / SLIDE_COUNT);
    gsap.to(track, {
        x: `${xPercent}%`,
        duration: ANIMATION_DURATION,
        ease: "power2.out"
    });

    // --- 2. Tab Slider Background Animation (Sliding effect) ---
    const target = tabPositions[currentSlide];

    // Animate the X position and width of the sliding background
    gsap.to(sliderBg, {
        x: target.x - 4, // 4px offset for the parent's p-1 (4px)
        width: target.width,
        duration: ANIMATION_DURATION * 0.7, // Slightly faster tab animation for responsiveness
        ease: "power2.out"
    });

    updateTabs();
    resetAutoScroll();
}

/**
 * Resets and restarts the auto-scroll timer.
 */
function resetAutoScroll() {
    clearInterval(autoScrollTimer);
    autoScrollTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, AUTO_SCROLL_INTERVAL);
}

// --- Initialization ---

window.onload = function () {
    // 1. Calculate and store tab positions before starting any animation
    initializeTabSlider();

    // 2. Add click listeners to the navigation tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const targetButton = e.target.closest('.tab-indicator');
            if (targetButton) {
                const index = parseInt(targetButton.dataset.slide);
                goToSlide(index);
            }
        });
    });

    // 3. Start the slider at slide 0 and kick off auto-scroll
    goToSlide(0);
    console.log("GSAP Slider initialized with sliding tab background.");
}

// Run automatically after DOM is ready
window.addEventListener("DOMContentLoaded", () => {

});

navlinksAnimation();
colorChangeHeroText();
heroImageAnimation();
animateCursor();
codeSnippetDropdown();
codeSnippetAnimation();
codeSnippetAnimationForCodeButton();
codeSnippetAnimationForBlameButton();