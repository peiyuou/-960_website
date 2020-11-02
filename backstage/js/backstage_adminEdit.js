window.addEventListener('load', function() {
    // 更改行業資料
    $('.editShow').hide();
    // let quizEdit = document.getElementsByClassName('quizEdit');

    $('.adminEdit').click(function(e) {
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

            let admin = {};
            admin.AD_MAT_USE = parseInt(td.children('.AD_MAT_USE').val());
            admin.adNo = parseInt(td.children('.adNo').text())
            console.log(admin);

            let adminJson = JSON.stringify(admin);
            let adminXhr = new XMLHttpRequest();
            // console.log(memberXhr);
            adminXhr.open("POST", "backstage_admin.php", true);
            adminXhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            adminXhr.send(`adminJson=${adminJson}`);

            adminXhr.onload = function() {
                if (adminXhr.status == 200) {
                    // alert(adminXhr.responseText);
                    location.reload();
                    // console.log(adminXhr.responseText);
                } else {
                    alert(adminXhr.status);
                }

            }


        }

    });


})