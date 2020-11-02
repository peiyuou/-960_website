window.addEventListener('load', function() {
    // 更改行業資料
    $('.editShow').hide();
    // let quizEdit = document.getElementsByClassName('quizEdit');

    $('.careerEdit').click(function(e) {
        let editBtn = e.target;
        let td = $(editBtn).parent().siblings()
        if (editBtn.innerText == "編輯") {
            editBtn.innerText = '確認';
            $(editBtn).siblings('.editShow').show();
            td.children('.editShow').show();

            //career
            let indName = td.children(".indName").text();
            let indIntro = td.children(".indIntro").text();
            let indContent = td.children(".indContent").text();
            let indSkill = td.children(".indSkill").text();
            let firstYearLow = td.children(".firstYearLow").text();
            let firstYearHigh = td.children(".firstYearHigh").text();
            let thirdYearLow = td.children(".thirdYearLow").text();
            let thirdYearHigh = td.children(".thirdYearHigh").text();
            let fifthYearLow = td.children(".fifthYearLow").text();
            let fifthYearHigh = td.children(".fifthYearHigh").text();
            let tenYearLow = td.children(".tenYearLow").text();
            let tenYearHigh = td.children(".tenYearHigh").text();
            let upYearLow = td.children(".upYearLow").text();
            let upYearHigh = td.children(".upYearHigh").text();
            let indImgSrc = td.children('.indImg').attr("src");

            // 找class
            //career
            let indNameClass = td.children(".indName").attr('class');
            let indIntroClass = td.children(".indIntro").attr('class');
            let indContentClass = td.children(".indContent").attr('class');
            let indSkillClass = td.children(".indSkill").attr('class');
            let firstYearLowClass = td.children(".firstYearLow").attr('class');
            let firstYearHighClass = td.children(".firstYearHigh").attr('class');
            let thirdYearLowClass = td.children(".thirdYearLow").attr('class');
            let thirdYearHighClass = td.children(".thirdYearHigh").attr('class');
            let fifthYearLowClass = td.children(".fifthYearLow").attr('class');
            let fifthYearHighClass = td.children(".fifthYearHigh").attr('class');
            let tenYearLowClass = td.children(".tenYearLow").attr('class');
            let tenYearHighClass = td.children(".tenYearHigh").attr('class');
            let upYearLowClass = td.children(".upYearLow").attr('class');
            let upYearHighClass = td.children(".upYearHigh").attr('class');




            //將所有div改成文字框

            //career
            td.children(".indName").replaceWith(`<input type="text" class="${indNameClass}" value="${indName}">`);
            td.children(".indIntro").replaceWith(`<textarea class="${indIntroClass}" cols="20" rows="5">${indIntro}</textarea>`);
            td.children(".indContent").replaceWith(`<textarea class="${indContentClass}" cols="20" rows="5">${indContent}</textarea>`);
            td.children(".indSkill").replaceWith(`<textarea class="${indSkillClass}" cols="20" rows="5">${indSkill}</textarea>`);
            td.children(".firstYearLow").replaceWith(`<input type="text" class="${firstYearLowClass}" value="${firstYearLow}">`);
            td.children(".firstYearHigh").replaceWith(`<input type="text" class="${firstYearHighClass}" value="${firstYearHigh}">`);
            td.children(".thirdYearLow").replaceWith(`<input type="text" class="${thirdYearLowClass}" value="${thirdYearLow}">`);
            td.children(".thirdYearHigh").replaceWith(`<input type="text" class="${thirdYearHighClass}" value="${thirdYearHigh}">`);
            td.children(".fifthYearLow").replaceWith(`<input type="text" class="${fifthYearLowClass}" value="${fifthYearLow}">`);
            td.children(".fifthYearHigh").replaceWith(`<input type="text" class="${fifthYearHighClass}" value="${fifthYearHigh}">`);
            td.children(".tenYearLow").replaceWith(`<input type="text" class="${tenYearLowClass}" value="${tenYearLow}">`);
            td.children(".tenYearHigh").replaceWith(`<input type="text" class="${tenYearHighClass}" value="${tenYearHigh}">`);
            td.children(".upYearLow").replaceWith(`<input type="text" class="${upYearLowClass}" value="${upYearLow}">`);
            td.children(".upYearHigh").replaceWith(`<input type="text" class="${upYearHighClass}" value="${upYearHigh}">`);




            //quiz換照片
            let indPic,
                indImg;


            //career換圖
            td.children('.indPic').change(function(e) {
                // console.log(e.target);
                // console.log(e.target.files[0]);
                indPic = e.target.files[0];
                // console.log(indPic);
                indImg = $(this).parent().children('.indImg');
                let readFile = new FileReader();
                readFile.readAsDataURL(indPic);
                readFile.onload = function() {
                    indImg.attr('src', readFile.result);
                }
                indPic_name = indPic.name;
            });





            $('.cancel').click(function() {
                $(this).parent().children('.editShow').hide();
                $(this).parent().siblings().children('.editShow').hide();
                // console.log($(this).parent().find('button.edit').text())
                $(this).parent().find('button.edit').text('編輯');
                // $('.cancel').hide();

                //career
                td.children(".indName").replaceWith(`<div class="${indNameClass}">${indName}</div>`);
                td.children(".indIntro").replaceWith(`<div class="${indIntroClass}">${indIntro}</div>`);
                td.children(".indContent").replaceWith(`<div class="${indContentClass}">${indContent}</div>`);
                td.children(".indSkill").replaceWith(`<div class="${indSkillClass}">${indSkill}</div>`);
                td.children(".firstYearLow").replaceWith(`<div class="${firstYearLowClass}">${firstYearLow}</div>`);
                td.children(".firstYearHigh").replaceWith(`<div class="${firstYearHighClass}">${firstYearHigh}</div>`);
                td.children(".thirdYearLow").replaceWith(`<div class="${thirdYearLowClass}">${thirdYearLow}</div>`);
                td.children(".thirdYearHigh").replaceWith(`<div class="${thirdYearHighClass}">${thirdYearHigh}</div>`);
                td.children(".fifthYearLow").replaceWith(`<div class="${fifthYearLowClass}">${fifthYearLow}</div>`);
                td.children(".fifthYearHigh").replaceWith(`<div class="${fifthYearHighClass}">${fifthYearHigh}</div>`);
                td.children(".tenYearLow").replaceWith(`<div class="${tenYearLowClass}">${tenYearLow}</div>`);
                td.children(".tenYearHigh").replaceWith(`<div class="${tenYearHighClass}">${tenYearHigh}</div>`);
                td.children(".upYearLow").replaceWith(`<div class="${upYearLowClass}">${upYearLow}</div>`);
                td.children(".upYearHigh").replaceWith(`<div class="${upYearHighClass}">${upYearHigh}</div>`);
                td.children('.indImg').attr("src", indImgSrc);
                td.children('.indPic').value = "";




            })


        } else {
            // console.log(QUIZ_PIC_ONE_name)
            // console.log(QUIZ_PIC_TWO_name)
            // console.log(indPic_name)

            //career data
            let career = {};
            career.indNo = parseInt(td.children(".indNo").text());
            career.indNameUpdate = td.children(".indName").val();
            career.indIntroUpdate = td.children(".indIntro").val();
            career.indContentUpdate = td.children(".indContent").val();
            career.indSkillUpdate = td.children(".indSkill").val();
            career.indTypeUpdate = td.children(".indType").val();
            career.indImgUpdate = td.children(".indImg").attr("src");
            career.indPic_name = indPic_name;

            career.firstYearLowUpdate = td.children(".firstYearLow").val();
            career.firstYearHighUpdate = td.children(".firstYearHigh").val();
            career.thirdYearLowUpdate = td.children(".thirdYearLow").val();
            career.thirdYearHighUpdate = td.children(".thirdYearHigh").val();
            career.fifthYearLowUpdate = td.children(".fifthYearLow").val();
            career.fifthYearHighUpdate = td.children(".fifthYearHigh").val();
            career.tenYearLowUpdate = td.children(".tenYearLow").val();
            career.tenYearHighUpdate = td.children(".tenYearHigh").val();
            career.upYearLowUpdate = td.children(".upYearLow").val();
            career.upYearHighUpdate = td.children(".upYearHigh").val();

            console.log(career);

            let careerJson = JSON.stringify(career);
            let careerXhr = new XMLHttpRequest();
            console.log(careerXhr);
            careerXhr.open("POST", "backstage_career.php", true);
            careerXhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            careerXhr.send(`careerJson=${careerJson}`);

            careerXhr.onload = function() {
                if (careerXhr.status == 200) {
                    // alert(careerXhr.responseText);
                    location.reload();
                    // console.log(careerXhr.responseText);
                } else {
                    alert(careerXhr.status);
                }
            }




        }

    });


})