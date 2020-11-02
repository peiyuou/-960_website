window.addEventListener('load', function() {
    // 更改行業資料
    $('.editShow').hide();
    // let quizEdit = document.getElementsByClassName('quizEdit');

    $('.announceEdit').click(function(e) {
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

            let announce = {};
            announce.ANN_USE = parseInt(td.children('.ANN_USE').val());
            announce.ANN_NO = parseInt(td.children('.ANN_NO').text())
            console.log(announce);

            let announceJson = JSON.stringify(announce);
            let announceXhr = new XMLHttpRequest();
            // console.log(artReportXhr);
            announceXhr.open("POST", "backstage_announce.php", true);
            announceXhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            announceXhr.send(`announceJson=${announceJson}`);

            announceXhr.onload = function() {
                if (announceXhr.status == 200) {
                    // alert(announceXhr.responseText);
                    location.reload();
                    // console.log(announceXhr.responseText);
                } else {
                    alert(announceXhr.status);
                }

            }


        }

    });


})