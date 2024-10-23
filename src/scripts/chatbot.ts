interface HttpResponse {
    message: string,
    prompt: string
}

interface MessageStorage {
    message: string,
    isBot: boolean
}

class Chatbot {
    public inputUser = document.getElementById("inpt-chat") as HTMLInputElement;
    public sendButton = document.querySelector(".send-button") as HTMLButtonElement;
    public messagesArea = document.querySelector(".messages-area") as HTMLDivElement;
    public helpArea = document.querySelector(".help-area") as HTMLDivElement;

    constructor() {
        this.init();
        this.loadMessages();
        this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
    }
    
    public async init() {
        this.sendButton?.addEventListener("click", this.handleSendMessage);
        this.inputUser?.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                this.handleSendMessage();
            }
        })
    }

    public handleSendMessage = async () => {
        if (this.inputUser?.value === "") {
            ToastService.showToastAlert("Por favor, digite sua pergunta!");
            return;
        }
    
        if (this.inputUser?.value.length < 3) {
            ToastService.showToastAlert("Sua pergunta tem que ter pelo menos 3 caracteres");
            return;
        }
    
        this.helpArea.classList.add("hidden");
    
        this.addStudentMessageInLocalStorage();
        
        this.addStudentMessage();
    
        const messageElementLoading = this.generateLoadingMessage();
        
        try {
            const request = await fetch("https://estuda-ai-api.onrender.com/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: this.inputUser?.value
                })
            })
    
            this.cleanInput();
            
            const response = await request.json() as HttpResponse;
    
            messageElementLoading.remove();
            this.addBotMessage(response.message);
            this.addBotMessageInLocalStorage(response.message);
        } catch (error) {
            if (error instanceof TypeError) {
                console.error("Erro interno ao fazer requisição", error);
                messageElementLoading.remove();
                ToastService.showToastAlert("Erro interno");
                this.cleanInput();
            }
    
            console.log(error);
        }
    }

    public addStudentMessage() {
        const div = document.createElement("div");
        div.classList.add("client-message");

        const span = document.createElement("span");
        span.classList.add("text-white");
        span.textContent = this.inputUser?.value;

        div.appendChild(span);

        this.messagesArea.appendChild(div);

        this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
    }

    public addBotMessage(message: string) {
        const div = document.createElement("div");
        div.classList.add("bot-message");

        const span = document.createElement("span");
        span.classList.add("text-white");
        span.innerHTML = message;

        div.appendChild(span);

        this.messagesArea.appendChild(div);

        this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
    }

    public cleanInput() {
        this.inputUser.value = "";
    }

    public generateLoadingMessage() {
        const div = document.createElement("div");
        div.classList.add("bot-message");
        div.classList.add("animate-pulse");

        const span = document.createElement("span");
        span.classList.add("text-white");
        span.textContent = "Gerando resposta...";

        div.appendChild(span);

        this.messagesArea.appendChild(div);

        this.messagesArea.scrollTop = this.messagesArea.scrollHeight;

        return div;
    }

    public addStudentMessageInLocalStorage() {
        const studentMessageObject: MessageStorage = {
            message: this.inputUser?.value,
            isBot: false
        }
        
        let getLocalStorage: MessageStorage[] = JSON.parse(localStorage.getItem("@estuda.ai-chatbot/message") || '[]');

        getLocalStorage.push(studentMessageObject);

        localStorage.setItem("@estuda.ai-chatbot/message", JSON.stringify(getLocalStorage));
    }

    public addBotMessageInLocalStorage(message: string) {
        const botMessageObject: MessageStorage = {
            message,
            isBot: true
        }

        let getLocalStorage: MessageStorage[] = JSON.parse(localStorage.getItem("@estuda.ai-chatbot/message") || '[]');

        getLocalStorage.push(botMessageObject);

        localStorage.setItem("@estuda.ai-chatbot/message", JSON.stringify(getLocalStorage));
    }

    public loadMessages() {
        const getLocalStorage = localStorage.getItem("@estuda.ai-chatbot/message");

        if (getLocalStorage !== null) {
            this.helpArea.classList.add("hidden");
            const messages: MessageStorage[] = JSON.parse(getLocalStorage);

            messages.forEach((message) => {
                const div = document.createElement("div");
                const span = document.createElement("span");

                span.textContent = message.message;
                span.classList.add("text-white");

                div.appendChild(span);

                message.isBot ? div.classList.add("bot-message") : div.classList.add("client-message");

                this.messagesArea.appendChild(div);
            })
        }
    }
}

class ToastService {
    public static showToastAlert(message: string) {
        const toast = document.createElement("div");
        toast.classList.add("toast");
        toast.classList.add("shadow-lg");
        toast.classList.add("border");
        toast.classList.add("border-[#080808]");
        
        const i = document.createElement("i");
        i.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
        i.classList.add("text-red-600");
        toast.appendChild(i);
        
        const span = document.createElement("span");
        span.classList.add("text-red-600");
        span.textContent = message;
        toast.appendChild(span);
        
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000)
    }
}

window.document.addEventListener("DOMContentLoaded", () => {
    new Chatbot();
})