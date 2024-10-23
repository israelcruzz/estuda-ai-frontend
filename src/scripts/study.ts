class Study {
    private cards: NodeListOf<HTMLElement>;
    private columns: NodeListOf<HTMLElement>;
    private cardNow: HTMLElement | null = null;

    constructor() {
        this.cards = document.querySelectorAll(".card") as NodeListOf<HTMLElement>;
        this.columns = document.querySelectorAll(".column") as NodeListOf<HTMLElement>;

        this.columns.forEach((column) => {
            column.addEventListener("dragover", this.dragOver.bind(this)); 
            column.addEventListener("drop", this.drop.bind(this));
            column.addEventListener("dblclick", this.createCard.bind(this));
        });

        this.cards.forEach((card) => {
            card.addEventListener("dragstart", this.dragStart.bind(this));
        });
    }

    dragOver(event: DragEvent) {
        event.preventDefault();
    }

    dragStart(event: DragEvent) {
        this.cardNow = event.target as HTMLElement;
        event.dataTransfer?.setData("text/plain", "");
        console.log(this.cardNow);
    }

    drop(event: DragEvent) {
        event.preventDefault(); 
        const target = event.target as HTMLElement;

        // @ts-ignore
        target.append(this.cardNow);
        this.cardNow = null; 
    }

    createCard(event: MouseEvent) {
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
            if(!card.textContent) card.remove();
        })

        card.addEventListener("dragstart", this.dragStart.bind(this));

        // @ts-ignore
        event.target.append(card);
        card.focus();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    new Study();
});
