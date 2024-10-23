"use strict";
class Navbar {
    constructor() {
        this.path = window.location.pathname;
        this.pathname = this.path.substring(this.path.lastIndexOf('/') + 1).split(".")[0];
        this.navItems = document.querySelectorAll(".nav-item");
        this.init();
    }
    init() {
        this.navItems.forEach((nav) => {
            nav.classList.remove("nav-item-active");
            if (nav.getAttribute("data-page") === this.pathname) {
                nav.classList.add("nav-item-area-active");
            }
        });
    }
}
window.document.addEventListener("DOMContentLoaded", () => {
    new Navbar();
});
