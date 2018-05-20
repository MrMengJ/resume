$(function () {
    $(window).resize();
    //固定导航栏到顶部
    $('#nav-page').navFixed();
    //导航平滑滚动
    $('#section1 a').on('click', function (e) {
        e.preventDefault();//防止目标锚点一闪而过的视觉
        var $_this = $(this);
        $('html,body').stop().animate({
            'scrollTop': $($_this.attr('href')).offset().top
        }, 600);
    });
    $('#nav-page a').on('click', function (e) {
        e.preventDefault();//防止目标锚点一闪而过的视觉
        var $_this = $(this);
        $('html,body').stop().animate({
            'scrollTop': $($_this.attr('href')).offset().top - 52
        }, 600);
    });
    // 打开定时器，欢迎页下箭头自动隐藏、显示
    var arrowF = play(arrowFade, 800);
    //触发旋转特效
    $('#section2 .head-portrait').rotate(360);

    // 汉堡菜单自动收起
    buttonHide();


});

//背景随机
$(function () {
    var length = 3;
    $(".bg-img li:nth-child(2)").fadeIn();
    setInterval(function () {
        var randomBgIndex = Math.round(Math.random() * length);
        $("#section1 .bg-img li").eq(randomBgIndex).addClass("show").siblings().removeClass("show");
    }, 5000);
});

$(function () {
    $(".nav b").css("color", "#fff");

    $(".fades").addClass("fadesin");
    $(" h1.fade").addClass("fadesin1");
    $(" h3.fade").addClass("fadesin2");
    $(" span.fade").addClass("fadesin3");

    var _top;
    var top1 = $("#section2").offset().top - 30;
    var top2 = $("#section3").offset().top - 30;
    var top3 = $("#section4").offset().top - 30;
    var top4 = $("#section5").offset().top - 30;
    var top5 = $("#section6").offset().top - 30;
    var tops = [top1, top2, top3, top4, top5];

    //回到顶部
$("#top").click(function () {
    $('html,body').stop().animate({
        scrollTop: 0
    }, 700);
});
showScroll();
var min_height = document.documentElement.clientHeight / 2;
function showScroll() {
    $(window).scroll(function () {
        var s = $(window).scrollTop();
        s > min_height ? $('#top,#down').show("normal") : $('#top,#down').hide("normal");
    });
};

$(".navbar-nav li").on('click',function () {
    $(this).addClass('active').siblings().removeClass('active');
})

//页面滚动
$(window).scroll(function () {
    //导航fixed
    var s = $(window).scrollTop();
    // s > top1 ? $('#nav-bar').addClass("fixed") : $('#nav-bar').removeClass("fixed");
    //导航跟随滚动响应
    if ((s > top1) && (s < top2)) {
        $(".navbar-nav li").eq(0).addClass("active").siblings().removeClass("active");
        $("#section2").addClass("active");
    } else if ((s > top2) && (s < top3)) {
        $(".navbar-nav li").eq(1).addClass("active").siblings().removeClass("active");
        $("#section3").addClass("active");
    } else if ((s > top3) && (s < top4)) {
        $(".navbar-nav li").eq(2).addClass("active").siblings().removeClass("active");
        $("#section4").addClass("active");
    } else if ((s > top4) && (s < top5)) {
        $(".navbar-nav li").eq(3).addClass("active").siblings().removeClass("active");
        $("#section5").addClass("active");
    } else if (s > top5) {
        $(".navbar-nav li").eq(4).addClass("active").siblings().removeClass("active");
        $("#section6").addClass("active");
    }
});
});



$(window).resize(function () {
    //如果是移动端，左右轮播按钮永远隐藏不再出现
    //QQ调用接口改为手机端接口
    if (!isPC()) {
        $('#prev').height(0).width(0);
        $('#next').height(0).width(0);
        //QQ调用接口改为手机端接口
        $('.qq').attr('href', 'mqqwpa://im/chat?chat_type=wpa&uin=951093467&version=1&src_type=web&web_src=oicqzone.com');
        //个人信息栏行距为1.8
        $('.infor li').css('line-height', '1.8');
    }
});

//导航栏固定顶部
$.fn.navFixed = function () {
    var $_this = $(this);
    var $offsetTop = $_this.offset().top; //距离顶部偏移距离
    var $scrollTop = $(document).scrollTop(); //滚动条垂直偏移距离
    var $marginTop = parseFloat($_this.next().css('margin-top'));  //导航栏下一兄弟元素的原有上外边距
    stateChange();
    // 滚动条滚动事件
    $(document).scroll(function () {
        $scrollTop = $(document).scrollTop();
        stateChange();
    });
    //窗口大小改变
    $(window).resize(function () {
        $offsetTop = $_this.offset().top;
        stateChange();
    });
    //导航栏状态改变函数
    function stateChange() {
        if ($scrollTop >= $offsetTop) {
            $_this.css('position', 'fixed');
            $_this.next().css('margin-top', $marginTop + $_this.outerHeight(true) + 'px');
        } else {
            $_this.css('position', 'relative');
            $_this.next().css('margin-top', $marginTop);
        }
    }
};


//欢迎页下箭头隐藏、显示
function arrowFade() {
    if ($('a.next-page img').css('display') == 'block') {
        $('a.next-page img').fadeOut('normal');
    } else if ($('a.next-page img').css('display') == 'none') {
        $('a.next-page img').fadeIn('normal');
    }
}

//旋转特效
$.fn.rotate = function (angle) {
    var $_this = $(this);
    // 当鼠标移入目标元素时顺时针旋转angle度
    $_this.mouseenter(function () {
        $_this.css({
            webkitTransform: "rotate(" + angle + "deg)",
            mozTransform: "rotate(" + angle + "deg)",
            msTransform: "rotate(" + angle + "deg)",
            oTransform: "rotate(" + angle + "deg)",
            transform: "rotate(" + angle + "deg)",
        })
    })
    // 当鼠标移入目标元素时逆时针旋转angle度
    $_this.mouseleave(function () {
        $_this.css({
            webkitTransform: "rotate(" + 0 + "deg)",
            mozTransform: "rotate(" + 0 + "deg)",
            msTransform: "rotate(" + 0 + "deg)",
            oTransform: "rotate(" + 0 + "deg)",
            transform: "rotate(" + 0 + "deg)",
        })
    })
}


//宽度变化函数
$.fn.widthChange = function (width) {
    var $_this = $(this);
    $_this.width(width);
}


$(document).scroll(function () {
    //skills-level过渡动画
    var $scrollTop;
    $scrollTop = $(document).scrollTop();
    if ($scrollTop >= $('#section3').offset().top + $(window).height() / 2) {
        $('#section3 .skills-item-name').eq(0).children('h4').widthChange($('#section3 .skills-item-name').width() * 0.9);
        $('#section3 .skills-item-name').eq(1).children('h4').widthChange($('#section3 .skills-item-name').width() * 0.9);
        $('#section3 .skills-item-name').eq(2).children('h4').widthChange($('#section3 .skills-item-name').width() * 0.8);
        $('#section3 .skills-item-name').eq(3).children('h4').widthChange($('#section3 .skills-item-name').width() * 0.8);
        $('#section3 .skills-item-name').eq(4).children('h4').widthChange($('#section3 .skills-item-name').width() * 0.7);
        $('#section3 .skills-item-name').eq(5).children('h4').widthChange($('#section3 .skills-item-name').width() * 0.6);
        // 汉堡菜单自动收起
        $('#navbar-list').addClass('collapsing');
        $('#navbar-list').removeClass('collapse');
        $('#navbar-list').removeClass('in');
        $('#navbar-list').attr('aria-expanded', 'false');
        $('#navbar-list').attr('style', 'height:0.8px');
        $('#navbar-list').removeClass('collapsing');
        $('#navbar-list').addClass('collapse');
        $('.navbar-toggle').addClass('collapsed');
        $('.navbar-toggle').attr('aria-expanded', 'false');
    }
});

//技能水平描述的淡入淡出
//添加active类名是为了注入标记，避免同时出现多个描述框，只有别的描述框隐藏了才会出现下一个描述框
$('#section3 .skills-item-name').mouseenter(function () {
    if (parseInt($(this).find('h4').css('width')) > 25) {
        var _this = $(this);
        var other = _this.siblings().find('.skills-description');
        // setTimeout(function () {
        if (!_this.siblings().hasClass('active')) {
            _this.addClass('active');
            _this.find('.skills-description').fadeIn(200);
        }
        // }, 100);
    }
});
$('#section3 .skills-item-name').mouseleave(function () {
    var _this = $(this);
    // setTimeout(function () {
    _this.find('.skills-description').css('display', 'none');
    _this.removeClass('active');
    // }, 100);
});

// //汉堡菜单自动收起
function buttonHide() {
//     // 点击菜单之后隐藏菜单
    $('.navbar-collapse li a').on('click', function () {
        $('#navbar-list').addClass('collapsing');
        $('#navbar-list').removeClass('collapse');
        $('#navbar-list').removeClass('in');
        $('#navbar-list').attr('aria-expanded', 'false');
        $('#navbar-list').attr('style', 'height:0.8px');
        $('#navbar-list').removeClass('collapsing');
        $('#navbar-list').addClass('collapse');
        $('.navbar-toggle').addClass('collapsed');
        $('.navbar-toggle').attr('aria-expanded', 'false');
    })
}


//打开定时器
function play(fn, interval) {
    return setInterval(fn, interval)
}

//清除定时器
function stop(returnVal) {
    clearInterval(returnVal);
    returnVal = null;
}


// 滑动屏幕隐藏汉堡菜单,但点击a标签不会及汉堡菜单触发事件
var doc = $(document);
doc.on("touchstart", function (event) {
    var event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.tagName !== "A" && target.getAttribute("data-toggle") === null) {
        // alert("你好呀")
        $('#navbar-list').addClass('collapsing');
        $('#navbar-list').removeClass('collapse');
        $('#navbar-list').removeClass('in');
        $('#navbar-list').attr('aria-expanded', 'false');
        $('#navbar-list').attr('style', 'height:0.8px');
        $('#navbar-list').removeClass('collapsing');
        $('#navbar-list').addClass('collapse');
        $('.navbar-toggle').addClass('collapsed');
        $('.navbar-toggle').attr('aria-expanded', 'false');
    }
});

//判断设备是移动端还是PC
function isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}