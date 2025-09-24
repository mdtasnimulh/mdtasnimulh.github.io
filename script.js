function navlinksAnimation() {
    var navlinks = document.querySelectorAll('header nav.main_nav div.nav_links a');
    
    navlinks.forEach(function(link) {
        var underline = link.querySelector(".underline");

        link.addEventListener("mouseenter", function() {
            gsap.to(link, {
                y: -8,
                duration: 0.5
            });
            gsap.to(underline, {
                width: "100%", duration: 0.5, ease:"power2.out"
            })
        });

        link.addEventListener("mouseleave", function() {
            gsap.to(link, {
                y: 0,
                duration: 0.5
            });
            gsap.to(underline, {
                width: "0%", duration: 0.5, ease:"power2.out"
            })
        });
    });
}

document.querySelector(".logo").addEventListener("click", function() {
    window.open("http://github.com/mdtasnimulh", "_blank")
})

function colorChangeHeroText() {
    var Passion1 = document.querySelector(".hero_box .passion_1 a");
    var Passion2 = document.querySelector(".hero_box .passion_2 a");
    var Passion1Outline = document.querySelector(".hero_box .passion_1_outline a");
    var Passion2Outline = document.querySelector(".hero_box .passion_2_outline");

    Passion2.addEventListener("mouseenter", function() {
        Passion1.style.color = "transparent";
        Passion2.style.color = "#191919";
        Passion1Outline.style.display = "none";
        Passion2Outline.style.display = "flex";
    })

    Passion2.addEventListener("mouseleave", function() {
        Passion1.style.color = "#191919";
        Passion2.style.color = "transparent";
        Passion1Outline.style.display = "block";
        Passion2Outline.style.display = "none";
    })
}

function heroImageAnimation() {
    var heroImage = document.querySelector(".herobox_image img");
    window.addEventListener("mousemove", function(e) {
        heroImage.style.left = 1 - e.clientX * 0.02 + "px";
        heroImage.style.top = 1 - e.clientY * 0.02 + "px";
    })
}

navlinksAnimation();
colorChangeHeroText();
heroImageAnimation();