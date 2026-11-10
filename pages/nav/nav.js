// function animateCursor() {
//     var main = document.querySelector("#main");
//     var cursor = document.querySelector("#cursor");

//     main.addEventListener("mousemove", function (dets) {
//         gsap.to(cursor, {
//             x: dets.x,
//             y: dets.y,
//             xPercent: -50,
//             yPercent: -50,
//             duration: 0.4,
//             ease: "power3.out"
//         });
//     });

//     main.addEventListener("mouseover", function (element) {
//         if (window.getComputedStyle(element.target).cursor === 'pointer') {
//             gsap.to(cursor, {
//                 scale: 2,
//                 backgroundColor: "transparent",
//                 border: "1px solid black",
//                 boxShadow: "0 0 15px rgba(0,0,0,0.3)",
//                 duration: 0.3
//             });
//         } else if (element.target.nodeType === Node.TEXT_NODE ||
//             (element.target.nodeType === Node.ELEMENT_NODE && element.target.textContent.trim() !== '')) {
//             gsap.to(cursor, {
//                 scale: 0.25,
//                 backgroundColor: "black",
//                 border: "0px solid transparent",
//                 boxShadow: "0 0 0px rgba(0,0,0,0)",
//                 duration: 0.3
//             });
//         } else {
//             gsap.to(cursor, {
//                 scale: 1,
//                 backgroundColor: "black",
//                 border: "0px solid transparent",
//                 boxShadow: "0 0 0px rgba(0,0,0,0)",
//                 duration: 0.3
//             });
//         }
//     });

//     main.addEventListener("click", function () {
//         let ripple = document.createElement("div");
//         ripple.classList.add("ripple");
//         cursor.appendChild(ripple);

//         gsap.fromTo(ripple,
//             { scale: 1, opacity: 1 },
//             {
//                 scale: 2, opacity: 0, duration: 0.6, ease: "power2.out",
//                 onComplete: () => ripple.remove()
//             }
//         );
//     });
// }

// function navlinksAnimation() {
//     var navlinks = document.querySelectorAll('header nav.main_nav div.nav_links a');

//     navlinks.forEach(function (link) {
//         var underline = link.querySelector(".underline");

//         link.addEventListener("mouseenter", function () {
//             gsap.to(link, {
//                 y: -8,
//                 duration: 0.5
//             });
//             gsap.to(underline, {
//                 width: "100%", duration: 0.5, ease: "power2.out"
//             })
//         });

//         link.addEventListener("mouseleave", function () {
//             gsap.to(link, {
//                 y: 0,
//                 duration: 0.5
//             });
//             gsap.to(underline, {
//                 width: "0%", duration: 0.5, ease: "power2.out"
//             })
//         });
//     });
// }

(function () {
    const navBar = document.querySelector(".main_nav");
    if (!navBar) return;

    const navContent = navBar.querySelector(".nav-content");
    const desktopLinks = navBar.querySelectorAll(".nav-items a");
    const emailLink = navBar.querySelector(".hello-me a");
    const mobileNavQuery = window.matchMedia("(max-width: 1099px)");

    // ---- Mobile / tablet menu, built from the desktop links so they never drift apart ----
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "nav-toggle";
    toggle.setAttribute("aria-label", "Toggle navigation menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "nav-menu");
    toggle.innerHTML = '<span class="bars" aria-hidden="true"><span></span><span></span><span></span></span>';

    const menu = document.createElement("nav");
    menu.className = "nav-menu";
    menu.id = "nav-menu";
    menu.setAttribute("aria-label", "Main");

    desktopLinks.forEach(function (link) {
        const a = document.createElement("a");
        a.href = link.getAttribute("href");
        a.textContent = link.textContent.trim();
        if (link.classList.contains("active")) {
            a.classList.add("active");
            a.setAttribute("aria-current", "page");
        }
        menu.appendChild(a);
    });

    if (emailLink) {
        const a = document.createElement("a");
        a.href = emailLink.getAttribute("href");
        a.textContent = emailLink.textContent.trim();
        a.className = "nav-menu-contact";
        menu.appendChild(a);
    }

    if (navContent) navContent.appendChild(toggle);
    navBar.appendChild(menu);

    function setMenu(open) {
        navBar.classList.toggle("menu-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        if (open) navBar.classList.remove("hide-nav");
    }

    function isMenuOpen() {
        return navBar.classList.contains("menu-open");
    }

    toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        setMenu(!isMenuOpen());
    });

    menu.addEventListener("click", function (e) {
        if (e.target.closest("a")) setMenu(false);
    });

    document.addEventListener("click", function (e) {
        if (isMenuOpen() && !navBar.contains(e.target)) setMenu(false);
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setMenu(false);
    });

    mobileNavQuery.addEventListener("change", function (e) {
        if (!e.matches) setMenu(false);
    });

    // ---- Hide the bar while scrolling down, show it again on the way up ----
    let lastScrollTop = 0;

    window.addEventListener("scroll", function () {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (isMenuOpen()) {
            setMenu(false);
        } else if (Math.abs(currentScroll - lastScrollTop) > 6) {
            navBar.classList.toggle("hide-nav", currentScroll > lastScrollTop);
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });

    // ---- Logo opens the GitHub profile (single place, instead of one copy per page) ----
    const logo = navBar.querySelector(".nav-logo");
    if (logo) {
        logo.addEventListener("click", function () {
            window.open("https://github.com/mdtasnimulh", "_blank", "noopener");
        });
    }

    // ---- Custom cursor only appears once a real mouse moves ----
    const cursor = document.getElementById("cursor");
    if (cursor) {
        window.addEventListener("mousemove", function () {
            cursor.classList.add("is-active");
        }, { once: true });
    }
})();
