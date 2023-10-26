const express = require("express");
const app = express();

const path = require("path");
const http = require("http");
const port = 3000;

// func tao mess có time-format
const messageCleanTimeFormat = require("./utils/create-messages");

// import package bad-word
const Filter = require("bad-words");
const filter = new Filter();
// thêm từ khooas vào danh sách bad-words
filter.addWords("cc", "dm", "thanh");

const socketio = require("socket.io");

// tạo server : tạo server từ app , vì app là app = express();
const server = http.createServer(app);

const io = socketio(server);

// vì file public chưa luôn file html nên chỉ cần đường dẫn đến file public
const publicPath = path.join(__dirname, "../public");
// express sử dụng public làm đường dẫn chính, và hiển thị file index.html
app.use(express.static(publicPath));

// Sự kiện kết nối khi có một client kết nối
io.on("connection", (socket) => {
  console.log("Client đã kết nối");
  // chao user :
  // ======thông báo cho user: chào mừng đến với CyberChat===============
  // hàm messageCleanTimeFormat nhận text cần gửi và retun lại text kèm thời gian gửi
  // socket.to(room).emit("welcome user", messageCleanTimeFormat("xin chao các con vợ"));
  // socket.broadcast.to(room).emit(
  //   "welcome user",
  //   messageCleanTimeFormat("có thêm client tham gia cyberchat")
  // );

  // chia phòng và join phòng dựa vào room và username
  socket.on("send params from client to server", ({ room, username }) => {
    // gom tất cả các user có cùng room thành 1 phòng
    socket.join(room);

    // ================== get location ===================================

    socket.on("share location from client to server", (e) => {
      const location = `https://www.google.com/maps?q=${e.latitude},${e.longitude}`;
      // console.log(location);
      io.to(room).emit("share Url location from server to client", {
        username,
        location,
      });
    });

    socket.on("send message from client to server", (message, callback) => {
      // console.log(`client to server (username : ${username}) : `, message);

      // ==========Xử lý từ bad================

      // hàm callback là hàm acknowledgement nhận từ client gửi lên server

      // thông báo cho người dùng biết là sủa ngu

      // vì tham số acknowledgement là tham số thứ 3 nên khi server xử lý func xảy ra lỗi thì chỉ cần return callback mà không cầm socket.emit thì bên phía client vẫn nhận được acknowledgement và hiển thị cho người dùng
      // filter.isProfane(message) : xử lý các từ bad of list bad-words có trong message, và return lại cho người dùng biết là có từ không hợp lệ hoặc "m sua cc gì thế"
      if (filter.isProfane(message)) {
        return callback("m sua cc gì thế");
      }

      const Textclear = filter.clean(message);

      // console.log(messageCleanTimeFormat(Textclear));
      // console.log(Textclear);

      // xóa từ cấm trong danh sách bad-word : what the ****

      // ========== join phòng ==============

      const texted = messageCleanTimeFormat(Textclear);

      // io chỉ gửi text đến room mà user gửi vào
      io.to(room).emit("remessage from server to client", { username, texted });

      // io.to(room).emit("remessage from server to client", texted);
      callback();
    });
  });

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
