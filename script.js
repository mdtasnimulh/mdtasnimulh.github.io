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

navlinksAnimation();
