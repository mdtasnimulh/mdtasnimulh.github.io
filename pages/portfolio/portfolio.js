document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

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

    const teamSection = document.querySelector(".team");
    const teamMembers = gsap.utils.toArray(".team-member");
    const teamMemberCards = gsap.utils.toArray(".team-member-card");

    let cardPlaceholderEntrance = null;
    let cardSlideInAnimation = null;

    function initTeamAnimations() {
        if (window.innerWidth < 1000) {
            if (cardPlaceholderEntrance) cardPlaceholderEntrance.kill();
            if (cardSlideInAnimation) cardSlideInAnimation.kill();

            teamMembers.forEach((member) => {
                gsap.set(member, { clearProps: "all" });
                const teamMemberInitial = member.querySelector(
                    ".team-member-name-initial h1"
                );
                gsap.set(teamMemberInitial, { clearProps: "all" });
            });

            teamMemberCards.forEach((card) => {
                gsap.set(card, { clearProps: "all" });
            });

            return;
        }

        if (cardPlaceholderEntrance) cardPlaceholderEntrance.kill();
        if (cardSlideInAnimation) cardSlideInAnimation.kill();

        cardPlaceholderEntrance = ScrollTrigger.create({
            trigger: teamSection,
            start: "top bottom",
            end: "top top",
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;

                teamMembers.forEach((member, index) => {
                    const entranceDelay = 0.15;
                    const entranceDuration = 0.7;
                    const entranceStart = index * entranceDelay;
                    const entranceEnd = entranceStart + entranceDuration;

                    if (progress >= entranceStart && progress <= entranceEnd) {
                        const memberEntranceProgress = (progress - entranceStart) / entranceDuration;
                        const entranceY = 125 - memberEntranceProgress * 125;
                        gsap.set(member, { y: `${entranceY}%` });
                        const teamMemberInitial = member.querySelector(".team-member-name-initial h1");
                        const initialLetterScaleDelay = 0.4;
                        const initialLetterScaleProgress = Math.max(
                            0,
                            (memberEntranceProgress - initialLetterScaleDelay) / (1 - initialLetterScaleDelay)
                        );
                        gsap.set(teamMemberInitial, { scale: initialLetterScaleProgress });
                    } else if (progress > entranceEnd) {
                        gsap.set(member, { y: `0%` });
                        const teamMemberInitial = member.querySelector(".team-member-name-initial h1");
                        gsap.set(teamMemberInitial, { scale: 1 });
                    }
                });
            }
        });

        cardSlideInAnimation = ScrollTrigger.create({
            trigger: teamSection,
            start: "top top",
            end: `+=${window.innerHeight * 3}`,
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                teamMemberCards.forEach((card, index) => {
                    const slideInStagger = 0.075;
                    const xRotationDuration = 0.4;
                    const xRotationStart = index * slideInStagger;
                    const xRotationEnd = xRotationStart + xRotationDuration;
                    if (progress >= xRotationStart && progress <= xRotationEnd) {
                        const cardProgress = (progress - xRotationStart) / xRotationDuration;
                        const cardInitialX = 300 - index * 100;
                        const cardTargetX = -50;
                        const cardSlideInX = cardInitialX + cardProgress * (cardTargetX - cardInitialX);
                        const cardSlideInRotation = 20 - cardProgress * 20;
                        gsap.set(card, {
                            x: `${cardSlideInX}%`,
                            rotation: cardSlideInRotation,
                        });
                    } else if (progress > xRotationEnd) {
                        gsap.set(card, {
                            x: `-50%`,
                            rotation: 0,
                        });
                    }

                    const cardScaleStagger = 0.12;
                    const cardScaleStart = 0.4 + index * cardScaleStagger;
                    const cardScaleEnd = 1;

                    if (progress >= cardScaleStart && progress <= cardScaleEnd) {
                        const scaleProgress = (progress - cardScaleStart) / (cardScaleEnd - cardScaleStart);
                        const scaleValue = 0.75 + scaleProgress * 0.25;
                        gsap.set(card, {
                            scale: scaleValue,
                        });
                    } else if (progress > cardScaleEnd) {
                        gsap.set(card, {
                            scale: 1,
                        });
                    }


                });
            }
        });
    };

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initTeamAnimations();
            ScrollTrigger.refresh();
        }, 250);
    });

    animateCursor();
    initTeamAnimations();

    //https://stiff.madebybuzzworthy.com/ reference site
});