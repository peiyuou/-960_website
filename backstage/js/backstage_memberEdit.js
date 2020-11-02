window.addEventListener('load', function() {
    // 更改行業資料
    $('.editShow').hide();
    // let quizEdit = document.getElementsByClassName('quizEdit');

    $('.memberEdit').click(function(e) {
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

            let member = {};
            member.MEM_USE = parseInt(td.children('.MEM_USE').val());
            member.memNo = parseInt(td.children('.memNo').text())
            console.log(member);

            let memberJson = JSON.stringify(member);
            let memberXhr = new XMLHttpRequest();
            // console.log(memberXhr);
            memberXhr.open("POST", "backstage_member.php", true);
            memberXhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            memberXhr.send(`memberJson=${memberJson}`);

            memberXhr.onload = function() {
                if (memberXhr.status == 200) {
                    // alert(memberXhr.responseText);
                    location.reload();
                    // console.log(memberXhr.responseText);
                } else {
                    // alert(memberXhr.status);
                }

            }


        }

    });


})