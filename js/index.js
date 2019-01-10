$(function() {
	$(".rules_footer").click(function() {
		$(".rules_cover,.rules_footer").hide();
		$(".rules_con").css("height","95vw");
	});
	$('.pointer').click(function (){
    	Rotate();
    });
	$(".covers_quit").click(function() {
		$(".cover").fadeOut(500);
		$(this).parent().fadeOut(500);
	});

	function Init() {
		var H = $(window).height(),
			W = $(window).width();
		$(".cover").css({"width": W, "height": H});

		$(".covers_btn").click(function() {
			$(".cover").hide();
			$(this).parent().hide();
			Rotate();
		});

		$(".covers_btn2").click(function() {
			$(".cover").hide();
			$(this).parent().parent().hide();
			$(".rules_cover,.rules_footer").hide();
			$(".rules_con").css("height","95vw");
		});
	}
	Init();
	// 抽奖
    var rotateTimeOut = function (){
        $('#rotate').rotate({
            angle:0,
            animateTo:2160,
            duration:8000,
            callback:function (){
                alert('网络超时，请检查您的网络设置！');
            }
        });
    };
    var bRotate = false;

    var rotateFn = function (awards, angles, txt){
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
            angle:0,
            animateTo:angles+2825,
            duration:8000,
            callback:function (){
            	$(".cover,.covers2").show();
            	// $('.cover_fuck,.cover_quit').css({"display": "block","animation": "action_translateY 2s linear", "animation-fill-mode":"forwards"});
                // $(".cover_fuck").text("+"+parseInt(txt));
                $(".covers2 .covers_font span").text(txt);
                bRotate = !bRotate;
            }
        })
    };

    var time = 2;
    function Rotate() {
    	// 防止多次点击
    	if(bRotate)return;
    	// var Url3 = testname+"/yfax-htt-api/api/htt/doHolidayActivityLuckyDraw";
    	// $.post(Url3,{"phoneNum": uid1,"access_token": token1},function(res){
			// var times = res.data.remainlotteryTimes,
			// 	item = res.data.resultCode;
			// $(".cover_num span").text(times);
			// var item = 1;
			// console.log(res);
			// if(item == -1) {
				// alert("抽奖次数已用完");
			// }else {
				// $('.cover_fuck').hide();
			time--;
			if(time <=0) {
				console.log("covers3");
				$(".cover,.covers3").show();
			}else {
				var item = 3;

				switch (item) {
		            case 0:
		                rotateFn(0, 360, '30天免费借阅');
		                break;
		            case 1:
		                // rotateFn(1, 36, '10金币');
		                rotateFn(1, 36, '20天免费借阅');
		                break;
		            case 2:
		                // rotateFn(2, 72, '900金币');
		                rotateFn(2, 72, '谢谢参与');
		                break;
		            case 3:
		                // rotateFn(3, 108, '500金币');
		                rotateFn(3, 108, '免费借阅四次');
		                break;
		            case 4:
		                // rotateFn(4, 144, '300金币');
		                rotateFn(4, 144, '免费借阅三次');
		                break;
		            case 5:
		                // rotateFn(5, 180, '250金币');
		                rotateFn(5, 180, '佳农探趣科普馆体验卷');
		                break;
		            case 6:
		                // rotateFn(6, 216, '200金币');
		                rotateFn(6, 216, '免费借阅两次');
		                break;
		            case 7:
		                // rotateFn(7, 252, '150金币');
		                rotateFn(7, 252, '谢谢参与');
		                break;
		            case 8:
		                // rotateFn(8, 288, '100金币');
		                rotateFn(8, 288, '免费借阅一次');
		                break;
		            case 9:
		                // rotateFn(9, 324, '50金币');
		                rotateFn(9, 324, '40天免费借阅');
		                break;
		        }
			}
				
			// }  
	    // });
    }
})