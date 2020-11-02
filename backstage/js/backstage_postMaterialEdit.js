window.addEventListener('load', function() {
    // 更改行業資料
    $('.editShow').hide();
    // let quizEdit = document.getElementsByClassName('quizEdit');

    $('.pos_edit').click(function(e) {
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

            let postMaterial = {};
            postMaterial.POS_MAT_USE = parseInt(td.children('.POS_MAT_USE').val());
            postMaterial.POS_MAT_NO = parseInt(td.children('.POS_MAT_NO').text())
            console.log(postMaterial);

            let postJson = JSON.stringify(postMaterial);
            let postMaterialXhr = new XMLHttpRequest();
            // console.log(artReportXhr);
            postMaterialXhr.open("POST", "backstage_postMaterial.php", true);
            postMaterialXhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            postMaterialXhr.send(`postJson=${postJson}`);

            postMaterialXhr.onload = function() {
                if (postMaterialXhr.status == 200) {
                    // alert(postMaterialXhr.responseText);
                    location.reload();
                    // console.log(postMaterialXhr.responseText);
                } else {
                    // alert(postMaterialXhr.status);
                }

            }


        }

    });


})