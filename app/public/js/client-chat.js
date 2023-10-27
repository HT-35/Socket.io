// yếu cầu server kết nối với client
const socket = io();

document.getElementById("form-messages").addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log("hello");
  const messageText = document.getElementById("input-messages").value;
  console.log(messageText);
  const acknowledgements = (errors) => {
    if (errors) {
      return alert("tin nhắn không hợp lệ");
    }
    console.log("tin nhắn đã gửi thành công");
  };
  socket.emit(
    "send message from client to server",
    messageText,
    acknowledgements
  );
});

socket.on("remessage from server to client", ({ username, texted }) => {
  console.log(`${username} :`, texted);
});

// gửi vị trí
document.getElementById("btn-share-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("trình duyệt đang dùng không có hổ trợ tìm ví");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    console.log("position from client : ", position);
    const { latitude, longitude } = position.coords;
    socket.emit("share location from client to server", {
      latitude,
      longitude,
    });
  });
});

socket.on("share location from server to client", (linkLocation) => {
  console.log("linkLocation : ", linkLocation);
});

// xử lý query string
const queryString = location.search;

const params = Qs.parse(queryString, {
  ignoreQueryPrefix: true,
});

const { room, username } = params;

socket.emit("send params from client to server", { room, username });

// nhận user list và hiển thị lên màn hình
socket.on("send user list from server to client", (userList) => {
  console.log(userList);
});

//  ======================================================================
