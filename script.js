document.addEventListener("DOMContentLoaded", () => {

    // ========================
    // ScrollSpy init (Bootstrap 5)
    // ========================
    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: "#scroll-spy",
        offset: 70
    });

    // ========================
    // Adjust body padding for last section
    // ========================
    function adjustPadding() {
        const howto = document.querySelector("#howto");
        if (!howto) return;

        const height = howto.offsetHeight;
        const windowHeight = window.innerHeight;
        const navHeight = document.querySelector("nav.navbar")?.offsetHeight || 0;

        // Combined height of all next siblings
        const siblings = document.querySelectorAll("#howto ~ *");
        let siblingHeight = 0;
        siblings.forEach(el => siblingHeight += el.offsetHeight);

        if (height < windowHeight) {
            document.body.style.paddingBottom =
                (windowHeight - navHeight - height - siblingHeight) + "px";
        }
    }

    adjustPadding();
    window.addEventListener("resize", adjustPadding);

    // ========================
    // Smooth scroll + focus highlight
    // ========================
    document.querySelectorAll("nav.navbar a, .scrollTop").forEach(link => {
        link.addEventListener("click", (event) => {
            if (link.hash !== "") {
                event.preventDefault();
                const hash = link.hash;
                const target = document.querySelector(hash);
                if (!target) return;

                // Highlight section briefly
                document.querySelectorAll("section").forEach(sec => sec.classList.remove("focus"));
                target.classList.add("focus");
                setTimeout(() => target.classList.remove("focus"), 2000);

                // Smooth scroll
                window.scrollTo({
                    top: target.offsetTop - 69,
                    behavior: "smooth"
                });

                // Collapse navbar (mobile)
                const navbarCollapse = document.querySelector(".navbar-collapse");
                if (navbarCollapse) {
                    const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse)
                        || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                    collapseInstance.hide();
                }
            }
        });
    });

    // ========================
    // Navbar color + ScrollTop visibility
    // ========================
    window.addEventListener("scroll", () => {
        const scrollPos = window.scrollY;
        const navbar = document.querySelector(".navbar");
        const scrollBtn = document.querySelector(".scrollTop");

        if (scrollPos > 0) {
            navbar?.classList.add("show-color");
            scrollBtn?.classList.add("show-button");
        } else {
            navbar?.classList.remove("show-color");
            scrollBtn?.classList.remove("show-button");
        }
    });

	window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden"); // fade out
    setTimeout(() => loader.style.display = "none", 500); // remove after fade
});

});
