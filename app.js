const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
