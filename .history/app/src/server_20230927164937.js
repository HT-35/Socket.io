const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const port = process.env.port;

app.get('/', (req, res) => {
    
})


app.listen(port, () => {
  console.log(`app run on http://localhost${port}`);
});
