class Chatbot {
    constructor() {
        this.responses = {
            "hello": ["Hello there!", "Hi there! How can I help you today?"],
            "how are you": ["I'm doing well, thanks for asking!", "Pretty good, thanks! And you?"],
            "bye": ["Goodbye! Talk to you later!", "Bye! Have a great day!"]
        };
        this.loadResponses();
    }

    loadResponses() {
        const savedResponses = localStorage.getItem('chatbotResponses');
        if (savedResponses) {
            this.responses = JSON.parse(savedResponses);
        }
    }

    saveResponses() {
        localStorage.setItem('chatbotResponses', JSON.stringify(this.responses));
    }

    updateChatlog(message) {
        const chatlog = document.getElementById('chatlog');
        chatlog.value += message + "\n";
        chatlog.scrollTop = chatlog.scrollHeight;
    }

    sendChat(userInput) {
        this.updateChatlog("You: " + userInput);
        const botResponse = this.generateResponse(userInput);
        this.updateChatlog("Bot: " + botResponse);
        document.getElementById('userinput').value = '';
    }

    generateResponse(input) {
        input = input.toLowerCase();
        for (const key in this.responses) {
            if (input.includes(key)) {
                const responses = this.responses[key];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        return "Sorry, I didn't understand that.";
    }

    addResponse(keyword, newResponse) {
        if (!this.responses[keyword]) {
            this.responses[keyword] = [];
        }
        this.responses[keyword].push(newResponse);
        this.saveResponses();
    }
}

const chatbot = new Chatbot();

document.getElementById('sendButton').addEventListener('click', () => {
    const userText = document.getElementById('userinput').value.trim();
    if (userText !== "") {
        chatbot.sendChat(userText);
    }
});
