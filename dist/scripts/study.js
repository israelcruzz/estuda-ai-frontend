"use strict";
class Study {
    constructor() {
        this.cardNow = null;
        this.cards = document.querySelectorAll(".card");
        this.columns = document.querySelectorAll(".column");
        this.columns.forEach((column) => {
            column.addEventListener("dragover", this.dragOver.bind(this));
            column.addEventListener("drop", this.drop.bind(this));
            column.addEventListener("dblclick", this.createCard.bind(this));
        });
        this.cards.forEach((card) => {
            card.addEventListener("dragstart", this.dragStart.bind(this));
        });
    }
    dragOver(event) {
        event.preventDefault();
    }
    dragStart(event) {
        var _a;
        this.cardNow = event.target;
        (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", "");
        console.log(this.cardNow);
    }
    drop(event) {
        event.preventDefault();
        const target = event.target;
        // @ts-ignore
        target.append(this.cardNow);
        this.cardNow = null;
    }
    createCard(event) {
        const card = document.createElement("div");
        card.draggable = true;
        card.classList.add("card");
        card.classList.add("bg-black");
        card.classList.add("border");
        card.classList.add("border-white/10");
        card.classList.add("drop-shadow-xl");
        card.classList.add("p-4");
        card.classList.add("rounded-lg");
        card.classList.add("mb-4");
        card.contentEditable = "true";
        card.addEventListener("focusout", () => {
            card.contentEditable = "false";
            if (!card.textContent)
                card.remove();
        });
        card.addEventListener("dragstart", this.dragStart.bind(this));
        // @ts-ignore
        event.target.append(card);
        card.focus();
    }
}
window.addEventListener("DOMContentLoaded", () => {
    new Study();
});
