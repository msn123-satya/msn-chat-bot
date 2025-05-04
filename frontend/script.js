document.addEventListener("DOMContentLoaded", () => {
    let chatbox = document.getElementById("chatbox");

    async function sendMessage() {
        let userMessage = document.getElementById("userInput").value;

        if (!userMessage.trim()) {
            alert("Please enter a message.");
            return;
        }

        // Display user message
        let userBubble = document.createElement("div");
        userBubble.classList.add("message", "user");
        userBubble.innerText = userMessage;
        chatbox.appendChild(userBubble);

        document.getElementById("userInput").value = ""; // Clear input field

        // Scroll to bottom
        chatbox.scrollTop = chatbox.scrollHeight;

        try {
            let response = await fetch("http://127.0.0.1:8000/chat/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: userMessage })
            });

            if (response.ok) {
                let data = await response.json();

                let botMessage = document.createElement("div");
                botMessage.classList.add("message", "bot");

                // Convert Markdown response to formatted HTML
                botMessage.innerHTML = marked.parse(data.reply);

                chatbox.appendChild(botMessage);

                // Add copy buttons to code blocks
                addCopyButtonsToCodeBlocks();

            } else {
                let errorBubble = document.createElement("div");
                errorBubble.classList.add("message", "bot");
                errorBubble.innerText = "Error: " + response.status;
                chatbox.appendChild(errorBubble);
            }
        } catch (error) {
            let errorBubble = document.createElement("div");
            errorBubble.classList.add("message", "bot");
            errorBubble.innerText = "Server not responding.";
            chatbox.appendChild(errorBubble);
        }

        // Scroll to bottom
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    function addCopyButtonsToCodeBlocks() {
        let codeBlocks = document.querySelectorAll("pre code"); // Select all code blocks

        codeBlocks.forEach((block) => {
            let copyBtn = document.createElement("button");
            copyBtn.classList.add("copy-btn");
            copyBtn.innerText = "📋"; // Small icon instead of text
            copyBtn.onclick = () => copyToClipboard(block.innerText);

            // Add button inside the code block
            let preElement = block.closest("pre");
            preElement.style.position = "relative"; // Required for absolute positioning
            preElement.appendChild(copyBtn);
        });
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert("Code copied to clipboard!");
        }).catch(err => {
            alert("Failed to copy text.");
        });
    }

    function copyFullResponse() {
        let chatbox = document.getElementById("chatbox");
        let fullText = chatbox.innerText;
        navigator.clipboard.writeText(fullText).then(() => {
            alert("Full chat copied!");
        }).catch(err => {
            alert("Failed to copy chat.");
        });
    }

    // Event listener for "Enter" key to send message
    document.getElementById("userInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });

    // Attach sendMessage to button click
    document.querySelector("button").addEventListener("click", sendMessage);
});
