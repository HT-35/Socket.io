const socket = io();
const formSubmit = document.getElementById("form-messages");

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = document.getElementById("input-messages").value;
  console.log(message);
  socket.emit("");
});
