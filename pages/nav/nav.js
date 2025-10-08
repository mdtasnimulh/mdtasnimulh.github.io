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

animateCursor();
//navlinksAnimation();