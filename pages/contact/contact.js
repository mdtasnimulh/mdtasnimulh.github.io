// If the animation libraries failed to load, leave everything visible instead of hidden
if (typeof gsap === "undefined" || typeof SplitText === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Animation libraries unavailable; showing static page");
} else {
    document.documentElement.classList.add("js");
}

document.addEventListener("DOMContentLoaded", () => {
    if (!document.documentElement.classList.contains("js")) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Same smooth scrolling as the other pages
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // ---- Custom cursor (same behaviour as the other pages) ----
    function animateCursor() {
        if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

        const main = document.querySelector("#main");
        const cursor = document.querySelector("#cursor");

        main.addEventListener("mousemove", (dets) => {
            gsap.to(cursor, { x: dets.x, y: dets.y, xPercent: -50, yPercent: -50, duration: 0.4, ease: "power3.out" });
        });

        main.addEventListener("mouseover", (e) => {
            if (window.getComputedStyle(e.target).cursor === "pointer") {
                gsap.to(cursor, { scale: 2, backgroundColor: "transparent", border: "1px solid black", boxShadow: "0 0 15px rgba(0,0,0,0.3)", duration: 0.3 });
            } else if (e.target.nodeType === Node.ELEMENT_NODE && e.target.textContent.trim() !== "") {
                gsap.to(cursor, { scale: 0.25, backgroundColor: "black", border: "0px solid transparent", boxShadow: "0 0 0px rgba(0,0,0,0)", duration: 0.3 });
            } else {
                gsap.to(cursor, { scale: 1, backgroundColor: "black", border: "0px solid transparent", boxShadow: "0 0 0px rgba(0,0,0,0)", duration: 0.3 });
            }
        });

        main.addEventListener("click", () => {
            const ripple = document.createElement("div");
            ripple.classList.add("ripple");
            cursor.appendChild(ripple);
            gsap.fromTo(ripple, { scale: 1, opacity: 1 }, { scale: 2, opacity: 0, duration: 0.6, ease: "power2.out", onComplete: () => ripple.remove() });
        });
    }

    // ---- Headline: words slide up line by line (SplitText, like the About page) ----
    function headlineAnimation() {
        const title = document.getElementById("contactTitle");
        const split = SplitText.create(title, { type: "lines", mask: "lines", linesClass: "title_line" });
        gsap.from(split.lines, { yPercent: 110, duration: 0.9, ease: "power4.out", stagger: 0.12, delay: 0.2 });
        gsap.from(".title_pill", { scale: 0, duration: 0.7, ease: "back.out(2)", delay: 0.8 });
        gsap.from(".sparkle", { scale: 0, rotation: -180, duration: 1, ease: "power3.out", delay: 1 });
    }

    // ---- Sections and cards fade/slide up as they scroll into view ----
    function scrollReveals() {
        gsap.utils.toArray(".reveal").forEach((el, i) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: (i % 2) * 0.08,
                scrollTrigger: { trigger: el, start: "top 90%", once: true }
            });
        });
    }

    // ---- Service chips ----
    function chips() {
        const chipEls = document.querySelectorAll("#serviceChips .chip");
        chipEls.forEach((chip) => {
            chip.addEventListener("click", () => {
                const on = !chip.classList.contains("active");
                chip.classList.toggle("active", on);
                chip.setAttribute("aria-pressed", String(on));
                gsap.fromTo(chip, { scale: 0.92 }, { scale: 1, duration: 0.4, ease: "back.out(3)" });
            });
        });
    }

    // ---- Auto-growing message box ----
    function autoGrow() {
        const ta = document.getElementById("message");
        const fit = () => { ta.style.height = "auto"; ta.style.height = ta.scrollHeight + "px"; };
        ta.addEventListener("input", fit);
        fit();
    }

    // ---- Form: validate, then open the visitor's mail app with everything filled in ----
    function form() {
        const formEl = document.getElementById("contactForm");
        const status = document.getElementById("formStatus");
        const TO = "mdtasnimulh@gmail.com";

        function setError(id, msg) {
            const input = document.getElementById(id);
            input.closest(".field").classList.toggle("invalid", !!msg);
            formEl.querySelector('.error[data-for="' + id + '"]').textContent = msg;
        }

        formEl.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const budget = document.getElementById("budget").value;
            const message = document.getElementById("message").value.trim();
            const services = [...document.querySelectorAll("#serviceChips .chip.active")].map((c) => c.textContent);

            setError("fullName", name ? "" : "Please enter your name");
            setError("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Please enter a valid email address");
            if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                status.style.color = "#e5484d";
                status.textContent = "";
                return;
            }

            const subject = "Project enquiry from " + name;
            const body =
                "Name: " + name + "\n" +
                "Email: " + email + "\n" +
                "Services: " + (services.join(", ") || "-") + "\n" +
                "Budget: " + budget + "\n\n" +
                (message || "");

            status.style.color = "#3d7a00";
            status.textContent = "Opening your email app to send the message...";
            window.location.href = "mailto:" + TO + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        });
    }

    animateCursor();
    headlineAnimation();
    scrollReveals();
    chips();
    autoGrow();
    form();
    document.getElementById("year").textContent = new Date().getFullYear();
});
