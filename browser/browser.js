"use strict";
const puppeteer = require("puppeteer");
const validUrl = require("valid-url");

const BROWSER_CLOSE_TIMEOUT = 20000;
var browser;

var timerBrowser = null;

async function updateBrower() {
  if (timerBrowser != null) {
    clearTimeout(timerBrowser);
  } else {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    console.log("Browser opened...");
  }
  timerBrowser = setTimeout(async () => {
    await browser.close();
    console.log("Browser closed...");
    timerBrowser = null;
  }, BROWSER_CLOSE_TIMEOUT);
}
function getScreenShootShedule(url) {
  return new Promise((resolve, reject) => {
    var urlToScreenshot = url;
    console.log("Screenshotting...");
    updateBrower().then(async () => {
      const page = await browser.newPage();

      await page.goto(urlToScreenshot).catch(() => {
        reject("error");
      });
      await page
        .evaluate(() => {
          for (
            let i = document.getElementsByTagName("table").length - 1;
            i >= 0;
            --i
          ) {
            if (
              document.getElementsByTagName("table")[i].className != "MainTT"
            ) {
              document.getElementsByTagName("table")[i].remove();
            }
          }
          var temp = document.createElement("div");
          if (
            document.getElementsByClassName("MainTT")[0].offsetWidth ==
            undefined
          ) {
            temp.innerHTML = "Error";
          } else {
            var width = document.getElementsByClassName("MainTT")[0]
              .offsetWidth;
            var height = document.getElementsByClassName("MainTT")[0];
            height = height.offsetHeight;

            temp.innerHTML =
              "Width" + width + "Width " + " Heigth" + height + "Heigth";
          }
          document.body.appendChild(temp);
        })
        .then(async () => {
          page.content().then(async a => {
            if (a.match("Ошибка") == null) {
              if (a.indexOf(/Error/) != -1) {
                reject("error");
              }
              var widthT = a.match(/Width([^)]+)Width/)[1];
              var heigthT = a.match(/Heigth([^)]+)Heigth/)[1];
              var currentSchedule = a;
              await page
                .screenshot({
                  clip: {
                    x: 11,
                    y: 7,
                    width: Number(widthT) + 5,
                    height: Number(heigthT) + 5
                  }
                })
                .then(function(buffer) {
                  resolve({ buffer: buffer, currentSchedule: currentSchedule });
                });
            } else {
              reject("error");
            }
          });
        });
    });
  });
}
function getScreenShoot(url) {
  return new Promise((resolve, reject) => {
    var urlToScreenshot = url;
    console.log("Screenshotting...");
    updateBrower().then(async () => {
      const page = await browser.newPage();
      var error = false;
      await page.goto(urlToScreenshot).catch(() => {
        if (error) {
          reject("error");
        }
      });
      await page.screenshot({ fullPage: true }).then(function(buffer) {
        resolve(buffer);
      });
    });
  });
}
module.exports = {
  getScreenShoot: getScreenShoot,
  getScreenShootShedule: getScreenShootShedule,
  updateBrower: updateBrower
};
