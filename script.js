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
    })
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

// slider for about section with tab buttons
const SLIDE_COUNT = 4;
const AUTO_SCROLL_INTERVAL = 4000; // 4 seconds
const ANIMATION_DURATION = 0.8; // GSAP animation duration in seconds

// DOM elements
const track = document.getElementById('slider-track');
const tabs = document.querySelectorAll('.tab-indicator');

let currentSlide = 0;
let autoScrollTimer;

/**
 * Updates the UI to reflect the current active slide (blurred tab).
 */
function updateTabs() {
    tabs.forEach((tab, index) => {
        const isActive = index === currentSlide;

        // Inactive styles (Default blurred look)
        tab.classList.toggle('bg-white/30', !isActive);
        tab.classList.toggle('text-gray-800', !isActive);
        tab.classList.toggle('border-white/50', !isActive);
        tab.classList.toggle('shadow-none', !isActive);

        // Active styles (More opaque background, primary text color, shadow, and specific border)
        tab.classList.toggle('bg-white/90', isActive);
        tab.classList.toggle('text-blue-700', isActive);
        tab.classList.toggle('border-blue-400', isActive);
        tab.classList.toggle('shadow-xl', isActive);
    });
}

/**
 * Animates the slider track to the specified slide index using GSAP.
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

    // Calculate the translation percentage: Slide 0 is 0%, Slide 1 is -25%, etc.
    const xPercent = -currentSlide * (100 / SLIDE_COUNT);

    // GSAP animation
    gsap.to(track, {
        x: `${xPercent}%`, // Animate the X translation
        duration: ANIMATION_DURATION,
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

// 1. Add click listeners to the navigation tabs
tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        // Find the button element, even if the click lands on text inside
        const targetButton = e.target.closest('.tab-indicator');
        if (targetButton) {
            const index = parseInt(targetButton.dataset.slide);
            goToSlide(index);
        }
    });
});

// 2. Start the slider
window.onload = function () {
    // Initialize the first slide state (set currentSlide=0 and update UI)
    updateTabs();
    // Start the continuous auto-scroll
    resetAutoScroll();
    console.log("GSAP Slider initialized with blurred tabs and auto-scroll started.");
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