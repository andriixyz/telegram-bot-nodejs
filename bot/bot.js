"use strict";
let private_ = require('../private.json');
const ADMIN_ID = private_['ADMIN_ID'];
const MY_SHEDULE =private_['MY_SHEDULE'];
const BOT_TOKEN = private_['BOT_TOKEN'];

var TelegramBot = require("node-telegram-bot-api");
var bot = new TelegramBot(BOT_TOKEN, { polling: true });
const validUrl = require("valid-url");
const browser = require("./../browser/browser");
const sizeOf = require("buffer-image-size");
const countriesTimeZone = require("countries-and-timezones");

const botProcedureController = require("./BotProcedureController");
const BotProcControll = new botProcedureController.BotProcedureController();

const botDialogController = require("./BotDialogController");
const BotDialogControll = new botDialogController.BotDialogController();

const FREQUENCY_REMIND_CHECK = 10000;
const botReminderController = require("./BotReminderController");
const BotReminderControll = new botReminderController.BotReminderController();
BotReminderControll.setFrequencyCheck(FREQUENCY_REMIND_CHECK);
BotReminderControll.start();

BotReminderControll.setOnTrigger = () => {
  var parameters = BotReminderControll.getParameters();
  bot.sendMessage(
    parameters.id_user,
    "Ты просил меня напомнить: " + parameters.text
  );
};

var sheduleTimer;
const FREQUENCY_SCHEDULE_CHECK = 600000;
var currentSchedule;
var previousSchedule = "a";
var firstLaunch = true;

process.env.NTBA_FIX_319 = 1;

///////// After restart or first launch////////
bot.sendMessage(ADMIN_ID, "Перезагрузка...");

/////////////////////////////////////////////////////////////////////////

BotProcControll.addProcedure("/start");

BotProcControll.getProcedure("/start").addStage("hello", () => {
  var parameters = BotProcControll.getProcedure("/start").parameters;
  bot.sendMessage(
    parameters["msg"].chat.id,
    "Привет! Я Kowalski Bot. Ты можешь мне сказать что тебе нужно напомнить. Так же я могу " +
      "могу напомнить кому-то то, что ты попросишь меня. Ещё, ты можешь попросить меня сделать скриншот."
  );
  BotDialogControll.getNode(parameters["msg"].chat.id).changeState("ask");
});
BotProcControll.getProcedure("/start").addStage("ask", () => {
  var parameters = BotProcControll.getProcedure("/start").parameters;
  bot.sendMessage(
    parameters["msg"].chat.id,
    "Для того чтобы я смог тебе напоминать, мне нужно узнать твой часовой пояс." +
      "Тебе требуется написать код страны."
  );
  BotDialogControll.getNode(parameters["msg"].chat.id).changeState("check");
});

BotProcControll.getProcedure("/start").addStage("check", () => {
  var parameters = BotProcControll.getProcedure("/start").parameters;

  const TIME_ZONES = countriesTimeZone.getTimezonesForCountry(
    parameters["msg"].text
  );

  if (TIME_ZONES.length == 0) {
    bot.sendMessage(parameters["msg"].chat.id, "Не удалось найти страну!");
  } else {
    var cities = [];
    TIME_ZONES.forEach(function(element) {
      cities.push({
        text: element.name.slice(
          element.name.indexOf("/") + 1,
          element.name.length
        ),
        callback_data: element.name + "/" + parameters["msg"].text
      });
    });
    bot.sendMessage(
      parameters["msg"].chat.id,
      "В каком городе ты живешь? Если нет твоего города, укажи столицу своей страны." +
        "Тогда я буду напоминать тебе по твоему столичному времени",
      {
        reply_markup: {
          inline_keyboard: [cities]
        }
      }
    );
    BotDialogControll.getNode(parameters["msg"].chat.id).changeState(
      "set city"
    );
  }
});
BotProcControll.getProcedure("/start").addStage("set city", () => {
  var parameters = BotProcControll.getProcedure("/start").parameters;
  const DATA = parameters["msg"].data;
  var countryIndex = DATA.lastIndexOf("/");
  var country = DATA.slice(countryIndex + 1, DATA.length);
  var city = DATA.slice(0, countryIndex);
  const TIME_ZONES = countriesTimeZone.getTimezonesForCountry(country);

  var timeUTC;
  TIME_ZONES.forEach(function(element) {
    if (element.name == city) {
      timeUTC = element.offsetStr;
    }
  });
  BotReminderControll.addUser(
    parameters["msg"].message.chat.id,
    parameters["msg"].message.chat.username,
    parameters["msg"].message.chat.last_name,
    timeUTC
  );
  bot.sendMessage(
    parameters["msg"].message.chat.id,
    "Хорошо, ты живешь в городе " +
      city +
      ", в стране " +
      country +
      " и у тебя часовой пояс - " +
      timeUTC +
      ". Команда напоминания - /remindme"
  );
  BotDialogControll.getNode(parameters["msg"].message.chat.id).resetNode();
});

/////////////////////////////////////////////////////////////////////////

BotProcControll.addProcedure("/remindme");

BotProcControll.getProcedure("/remindme").addStage("ask", () => {
  var parameters = BotProcControll.getProcedure("/remindme").parameters;

  BotReminderControll.checkUserExist(parameters["msg"].chat.id).then(result => {
    if (result) {
      bot.sendMessage(
        parameters["msg"].chat.id,
        "Тебе что то напомнить? Отлично, напиши мне что тебе напомнить в таком формате: \n" +
          "Текст напоминания / 05-18 21:21\n" +
          "<strong>PS: Пожалуйста, не используй символы - и : \n" +
          "Они нужны для корректной проверки твоего сообщения.</strong>",
        {
          parse_mode: "HTML"
        }
      );
      BotDialogControll.getNode(parameters["msg"].chat.id).changeState("check");
    } else {
      bot.sendMessage(
        parameters["msg"].chat.id,
        "Похоже, ты ещё не говорил откуда ты. Это требуется для" +
          "того чтобы узнать твой часовой пояс. Введи команду /start"
      );
      BotDialogControll.getNode(parameters["msg"].chat.id).resetNode();
    }
  });
});

BotProcControll.getProcedure("/remindme").addStage("check", () => {
  var parameters = BotProcControll.getProcedure("/remindme").parameters;

  var result = parameters["msg"].text.replace(/\s{2,}/g, " ");

  var indexSeparate = result.indexOf(" / ");
  var sliceText = result.slice(0, indexSeparate);
  var sliceDate = result.slice(indexSeparate + 3, result.length);
  var date = sliceDate.replace(" ", "T");
  var response;

  switch (null) {
    case date.match(/\d\d-/):
      response = "Похоже, месяц находится в неправильном формате.";
      break;
    case date.match(/\d\dT/):
      response = "Похоже, день находится в неправильном формате.";
      break;
    case date.match(/T\d\d:/):
      response = "Похоже, часы находятся в неправильном формате.";
      break;
    case date.match(/:\d\d/):
      response = "Похоже, минуты находится в неправильном формате.";
      break;
  }
  if (response != undefined) {
    bot.sendMessage(parameters["msg"].chat.id, response);
    return;
  }

  //  Date.parse("2004-07-15T06:45:00");
  if (Date.parse("2019-" + date + ":00") != NaN) {
    var m = date.match(/\d\d-/)[0].replace("-", "");
    var d = date.match(/\d\dT/)[0].replace("T", "");
    var h = date
      .match(/T\d\d:/)[0]
      .replace("T", "")
      .replace(":", "");
    var mi = date.match(/:\d\d/)[0].replace(":", "");

    BotReminderControll.addRemind(
      parameters["msg"].chat.id,
      sliceText,
      m,
      d,
      h,
      mi
    );
    //   timezones[]
    bot.sendMessage(
      parameters["msg"].chat.id,
      "Хорошо, я напомню тебе об " + sliceText + " в " + sliceDate
    );
    BotDialogControll.getNode(parameters["msg"].chat.id).resetNode();
  } else {
    bot.sendMessage(parameters["msg"].chat.id, "Ой, похоже что-то не так!");
  }
});

/////////////////////////////////////////////////////////////////////////

BotProcControll.addProcedure("/cancel");

BotProcControll.getProcedure("/cancel").addStage("cancel", () => {
  var parameters = BotProcControll.getProcedure("/cancel").parameters;
  BotDialogControll.getNode(parameters["msg"].chat.id).resetNode();
  bot.sendMessage(parameters["msg"].chat.id, "Операция успешно отменена.");
});

///////////////////////// Make shedule screenshot //////////////////////////

BotProcControll.addProcedure("/schedule");

BotProcControll.getProcedure("/schedule").addStage("ask", () => {
  var parameters = BotProcControll.getProcedure("/schedule").parameters;
  browser.getScreenShootShedule(MY_SHEDULE).then(
    result => {
      bot.sendPhoto(parameters["msg"].chat.id, result["buffer"]);
      BotDialogControll.getNode(parameters["msg"].chat.id).resetNode();
    },
    eror => {
      bot.sendMessage(
        parameters["msg"].chat.id,
        "К сожалению, сейчас расписание недоступно 😔"
      );
    }
  );
});

//////////////////////////////////////////////////////////////////////////

///////////////////////// Make shedule screenshot //////////////////////////

BotProcControll.addProcedure("/makescreenshot");

BotProcControll.getProcedure("/makescreenshot").addStage("ask", () => {
  var parameters = BotProcControll.getProcedure("/makescreenshot").parameters;
  bot.sendMessage(
    parameters["msg"].chat.id,
    "Хорошо, скопируй сюда ссылку сайта с которого ты хочешь получить скриншот."
  );
  BotDialogControll.getNode(parameters["msg"].chat.id).changeState(
    "take screenshot"
  );
});
BotProcControll.getProcedure("/makescreenshot").addStage(
  "take screenshot",
  () => {
    var parameters = BotProcControll.getProcedure("/makescreenshot").parameters;
    if (validUrl.isWebUri(parameters["msg"].text)) {
      var timeout = setTimeout(() => {
        bot.sendMessage(
          parameters["msg"].chat.id,
          "Похоже сайт не отвечает, или не возможно сделать с него скриншот"
        );
        BotDialogControll.getNode(parameters["msg"].chat.id).resetNode();
      }, 8000);
      browser.getScreenShoot(parameters["msg"].text).then(
        buffer => {
          var dimensions = sizeOf(buffer);
          if (dimensions.height > 1280 || dimensions.width > 1280) {
            bot.sendMessage(
              parameters["msg"].chat.id,
              "Скриншот слишком большой, я тебе отправлю его файлом"
            );
            clearTimeout(timeout);
            bot.sendDocument(parameters["msg"].chat.id, buffer);
          } else {
            clearTimeout(timeout);
            bot.sendPhoto(parameters["msg"].chat.id, buffer);
          }
          BotDialogControll.getNode(parameters["msg"].chat.id).resetNode();
        },
        eror => {
          clearTimeout(timeout);
          bot.sendMessage(
            parameters["msg"].chat.id,
            "К сожалению я не могу перейти по этой ссылке😔."
          );
        }
      );
    } else {
      clearTimeout(timeout);
      bot.sendMessage(
        parameters["msg"].chat.id,
        "Похоже ты ввел неправильную ссылку. Тебе следует перепроверить её."
      );
    }
  }
);

function chooseProcedure(message, isInline) {
  var parameters = message;
  var msg = message;
  if (isInline) {
    parameters = msg;
    msg = msg.message;
  }

  BotDialogControll.createNodeIfNotExist(msg.chat.id);
  const node = BotDialogControll.getNode(msg.chat.id);

  if (BotProcControll.checkExistProcedure(msg.text)) {
    BotDialogControll.getNode(msg.chat.id).set(
      BotProcControll.getProcedure(msg.text).stages[0].name,
      msg.text
    );
    BotProcControll.getProcedure(msg.text).execute(
      {
        msg: parameters
      },
      BotProcControll.getProcedure(msg.text).stages[0].name
    );
  } else if (node.procedure != 0) {
    BotProcControll.getProcedure(node.procedure).execute(
      {
        msg: parameters
      },
      node.getState()
    );
  } else {
    bot.sendMessage(msg.chat.id, "Я тебя не понимаю.");
  }
}

bot.on("message", (msg, match) => {
  chooseProcedure(msg, false);
});
bot.on("callback_query", callbackQuery => {
  chooseProcedure(callbackQuery, true);
});

function checkSchedule() {
  browser.getScreenShootShedule(MY_SHEDULE).then(result => {
    if (result["currentSchedule"] != previousSchedule) {
      if (!firstLaunch) {
        bot.sendMessage(
          ADMIN_ID,
          "Ой! Похоже расписание обновилось! Тебе стоит проверить его. /schedule"
        );
      } else {
        firstLaunch = false;
      }
    }
    previousSchedule = result["currentSchedule"];
  });
}
function stopCheckSchedule() {
  clearInterval(sheduleTimer);
}
function startCheckSchedule() {
  sheduleTimer = setInterval(checkSchedule, FREQUENCY_SCHEDULE_CHECK);
}

startCheckSchedule();
module.exports = {
  bot: bot
};
