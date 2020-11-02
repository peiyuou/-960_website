//上傳
let arr = new Array();
arr[0] = document.getElementById('frontStyle1');
arr[1] = document.getElementById('frontStyle2Top');
arr[2] = document.getElementById('frontStyle2Left');
arr[3] = document.getElementById('frontStyle2Right');
arr[4] = document.getElementById('frontStyle3Left');
arr[5] = document.getElementById('frontStyle3Right');


//迴圈定義事件
for (let i = 0; i < arr.length; i++) {
  // 拖曳事件
  arr[i].ondragover = dragOver;
  arr[i].ondrop = dropped;
  arr[i].index = i;
  // 點擊上傳事件
  //label裡的input onchange
  arr[i].getElementsByTagName("input")[0].onchange = changed;
  arr[i].getElementsByTagName("input")[0].index = i;

}

function dragOver(e) {
  e.preventDefault();
}

function dropped(e) {
  //上面的i傳下來
  let i = e.target.index;
  e.preventDefault();
  let file = e.dataTransfer.files[0];
  let readFile = new FileReader();
  readFile.readAsDataURL(file);
  readFile.addEventListener('load', function () {

    arr[i].style.background = `url(${readFile.result})`;
    arr[i].style.backgroundSize = 'cover';
    arr[i].style.backgroundRepeat = 'no-repeat';
    arr[i].style.backgroundPosition = 'center';
    let p = arr[i].getElementsByTagName("p");
    p[0].style.opacity = 0;
  });
};
//input上傳照片
function changed(e) {
  let i = e.target.index;
  let file = e.target.files[0];
  let readFile = new FileReader();
  readFile.readAsDataURL(file);
  readFile.addEventListener('load', function () {
    arr[i].style.background = `url(${readFile.result})`;
    arr[i].style.backgroundSize = 'cover';
    arr[i].style.backgroundRepeat = 'no-repeat';
    arr[i].style.backgroundPosition = 'center';
    //上傳後隱藏提示字
    let p = arr[i].getElementsByTagName("p");
    p[0].style.opacity = 0;

  });
};
//字數限制
var lenF = document.getElementById('leftWrite');
var width = $(window).width();

var count = 0;
lenF.addEventListener('focus', function () {
  // lenF.innerText = '';
  if (count == 0) {
    document.getElementById('leftWrite').innerText = '';
    count += 1;
  } else {
    document.getElementById('leftWrite').value = document.getElementById('leftWrite').innerText;
  }


});




//  進來先判斷
if (width >= 1200) {
  lenF.addEventListener('keyup', function () {
    var lenF = $('#leftWrite'),
      cutCount = 350,
      openTxt = '…超過字數';
    lenF.each(function () {
      var self = $(this),
        selfText = self.text(),
        textLength = selfText.length,
        textTrim = selfText.substr(0, cutCount);

      function textTrimming() {
        self.html(textTrim + '<span style="color:#ccc;">' + openTxt + '</span>').css({
          visibility: 'visible'
        });
      }

      if (cutCount < textLength) {
        textTrimming();
      } else if (cutCount >= textLength) {
        self.css({
          visibility: 'visible'
        });
      }
    });
  });

} else if (width < 1200 && width > 767) {
  var lenF = $('#leftWrite'),
    openTxt = '…超過字數',
    x = 21 - Math.ceil(1200 - width) / 50,
    y = 17 - Math.ceil(1200 - width) / 70,
    cutCount = x * y;
  lenF.addEventListener('keyup', function () {

    lenF.each(function () {
      var self = $(this),
        selfText = self.text(),
        textLength = selfText.length,
        textTrim = selfText.substr(0, cutCount);

      function textTrimming() {
        self.html(textTrim + '<span style="color:#ccc;">' + openTxt + '</span>').css({
          visibility: 'visible'
        });
      }

      if (cutCount < textLength) {
        textTrimming();
      } else if (cutCount >= textLength) {
        self.css({
          visibility: 'visible'
        });
      }
    });
  });
} else {
  var lenF = $('#leftWrite'),
    openTxt = '…超過字數',
    x = 18 - Math.ceil(767 - width) / 38,
    y = 14 - Math.ceil(767 - width) / 50,
    cutCount = x * y;
  lenF.addEventListener('keyup', function () {
    lenF.each(function () {
      var self = $(this),
        selfText = self.text(),
        textLength = selfText.length,
        textTrim = selfText.substr(0, cutCount);

      function textTrimming() {
        self.html(textTrim + '<span style="color:#ccc;">' + openTxt + '</span>').css({
          visibility: 'visible'
        });
      }

      if (cutCount < textLength) {
        textTrimming();
      } else if (cutCount >= textLength) {
        self.css({
          visibility: 'visible'
        });
      }
    });
  });
}

//  resize再判斷一次
$(window).resize(function () {
  if ($(window).width() >= 1200) {
    lenF.maxLength = 357;
  } else if ($(window).width() < 1200 && $(window).width() > 767) {
    let x = 21 - Math.ceil(1200 - width) / 50;
    let y = 17 - Math.ceil(1200 - width) / 70;
    lenF.maxLength = x * y;
  } else {
    let x = 18 - Math.ceil(767 - width) / 38;
    let y = 14 - Math.ceil(767 - width) / 50;
    lenF.maxLength = x * y;
  }

});