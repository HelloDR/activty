$(document).ready(function () {
    //旋转角度
    var angles;
    //可抽奖次数
    var clickNum = 1;
    //旋转次数
    var rotNum = 0;
    //中奖公告
    var notice = null;
    //转盘初始化
    // var color = ["#626262","#787878","rgba(0,0,0,0.5)","#fff","white","#FF4350"];
    var color = ["rgba(0,0,0,0.5)", "#fff", "white", "#FF4350"];
    var color2 = ["#ed801b", "#faec0d", "#94c035", "#00984d", "#00a0de", "#9e0d82", "#e40a78", "#e5132e"];
    var info = ["20天", " 20天", " 30天", " 40天", " 感谢", "方方派亲子餐", "佳农探趣科普", " 感谢"];
    var info1 = ['免费借阅', '  免费借阅', '   免费借阅', '  免费借阅', '    参与', '厅40分钟畅玩', '园入场券一张', '    参与'];
    canvasRun();
    $('#tupBtn').bind('click', function () {
        if (clickNum >= 1) {
            //可抽奖次数减一
            clickNum = clickNum - 1;
            //转盘旋转
            runCup();
            //转盘旋转过程“开始抽奖”按钮无法点击
            $('#tupBtn').attr("disabled", true);
            //旋转次数加一
            rotNum = rotNum + 1;
            //“开始抽奖”按钮无法点击恢复点击
            setTimeout(function () {
                alert(notice);
                $('#tupBtn').removeAttr("disabled", true);
            }, 6000);
        }
        else {
            alert("亲，抽奖次数已用光！");
        }
    });

    //转盘旋转
    function runCup() {
        probability();
        var degValue = 'rotate(' + angles + 'deg' + ')';
        $('#myCanvas').css('-o-transform', degValue);           //Opera
        $('#myCanvas').css('-ms-transform', degValue);          //IE浏览器
        $('#myCanvas').css('-moz-transform', degValue);         //Firefox
        $('#myCanvas').css('-webkit-transform', degValue);      //Chrome和Safari
        $('#myCanvas').css('transform', degValue);
    }

    //各奖项对应的旋转角度及中奖公告内容
    function probability() {
        //获取随机数
        var num = parseInt(Math.random() * (7 - 0 + 0) + 0);
        console.log(num);
        //概率
        if (num == 0) {
            angles = 2160 * rotNum + 1800;
            notice = "恭喜您抽中了" + (info[0]).trim() + (info1[0]).trim();
        }
        //概率
        else if (num == 1) {
            angles = 2160 * rotNum + 1845;
            notice = (info[7]).trim() + (info1[7]).trim();
        }
        //概率
        else if (num == 2) {
            angles = 2160 * rotNum + 1890;
            notice = "恭喜您抽中了" + (info[6]).trim() + (info1[6]).trim();
        }
        //概率
        else if (num == 3) {
            angles = 2160 * rotNum + 1935;
            notice = "恭喜您抽中了" + (info[5]).trim() + (info1[5]).trim();
        }
        //概率
        else if (num == 4) {
            angles = 2160 * rotNum + 1980;
            notice = (info[4]).trim() + (info1[4]).trim();
        }
        //概率
        else if (num == 5) {
            angles = 2160 * rotNum + 2025;
            notice = "恭喜您抽中了" + (info[3]).trim() + (info1[3]).trim();
        }
        //概率
        else if (num == 6) {
            angles = 2160 * rotNum + 2070;
            notice = "恭喜您抽中了" + (info[2]).trim() + (info1[2]).trim();
        }
        //概率
        else if (num == 7) {
            angles = 2160 * rotNum + 2115;
            notice = "恭喜您抽中了" + (info[1]).trim() + (info1[1]).trim();
        }
    }

    //绘制转盘
    function canvasRun() {
        var canvas = document.getElementById('myCanvas');
        var canvas01 = document.getElementById('myCanvas01');
        var canvas03 = document.getElementById('myCanvas03');
        var canvas02 = document.getElementById('myCanvas02');
        var ctx = canvas.getContext('2d');
        var ctx1 = canvas01.getContext('2d');
        var ctx3 = canvas03.getContext('2d');
        var ctx2 = canvas02.getContext('2d');
        createCircle();
        createCirText();
        initPoint();

        //外圆
        function createCircle() {
            var startAngle = 0;//扇形的开始弧度
            var endAngle = 0;//扇形的终止弧度
            //画一个8等份扇形组成的圆形
            for (var i = 0; i < 8; i++) {
                startAngle = Math.PI * (i / 4 - 1 / 8);
                endAngle = startAngle + Math.PI * (1 / 4);
                ctx.save();
                ctx.beginPath();
                ctx.arc(150, 150, 100, startAngle, endAngle, false);
                ctx.lineWidth = 120;
                // if (i%2 == 0) {
                // 	ctx.strokeStyle =  color2[0];
                // }else{
                // 	ctx.strokeStyle =  color2[1];
                // }
                for (var j = 0; j < color2.length; j++) {
                    ctx.strokeStyle = color2[i];
                }
                ctx.stroke();
                ctx.restore();
            }
        }

        //各奖项
        function createCirText() {
            // ctx.textAlign = 'start';
            // ctx.textBaseline = 'middle';
            //ctx.fillStyle = color[3];
            var step = 2 * Math.PI / 8;
            for (var i = 0; i < 8; i++) {
                ctx.save();
                ctx.beginPath();
                ctx.translate(150, 150);
                ctx.rotate(i * step);
                ctx.font = " 26px shangya";
                ctx.fillStyle = "white";
                ctx.fillText(info[i], -30, -115, 60);
                ctx.font = " 14px shangya";
                ctx.fillText(info1[i], -30, -95, 60);
                ctx.closePath();
                ctx.restore();
            }
        }

        function initPoint() {
            //箭头指针
            ctx1.beginPath();
            ctx1.moveTo(100, 24);
            ctx1.lineTo(90, 62);
            ctx1.lineTo(110, 62);
            ctx1.lineTo(100, 24);
            ctx1.fillStyle = "red";
            ctx1.fill();
            ctx1.closePath();
            //中间小圆
            ctx3.beginPath();
            ctx3.arc(100, 100, 30, 0, Math.PI * 2, false);
            ctx3.fillStyle = "#f00";
            ctx3.fill();
            ctx3.closePath();
            //小圆文字
            ctx3.font = "Bold 16px shangya";
            ctx3.textAlign = 'start';
            ctx3.textBaseline = 'middle';
            ctx3.fillStyle = "white";
            ctx3.beginPath();
            ctx3.fillText('开始', 85, 90, 40);
            ctx3.fillText('抽奖', 85, 110, 40);
            // var img=document.getElementById("image");
            // ctx3.drawImage(img,70,70,60,60);
            // ctx3.fillText('乐享好课',70,110,65);
            ctx3.fill();
            ctx3.closePath();
            //中间圆圈
            ctx2.beginPath();
            ctx2.arc(75, 75, 15, 0, Math.PI * 2, false);
            ctx2.strokeStyle = "#0000ff";
            ctx2.fillStyle = "#fff";
            ctx2.fill();
            ctx2.closePath();
        }
    }
});