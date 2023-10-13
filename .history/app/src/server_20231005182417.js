const express = require("express");
const app = express();

const path = require("path");
const http = require("http");
const port = 3000;

const socketio = require("socket.io");

// tạo server : tạo server từ app , vì app là app = express();
const server = http.createServer(app);

const io = socketio(server);

// vì file public chưa luôn file html nên chỉ cần đường dẫn đến file public
const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));

let count = 1;

// Sự kiện kết nối khi có một client kết nối
io.on("connection", (socket) => {
  console.log("Client đã kết nối");

  // gửi count từ server đến client
  socket.emit("sendCount")

  // Xử lý sự kiện ngắt kết nối của client
  socket.on("disconnect", () => {
    console.log("Client đã ngắt kết nối");
  });
});

// khởi tạo server từ serer : server = http.createServer(app);
// vì io = socketio(server) nên khi client sử dụng socket.io
// thì server  sẽ nhận đc và dùng : io.on("connection", (socket) => {}
server.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
