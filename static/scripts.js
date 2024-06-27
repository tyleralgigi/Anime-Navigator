// document.getElementById('chat-form').onsubmit = function(e) {
//     e.preventDefault();
//     let userInput = document.getElementById('user-input').value;
//     document.getElementById('loading-spinner').style.display = 'block'; // Show spinner
//     fetch('/chat', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({message: userInput})
//     })
//     .then(response => response.json())
//     .then(data => {
//         let chatContainer = document.getElementById('chat-container');
//         let userDiv = `<div class='user-message'>${userInput}</div>`;
//         let iconPath = document.getElementById('config').getAttribute('data-icon-path'); // Get the icon path
//         let aiDiv = `<div class='ai-message'><img src="${iconPath}" alt="Bot" class="chat-icon">${data.response}</div>`;
//         chatContainer.innerHTML += userDiv + aiDiv;
//         document.getElementById('user-input').value = ''; // clear input
//         chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to the latest message
//         document.getElementById('loading-spinner').style.display = 'none'; // Hide spinner
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         document.getElementById('loading-spinner').style.display = 'none'; // Hide spinner on error too
//     });
// };

document.getElementById('chat-form').onsubmit = function(e) {
    const sendButton = document.getElementById('send-button');
    sendButton.disabled = true; // Disable the send button if empty
    
    e.preventDefault();
    let userInput = document.getElementById('user-input').value;
    let chatContainer = document.getElementById('chat-container');
    let userDiv = `<div class='user-message'> ${userInput}</div>`;
    chatContainer.innerHTML += userDiv; // Append user message immediately
    document.getElementById('user-input').value = ''; // Clear input field

    // Display typing indicator
    let iconPath = document.getElementById('config').getAttribute('data-icon-path');
    // let typingIndicator = `<div class='ai-message'><img src="${iconPath}" alt="Bot" class="chat-icon"><span class="typing-dots"></span></div>`;
    let typingIndicator = `<div class='ai-message'><img src="${iconPath}" alt="Bot" class="chat-icon"><span class="typing-dots"></span></div>`;
    chatContainer.innerHTML += typingIndicator;
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to the latest message

    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: userInput})
    })
    .then(response => response.json())
    .then(data => {
        // Initialize a showdown converter
        // let converter = new showdown.Converter();
        // let html = converter.makeHtml(data.response);
        // console.log(html);
        // Remove typing indicator
        chatContainer.removeChild(chatContainer.lastChild);
        let aiDiv = `<div class='ai-message'><img src="${iconPath}" alt="Bot" class="chat-icon"><span style="white-space: pre-line">${data.response}</span></div>`;
        chatContainer.innerHTML += aiDiv;
        chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to the latest message

    })
    .catch(error => {
        console.error('Error:', error);
        // Remove typing indicator in case of error
        chatContainer.removeChild(chatContainer.lastChild);
    });
};



