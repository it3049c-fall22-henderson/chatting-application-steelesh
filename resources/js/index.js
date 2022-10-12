const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;
const MILLISECONDS_IN_TEN_SECONDS = 10000;

updateMessages();
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);

function updateMessagesInChatBox(){
  updateMessages();
}

function fetchMessages() {
    return fetch(serverURL)
        .then( response => response.json())
}

function formatMessage(message, myNameInput) {
    const time = new Date(message.timestamp);
    const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

    if (myNameInput === message.sender) {
        return `
        <div class="mine messages">
            <div class="message">
                ${message.text}
            </div>
            <div class="sender-info">
                ${formattedTime}
            </div>
        </div>
        `
    } else {
        return `
            <div class="yours messages">
                <div class="message">
                    ${message.text}
                </div>
                <div class="sender-info">
                    ${message.sender} ${formattedTime}
                </div>
            </div>
        `
    }
}

async function updateMessages() {
  // Fetch Messages
  const messages = await fetchMessages();
  // Loop over the messages
  let formattedMessages = "";
    messages.forEach(message => {
        formattedMessages += formatMessage(message, nameInput.value);
    });
    chatBox.innerHTML = formattedMessages;
}

function sendMessages(username, text) {
    const newMessage = {
        sender: username,
        text: text,
        timestamp: new Date()
    }

    fetch (serverURL, {
        method: `POST`, 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMessage)
    });
}

sendButton.addEventListener("click", function(sendButtonClickEvent) {
    sendButtonClickEvent.preventDefault();
    const sender = nameInput.value;
    const message = myMessage.value;

    sendMessages(sender,message);
    myMessage.value = "";
});
// Disable the message input until a name is provided and saved to the localStorage
if(localStorage.getItem("Name") != null){
    myMessage.disabled = false;
    sendButton.disabled = false;
}
else{
    myMessage.disabled = true;
    sendButton.disabled = true;
}
// Have a button where users can choose to save their username
saveButton.addEventListener("click", function(saveButtonClickEveny){
    localStorage.setItem("Name", nameInput.value)
});