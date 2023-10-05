const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const path = require("path");

// Đường dẫn đến thư mục public
const publicPath = path.join(__dirname, "../public");

// Sử dụng express.static để phục vụ các tài liệu tĩnh trong thư mục public
app.use(express.static(publicPath));

// Sự kiện kết nối khi có một client kết nối
io.on("connection", (socket) => {
  console.log("Client đã kết nối");

  // Xử lý sự kiện ngắt kết nối của client
  socket.on("disconnect", () => {
    console.log("Client đã ngắt kết nối");
  });
});

server.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
