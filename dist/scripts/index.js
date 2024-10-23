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
var Period;
(function (Period) {
    Period["PRIMEIRO_SEMESTRE"] = "PRIMEIRO_SEMESTRE";
    Period["SEGUNDO_SEMESTRE"] = "SEGUNDO_SEMESTRE";
})(Period || (Period = {}));
var About;
(function (About) {
    // @ts-ignore
    About["EXATAS"] = "EXATAS";
    // @ts-ignore
    About["HUMANAS"] = "HUMANAS";
})(About || (About = {}));
class Index {
    constructor() {
        this.oldExamsArea = document.querySelector('.old-exams-area');
        this.oldExams = [];
        this.filterExams = document.querySelector('.filter-exams');
        this.fixedExams = [];
        this.simulates = [];
        this.simulatesArea = document.querySelector('.simulates-area');
        this.getOldExams();
        this.filterExamsByPeriod();
        this.getAllSimulates();
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
                    div.classList.add("bg-black", "cursor-pointer", "hover:bg-black/80", "w-full", "p-6", "rounded-2xl", "flex", "flex-col", "gap-5");
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
                    const fullUrl = `${baseUrl}/src/pages/simulado.html?id=${id}`;
                    div.addEventListener('click', () => {
                        window.open(fullUrl, '_blank');
                    });
                    (_a = this.simulatesArea) === null || _a === void 0 ? void 0 : _a.appendChild(div);
                });
            }
        });
    }
    filterExamsByPeriod() {
        var _a;
        (_a = this.filterExams) === null || _a === void 0 ? void 0 : _a.addEventListener("change", (event) => {
            // @ts-ignore
            const valueNow = event.target.value;
            if (valueNow === "all") {
                this.oldExamsArea !== null && (this.oldExamsArea.innerHTML = '');
                this.oldExams = this.fixedExams;
                this.renderOldExams();
                return;
            }
            const filterOldExamsByPeriod = this.fixedExams.filter((oldExam) => oldExam.name.split(" ")[1].split("/")[0] === valueNow);
            this.oldExamsArea !== null && (this.oldExamsArea.innerHTML = '');
            this.oldExams = filterOldExamsByPeriod;
            this.renderOldExams();
        });
    }
    getOldExams() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fetch('https://estuda-ai-api.onrender.com/all');
                const response = yield data.json();
                this.oldExams = response;
                this.fixedExams = response;
                this.renderOldExams();
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    renderOldExams() {
        if (this.oldExams.length > 0) {
            this.oldExams.forEach((oldExam) => {
                var _a;
                const { name, year, period, accessUrl } = oldExam;
                const div = document.createElement('div');
                div.classList.add('flex', 'justify-between', 'items-center', 'bg-black', 'rounded-xl', 'py-2', 'px-4');
                div.innerHTML = `
                <div class="flex items-center gap-4">
                  <div
                    class="bg-[#01FEB1] h-10 w-10 rounded-[8px] flex justify-center items-center font-semibold"
                  >
                    PA
                  </div>

                  <div class="flex flex-col">
                    <span class="text-white font-semibold text-xl">${name}</span>
                    <span class="text-[#B6B6B6]">${new Date(year).getFullYear()} - ${period === Period.PRIMEIRO_SEMESTRE ? '1 Semestre' : '2 Semestre'}</span>
                  </div>
                </div>

                <a href="${accessUrl}" target="_blank" rel="noopener noreferrer">
                  <button
                    class="bg-[#01FEB1] px-3 py-2 rounded-[8px] font-bold hover:bg-[#01FEB1]/80"
                  >
                    Acessar
                  </button>
                </a>
                `;
                (_a = this.oldExamsArea) === null || _a === void 0 ? void 0 : _a.appendChild(div);
            });
        }
    }
}
window.document.addEventListener("DOMContentLoaded", () => {
    new Index();
});
