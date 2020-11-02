window.addEventListener('load', function() {
    // 更改行業資料
    $('.editShow').hide();
    // let quizEdit = document.getElementsByClassName('quizEdit');

    $('.quizEdit').click(function(e) {
        let editBtn = e.target;
        let td = $(editBtn).parent().siblings()
        if (editBtn.innerText == "編輯") {
            editBtn.innerText = '確認';
            $(editBtn).siblings('.editShow').show();
            td.children('.editShow').show();
            //quiz
            let quizCon = td.children(".QUIZ_CON").text();
            let quizOneContent = td.children(".QUIZ_ONE_CONTENT").text();
            let quizTwoContent = td.children(".QUIZ_TWO_CONTENT").text();
            let quizImgOneSrc = td.children('.quizImgOne').attr("src");
            let quizImgTwoSrc = td.children('.quizImgTwo').attr("src");





            // 找class
            //quiz
            let quizClass = td.children(".QUIZ_CON").attr('class');
            let QUIZ_ONE_CONTENTclass = td.children(".QUIZ_ONE_CONTENT").attr('class');
            let QUIZ_TWO_CONTENTclass = td.children(".QUIZ_TWO_CONTENT").attr('class');




            //將所有div改成文字框
            // quiz

            td.children(".QUIZ_CON").replaceWith(`<textarea class="${quizClass}" cols="20" rows="5">${quizCon}</textarea>`);
            td.children(".QUIZ_ONE_CONTENT").replaceWith(`<textarea class="${QUIZ_ONE_CONTENTclass}" cols="20" rows="5">${quizOneContent}</textarea>`);
            td.children(".QUIZ_TWO_CONTENT").replaceWith(`<textarea class="${QUIZ_TWO_CONTENTclass}" cols="20" rows="5">${quizTwoContent}</textarea>`);




            //quiz換照片
            let QUIZ_PIC_ONE,
                quizImgOne,
                QUIZ_PIC_TWO,
                quizImgTwo;

            td.children('.QUIZ_PIC_ONE').change(function(e) {
                // console.log(e.target);
                // console.log(e.target.files[0]);
                QUIZ_PIC_ONE = e.target.files[0];
                // console.log(QUIZ_PIC_ONE);
                quizImgOne = $(this).parent().children('.quizImgOne');
                let readFile = new FileReader();
                readFile.readAsDataURL(QUIZ_PIC_ONE);
                readFile.onload = function() {
                    quizImgOne.attr('src', readFile.result);
                }
                QUIZ_PIC_ONE_name = QUIZ_PIC_ONE.name;
            });

            td.children('.QUIZ_PIC_TWO').change(function(e) {
                QUIZ_PIC_TWO = e.target.files[0];
                quizImgTwo = $(this).parent().children('.quizImgTwo')
                let readFile = new FileReader();
                readFile.onload = function() {
                    quizImgTwo.attr('src', readFile.result);

                }
                readFile.readAsDataURL(QUIZ_PIC_TWO);
                QUIZ_PIC_TWO_name = QUIZ_PIC_TWO.name;
            })




            $('.cancel').click(function() {
                $(this).parent().children('.editShow').hide();
                $(this).parent().siblings().children('.editShow').hide();
                // console.log($(this).parent().children('.quizShow'));
                console.log($(this).parent().find('button.edit').text())
                $(this).parent().find('button.edit').text('編輯');
                td.children(".QUIZ_CON").replaceWith(`<div class="${quizClass}" >${quizCon}</div>`);
                td.children(".QUIZ_ONE_CONTENT").replaceWith(`<div class="${QUIZ_ONE_CONTENTclass}">${quizOneContent}</div>`);
                td.children(".QUIZ_TWO_CONTENT").replaceWith(`<div class="${QUIZ_TWO_CONTENTclass}" >${quizTwoContent}</div>`);
                td.children('.quizImgOne').attr("src", quizImgOneSrc);
                td.children('.quizImgTwo').attr("src", quizImgTwoSrc);
                td.children('.QUIZ_PIC_ONE').value = "";
                td.children('.QUIZ_PIC_TWO').value = "";
                // $('.cancel').hide();



            })


        } else {
            // console.log(QUIZ_PIC_ONE_name)
            // console.log(QUIZ_PIC_TWO_name)
            // console.log(indPic_name)

            //quiz data
            let quiz = {};
            quiz.quizNo = parseInt(td.children('.quizNo').text());
            quiz.QUIZ_CONTxt = td.children('.QUIZ_CON').val();
            quiz.QUIZ_ONETxt = td.children(".QUIZ_ONE_CONTENT").val();
            quiz.QUIZ_TWOTxt = td.children(".QUIZ_TWO_CONTENT").val();
            quiz.stOutput = td.children('.firstType').val();
            quiz.ndOutput = td.children('.secondType').val();
            quiz.QUIZ_USE = parseInt(td.children('.QUIZ_USE').val());
            quiz.quizImgOneSrc = td.children('.quizImgOne').attr("src");
            quiz.quizImgTwoSrc = td.children('.quizImgTwo').attr("src");
            quiz.quizImgOneName = QUIZ_PIC_ONE_name;
            quiz.quizImgTwoName = QUIZ_PIC_TWO_name;
            console.log(quiz);

            let quizJson = JSON.stringify(quiz);
            let quizXhr = new XMLHttpRequest();
            // console.log(quizXhr);
            quizXhr.open("POST", "backstage_quiz.php", true);
            quizXhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            quizXhr.send(`quizJson=${quizJson}`);

            quizXhr.onload = function() {
                if (quizXhr.status == 200) {
                    // alert(quizXhr.responseText);
                    location.reload();
                    // console.log(quizXhr.responseText);
                } else {
                    alert(quizXhr.status);
                }

            }


        }

    });


})