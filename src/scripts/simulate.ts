
interface Theme {
    name: string;
    content: string;
}

enum About {
    // @ts-ignore
    EXATAS = 'EXATAS',
    // @ts-ignore
    HUMANAS = 'HUMANAS'
}

interface AboutContent {
    themes: Theme[];
}

interface Simulates {
    id: string;
    name: string;
    about: About;
    coverUrl: string;
    questiosCount: number;
    formsUrl: string;
    helpVideosUrl: string[];
    aboutContent: AboutContent;
}
class Simulate {
    private params = new URLSearchParams(window.location.search);
    private id = this.params.get("id");
    private simulate: Simulates | null = null;

    private areaSimulate = {
        headingText: document.querySelector(".heading-text") as HTMLSpanElement,
        videosUrl: document.querySelector(".videos-area") as HTMLDivElement,
        helpContent: document.querySelector(".help-content") as HTMLDivElement,
        btnSimulate: document.getElementById("btn-simulate") as HTMLButtonElement,
        headingArea: document.querySelector(".heading-area") as HTMLDivElement,
    }

    constructor() {
        this.getSimulate();
    }

    public async getSimulate() {
        const data = await fetch(`https://estuda-ai-api.onrender.com/simulates/${this.id}`);
        const response = await data.json();

        this.simulate = response;

        this.renderSimulate();
    }

    public renderSimulate() {
        if (this.simulate !== null) {
            this.areaSimulate.headingText.textContent = this.simulate.name;

            this.areaSimulate.headingArea.innerHTML += `
                    <section class="flex gap-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8f8f8f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-text"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="M8 11h8"/><path d="M8 7h6"/></svg>

                        <div class="flex flex-col">
                        <span class="text-white/80">Questões</span>
                        <span class="font-semibold text-white">${this.simulate.questiosCount}</span>
                        </div>
                    </section>
            `

            this.simulate.aboutContent.themes.forEach(theme => {
                this.areaSimulate.helpContent.innerHTML += `
                    <div class="bg-black max-h-[200px] h-[100px] px-6 w-full rounded-3xl flex items-center">
                        <div class="flex gap-6 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
                            <div>
                                <h3 class="text-white font-bold text-sm md:text-base">${theme.name}</h3>
                                <span class="text-slate-300 text-lg md:text-base">${theme.content}</span>
                            </div>
                        </div>
                    </div>
                `
            })

            this.simulate.helpVideosUrl.forEach(video => {
                this.areaSimulate.videosUrl.innerHTML += `
                    <iframe class="rounded-2xl w-full" id="video" class="iframe" src="https://www.youtube.com/embed/42-1ax1MPoU?si=tln40acgXPr291DK" allowfullscreen></iframe>
                `
            })

            this.areaSimulate.btnSimulate.addEventListener("click", () => window.open(this.simulate?.formsUrl, "_blank"));
        }
    }
}

window.document.addEventListener("DOMContentLoaded", () => {
    new Simulate();
});
