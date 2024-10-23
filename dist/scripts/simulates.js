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
class Simulates {
    constructor() {
        var _a;
        this.simulates = [];
        this.simulatesArea = document.querySelector('.simulates-area');
        this.inputSearch = document.getElementById('search');
        this.getAllSimulates();
        (_a = this.inputSearch) === null || _a === void 0 ? void 0 : _a.addEventListener("change", (event) => {
            // @ts-ignore
            const valueNow = event.target.value;
            if (!valueNow) {
                this.simulatesArea !== null && (this.simulatesArea.innerHTML = "");
                this.getAllSimulates();
                return;
            }
            this.simulates = this.simulates.filter((simulate) => simulate.name.toLowerCase().trim() === valueNow.toLowerCase().trim());
            this.simulatesArea !== null && (this.simulatesArea.innerHTML = "");
            this.renderSimulates();
        });
    }
    getAllSimulates() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fetch('https://estuda-ai-api.onrender.com/simulates/all');
                const response = yield data.json();
                this.simulates = response;
                this.renderSimulates();
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    renderSimulates() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.simulates.length > 0) {
                this.simulates.forEach((simulate) => {
                    var _a;
                    const { id, about, coverUrl, name, questiosCount } = simulate;
                    const div = document.createElement('div');
                    div.classList.add("bg-black", "cursor-pointer", "hover:bg-black/80", "w-full", "p-6", "rounded-2xl", "flex", "flex-col", "justify-between", "gap-5");
                    div.innerHTML = `
                    <section class="flex flex-col gap-3">
                        <header class="flex justify-between">
                        <img
                            src="${coverUrl}"
                            class="rounded-xl"
                            width="42px"
                            height="42px"
                            alt=""
                        />
                        <div
                            class="bg-violet-400 w-[80px] h-[24px] p-1 flex justify-center items-center rounded-xl"
                        >
                            <span class="text-white font-bold text-sm">${about === About.EXATAS ? 'Exatas' : 'Humanas'}</span>
                        </div>
                        </header>

                        <span class="text-white font-bold text-2xl"
                        >${name}</span
                        >
                    </section>

                    <section class="flex gap-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8f8f8f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-text"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="M8 11h8"/><path d="M8 7h6"/></svg>

                        <div class="flex flex-col">
                        <span class="text-white/80">Questões</span>
                        <span class="font-semibold text-white">${questiosCount}</span>
                        </div>
                    </section>
                `;
                    const baseUrl = window.location.origin;
                    const fullUrl = `${baseUrl}/simulado.html?id=${id}`;
                    div.addEventListener('click', () => {
                        window.open(fullUrl, '_blank');
                    });
                    (_a = this.simulatesArea) === null || _a === void 0 ? void 0 : _a.appendChild(div);
                });
            }
        });
    }
}
window.document.addEventListener("DOMContentLoaded", () => {
    new Simulates();
});
