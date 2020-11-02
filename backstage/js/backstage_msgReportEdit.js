window.addEventListener('load', function () {
    // 更改行業資料
    $('.editShow').hide();
    // let quizEdit = document.getElementsByClassName('quizEdit');

    $('.msgReportEdit').click(function (e) {
        let editBtn = e.target;
        let td = $(editBtn).parent().siblings()
        if (editBtn.innerText == "編輯") {
            editBtn.innerText = '確認';
            $(editBtn).siblings('.editShow').show();
            td.children('.editShow').show();







            $('.cancel').click(function () {
                $(this).parent().children('.editShow').hide();
                $(this).parent().siblings().children('.editShow').hide();
                // console.log($(this).parent().children('.quizShow'));
                // console.log($(this).parent().find('button.edit').text())
                $(this).parent().find('button.edit').text('編輯');

                // $('.cancel').hide();



            })


        } else {

            let msgReport = {};
            msgReport.MES_REP_PASS = parseInt(td.children('.MES_REP_PASS').val());
            msgReport.MES_REP_NO = parseInt(td.children('.MES_REP_NO').text())
            msgReport.DIS_MES_NO = parseInt(td.children('.DIS_MES_NO').text())
            // console.log(msgReport);

            let msgReportJson = JSON.stringify(msgReport);
            let msgReportXhr = new XMLHttpRequest();
            // console.log(artReportXhr);
            msgReportXhr.open("POST", "backstage_msgReport.php", true);
            msgReportXhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            msgReportXhr.send(`msgReportJson=${msgReportJson}`);

            msgReportXhr.onload = function () {
                if (msgReportXhr.status == 200) {
                    // alert(msgReportXhr.responseText);
                    location.reload();
                    // console.log(msgReportXhr.responseText);
                } else {
                    // alert(msgReportXhr.status);
                }

            }


        }

    });


})