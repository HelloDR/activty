//判断本地存储中是否存放了各个奖品的数量
if (localStorage.getItem('arrNum') == null) {
  //将各个奖品的数量放入本地存储
  localStorage.setItem('arrNum', [20,20, 20, 5, 10, 99, 40, 20, 50, 5]);
}
$(function () {
  $(".covers1").hide();
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
  //转盘旋转函数
  var rotateFn = function (awards, angles, txt) {
    bRotate = !bRotate;
    $('#rotate').stopRotate();
    $('#rotate').rotate({
      angle: 0,
      animateTo: angles + 2825,
      duration: 8000,
      callback: function () {
        $(".covers2").show();
        $(".covers2 .covers_font").html("<span style='color#000'>恭喜你抽中:</span><br>" + txt);
        if (angles == 72 || angles == 252) {
          $(".covers2 .covers_font").text(txt);
          //$(".covers_btn2").hide();
        }
        bRotate = !bRotate;
      }
    })
  };

  //抽奖次数
  var time = 1;

  function Rotate() {
    //存储转盘奖品
    var arr = ['30天免费借阅', '20天免费借阅', '谢谢参与', '免费借阅四次', '免费借阅三次', '佳农探趣生态园大礼包', '免费借阅两次',
     '谢谢参与', '免费借阅一次', '40天免费借阅'];
    //从本地存储获取奖品数量
    var arr1 = (localStorage.getItem('arrNum')).split(',');
    // 防止多次点击
    if (bRotate)return;
    //抽奖次数减一
    time--;
    //判断抽奖次数
    if (time < 0) {
      //提示抽奖次数已用完
      $(".covers1").show();
    }
    else {
      //var item = 9;
      //奖品概率
      //var item = parseInt(Math.random() * (10 - 0 + 0) + 0);
      //调用权重函数
      var item = weightRandom(1);
      //循环奖品数组
      for (var i = 0; i < arr.length; i++) {
        //var item = ((arr1[i]/62).toFixed(2));
        //根据随机数概率判断所中奖品
        //console.log(i,arr[i], item);
        //判断该奖品是否已抽完
        if (arr1[i] == 0) {
          //将该奖品值设为空
          arr.splice(i, 1, '');
        }
        //并把每次改变奖品数量，放入本地存储
        localStorage.setItem('arrNum', arr1);
        //判断抽中该项奖品是否还有
        if (arr[item] != "") {
          switch (item) {
            //调用转盘函数
            case i :
              rotateFn(i,i * 36, arr[i]);
              //用户每抽一次奖品数量减一
              arr1.splice(i, 1, arr1[i] > 0 ? arr1[i] - 1 : 0);
              break;
          }
        } else {//抽中的该项奖品已没有，弹框提示用户谢谢参与
          bRotate = !bRotate;
          $('#rotate').stopRotate();
          $('#rotate').rotate({
            angle: 0,
            animateTo: (item * 36) + 2825,
            duration: 8000,
            callback: function () {
              if (item == 2 || item == 7) {
                $(".covers2 .covers_font").text("谢谢参与");
                //$(".covers_btn2").hide();
                $(".covers2").show();
              } else {
                $(".covers3").show();
              }
              bRotate = !bRotate;
            }
          })
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
      /**
       *
       * @param array 存放奖品的函数
       * @returns {boolean} 奖品是否全部抽完
       */
      function isAllEqual(array) {
        if (array.length > 0) {
          return !array.some(function (value, index) {
            return value !== array[0];
          });
        } else {
          return true;
        }
      }

      /**
       * 权重函数
       * @param curValue
       * @returns {*}
       */
      function weightRandom(curValue) {
        /*['30天免费借阅', '20天免费借阅', '谢谢参与', '免费借阅四次', '免费借阅三次', '佳农探趣生态园大礼包', '免费借阅两次',
         '谢谢参与', '免费借阅一次', '40天免费借阅'];*/
        var randomConfig = [{id:"0",weight:7},{id:"1",weight:7},{id:"2",weight:20},
          {id:"3",weight:3},{id:"4",weight:5},{id:"5",weight:30},{id:"6",weight:10},
          {id:"7",weight:20},{id:"8",weight:15},{id:"9",weight:3}];
        var randomList = [];
        for (var item in randomConfig) {
          for (var j = 0; j < randomConfig[item].weight; j++) {
            randomList.push(randomConfig[item].id);
          }
        }
        var randomValue = randomList[Math.floor(Math.random() * randomList.length)];
        if (curValue != 0) {
          while (randomValue == curValue ) {
            randomValue  = randomList[Math.floor(Math.random() * randomList.length)];
          }
        }
        //console.log(randomList);
        return Number(randomValue) ;
      }

      //判断奖品是否全部抽完
      if (isAllEqual(arr)) {
        //停止转盘旋转
        $('#rotate').stopRotate();
        //提示用户奖品已全部抽完
        $(".covers1 .covers_font").text("所有奖品已抽完");
        $(".covers_btn2").hide();
        $(".covers1").show();
      }
    }
  }
  
  
});