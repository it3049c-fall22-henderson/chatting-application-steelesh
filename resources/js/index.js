const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;

function updateMessagesInChatBox() {
  // Fetch Messages
  fetchMessages();
  // Loop over the messages

}

function fetchMessages() {
    return fetch(serverURL)
        .then( response => response.json())
}