"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var About;
(function (About) {
    // @ts-ignore
    About["EXATAS"] = "EXATAS";
    // @ts-ignore
    About["HUMANAS"] = "HUMANAS";
})(About || (About = {}));
class Simulate {
    constructor() {
        this.params = new URLSearchParams(window.location.search);
        this.id = this.params.get("id");
        this.simulate = null;
        this.areaSimulate = {
            headingText: document.querySelector(".heading-text"),
            videosUrl: document.querySelector(".videos-area"),
            helpContent: document.querySelector(".help-content"),
            btnSimulate: document.getElementById("btn-simulate"),
        };
        this.getSimulate();
    }
    getSimulate() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield fetch(`https://estuda-ai-api.onrender.com/simulates/${this.id}`);
            const response = yield data.json();
            this.simulate = response;
            this.renderSimulate();
        });
    }
    renderSimulate() {
        if (this.simulate !== null) {
            this.areaSimulate.headingText.textContent = this.simulate.name;
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
                `;
            });
            this.simulate.helpVideosUrl.forEach(video => {
                this.areaSimulate.videosUrl.innerHTML += `
                    <iframe class="rounded-2xl w-full" id="video" class="iframe" src="https://www.youtube.com/embed/42-1ax1MPoU?si=tln40acgXPr291DK" allowfullscreen></iframe>
                `;
            });
            this.areaSimulate.btnSimulate.addEventListener("click", () => { var _a; return window.open((_a = this.simulate) === null || _a === void 0 ? void 0 : _a.formsUrl, "_blank"); });
        }
    }
}
window.document.addEventListener("DOMContentLoaded", () => {
    new Simulate();
});
