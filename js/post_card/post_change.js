$(function () {
    //換正面格式
    $('.f_img_s1').click(function () {
        $('#frontStyle1').css('display', 'inline-block');
        $('#frontStyle2').hide();
        $('#frontStyle3').hide();
        $(this).parent().siblings().removeClass("active");
        $(this).parent().addClass("active");
    });
    $('.f_img_s2').click(function () {
        $('#frontStyle2').css('display', 'inline-block');
        $('#frontStyle1').hide();
        $('#frontStyle3').hide();
        $(this).parent().siblings().removeClass("active");
        $(this).parent().addClass("active");
    });
    $('.f_img_s3').click(function () {
        $('#frontStyle3').css('display', 'flex');
        $('#frontStyle2').hide();
        $('#frontStyle1').hide();
        $(this).parent().siblings().removeClass("active");
        $(this).parent().addClass("active");
    });

    //桌機換格式的頁籤
    let deskLine = $(".post_desk .style_all_outline");
    let deskFront = $(".post_desk .front_style");


    let deskStamps = $(".post_desk .change_style .style_all_stamps");
    let deskPostmarks = $(".post_desk .change_style .style_all_postmarks");

    //先隱藏正面與背面其他格式
    deskLine.hide();
    deskPostmarks.hide();
    //點擊正面換格式
    $(".mark #frontStyle").click(function () {
        deskFront.show();
        deskLine.hide();
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    });
    $(".mark #frontOutline").click(function () {
        deskLine.show();
        deskFront.hide();
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    });

    //點擊背面換格式
    $(".mark #backStamps").click(function () {
        deskStamps.show();
        deskPostmarks.hide();
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
    });

    $(".mark #backPostmarks").click(function () {
        deskStamps.hide();
        deskPostmarks.show();
        $(this).siblings().removeClass("active");
        $(this).addClass("active");

    });
    //一開始先顯示正面 背面先隱藏
    $(".postcard_back").hide();
    $("#backAllStyle").hide();

    // 按背面時隱藏正面
    $("#toBack").click(function () {
        $(".postcard_front").hide();
        $('#frontAllStyle').hide();
        $(".postcard_back").show();
        $("#backAllStyle").show();


    });
    $("#toFront").click(function () {
        $(".postcard_back").hide();
        $('#frontAllStyle').show();
        $(".postcard_front").show();
        $("#backAllStyle").hide();
    });
    //  進來先判斷
    if ($(window).width() < 575) {

        $('.drag').text('點擊區塊上傳');
    } else {
        $('.drag').text('拖曳或點擊此區塊上傳');
    };

    //  resize再判斷一次
    $(window).resize(function () {
        if ($(window).width() < 575) {
            $('.drag').text('點擊區塊上傳');
        } else {
            $('.drag').text('拖曳或點擊此區塊上傳');
        };

    });
    //拖曳郵戳
    $('.mark_position').draggable();
});