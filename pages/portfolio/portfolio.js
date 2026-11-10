/* =====================================================================
   PROJECTS  -  edit this list to change what the page shows.

   For every app, put 6 to 10 screenshots in the images folder and list
   them in `images` (src + a short caption). The page adapts to however
   many you list. Right now they all use the demo placeholder images.

   Example:
     images: [
       { src: "../../images/portfolio/melodiq/home.png",   caption: "Home" },
       { src: "../../images/portfolio/melodiq/player.png", caption: "Now playing" },
     ]
   ===================================================================== */
const PLACEHOLDERS = [
    "../../images/demo_img_1.png",
    "../../images/demo_img_2.png",
    "../../images/demo_img_3.png"
];

function placeholderShots(name, count) {
    return Array.from({ length: count }, (_, i) => ({
        src: PLACEHOLDERS[i % PLACEHOLDERS.length],
        caption: name + " · screen " + String(i + 1).padStart(2, "0")
    }));
}

const PROJECTS = [
    {
        id: "melodiq",
        name: "MelodiQ",
        kind: "Music Player · Android",
        tagline: "A music player built around the now-playing experience.",
        description: [
            "MelodiQ is an Android music player where the player screen is the star: a redesigned now-playing view, synced lyrics, a live audio visualizer and themes that change the whole look of the app.",
            "Lyrics follow the song line by line and can be translated to English on the spot, so you can enjoy music in any language."
        ],
        features: [
            "Redesigned player screen",
            "Synced lyrics with translate-to-English",
            "Audio visualizer",
            "Switchable themes",
            "Playback controls in the notification"
        ],
        tech: ["Kotlin", "Android"],
        images: placeholderShots("MelodiQ", 8)
    },
    {
        id: "quran-app",
        name: "Quran App",
        kind: "Quran & Islamic App · Android",
        tagline: "Quran, hadith, prayer times and daily tools in one app.",
        description: [
            "A complete Quran and Islamic companion built with Kotlin and Jetpack Compose. It brings the Quran with surah audio, an offline hadith library, accurate prayer times with adhan alarms, a qibla compass and a tasbih counter together in one place.",
            "Under the hood it is a multi-module app with a domain-driven design and Gradle convention plugins, so every feature stays isolated and easy to grow."
        ],
        features: [
            "Surah audio playback with ExoPlayer",
            "Offline hadith collection",
            "Prayer times with adhan alarms",
            "Qibla compass and tasbih counter",
            "Ayah bookmarks",
            "31-colour theming and switchable app icons"
        ],
        tech: ["Kotlin", "Jetpack Compose", "Multi-module", "DDD", "Hilt", "ExoPlayer"],
        images: placeholderShots("Quran App", 8)
    },
    {
        id: "nid-sdk",
        name: "NID eKYC SDK",
        kind: "Identity Verification SDK \u00b7 Android",
        tagline: "A drop-in SDK that verifies who your customers are.",
        description: [
            "An enterprise eKYC SDK I develop at Commlink. Banks and telecom companies add it to their own Android apps to verify customers digitally: scan the National ID card, read it with OCR, take a selfie and confirm the person is real and present.",
            "Partners integrate it with a small client-facing API that offers two modes: a quick ID scan only, or the full verification journey. The SDK handles the camera, the checks, the forms and the error cases, and matches each partner's branding."
        ],
        features: [
            "NID card scanning with OCR",
            "Selfie capture with liveness detection and face anti-spoofing",
            "Dynamic forms and file upload driven by the server",
            "English and Bangla language switching",
            "Partner-specific theming",
            "Encrypted on-device storage and resumable journeys",
            "Clear error handling across every step"
        ],
        tech: ["Java", "Android", "ML Kit", "TensorFlow Lite", "CameraX", "Tink", "Material Design"],
        images: placeholderShots("NID eKYC SDK", 8)
    }
];

/* ===================================================================== */

function esc(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function pad(n) {
    return String(n).padStart(2, "0");
}

function renderProjects() {
    const root = document.getElementById("projects");
    root.innerHTML = PROJECTS.map((p, i) => {
        if (p.images.length < 6 || p.images.length > 10) {
            console.warn(p.name + ": expected 6-10 screenshots, found " + p.images.length);
        }
        return `
        <section class="project" id="${esc(p.id)}">
            <div class="project_intro">
                <div class="project_meta">
                    <span class="project_idx">${pad(i + 1)}</span>
                    <span class="project_kind">( ${esc(p.kind)} )</span>
                </div>
                <h2 class="project_title">${esc(p.name)}</h2>
                <p class="project_tagline">${esc(p.tagline)}</p>

                <div class="project_cols">
                    <div class="project_about">
                        <h3>About</h3>
                        ${p.description.map((d) => `<p class="project_desc">${esc(d)}</p>`).join("")}
                        <div class="chips">${p.tech.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
                    </div>
                    <div class="project_features">
                        <h3>Key features</h3>
                        <ul class="features">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
                    </div>
                </div>
            </div>

            <div class="gallery" data-project="${i}">
                <div class="g_head">
                    <span class="g_name">${esc(p.name)} — Screens</span>
                    <span class="g_bar"><i></i></span>
                    <span class="g_count"><b>01</b> / ${pad(p.images.length)}</span>
                </div>
                <div class="g_viewport" data-lenis-prevent>
                    <div class="g_track">
                        ${p.images.map((img, j) => `
                        <figure class="shot">
                            <div class="shot_frame" data-index="${j}" tabindex="0" role="button"
                                aria-label="View ${esc(img.caption)} larger">
                                <img src="${esc(img.src)}" alt="${esc(img.caption)}" loading="lazy" draggable="false">
                            </div>
                            <figcaption>${esc(img.caption)}</figcaption>
                        </figure>`).join("")}
                    </div>
                </div>
            </div>
        </section>`;
    }).join("");
}

/* ---------- Lightbox: click a screenshot to view it larger ---------- */
function createLightbox(onOpen, onClose) {
    const box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML = `
        <button class="lb_btn lb_close" aria-label="Close">&times;</button>
        <button class="lb_btn lb_prev" aria-label="Previous">&#8592;</button>
        <img class="lb_img" alt="">
        <button class="lb_btn lb_next" aria-label="Next">&#8594;</button>
        <div class="lb_cap"></div>`;
    document.body.appendChild(box);

    const img = box.querySelector(".lb_img");
    const cap = box.querySelector(".lb_cap");
    let list = [];
    let idx = 0;

    function show() {
        const item = list[idx];
        img.src = item.src;
        img.alt = item.caption;
        cap.textContent = item.caption + "  (" + (idx + 1) + "/" + list.length + ")";
    }

    function step(d) {
        idx = (idx + d + list.length) % list.length;
        show();
    }

    function open(items, start) {
        list = items;
        idx = start;
        show();
        box.classList.add("open");
        requestAnimationFrame(() => box.classList.add("show"));
        onOpen();
    }

    function close() {
        if (!box.classList.contains("open")) return;
        box.classList.remove("show");
        setTimeout(() => box.classList.remove("open"), 300);
        onClose();
    }

    box.querySelector(".lb_close").addEventListener("click", close);
    box.querySelector(".lb_prev").addEventListener("click", () => step(-1));
    box.querySelector(".lb_next").addEventListener("click", () => step(1));
    box.addEventListener("click", (e) => { if (e.target === box) close(); });
    document.addEventListener("keydown", (e) => {
        if (!box.classList.contains("open")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
    });

    return { open };
}

renderProjects();

// If the animation libraries failed to load the page still works: just no scroll effects
const hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined" &&
    typeof SplitText !== "undefined" && typeof Lenis !== "undefined";

document.addEventListener("DOMContentLoaded", () => {
    let lenis = null;

    if (hasGsap) {
        gsap.registerPlugin(ScrollTrigger, SplitText);
        ScrollTrigger.config({ ignoreMobileResize: true }); // phone address bar must not restart the animation

        lenis = new Lenis();
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    }

    // ---- Lightbox wiring ----
    const lightbox = createLightbox(
        () => lenis && lenis.stop(),
        () => lenis && lenis.start()
    );

    document.querySelectorAll(".gallery").forEach((gal) => {
        const items = PROJECTS[Number(gal.dataset.project)].images;
        gal.querySelectorAll(".shot_frame").forEach((frame) => {
            const go = () => lightbox.open(items, Number(frame.dataset.index));
            frame.addEventListener("click", go);
            frame.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
            });
        });
    });

    if (!hasGsap) return;

    // ---- Custom cursor (same behaviour as the other pages, light colour for the dark page) ----
    function animateCursor() {
        if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

        const main = document.querySelector("#main");
        const cursor = document.querySelector("#cursor");
        const LIGHT = "#f2f5ea";

        main.addEventListener("mousemove", (dets) => {
            gsap.to(cursor, { x: dets.x, y: dets.y, xPercent: -50, yPercent: -50, duration: 0.4, ease: "power3.out" });
        });

        main.addEventListener("mouseover", (e) => {
            if (window.getComputedStyle(e.target).cursor === "pointer") {
                gsap.to(cursor, { scale: 2, backgroundColor: "transparent", border: "1px solid " + LIGHT, boxShadow: "0 0 15px rgba(242,245,234,0.3)", duration: 0.3 });
            } else if (e.target.nodeType === Node.ELEMENT_NODE && e.target.textContent.trim() !== "") {
                gsap.to(cursor, { scale: 0.25, backgroundColor: LIGHT, border: "0px solid transparent", boxShadow: "0 0 0px rgba(0,0,0,0)", duration: 0.3 });
            } else {
                gsap.to(cursor, { scale: 1, backgroundColor: LIGHT, border: "0px solid transparent", boxShadow: "0 0 0px rgba(0,0,0,0)", duration: 0.3 });
            }
        });

        main.addEventListener("click", () => {
            const ripple = document.createElement("div");
            ripple.classList.add("ripple");
            cursor.appendChild(ripple);
            gsap.fromTo(ripple, { scale: 1, opacity: 1 }, { scale: 2, opacity: 0, duration: 0.6, ease: "power2.out", onComplete: () => ripple.remove() });
        });
    }

    // ---- Hero / outro headline ----
    function headlines() {
        document.querySelectorAll(".hero h1, .outro h1").forEach((h) => {
            const split = SplitText.create(h, { type: "words", mask: "words" });
            gsap.from(split.words, {
                yPercent: 110, duration: 0.9, ease: "power4.out", stagger: 0.1,
                scrollTrigger: { trigger: h, start: "top 85%", once: true }
            });
        });
    }

    // ---- Project intro: title letters rise, details fade up (like the About page) ----
    function introAnimations() {
        document.querySelectorAll(".project").forEach((proj) => {
            const title = proj.querySelector(".project_title");
            const split = SplitText.create(title, { type: "chars", mask: "chars" });
            const tl = gsap.timeline({ scrollTrigger: { trigger: proj, start: "top 65%", once: true } });

            tl.from(proj.querySelectorAll(".project_meta, .project_tagline"), { y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" })
                .from(split.chars, { yPercent: 110, duration: 0.8, ease: "power4.out", stagger: 0.04 }, 0.05)
                .from(proj.querySelectorAll(".project_cols > div"), { y: 50, autoAlpha: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }, 0.4)
                .from(proj.querySelectorAll(".features li, .chip"), { x: -20, autoAlpha: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" }, 0.7);
        });
    }

    // ---- Gallery: pinned, scrolls sideways as you scroll down (swipeable row on small screens) ----
    function galleries() {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1001px)", () => {
            document.querySelectorAll(".gallery").forEach((gal) => {
                const track = gal.querySelector(".g_track");
                const bar = gal.querySelector(".g_bar i");
                const countEl = gal.querySelector(".g_count b");
                const total = gal.querySelectorAll(".shot").length;
                const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
                let shown = 1;

                gsap.to(track, {
                    x: () => -distance(),
                    ease: "none",
                    scrollTrigger: {
                        trigger: gal,
                        start: "top top",
                        end: () => "+=" + distance(),
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            gsap.set(bar, { scaleX: self.progress });
                            const n = Math.min(total, Math.round(self.progress * (total - 1)) + 1);
                            if (n !== shown) { shown = n; countEl.textContent = pad(n); }
                        }
                    }
                });

                gsap.from(gal.querySelectorAll(".shot"), {
                    y: 80, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: "power3.out",
                    scrollTrigger: { trigger: gal, start: "top 80%", once: true }
                });
            });
        });

        // On small screens the counter follows the native swipe position
        mm.add("(max-width: 1000px)", () => {
            const cleanups = [];
            document.querySelectorAll(".gallery").forEach((gal) => {
                const view = gal.querySelector(".g_viewport");
                const countEl = gal.querySelector(".g_count b");
                const shots = [...gal.querySelectorAll(".shot")];
                const onScroll = () => {
                    const mid = view.scrollLeft + view.clientWidth / 2;
                    let best = 0, bestD = Infinity;
                    shots.forEach((s, i) => {
                        const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid);
                        if (d < bestD) { bestD = d; best = i; }
                    });
                    countEl.textContent = pad(best + 1);
                };
                view.addEventListener("scroll", onScroll, { passive: true });
                cleanups.push(() => view.removeEventListener("scroll", onScroll));
            });
            return () => cleanups.forEach((fn) => fn());
        });
    }

    animateCursor();
    headlines();
    introAnimations();
    galleries();

    window.addEventListener("load", () => ScrollTrigger.refresh());
});
