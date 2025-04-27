const moment = require("moment");
const momentz = require("moment-timezone");
const request = require("request-promise");
const config = require("./config");

exports.webHookInfo = (username) =>
  new Promise((resolve, reject) => {
    console.log(
      "Start DateTime " + momentz.tz("Asia/Bangkok").format("DD-MM-YYYY HH:mm")
    );
    console.log(
      "Sent" +
        " [" +
        username +
        "] " +
        "@" +
        momentz.tz("Asia/Bangkok").format("DD-MM-YYYY")
    );

    dateCheck = "22-04-2025";
    //dateCheck = momentz.tz("Asia/Bangkok").format("DD-MM-YYYY");

    request({
      method: "GET",
      uri: config.external_url + "/driver/" + username + "/" + dateCheck,
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
        var userIdToken = "";
        var location = "";

        for (var index in objJSON) {
          //console.log(attributename + ": " + objJSON[attributename]);
          console.log("booking_number: " + objJSON[index].booking_number);
          console.log("user_request: " + objJSON[index].user_request);
          console.log("use_to: " + objJSON[index].use_to);
          console.log("title: " + objJSON[index].title);
          //userId
          console.log("token: " + objJSON[index].userId);
          userIdToken = objJSON[index].userId;
          //location
          location = objJSON[index].location;

          if (objJSON[index].startdate === objJSON[index].enddate) {
            //same days ในวันที่
            //var d = momment('2019-01-01');
            var d = moment(objJSON[index].startdate);
            //var st = moment("13:15:00", "h:mm:ss");
            var st = moment(objJSON[index].start_time, "h:mm:ss"); //start_time
            var et = moment(objJSON[index].end_time, "h:mm:ss"); //start_time

            appointment_days =
              d.format("D") +
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
            var dT = moment(objJSON[index].startdate);
            var dE = moment(objJSON[index].enddate);

            var st = moment(objJSON[index].start_time, "h:mm:ss"); //start_time
            var et = moment(objJSON[index].end_time, "h:mm:ss"); //start_time

            appointment_start_time = st.format("HH:mm");
            appointment_end_time = et.format("HH:mm");

            //console.log("startdate :" + objJSON[index].startdate);
            //console.log("enddate :" + objJSON[index].enddate);

            //console.log("startdate :" + dT.format("D"));
            //console.log("enddate :" + dE.format("D"));

            startDate =
              dT.format("d") +
              " " +
              getCurrentMonth(dT.format("MM")) +
              " " +
              (parseInt(dT.format("YYYY")) + 543);

            endDate =
              dE.format("d") +
              " " +
              getCurrentMonth(dE.format("MM")) +
              " " +
              (parseInt(dE.format("YYYY")) + 543);

            appointment_type = "period";
            appointment_str =
              "ตั้งแต่วันที่ " +
              startDate +
              " เวลา " +
              appointment_start_time +
              " ถึงวันที่ " +
              endDate +
              " เวลา " +
              appointment_end_time;
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
            location: location,
            appointment: appointment_str,
            appointment_type: appointment_type,
            token: userIdToken,
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
          "END DateTime " + moment.tz("Asia/Bangkok").format("DD-MM-YYYY HH:mm")
        );
      })
      .catch(function (err) {
        console.log("Error:", err.message);
        reject(err);
      });
  });

exports.webHookNotApprove = new Promise((resolve, reject) => {
  console.log(
    "Start DateTime " + momentz.tz("Asia/Bangkok").format("DD-MM-YYYY HH:mm")
  );
  console.log("Sent" + "@" + momentz.tz("Asia/Bangkok").format("YYYY-MM-DD"));

  dateCheck = "2025-04-22";
  //dateCheck = momentz.tz("Asia/Bangkok").format("DD-MM-YYYY");

  request({
    method: "GET",
    uri: config.external_url + "/pending/" + dateCheck,
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
      var userIdToken = "";
      var location = "";

      for (var index in objJSON) {
        //console.log(attributename + ": " + objJSON[attributename]);
        console.log("booking_number: " + objJSON[index].booking_number);
        console.log("user_request: " + objJSON[index].user_request);
        console.log("use_to: " + objJSON[index].use_to);
        console.log("title: " + objJSON[index].title);
        //userId
        console.log("token: " + objJSON[index].userId);
        userIdToken = objJSON[index].userId;
        //location
        location = objJSON[index].location;

        if (objJSON[index].startdate === objJSON[index].enddate) {
          //same days ในวันที่
          //var d = momment('2019-01-01');
          var d = moment(objJSON[index].startdate);
          //var st = moment("13:15:00", "h:mm:ss");
          var st = moment(objJSON[index].start_time, "h:mm:ss"); //start_time
          var et = moment(objJSON[index].end_time, "h:mm:ss"); //start_time

          appointment_days =
            d.format("D") +
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
          var dT = moment(objJSON[index].startdate);
          var dE = moment(objJSON[index].enddate);

          var st = moment(objJSON[index].start_time, "h:mm:ss"); //start_time
          var et = moment(objJSON[index].end_time, "h:mm:ss"); //start_time

          appointment_start_time = st.format("HH:mm");
          appointment_end_time = et.format("HH:mm");

          //console.log("startdate :" + objJSON[index].startdate);
          //console.log("enddate :" + objJSON[index].enddate);

          //console.log("startdate :" + dT.format("D"));
          //console.log("enddate :" + dE.format("D"));

          startDate =
            dT.format("d") +
            " " +
            getCurrentMonth(dT.format("MM")) +
            " " +
            (parseInt(dT.format("YYYY")) + 543);

          endDate =
            dE.format("d") +
            " " +
            getCurrentMonth(dE.format("MM")) +
            " " +
            (parseInt(dE.format("YYYY")) + 543);

          appointment_type = "period";
          appointment_str =
            "ตั้งแต่วันที่ " +
            startDate +
            " เวลา " +
            appointment_start_time +
            " ถึงวันที่ " +
            endDate +
            " เวลา " +
            appointment_end_time;
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
          location: location,
          appointment: appointment_str,
          appointment_type: appointment_type,
          token: userIdToken,
          phone: objJSON[index].phone,
          travelers: objJSON[index].travelers,
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
        "END DateTime " + moment.tz("Asia/Bangkok").format("DD-MM-YYYY HH:mm")
      );
    })
    .catch(function (err) {
      console.log("Error:", err.message);
      reject(err);
    });
});

exports.webHookDriverTask = (username, check_date) =>
  new Promise((resolve, reject) => {
    console.log(
      "Start DateTime " + momentz.tz("Asia/Bangkok").format("DD-MM-YYYY HH:mm")
    );
    console.log(
      "Date Check" +
        " [" +
        check_date +
        "] " +
        "User " +
        " [" +
        username +
        "] " +
        " Start checking on " +
        momentz.tz("Asia/Bangkok").format("DD-MM-YYYY")
    );

    request({
      method: "GET",
      uri: config.external_url + "/driver/" + username + "/" + check_date,
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        objJSON = JSON.parse(response);
        var schedule = [];
        var bubbles = [];

        console.log("result" + objJSON);
        console.log("count:" + objJSON.length);

        var appointment_days = "";
        var appointment_str = "";
        var appointment_type = "onedays";
        var userIdToken = "";
        var location = "";

        var cr = 1; // for increasing index of bubbles

        for (var index in objJSON) {
          //console.log(" index : " + index);
          //console.log(attributename + ": " + objJSON[attributename]);
          console.log("booking_number: " + objJSON[index].booking_number);
          console.log("user_request: " + objJSON[index].user_request);
          console.log("use_to: " + objJSON[index].use_to);
          console.log("title: " + objJSON[index].title);
          //userId
          console.log("token: " + objJSON[index].userId);
          userIdToken = objJSON[index].userId;
          //location
          location = objJSON[index].location;

          var dT = moment(objJSON[index].startdate);
          var dE = moment(objJSON[index].enddate);

          console.log("startdate :" + objJSON[index].startdate);
          console.log("enddate :" + objJSON[index].enddate);

          console.log("startdate :" + dT.format("D"));
          console.log("enddate :" + dE.format("D"));

          if (objJSON[index].startdate === objJSON[index].enddate) {
            //same days ในวันที่
            //var d = momment('2019-01-01');
            var d = moment(objJSON[index].startdate);
            //var st = moment("13:15:00", "h:mm:ss");
            var st = moment(objJSON[index].start_time, "h:mm:ss"); //start_time
            var et = moment(objJSON[index].end_time, "h:mm:ss"); //start_time

            appointment_days =
              d.format("D") +
              " " +
              getCurrentMonth(d.format("MM")) +
              " " +
              (parseInt(d.format("YYYY")) + 543);
            //format("hh:mm A") =12hr
            appointment_start_time = st.format("HH:mm");
            appointment_end_time = et.format("HH:mm");
            appointment_str =
              appointment_start_time + " - " + appointment_end_time;
          } else {
            //between ระหว่างวันที่
            // waiting to implement
            var dT = moment(objJSON[index].startdate);
            var dE = moment(objJSON[index].enddate);

            var st = moment(objJSON[index].start_time, "h:mm:ss"); //start_time
            var et = moment(objJSON[index].end_time, "h:mm:ss"); //start_time

            appointment_start_time = st.format("HH:mm");
            appointment_end_time = et.format("HH:mm");

            // console.log("startdate :" + objJSON[index].startdate);
            // console.log("enddate :" + objJSON[index].enddate);

            // console.log("startdate :" + dT.format("D"));
            // console.log("enddate :" + dE.format("D"));

            startDate =
              dT.format("D") +
              "/" +
              dT.format("MM") +
              "/" +
              (parseInt(dT.format("YYYY")) + 543);

            endDate =
              dE.format("D") +
              "/" +
              dE.format("MM") +
              "/" +
              (parseInt(dE.format("YYYY")) + 543);

            appointment_type = "period";

            // [Modity appointment_str to show time only]
            // appointment_str =
            //   "ตั้งแต่วันที่ " +
            //   startDate +
            //   " เวลา " +
            //   appointment_start_time +
            //   " ถึงวันที่ " +
            //   endDate +
            //   " เวลา " +
            //   appointment_end_time;

            appointment_str =
              //startDate +
              " " +
              appointment_start_time +
              " ใช้รถถึง " +
              endDate +
              " " +
              appointment_end_time +
              " น.";
          }

          schedule[index] = {
            booking_number: objJSON[index].booking_number,
            use_to: objJSON[index].use_to,
            title: objJSON[index].title,
            detail: objJSON[index].detail,
            travelers: objJSON[index].travelers,
            user_request: objJSON[index].user_request,
            phone: objJSON[index].phone,
            vehicle_type: objJSON[index].vehicle_type,
            vehicle_number: objJSON[index].vehicle_number,
            startdate: objJSON[index].startdate,
            start_time: objJSON[index].start_time,
            enddate: objJSON[index].enddate,
            end_time: objJSON[index].end_time,
            location: location,
            appointment: appointment_str,
            appointment_type: appointment_type,
            token: userIdToken,
          };
          //schedule.push(schedule[index]);

          if (index == 0) {
            //Header bubble
            bubbles[index] = createMainBubble(username, check_date);
          }
          bubbles[cr] = createFlexMessage(objJSON[index]); //objJSON[index]
          cr++;

          index++;
        }

        //schedule[0] = { booking_number: "test", use_to: "ss", title: "title" };
        //schedule[1] = { booking_number: "test2", use_to: "dd", title: "title" };

        var flexOutput = { type: "carousel", contents: bubbles };

        resolve({
          schedule,
          //bubbles,
          //flexOutput,
        });

        //resolve(flexOutput);

        console.log(
          "END DateTime " + moment.tz("Asia/Bangkok").format("DD-MM-YYYY HH:mm")
        );
      })
      .catch(function (err) {
        console.log("Error:", err.message);
        reject(err);
      });
  });

exports.toFlexMessage = (schedule, user, date) =>
  new Promise((resolve, reject) => {
    try {
      var bubbles = [];
      var cr = 1; // for increasing index of bubbles

      schedule.forEach((booking, index) => {
        console.log("index: " + index);

        if (index == 0) {
          //Header bubble
          bubbles[index] = createMainBubble(user, date);
        }

        bubbles[cr] = createFlexMessage(booking);
        cr++;

        //bubbles[index] = createFlexMessage(booking);
      });

      var flexOutput = { type: "carousel", contents: bubbles };
      resolve(flexOutput);
    } catch (err) {
      console.log("Error:", err.message);
      reject(err);
    }
  });

function createFlexMessage(booking) {
  const startTime = booking.start_time.substring(0, 5);
  const endTime = booking.end_time.substring(0, 5);
  const timeRange = `${startTime} - ${endTime}`;

  var time_contents = [];

  console.log("appointment_type: " + booking.appointment_type);

  if (booking.appointment_type === "period") {
    time_contents[0] = {
      type: "text",
      text: booking.appointment,
      align: "start",
      size: "sm",
    };
  } else {
    time_contents[0] = {
      type: "text",
      text: "เวลา:  ",
      weight: "bold",
      align: "end",
      size: "sm",
    };
    time_contents[1] = {
      type: "text",
      text: timeRange,
      align: "start",
      size: "sm",
    };
  }

  // Create the Flex message structure
  return {
    type: "bubble",
    header: {
      type: "box",
      layout: "horizontal",
      contents: [
        {
          type: "text",
          text: booking.vehicle_number,
          size: "xl",
          color: "#f7cea8",
          decoration: "underline",
          align: "start",
        },
        {
          type: "text",
          text: booking.booking_number,
          color: "#FFFFFF",
        },
      ],
    },
    hero: {
      type: "image",
      url: `https://tools.ecpe.nu.ac.th/car-service/images/cars/1735115938.jpg`,
      aspectMode: "cover",
      aspectRatio: "1.51:1",
      size: "full",
    },
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: `ปลายทาง: ${booking.location}`,
          color: "#8c1c65",
          size: "sm",
          weight: "bold",
        },
        {
          type: "box",
          layout: "horizontal",
          contents: time_contents,
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "text",
              text: "ผู้ร่วมเดินทาง :  ",
              weight: "bold",
              align: "end",
              size: "sm",
            },
            {
              type: "text",
              text: `${booking.travelers} ราย`,
              align: "start",
              size: "sm",
            },
          ],
        },
        {
          type: "separator",
        },
        {
          type: "text",
          text: booking.title,
          size: "sm",
        },
      ],
    },
    footer: {
      type: "box",
      layout: "horizontal",
      contents: [
        {
          type: "text",
          text: "ผู้ทำรายการ",
          color: "#FFFFFF",
        },
        {
          type: "text",
          text: booking.user_request,
          color: "#FFFFFF",
          size: "xl",
        },
      ],
      backgroundColor: "#1c4f8c",
    },
    styles: {
      header: {
        backgroundColor: "#1c4f8c",
        separator: true,
      },
    },
  };
}

function createMainBubble(nunet, date_checked) {
  return {
    type: "bubble",
    header: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: "แจ้งเตือน: ระบบยานพาหนะ",
          color: "#FFFFFF",
          align: "center",
          scaling: true,
          wrap: true,
          size: "xl",
        },
      ],
    },
    hero: {
      type: "image",
      url: "https://www.eng.nu.ac.th/eng2022/images/officer/center/update/Pornchet_Chansuwan/P1055968.jpg",
      aspectRatio: "1.51:1",
      aspectMode: "fit",
      size: "full",
    },
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: `สวัสดีคุณ ${nunet} `,
        },
        {
          type: "separator",
          color: "#48036f",
          margin: "sm",
        },
        {
          type: "text",
          text: "สถานที่ที่คุณต้องไป ในวันนี้ ",
          align: "end",
          weight: "bold",
          margin: "md",
          size: "sm",
        },
        {
          type: "text",
          text: "ธนาคารกรุงไทย, กองคลัง, ร้านไทไท ",
          size: "sm",
          decoration: "underline",
          align: "center",
          color: "#1e5cb3",
        },
      ],
    },
    footer: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: `งานวันนี้ (${date_checked} )`,
          align: "center",
          weight: "regular",
          color: "#FFFFFF",
          scaling: true,
          wrap: true,
          size: "xl",
        },
      ],
      backgroundColor: "#8c743b",
    },
    styles: {
      header: {
        separator: true,
        backgroundColor: "#528238",
        separatorColor: "#44434a",
      },
    },
  };
}
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
