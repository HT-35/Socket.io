// const express = require("express");
// require("dotenv").config();
// const app = express();
// const path = require("path");
// const port = process.env.port;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(3000, () => {
//   console.log(`app run on http://localhost${port}`);
// });

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}: http:localhost`);
});
