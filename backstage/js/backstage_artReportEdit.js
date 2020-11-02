window.addEventListener('load', function() {
    // 更改行業資料
    $('.editShow').hide();
    // let quizEdit = document.getElementsByClassName('quizEdit');

    $('.artReportEdit').click(function(e) {
        let editBtn = e.target;
        let td = $(editBtn).parent().siblings()
        if (editBtn.innerText == "編輯") {
            editBtn.innerText = '確認';
            $(editBtn).siblings('.editShow').show();
            td.children('.editShow').show();







            $('.cancel').click(function() {
                $(this).parent().children('.editShow').hide();
                $(this).parent().siblings().children('.editShow').hide();
                // console.log($(this).parent().children('.quizShow'));
                // console.log($(this).parent().find('button.edit').text())
                $(this).parent().find('button.edit').text('編輯');

                // $('.cancel').hide();



            })


        } else {

            let artReport = {};
            artReport.ART_REP_PASS = parseInt(td.children('.ART_REP_PASS').val());
            artReport.ART_REP_NO = parseInt(td.children('.ART_REP_NO').text())
            artReport.DIS_NO = parseInt(td.children('.DIS_NO').text())
            console.log(artReport);

            let artReportJson = JSON.stringify(artReport);
            let artReportXhr = new XMLHttpRequest();
            // console.log(artReportXhr);
            artReportXhr.open("POST", "backstage_artReport.php", true);
            artReportXhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            artReportXhr.send(`artReportJson=${artReportJson}`);

            artReportXhr.onload = function() {
                if (artReportXhr.status == 200) {
                    // alert(artReportXhr.responseText);
                    location.reload();
                    // console.log(artReportXhr.responseText);
                } else {
                    alert(artReportXhr.status);
                }

            }


        }

    });


})