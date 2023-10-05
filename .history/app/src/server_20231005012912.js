const express = require("express");
const app = express();
const port = 3000;

const path = require("path");

const publicPathDirectory = path.join("__dirname")

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(
    `Example app listening on port ${port}: http://localhost:${port}`
  );
});
