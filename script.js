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