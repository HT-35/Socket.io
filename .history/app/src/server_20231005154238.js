const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const http = require("http");

const socketio = require("socket.io");

// vì file public chưa luôn file html nên chỉ cần đường dẫn đến file public
const publicPathDirectory = path.join(__dirname, "../public");

app.use(express.static(publicPathDirectory));
// tạo server : tạo server từ app
const server = http.createServer(app);

const io = socketio(server);

io.on("connection",)

app.listen(port, () => {
  console.log(
    `Example app listening on port ${port}: http://localhost:${port}`
  );
});
