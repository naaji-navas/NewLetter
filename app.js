const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;
  console.log(email);
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/58d3efff49";
  const options = {
    method: "POST",
    auth: "naji:238a41389ddd0b4d904165b9b6fead9d-us10",
  };

  const request = https.request(url, options, (response) => {
    response.statusCode === 200
      ? res.sendFile(__dirname + "/success.html")
      : res.sendFile(__dirname + "/failure.html");
    response.on("data", (data) => {});
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});
app.post("/success", (req, res) => {
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

//api key
//238a41389ddd0b4d904165b9b6fead9d-us10

//audience id
// 58d3efff49
