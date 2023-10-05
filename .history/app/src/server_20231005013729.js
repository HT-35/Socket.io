const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const http = require("http");

const publicPathDirectory = path.join(__dirname, "../public");

app.use(express.static(publicPathDirectory));
const server =
  // app.get("/", (req, res) => {
  //   res.send("Hello World!");
  // });

  app.listen(port, () => {
    console.log(
      `Example app listening on port ${port}: http://localhost:${port}`
    );
  });
