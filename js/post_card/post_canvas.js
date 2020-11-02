let myFileName;
let myFileName2;

function captureFront() {
    let frontImg = document.getElementById("frontCapture");
    window.scrollTo(0, 0);
    window.devicePixelRatio * 2;
    html2canvas(frontImg, {
        //解决頁面滾動後白邊問題
        windowWidth: document.body.scrollWidth,
        scale: 2,
        useCORS: true,
    }).then(function(canvas) {
        let dataURL = canvas.toDataURL("image/png", 1);

        let ajaxFront = new XMLHttpRequest();
        ajaxFront.open("POST", "./php/post_save.php", true);

        ajaxFront.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajaxFront.send("img=" + dataURL);

        ajaxFront.onreadystatechange = function() {
            if (ajaxFront.readyState == 4 && ajaxFront.status == 200) {
                sessionStorage["frontImg"] = ajaxFront.responseText;
                // alert(this.responseText);
                myFileName = ajaxFront.responseText;
                // alert(myFileName);
            }
        };

    });

};
//--------------------------背面
function captureBack() {
    let backImg = document.getElementById("backCapture");
    window.scrollTo(0, 0);
    window.devicePixelRatio * 2;
    html2canvas(backImg, {
        //解决頁面滾動後白邊問題
        windowWidth: document.body.scrollWidth,
        scale: 2,
        useCORS: true,
    }).then(function(canvas) {

        let dataURL = canvas.toDataURL("image/png", 1);
        let ajaxBack = new XMLHttpRequest();
        ajaxBack.open("POST", "./php/post_save.php", true);

        ajaxBack.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajaxBack.send("img=" + dataURL);

        ajaxBack.onreadystatechange = function() {
            if (ajaxBack.readyState == 4 && ajaxBack.status == 200) {
                sessionStorage["backImg"] = ajaxBack.responseText;
                // alert(this.responseText);
                myFileName2 = ajaxBack.responseText;
                // alert(myFileName2);

                // location.href = `post_date.html?myFileName=${myFileName}&myFileName2=${myFileName2}`;
                location.href = "./post_date.html";
            }
        };

    });

};