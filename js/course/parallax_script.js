// var scene = document.getElementById('scene');
// var parallax = new Parallax(scene);

function ScrollBG() {
    //定义滚动背景容器变量
    var oUl = document.getElementById('scene'),
        oLi = oUl.getElementsByTagName('li'),
        //获取当前窗口的尺寸并改变其中心为原点坐标，也可以改为仅获取指定层的坐标:oUl.offsetWidth
        x = document.body.offsetWidth / 2,
        y = document.body.offsetHeight / 2;

    //设置当前窗口内的鼠标移动事件，也可以改为仅作用于指定层:oUl.onmousemove
    document.body.onmousemove = function (event) {
        //获取鼠标在当前窗口内的坐标值，也可以改为获取指定层的坐标:event.offsetX
        var mx = event.clientX,
            my = event.clientY;

        //开始为每个要动的元素设置左边距和上边距，以每个元素的不同zIndex值来区别移动量
        // for (var i = 0; i < oLi.length; i++) {
        //左边距和上边距的值可以随意调整
        oLi[1].style.marginLeft = -(x - mx) / 70 * oLi[1].style.zIndex + 'px';
        // oLi[0].style.marginTop = (y - my) / 90 * oLi[0].style.zIndex + 'px';

        oLi[2].style.marginLeft = (x - mx) / 40 * oLi[2].style.zIndex + 'px';
        // oLi[1].style.marginTop = (y - my) / 90 * oLi[1].style.zIndex + 'px';

        oLi[3].style.marginLeft = (x - mx) / 80 * oLi[3].style.zIndex + 'px';
        // oLi[2].style.marginTop = (y - my) / 90 * oLi[2].style.zIndex + 'px';
        // }
    };
}



// function resize_background() {
//     $(window).resize(function {
//         $('#para_bg').style({
//             wide:
//         });
//     })
// }

window.addEventListener('load', ScrollBG);