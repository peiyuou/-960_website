window.addEventListener('load', function() {
    // 更改行業資料
    $('.editShow').hide();
    // let quizEdit = document.getElementsByClassName('quizEdit');

    $('.skillEdit').click(function(e) {
        let editBtn = e.target;
        let td = $(editBtn).parent().siblings()
        if (editBtn.innerText == "編輯") {
            editBtn.innerText = '確認';
            $(editBtn).siblings('.editShow').show();
            td.children('.editShow').show();

            //skill
            let ski_name = td.children('.ski_name').text();
            let ski_price = td.children('.ski_price').text();
            let ski_time = td.children('.ski_time').text();
            let ski_intro = td.children('.ski_intro').text();
            let ski_harvest = td.children('.ski_harvest').text();
            let ski_link = td.children('.ski_link').text();
            let ski_tec_name = td.children('.ski_tec_name').text();
            let ski_tec_intro = td.children('.ski_tec_intro').text();
            let ski_outline = td.children('.ski_outline').text();
            let ski_stud = td.children('.ski_stud').text();
            let ski_imgSrc = td.children('.ski_img').attr("src");
            let ski_tec_imgSrc = td.children('.ski_tec_img').attr("src");




            // 找class


            // skill
            let ski_nameClass = td.children(".ski_name").attr('class');
            let ski_priceClass = td.children(".ski_price").attr('class');
            let ski_timeClass = td.children(".ski_time").attr('class');
            let ski_introClass = td.children(".ski_intro").attr('class');
            let ski_harvestClass = td.children(".ski_harvest").attr('class');
            let ski_linkClass = td.children(".ski_link").attr('class');
            let ski_tec_nameClass = td.children(".ski_tec_name").attr('class');
            let ski_tec_introClass = td.children(".ski_tec_intro").attr('class');
            let ski_outlineClass = td.children(".ski_outline").attr('class');
            let ski_studClass = td.children(".ski_stud").attr('class');



            //將所有div改成文字框

            //skill
            td.children(".ski_name").replaceWith(`<input type="text" class="${ski_nameClass}" value="${ski_name}">`);
            td.children(".ski_price").replaceWith(`<input type="text" class="${ski_priceClass}" value="${ski_price}">`);
            td.children(".ski_time").replaceWith(`<input type="text" class="${ski_timeClass}" value="${ski_time}">`);
            td.children(".ski_intro").replaceWith(`<textarea class="${ski_introClass}" cols="20" rows="5">${ski_intro}</textarea>`);
            td.children(".ski_harvest").replaceWith(`<textarea class="${ski_harvestClass}"  cols="20" rows="5">${ski_harvest}</textarea>`);
            td.children(".ski_link").replaceWith(`<textarea class="${ski_linkClass}" cols="20" rows="5">${ski_link}</textarea>`);
            td.children(".ski_tec_name").replaceWith(`<input type="text" class="${ski_tec_nameClass}" value="${ski_tec_name}">`);
            td.children(".ski_tec_intro").replaceWith(`<textarea class="${ski_tec_introClass}" cols="20" rows="5">${ski_tec_intro}</textarea>`);
            td.children(".ski_outline").replaceWith(`<textarea class="${ski_outlineClass}" cols="20" rows="5">${ski_outline}</textarea>`);
            td.children(".ski_stud").replaceWith(`<textarea class="${ski_studClass}" cols="20" rows="5">${ski_stud}</textarea>`);



            //quiz換照片
            let skiImgInput, ski_img, skiTecImgInput, ski_tec_img;

            //skill換圖
            td.children('.skiImgInput').change(function(e) {
                skiImgInput = e.target.files[0];
                ski_img = $(this).parent().children('.ski_img');
                let readFile = new FileReader();
                readFile.readAsDataURL(skiImgInput);
                readFile.onload = function() {
                    ski_img.attr('src', readFile.result);
                }
                skiImgInput_name = skiImgInput.name;
            });

            td.children('.skiTecImgInput').change(function(e) {
                skiTecImgInput = e.target.files[0];
                ski_tec_img = $(this).parent().children('.ski_tec_img');
                let readFile = new FileReader();
                readFile.readAsDataURL(skiTecImgInput);
                readFile.onload = function() {
                    ski_tec_img.attr('src', readFile.result);
                }
                skiTecImgInput_name = skiTecImgInput.name;
            });




            $('.cancel').click(function() {
                $(this).parent().children('.editShow').hide();
                $(this).parent().siblings().children('.editShow').hide();
                // console.log($(this).parent().children('.quizShow'));
                console.log($(this).parent().find('button.edit').text())
                $(this).parent().find('button.edit').text('編輯');

                //skill
                td.children(".ski_name").replaceWith(`<div class="${ski_nameClass}">${ski_name}</div>`);
                td.children(".ski_price").replaceWith(`<div class="${ski_priceClass}">${ski_price}</div>`);
                td.children(".ski_time").replaceWith(`<div class="${ski_timeClass}">${ski_time}</div>`);
                td.children(".ski_intro").replaceWith(`<div class="${ski_introClass}">${ski_intro}</div>`);
                td.children(".ski_harvest").replaceWith(`<div class="${ski_harvestClass}" >${ski_harvest}</div>`);
                td.children(".ski_link").replaceWith(`<div class="${ski_linkClass}">${ski_link}</div>`);
                td.children(".ski_tec_name").replaceWith(`<div class="${ski_tec_nameClass}">${ski_tec_name}</div>`);
                td.children(".ski_tec_intro").replaceWith(`<div class="${ski_tec_introClass}">${ski_tec_intro}</div>`);
                td.children(".ski_outline").replaceWith(`<div class="${ski_outlineClass}">${ski_outline}</div>`);
                td.children(".ski_stud").replaceWith(`<div class="${ski_studClass}">${ski_stud}</div>`);
                td.children('.ski_img').attr("src", ski_imgSrc);
                td.children('.ski_tec_img').attr("src", ski_tec_imgSrc);
                td.children('.skiImgInput').value = "";
                td.children('.skiTecImgInput').value = "";



            })


        } else {
            // console.log(QUIZ_PIC_ONE_name)
            // console.log(QUIZ_PIC_TWO_name)
            // console.log(indPic_name)


            //career data
            let skill = {};
            skill.skiNo = parseInt(td.children(".skiNo").text());
            skill.ski_name = td.children(".ski_name").val();
            skill.skiType = td.children(".skiType").val();
            skill.ski_price = parseInt(td.children(".ski_price").val());
            skill.ski_time = td.children(".ski_time").val();
            skill.ski_intro = td.children(".ski_intro").val();
            skill.ski_harvest = td.children(".ski_harvest").val();
            skill.ski_link = td.children(".ski_link").val();
            skill.ski_tec_name = td.children(".ski_tec_name").val();
            skill.ski_tec_intro = td.children(".ski_tec_intro").val();
            skill.ski_outline = td.children(".ski_outline").val();
            skill.ski_stud = td.children(".ski_stud").val();
            skill.skill_USE = parseInt(td.children('.skill_USE').val())
            skill.skiTecImgInput = td.children(".ski_tec_img").attr("src");
            skill.skiTecImgInput_name = skiTecImgInput_name;
            skill.skiImgInput = td.children(".ski_img").attr("src");
            skill.skiImgInput_name = skiImgInput_name;
            console.log(skill);

            let skillJson = JSON.stringify(skill);
            let skillXhr = new XMLHttpRequest();
            skillXhr.open("POST", "backstage_course.php", true);
            skillXhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            skillXhr.send(`skillJson=${skillJson}`);
            console.log(skillXhr);

            skillXhr.onload = function() {
                if (skillXhr.status == 200) {
                    // alert(skillXhr.responseText);
                    location.reload();
                    // console.log(skillXhr.responseText);
                } else {
                    // alert(skillXhr.status);
                }
            }




        }

    });


})