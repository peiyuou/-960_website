$(function () {
    $("#pickdate").dateDropper({
        animate: false,
        format: 'Y-m-d',
        maxYear: '2025',
        minYear: '2020',
        lang: 'zh',
        fxMobile: true,
        large: true,
        lock: 'from',

    });
    // ------------抓正背面圖
    document.getElementById("frontImg").src = sessionStorage["frontImg"];
    document.getElementById("backImg").src = sessionStorage["backImg"];
    //頁面跳轉
    var count = 5;
    //顯示倒數秒數  數到0後跳轉頁面  
    function countDown() {
        //將count顯示在div中
        document.getElementById("sec").innerHTML = `${count}秒後自動跳轉首頁`;
        //每執行一次，count減1
        count--;
        //count=0時，跳轉頁面
        if (count == 0) {
            window.location.href = "./front_index.html";

        } else {
            //每秒執行一次,showTime()
            setTimeout(countDown, 1000);
        }

    }


    // 按叉叉關閉會員視窗
    function btnClose() {
        document.querySelector('.bg_of_lightbx').style = "display:none";
    };

    function sendToDb() {
        //創建日期 送出日期 2張照片會員編號  傳到資料庫 ------------------
        let card = {};
        card.frontImg = sessionStorage["frontImg"];
        card.backImg = sessionStorage["backImg"];
        card.senDate = document.getElementById('pickdate').value;
        let json = JSON.stringify(card);
        // alert(json);
        // console.log(json);
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                // alert(xhr.responseText);
                console.log(xhr.responseText);
            } else {
                // alert(xhr.status);
            }

        }
        xhr.open("POST", "./php/postToDb.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`json=${json}`);
    };

    function dateCheck() {
        //抓日期
        let date = $('#pickdate').val().split('-');
        let y = date[0];
        let m = date[1];
        let d = date[2];
        if ($('#pickdate').val() != '') {
            $('.when_date').text(`將於${y}年${m}月${d}日寄出`);
            // 開啟彈跳視窗
            $(".overlay").addClass("-on");
            countDown();
            // 關閉 彈跳視窗
            $(".close").on("click", function () {
                $(".overlay").addClass("-opacity-zero");



                // 設定隔500豪秒後，移除相關 class
                setTimeout(function () {
                    $(".overlay").removeClass("-on -opacity-zero");
                }, 500);

            });
        } else {
            alert("尚未選取日期歐~");

        };
    }
    // 按送出按鈕
    $("#send").on("click", function () {
        axios
            .post('./php/memberStateCheck.php')
            .then((resp) => {
                // 沒登入跳視窗
                if (resp.data == 0) {
                    // alert('請先登入會員');
                    // 開啟登入會員彈跳視窗
                    document.querySelector('.bg_of_lightbx').style = "display:block";
                    // 關閉登入會員彈跳視窗
                    $('#closeBtn').click(function () {
                        document.querySelector('.bg_of_lightbx').style = "display:none";
                    });
                } else {
                    // 已經有登入
                    sendToDb();
                    // 判斷有沒有選日期
                    dateCheck();

                }
            });
        $('.login_btn').click(function () {
            var memAccount = document.querySelector('.input_div #account').value;
            var memCode = document.querySelector('.input_div #code').value;
            var formData = new FormData();
            formData.append('memAccount', memAccount);
            formData.append('memCode', memCode);
            axios
                .post('./php/memberSignInCheck.php', formData)
                .then((resp) => {
                    if (resp.data == 0) {
                        alert('帳號或密碼錯誤，請重新輸入');
                        document.querySelector('.input_div #code').value = "";
                    } else {
                        // alert('會員登入成功');
                        //登入成功則燈箱移除
                        btnClose();
                        // 已經有登入
                        sendToDb();
                        // 判斷有沒有選日期
                        dateCheck();
                    }
                });
        });


    });

});