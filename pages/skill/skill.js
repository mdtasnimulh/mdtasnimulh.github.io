document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const animeTextParagraphs = document.querySelectorAll(".anime-text p");
    const wordHighlightBgColor = "110, 110, 110";

    const keywords = [
        "vibrant",
        "living",
        "clarity",
        "expression",
        "shape",
        "intuitive",
        "storytelling",
        "interactive",
        "vision",
        "kotlin", "dart", "python", "react", "native", "flutter", "xml", "jetpack", "compose",
        "multiplatform", "kmp", "(cmp)", "html", "css", "javascript", "tailwind",
        "sql", "sqlite", "room", "sqldelight", "firebase", "firestore", "authentication", "realtime", "database",
        "figma", "adobe", "illustrator", "android", "studio", "vs", "code", "xcode", "wordd", "excel", "powerpoint"
    ];

    animeTextParagraphs.forEach((paragraph) => {
        const text = paragraph.textContent;
        const words = text.split(/\s+/);
        paragraph.innerHTML = "";

        words.forEach((word) => {
            if (word.trim()) {
                const wordContainer = document.createElement("div");
                wordContainer.className = "word";

                const wordText = document.createElement("span");
                wordText.textContent = word;

                const normalizedWord = word.toLowerCase().replace(/[.,!?;:]/g, "");
                if (keywords.includes(normalizedWord)) {
                    wordContainer.classList.add("keyword-wrapper");
                    wordText.classList.add("keyword", normalizedWord);
                }

                wordContainer.appendChild(wordText);
                paragraph.appendChild(wordContainer);
            }
        });
    });

    const animeTextContainers = document.querySelectorAll(".anime-text-container");

    animeTextContainers.forEach((container) => {
        ScrollTrigger.create({
            trigger: container,
            pin: container,
            start: "top top",
            end: `+=${window.innerHeight * 4}`,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const words = Array.from(
                    container.querySelectorAll(".anime-text .word")
                );
                const totalWords = words.length;
                words.forEach((word, index) => {
                    const wordText = word.querySelector("span");

                    if (progress <= 0.7) {
                        const progressTarget = 0.7;
                        const revealProgress = Math.min(1, progress / progressTarget);

                        const overlapWords = 15;
                        const totalAnimationLength = 1 + overlapWords / totalWords;

                        const wordStart = index / totalWords;
                        const wordEnd = wordStart + overlapWords / totalWords;

                        const timelineScale =
                            1 /
                            Math.min(
                                totalAnimationLength,
                                1 + (totalWords - 1) / totalWords + overlapWords / totalWords
                            );

                        const adjustedStart = wordStart * timelineScale;
                        const adjustedEnd = wordEnd * timelineScale;
                        const duration = adjustedEnd - adjustedStart;

                        const wordProgress =
                            revealProgress <= adjustedStart
                                ? 0
                                : revealProgress >= adjustedEnd
                                    ? 1
                                    : (revealProgress - adjustedStart) / duration;

                        word.style.opacity = wordProgress;

                        const backgroundFadeStart =
                            wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
                        const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
                        word.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${backgroundOpacity})`;

                        const textRevealThreshold = 0.9;
                        const textRevealProgress =
                            wordProgress >= textRevealThreshold
                                ? (wordProgress - textRevealThreshold) / (1 - textRevealThreshold)
                                : 0;
                        wordText.style.opacity = Math.pow(textRevealProgress, 0.5);
                    } else {
                        const reverseProgress = (progress - 0.7) / 0.3;
                        word.style.opacity = 1;
                        const targetTextOpacity = 1;

                        const reverseOverlapWords = 5;
                        const reverseWordStart = index / totalWords;
                        const reverseWordEnd = reverseWordStart + reverseOverlapWords / totalWords;

                        const reverseTimelineScale =
                            1 /
                            Math.max(
                                1,
                                (totalWords - 1) / totalWords + reverseOverlapWords / totalWords
                            );

                        const reverseAdjustedStart = reverseWordStart * reverseTimelineScale;
                        const reverseAdjustedEnd = reverseWordEnd * reverseTimelineScale;
                        const reverseDuration = reverseAdjustedEnd - reverseAdjustedStart;

                        const reverseWordProgress =
                            reverseProgress <= reverseAdjustedStart
                                ? 0
                                : reverseProgress >= reverseAdjustedEnd
                                    ? 1
                                    : (reverseProgress - reverseAdjustedStart) / reverseDuration;

                        if (reverseWordProgress < 0) {
                            wordText.style.opacity = targetTextOpacity * (1 - reverseWordProgress);
                            word.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${reverseWordProgress})`;
                        } else {
                            wordText.style.opacity = targetTextOpacity;
                            word.style.backgroundColor = `rgba(${wordHighlightBgColor}, 0)`;
                        }
                    }
                });
            },
        });
    });

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

    document.querySelector(".nav-logo").addEventListener("click", function () {
        window.open("http://github.com/mdtasnimulh", "_blank")
    })

    animateCursor();
});