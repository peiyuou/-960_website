   $(function () {
     $('#how').click(function () {
       //获取当前滚动条距离顶部的位置
       var h = $(window).scrollTop();
       $('body,html').animate({
         scrollTop: h + 500
       }, 800); //点击按钮向下移动500px，时间为800毫秒

     });
     //  進來先判斷
     if ($(window).width() < 575) {
       $('.mas').addClass('col-sm-12');
     } else {};

     //  resize再判斷一次
     $(window).resize(function () {
       if ($(window).width() < 575) {
         $('.mas').addClass('col-sm-12');
       } else {
         $('.mas').removeClass('col-sm-12');
       };

     });
   });