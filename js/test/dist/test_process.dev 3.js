"use strict";

var imagemin = require("gulp-imagemin"); // 計時器


var nowtime = 0;
setInterval(function () {
  nowtime = nowtime + 1;
  $(".timimg").text(nowtime);
}, 1000);