const mysql = require("./../mysql/mysql");
let date = require("date-and-time");
class BotReminderController {
  constructor() {
    this.remindList = [];
    this.setOnTrigger = null;
    this.parameters = null;
  }
  checkUserExist(id) {
    return new Promise(resolve => {
      mysql.checkExist("user", id).then(res => {
        resolve(res);
      });
    });
  }
  getParameters() {
    return this.parameters;
  }
  onTrigger(id, id_user, text) {
    this.parameters = { id, id_user, text };
    this.setOnTrigger();
    this.removeRemind(id);
  }
  setFrequencyCheck(frequency) {
    this.frequencyCheck = frequency;
  }
  setTimeDifference(difference) {
    this.tDifference = difference;
  }
  start() {
    this.timer = () => {
      setInterval(() => {
        this.update();
      }, this.frequencyCheck);
    };
    this.timer();
  }
  stop() {
    clearInterval(this.timer);
  }
  addUser(id, username, last_name, timezone) {
    mysql.addUser(id, username, last_name, timezone);
  }
  addRemind(userID, text, month, day, hours, minutes) {
    mysql.addRemind(userID, text, month, day, hours, minutes);
  }
  removeRemind(id) {
    mysql.removeRemind(id);
    this.remindList.forEach(function(element, index) {
      if (element["id"] == id) {
        delete this.remindList[index];
      }
    });
  }
  update() {
    mysql.getReminds().then(result => {
      for (let i = 0; i < result.length; ++i) {
        if (this.remindList != undefined) {
          var res = this.remindList.find(el => {
            el["id"] == result[i]["id"];
          });
          if (res != undefined) {
            continue;
          }
        }

        mysql.getUserTimeZone(result[i]["id_user"]).then(tz => {
          //offsetStr: '-05:00',
          var timeZone = {
            sign: tz[0],
            hours: Number(tz.match(/\d\d:/)[0].replace(":", "")),
            minutes: Number(tz.match(/:\d\d/)[0].replace(":", ""))
          };
          var resultTime = result[i];
          if (Number(resultTime["month"]) == 1) {
            resultTime["month"] = 0;
          }
          var timeTrigger = new Date(
            new Date().getFullYear(),
            Number(resultTime["month"]),
            Number(resultTime["day"]),
            Number(resultTime["hours"]),
            Number(resultTime["minutes"]),
            0,
            0
          );
          var timeZoneLocal = new Date().toString().match(/\+\d\d\d\d/)[0];
          var timeZoneUser = tz.replace(":", "");
          if (timeZoneUser == timeZoneLocal) {
            var difference = date.subtract(timeTrigger, new Date()).toMinutes();
            if (-1000 <= difference <= 15) {
              setTimeout(() => {
                this.remindList.push(result[i]);
                this.onTrigger(
                  result[i]["id"],
                  result[i]["id_user"],
                  result[i]["text"]
                );
              }, difference * 60 * 1000);
            }
          } else {
            if (timeZone.sign == "+") {
              var timeTriggerLocal = date.addHours(new Date(), timeZone.hours);
              var timeTriggerLocal = date.addMinutes(
                timeTriggerLocal,
                timeZone.minutes
              );
              var difference = date
                .subtract(timeTrigger, timeTriggerLocal)
                .toMinutes();

              if (-1000 <= difference <= 15) {
                setTimeout(() => {
                  this.onTrigger(
                    result[i]["id"],
                    result[i]["id_user"],
                    result[i]["text"]
                  );
                }, difference * 60 * 1000 + 1000 * 60);
              }
            } else if (timeZone.sign == "-") {
              var timeTriggerLocal = date.addHours(new Date(), -timeZone.hours);
              var timeTriggerLocal = date.addMinutes(
                timeTriggerLocal,
                -timeZone.minutes
              );
              var difference = date
                .subtract(new Date(), timeTrigger)
                .toMinutes();
              if (15 <= difference <= -1000) {
                setTimeout(() => {
                  this.onTrigger(
                    result[i]["id"],
                    result[i]["id_user"],
                    result[i]["text"]
                  );
                }, difference * -60 * 1000);
              } else {
                console.log("Error when getting timeZone sign");
              }
            }
          }
        });
      }
    });
  }
}
module.exports.BotReminderController = BotReminderController;
