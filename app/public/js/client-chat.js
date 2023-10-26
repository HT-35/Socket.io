const socket = io();

const formSubmit = document.getElementById("form-messages");
//===welcome user ============

const h1Welcome = document.querySelector(".h1Welcome");
socket.on("welcome user", (textWelcome) => {
  console.log(textWelcome);
  h1Welcome.textContent = `${textWelcome.Textclear} (${textWelcome.creatAt})`;
});

// =====send and hanle bad-word=====
formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = document.getElementById("input-messages").value;

  // acknowledgement là tham số thứ 3 của emit để gửi tới client to server hoặc ngược lại
  // vì tham số acknowledgement là tham số thứ 3 nên khi server xử lý func xảy ra lỗi thì chỉ cần return callback mà không cầm socket.emit thì bên phía client vẫn nhận được acknowledgement và hiển thị cho người dùng
  const acknowledgement = (err) => {
    if (err) {
      return alert("m sủa dơ vậy thằng lol !!");
    }
    console.log("ban da gui tin nhan thanh cong");
  };
  // console.log(message);

  // tham số thứ nhất là key-word để server nhận event
  //tham số thứ 2 là thứ cần gửi
  // tham số thứ 3 là acknowledgement : thông báo cho người dùng  biết về trạng thái gửi tin nhắn
  socket.emit("send message from client to server", message, acknowledgement);
});

socket.on("remessage from server to client", (messageClean) => {
  const userSendMess = `${messageClean.username} : ${messageClean.texted.Textclear}`;

  console.log(userSendMess);
});

//========== Lấy kinh độ và vĩ độ ===============

document.querySelector("#btn-share-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("browser not support location.");
  }
  navigator.geolocation.getCurrentPosition((positon) => {
    // console.log(positon);
    const { latitude, longitude } = positon.coords;
    // console.log(latitude, longitude);
    // gửi kinh độ và vĩ độ cho server
    socket.emit("share location from client to server", {
      latitude,
      longitude,
    });
  });
});

// nhận url google map từ server :
socket.on(
  "share Url location from server to client",
  ({ username, location }) => {
    console.log(`${username}:    `, location);
  }
);
// ========Time=========

// ========== Get Url : Join Room  ===========

const url = window.location.search;
console.log(url);

const params = Qs.parse(url, { ignoreQueryPrefix: true });

const { room, username } = params;

socket.emit("send params from client to server", { room, username });
