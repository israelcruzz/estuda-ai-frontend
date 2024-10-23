class Navbar {
    public path = window.location.pathname;
    public pathname = this.path.substring(this.path.lastIndexOf('/') + 1).split(".")[0];
    public navItems = document.querySelectorAll(".nav-item");

    constructor() {
        this.init();
    }

    public init() {
        this.navItems.forEach((nav) => {
            nav.classList.remove("nav-item-active");
            
            if (nav.getAttribute("data-page") === this.pathname) {
                nav.classList.add("nav-item-area-active");
            }
        })
    }
}

window.document.addEventListener("DOMContentLoaded", () => {
    new Navbar();
})