const socket = io(); // connexion au serveur

const input = document.getElementById("input");
const messages = document.getElementById("messages");

function sendMessage() {
  if(input.value.trim() !== "") {
    socket.emit("chat message", input.value); // envoie le message
    input.value = "";
  }
}

socket.on("chat message", (msg) => {
  const li = document.createElement("li");
  li.textContent = msg;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight; // scroll automatique
});
