const config = require("./config");
const express = require("express");

var util = require("./util");
const cors = require("cors");
const request = require("request-promise");
const LINE_NOTIFY_API = "https://notify-api.line.me/api/notify";

var app = express();

app.use(cors());

//old_schedule_driver
app.get("/", function (req, res) {
  // res.json({
  //   message: "Hello World",
  // });

  util
    .webHookInfo("phornchetj")
    .then(function (data) {
      //console.log("Document is ");
      console.log(data.schedule);
      //console.log("Return: " + data.schedule.length);
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

//old_peeding_approval
app.get("/check", function (req, res) {
  console.log("check is ");
  // res.json({
  //   message: "Hello World",
  // });
  util.webHookNotApprove
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
app.get("/line_notify_old", function (req, res) {
  var schedule_info = [];
  users = config.driver_acc;
  userArray = users.split(",");
  console.log("count array:" + userArray.length);

  userArray.forEach(function (item) {
    console.log(item);

    util
      .webHookInfo(item)
      .then(function (data) {
        //console.log("Document is ");
        console.log(data.schedule);
        //console.log("Return: " + data.schedule.length);
        //console.log(JSON.parse(data));

        var tmp = {
          user: item,
          joblist: data.schedule,
        };
        schedule_info.push(tmp);

        if (data.schedule.length > 0) {
          //check length
          console.log("line notify start ");
          //console.log("token is " + data.schedule[0].token);

          data.schedule.forEach(function (message_data) {
            console.log("Booking is" + message_data.booking_number); //
            console.log("Appointment_type is " + message_data.appointment_type);
            console.log("token is " + message_data.token);
            var info = "";
            info += " " + message_data.appointment;

            /*if (message_data.appointment_type == "onedays") {
            } else {
            }*/

            info += " " + message_data.car;
            info += " มีคิวสำหรับใช้ " + message_data.title;
            info +=
              " เพื่อเดินทางไปยังจุดหมายปลายทาง/สถานที่ " +
              message_data.location;
            info += " ในช่วงเวลา " + message_data.appointment;
            info += " ผู้จองหรือขอใช้งานคือ " + message_data.user_request;

            if (message_data.token != "") {
              request({
                method: "POST",
                uri: LINE_NOTIFY_API,
                headers: {
                  Authorization: `Bearer ${message_data.token}`,
                },
                formData: {
                  message: info,
                  stickerPackageId: 4,
                  stickerId: 613,
                },
              })
                .then((response) => {
                  console.log("Sent");
                  console.log({
                    item: info,
                    response: response,
                  });
                })
                .catch((err) => {
                  console.log("Error:", err.message);
                  console.log({
                    item: info,
                    Error: err.message,
                  });
                });
            } else {
              console.log("token not fund: ", item);
            }
          });
        } //end if check length

        //console.log("result then = " + tmp);
        /*
        res.json({
          joblist: data,
        });*/
      })
      .then(() => {
        console.log("schedule_info : len() = " + schedule_info.length);
      })
      .catch(function (err) {
        console.log("Error:", err.message);
        /*res.json({
          Error: err.message,
        });*/
      });
  }); //

  //console.log("schedule_info : len() = " + schedule_info.length);

  res.json({
    notify: schedule_info,
  });

  /*
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
  */
});

app.get("/v2", function (req, res) {
  var schedule_info = [];

  util.webHookNotApprove
    .then(function (data) {
      //console.log("Document is ");
      console.log(data.schedule);
      //console.log("Return: " + data.schedule.length);
      //console.log(JSON.parse(data));

      var tmp = {
        joblist: data.schedule,
      };
      schedule_info.push(tmp);

      if (data.schedule.length > 0) {
        //check length
        console.log("line notify start ");
        //console.log("token is " + data.schedule[0].token);

        data.schedule.forEach(function (message_data) {
          console.log("Pending approve" + message_data.booking_number); //
          //console.log("Booking is" + message_data.booking_number); //
          console.log("Appointment_type is " + message_data.appointment_type);
          console.log("token is " + message_data.token);
          var info = "";

          /*if (message_data.appointment_type == "onedays") {
            } else {
            }*/

          info +=
            " มีรายการรออนุมัติ " +
            message_data.booking_number +
            "  " +
            message_data.car;
          info += " มีคิวสำหรับใช้ " + message_data.title;
          info += " ใน " + message_data.appointment;
          info +=
            " เพื่อเดินทางไปยังจุดหมายปลายทาง/สถานที่ " + message_data.location;
          info += " ในช่วงเวลา " + message_data.appointment;
          info += " ผู้จองหรือขอใช้งานคือ " + message_data.user_request;

          token = message_data.token;
          //token = "";

          if (message_data.token != "") {
            request({
              method: "POST",
              uri: LINE_NOTIFY_API,
              headers: {
                Authorization: `Bearer ${token}`,
              },
              formData: {
                message: info,
                stickerPackageId: 4,
                stickerId: 613,
              },
            })
              .then((response) => {
                console.log("Sent");
                console.log({
                  item: info,
                  response: response,
                });
              })
              .catch((err) => {
                console.log("Error:", err.message);
                console.log({
                  item: info,
                  Error: err.message,
                });
              });
          } else {
            console.log("token not fund: ", item);
          }
        });
      } //end if check length

      //console.log("result then = " + tmp);
      /*
        res.json({
          joblist: data,
        });*/
    })
    .then(() => {
      console.log("schedule_info : len() = " + schedule_info.length);
    })
    .catch(function (err) {
      console.log("Error:", err.message);
      /*res.json({
          Error: err.message,
        });*/
    });

  //console.log("schedule_info : len() = " + schedule_info.length);

  res.json({
    notify: schedule_info,
  });

  /*
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
  */
});

var port = process.env.port || config.port;

console.log(" Port config: " + port);
console.log(" API URL: " + config.external_url);

app.listen(port, function () {
  console.log("Starting node.js on port " + port);
});
