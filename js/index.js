$(function () {
  // 转盘指针添加点击事件
  $('.pointer').click(function () {
    // 调用转盘函数
    Rotate();
  });

  //关闭按钮点击事件
  $(".covers_quit").click(function () {
    //关闭弹出框
    $(this).parent().fadeOut(500);
  });

  // 弹出框事件
  function Init() {
    //弹出框按钮点击事件
    $(".covers_btn2").click(function () {
      //关闭弹出框
      $(this).parent().parent().hide();
    });
  }

  Init();
  // 抽奖
  var rotateTimeOut = function () {
    //调用插件为转盘添加旋转事件
    $('#rotate').rotate({
      angle: 0,
      animateTo: 2160,
      duration: 8000,
      callback: function () {
        alert('网络超时，请检查您的网络设置！');
      }
    });
  };
  var bRotate = false;

  var rotateFn = function (awards, angles, txt) {
    bRotate = !bRotate;
    $('#rotate').stopRotate();
    $('#rotate').rotate({
      angle: 0,
      animateTo: angles + 2825,
      duration: 8000,
      callback: function () {
        $(".cover,.covers2").show();
        $(".covers2 .covers_font").html("<span style='color#000'>恭喜你抽中:</span><br>" + txt);
        if (angles == 72 || angles == 252) {
          $(".covers2 .covers_font").text(txt);
        }
        bRotate = !bRotate;
      }
    })
  };

  var time = 2;

  function Rotate() {
    //存储转盘奖品
    var arr = ['30天免费借阅', '20天免费借阅', '谢谢参与', '免费借阅四次','免费借阅三次', '佳农探趣生态园大礼包', '免费借阅两次',
      '谢谢参与', '免费借阅一次', '40天免费借阅'];
    // 防止多次点击
    if (bRotate)return;
    //抽奖次数减一
    time--;
    //判断抽奖次数
    if (time <= 0) {
      //提示抽奖次数已用完
      $(".covers3").show();
    } else {
      //var item=0;
      //产生转盘随机数
      var item = parseInt(Math.random() * (10 - 0 + 0) + 0);
      console.log(item);
      //循环奖品数组
      for (var i = 0; i < arr.length; i++) {
        console.log(arr[i],i);
        //根据随机数概率判断所中奖品
        switch (item){
          //调用转盘函数
          case i : rotateFn(i,i*36,arr[i]);
            break;
        }
        // switch (item) {
        //   case 0:
        //     rotateFn(0, 0, '30天免费借阅');
        //     break;
        //   case 1:
        //     // rotateFn(1, 36, '10金币');
        //     rotateFn(1, 36, '20天免费借阅');
        //     break;
        //   case 2:
        //     // rotateFn(2, 72, '900金币');
        //     rotateFn(2, 72, '谢谢参与');
        //     break;
        //   case 3:
        //     // rotateFn(3, 108, '500金币');
        //     rotateFn(3, 108, '免费借阅四次');
        //     break;
        //   case 4:
        //     // rotateFn(4, 144, '300金币');
        //     rotateFn(4, 144, '免费借阅三次');
        //     break;
        //   case 5:
        //     // rotateFn(5, 180, '250金币');
        //     rotateFn(5, 180, '佳农探趣生态园大礼包');
        //     break;
        //   case 6:
        //     // rotateFn(6, 216, '200金币');
        //     rotateFn(6, 216, '免费借阅两次');
        //     break;
        //   case 7:
        //     // rotateFn(7, 252, '150金币');
        //     rotateFn(7, 252, '谢谢参与');
        //     break;
        //   case 8:
        //     // rotateFn(8, 288, '100金币');
        //     rotateFn(8, 288, '免费借阅一次');
        //     break;
        //   case 9:
        //     // rotateFn(9, 324, '50金币');
        //     rotateFn(9, 324, '40天免费借阅');
        //     break;
        // }
      }
    }
  }
});