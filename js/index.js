$(function () {

    //헤더---------------------------------------------------------------------
    $("header").on({
        "mouseenter": function () {
            $(this).addClass("onM");
        },
        "mouseleave": function () {
            $(this).removeClass("onM");
            $(this).removeClass("onC");
        }
    });


    $(".hamWrap").click(function () {
        $("header").toggleClass("onC")
    });
    // 검색,,,
    $(".searchBtn").on({
        "click": function () {
            $(".searchWrap").toggleClass("searching");
        }
    });
    $(".searchWrap").mouseleave(function () {
        $(this).removeClass("searching");
    })


    //스크롤 내리면 헤더가 사라지고 다시 스크롤을 올리면 헤더가 나타난다
    //백업 위치 
    var lastScroll = 0;
    $(window).on("scroll", function (event) {
        // console.log($("header").hasClass("onC"))
        if (!$("header").hasClass("onC")) {
            //현재 스크롤 위치 
            var scTop = $(this).scrollTop();

            if (scTop > lastScroll) {
                $("header").css("top", "-100px");
            }
            else {
                $("header").css({
                    top: "0px",
                    position: "fixed"
                });
                $("header").addClass("onM");

                if (scTop == 0) {
                    $("header").removeClass("onM");
                }

            }
            lastScroll = scTop;
        }
    });


    //a 기능 막기=================================================================
    $(".gnb a, #nav a, .banner a, #containner a, footer>div a").click(function (e) {
        e.preventDefault();
    })


    //메인,서브메뉴------------------------------------------------------------------
    $("#nav>li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });

    //모바일메뉴
    $("#nav1>li").click(function () {
        var menu = $(this).hasClass("active");
        if (menu) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active").siblings().removeClass("active");
        }
    });


    //배너-------------------------------------------------------------------
    //보여지는 배너를 체크할 변수 만들기
    var showBanner = 0;
    //보여지는 배너가 누구인지 숫자화 시켜서 화면에 보이기
    $(".pCount").text(showBanner + 1);
    //배너의 전체 개수 체크
    var total = $(".banner>li").length;
    $(".pTotal").text(total);
    //첫번째 배너를 복사해서
    var obj = $(".banner>.b1").clone();
    //마지막 배너 뒤에 붙이기
    $(".banner").append(obj);
    //복사된 배너까지 총 배너의 개수를 담은 변수
    var cloneTotal = $(".banner>li").length;
    //배너의 너비값을 배너 개수에 맞춰 넓혀주기
    $(".banner").css("width", cloneTotal * 100 + "%");
    $(".banner>li").css("width", 100 / cloneTotal + "%")
    //이동하기 공통사항
    function moveBanner() {
        //1초마다 배너 이동
        $(".banner").stop().animate({
            marginLeft: -showBanner * 100 + "%"
        }, 1500);

        //페이지 넘버
        if (showBanner == total) {
            $(".pCount").text(1);
        } else {
            $(".pCount").text(showBanner + 1);
        }
    }
    //오른쪽 버튼을 클릭하면 배너 이동
    $(".nextBtn").on("click", function () {
        if (showBanner == total) {
            showBanner = 0;
            $(".banner").css("margin-left", 0);
        }
        showBanner++;
        moveBanner();
    })
    //왼쪽 버튼을 클릭하면 배너 이동
    $(".prevBtn").on("click", function () {
        if (showBanner == 0) {
            showBanner = total;
            $(".banner").css("margin-left", -total * 100 + "%");
        }
        showBanner--;
        moveBanner();
    })
    //4초마다 오른쪽 버튼을 강제로 실행
    //일정 시간마다 반복
    var timer = setInterval(function () {
        $(".nextBtn").trigger("click");
    }, 4000);


    //timeBar
    var timeWrap = $(".timeWrap"),
        timeBar = timeWrap.find(".time");

    function timeBarAnimation() {
        timeBar.clearQueue().stop().css({ width: "0%" }).animate({ width: "100%" }, 4000, "linear");
    }

    timeBarAnimation();
    setInterval(function () {
        timeBarAnimation();
    }, 4000);


    //알림 닫기
    $(".msgBoxClose").on("click", function () {
        $(".msgBox").css("display", "none")
    });
    //이미지 사이즈---------------------------------------------------------------------------------
    //호버하면 이미지 사이즈 커졌다가 원상복구
    $(".trenchWrap>.trench img,.bagWrap>.bag img").hover(function () {
        $(this).css({
            transform: "scale(1.5)",
            transitionDuration: "3s"
        })
    }, function () {
        $(this).css({
            transform: "scale(1)",
            transitionDuration: "3s"
        })
    });
    //이미지에 마우스오버하면 천천히 다른 이미지
    //마우스 아웃하면 천천히 원래이미지
    $(".checkImg>.i2").mouseover(function () {
        $(this).css({
            opacity: 0,
            transitionDuration: "0.5s"
        });
    });
    $(".checkImg>.i2").mouseout(function () {
        $(this).css({
            opacity: 1,
            transitionDuration: "0.5s"
        });
    });


    //풋메뉴-----------------------------------------------------------------------------------------
    //bMenu>li momuseover 하면 .active인 .bSub가 display:block 된다
    //현재 li가 active되면 형제 li들은 display none으로 안 보인다
    $(".bMenu>li").mouseover(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });


    //--팝업----------------------------------------------------------------------------------
    //#uMail을 클릭하면 popup이 뜬다
    $("#uMail").click(function () {
        $(".popupWrap").css("display", "block");
    });

    //엑스를 클릭하면 팝업이 닫힌다.
    $("#clsBtn,.resetBtn").click(function () {
        $(".popupWrap").css("display", "none")
    });



    //스크롤탑----------------------------------------------------------------------
    var wh = $(window).outerHeight();
    $("body").outerHeight(wh);

    $(".top").click(function () {

        //yPos에 body의 좌표값을 넣음
        var yPos = $("body").offset().top;
        $("html,body").stop().animate({ scrollTop: yPos }, 1000);
    })



    //끝------------------------------------------------------------------------------------

});



//비디오-----------------------------------------------------------------------
window.addEventListener("load", function () {

    var myVideo = document.querySelector("#myVideo");
    var playPause = document.querySelector(".btn");

    playPause.addEventListener("click", function () {
        if (myVideo.paused) {
            myVideo.play();
            this.src = "images/pause.png";
        } else {
            myVideo.pause();
            this.src = "images/play.png";
        }
    });
})