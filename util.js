const moment = require("moment");
const momentz = require("moment-timezone");
const request = require("request-promise");
const config = require("./config");

exports.webHookInfo = new Promise((resolve, reject) => {
  console.log(
    "Start DateTime " + momentz.tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm")
  );
  console.log("Sent");
  request({
    method: "GET",
    uri: config.external_url + "/driver/ecpe-software/18-04-2023",
    headers: { Accept: "application/json" },
  })
    .then(function (response) {
      objJSON = JSON.parse(response);
      var schedule = [];

      console.log("result" + objJSON);
      console.log("count:" + objJSON.length);

      var appointment_days = "";
      var appointment_str = "";
      var appointment_type = "onedays";

      for (var index in objJSON) {
        //console.log(attributename + ": " + objJSON[attributename]);
        console.log("booking_number: " + objJSON[index].booking_number);
        console.log("user_request: " + objJSON[index].user_request);
        console.log("use_to: " + objJSON[index].use_to);
        console.log("title: " + objJSON[index].title);

        if (objJSON[index].startdate === objJSON[index].enddate) {
          //same days ในวันที่
          //var d = momment('2019-01-01');
          var d = moment(objJSON[index].startdate);
          //var st = moment("13:15:00", "h:mm:ss");
          var st = moment(objJSON[index].start_time, "h:mm:ss"); //start_time
          var et = moment(objJSON[index].end_time, "h:mm:ss"); //start_time

          appointment_days =
            d.format("d") +
            " " +
            getCurrentMonth(d.format("MM")) +
            " " +
            (parseInt(d.format("YYYY")) + 543);
          //format("hh:mm A") =12hr
          appointment_start_time = st.format("HH:mm");
          appointment_end_time = et.format("HH:mm");
          appointment_str =
            appointment_days +
            " เวลา " +
            appointment_start_time +
            " ถึง " +
            appointment_end_time;
        } else {
          //between ระหว่างวันที่
          // waiting to implement

          appointment_type = "period";
        }

        schedule[index] = {
          booking_number: objJSON[index].booking_number,
          use_to: objJSON[index].use_to,
          title: objJSON[index].title,
          user_request: objJSON[index].user_request,
          car:
            objJSON[index].vehicle_type +
            " ทะเบียน " +
            objJSON[index].vehicle_number,
          appointment: appointment_str,
          appointment_type: appointment_type,
        };
        //schedule.push(schedule[index]);
        index++;
      }

      //schedule[0] = { booking_number: "test", use_to: "ss", title: "title" };
      //schedule[1] = { booking_number: "test2", use_to: "dd", title: "title" };

      resolve({
        schedule,
      });
      console.log(
        "END DateTime " + moment.tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm")
      );
    })
    .catch(function (err) {
      console.log("Error:", err.message);
      reject(err);
    });
});

function getCurrentMonth(month_num) {
  switch (month_num) {
    case "01":
      return "มกราคม";
      break;
    case "02":
      return "กุมภาพันธ์";
      break;
    case "03":
      return "มีนาคม";
      break;
    case "04":
      return "เมษายน";
      break;
    case "05":
      return "พฤษภาคม";
      break;
    case "06":
      return "มิถุนายน";
      break;
    case "07":
      return "กรกฎาคม";
      break;
    case "08":
      return "สิงหาคม";
      break;
    case "09":
      return "กันยายน";
      break;
    case "10":
      return "ตุลาคม";
      break;
    case "11":
      return "พฤศจิกายน";
      break;
    case "12":
      return "ธันวาคม";
      break;
  }
}
