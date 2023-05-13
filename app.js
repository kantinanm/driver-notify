const config = require("./config");
const express = require("express");

var util = require("./util");
const cors = require("cors");

var app = express();

app.use(cors());

app.get("/", async function (req, res) {
  util.webHookInfo
    .then(function (data) {
      //console.log("Document is ");
      console.log(data.schedule);
      console.log("Return: " + data.schedule.length);
      //console.log(JSON.parse(data));

      res.json({
        joblist: data,
      });
    })
    .catch(function (err) {
      console.log("Error:", err.message);
      res.json({
        Error: err.message,
      });
    });
});
var port = process.env.port || config.port;

console.log(" Port config: " + port);
console.log(" API URL: " + config.external_url);

app.listen(port, function () {
  console.log("Starting node.js on port " + port);
});
