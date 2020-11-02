window.addEventListener("load", function () {
    //清空會員查詢值
    document.getElementById('search_mem_no').addEventListener('click', function () {
        document.getElementById('MemSearch').value = '';

    });
    //清空訂單查詢值
    document.getElementById('searchOrd').addEventListener('click', function () {
        document.getElementById('orderSearch').value = '';

    });
    // 增加新管理員
    $('#newAdForm').hide();
    $('#backAd').hide();
    $('#newAdBtn').click(function () {
        $('#newAdForm').show();
        $('#adTable').hide();
        $('#backAd').show();
        $('#newAdBtn').hide();
        //密碼小眼睛
        $('#showPassword').click(function () {
            showHide();
        });

    });
    //密碼小眼睛
    let pwd = document.getElementById('AD_PASSWORD');
    let eye = document.getElementById('showPassword');

    function showHide() {

        if (pwd.type == "password") {
            pwd.type = "text";
            eye.className = 'far fa-eye-slash';
        } else {
            pwd.type = "password";
            eye.className = 'far fa-eye';
        }
    };
    //返回全部管理員
    $('#backAd').click(function () {
        $('#newAdBtn').show();
        $('#adTable').show();
        $('#newAdForm').hide();
        $('#backAd').hide();
    });
    // 側邊欄切換
    $('.list li').click(function () {
        $(this).siblings().removeClass("active");
        $(this).parent().siblings().children().removeClass("active");
        $(this).addClass("active");
    });




    //新增明信片
    $('#newPosForm').hide();
    $('#backPost').hide();
    $('#newPostBtn').click(function () {
        $('#newPosForm').show();
        $('#backPost').show();
        $('#postTable').hide();
        $('#newPostBtn').hide();
    });
    //返回全部明信片
    $('#backPost').click(function () {
        $('#newPosForm').hide();
        $('#backPost').hide();
        $('#postTable').show();
        $('#newPostBtn').show();
    })
    //明信片預覽照片
    document.getElementById('postImg').onchange = postImg1Change;

    function postImg1Change() {
        let postImg = document.getElementById('postImg').files[0];
        let readFile = new FileReader();
        readFile.readAsDataURL(postImg);
        readFile.addEventListener('load', function () {
            let postNew = document.getElementById('postNew');
            let postImg_show = document.querySelector('.postImg_show');
            postNew.src = readFile.result;
            postImg_show.style.height = 'auto';


        });
    };
    //新增題目預覽照片
    document.getElementById('quiz_pic_one').onchange = quiz1Change;
    document.getElementById('quiz_pic_two').onchange = quiz2Change;

    function quiz1Change() {
        let quiz_pic_one = document.getElementById('quiz_pic_one').files[0];
        let readFile = new FileReader();
        readFile.readAsDataURL(quiz_pic_one);
        readFile.addEventListener('load', function () {
            let quiz_pic_one_show = document.getElementById('quiz_pic_one_show');
            let quizShowPreImg1 = document.getElementById('quizShowPreImg1');
            quiz_pic_one_show.src = readFile.result;
            quizShowPreImg1.style.height = 'auto';


        });
    };

    function quiz2Change() {
        let quiz_pic_two = document.getElementById('quiz_pic_two').files[0];
        let readFile = new FileReader();
        readFile.readAsDataURL(quiz_pic_two);
        readFile.addEventListener('load', function () {
            let quiz_pic_two_show = document.getElementById('quiz_pic_two_show');
            let quizShowPreImg2 = document.getElementById('quizShowPreImg2');
            quiz_pic_two_show.src = readFile.result;
            quizShowPreImg2.style.height = 'auto';


        });
    };

    //新增課程預覽照片
    document.getElementById('skiTecImg').onchange = skiTecImgChange;
    document.getElementById('skiImg').onchange = skiImgChange;

    function skiTecImgChange() {
        let skiTecImg = document.getElementById('skiTecImg').files[0];
        let readFile = new FileReader();
        readFile.readAsDataURL(skiTecImg);
        readFile.addEventListener('load', function () {
            let ski_tec_img_show = document.getElementById('ski_tec_img_show');
            let skiTecPre = document.getElementById('skiTecPre');
            ski_tec_img_show.src = readFile.result;
            skiTecPre.style.height = 'auto';


        });
    };

    function skiImgChange() {
        let skiImg = document.getElementById('skiImg').files[0];
        let readFile = new FileReader();
        readFile.readAsDataURL(skiImg);
        readFile.addEventListener('load', function () {
            let ski_img_show = document.getElementById('ski_img_show');
            let skiPre = document.getElementById('skiPre');
            ski_img_show.src = readFile.result;
            skiPre.style.height = 'auto';


        });
    };
    //新增行業預覽照片
    document.getElementById('ind_int_picture').onchange = ind_int_pictureChange;


    function ind_int_pictureChange() {
        let ind_int_picture = document.getElementById('ind_int_picture').files[0];
        let readFile = new FileReader();
        readFile.readAsDataURL(ind_int_picture);
        readFile.addEventListener('load', function () {
            let indPreShow = document.getElementById('indPreShow');
            let indPre = document.getElementById('indPre');
            indPreShow.src = readFile.result;
            indPre.style.height = 'auto';


        });
    };
    //找hidden值
    let val = $('.industry .ind_all tr:last td:first').last().text();
    let hiddenVal = parseInt(val) + 1;
    $('#IND_INT_NO').attr("value", hiddenVal);
    // console.log(hiddenVal);
});