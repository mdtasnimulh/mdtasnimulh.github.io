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

window.addEventListener("DOMContentLoaded", () => {

});

animateCursor();
colorChangeHeroText();
heroImageAnimation();