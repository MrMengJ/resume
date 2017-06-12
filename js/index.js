$(function () {
    $(window).resize();
    //固定导航栏到顶部
    $('#nav-page').navFixed();
    //导航平滑滚动
    $('#first-page a').on('click', function (e) {
        e.preventDefault();//防止目标锚点一闪而过的视觉
        var $_this = $(this);
        $('html,body').stop().animate({
            'scrollTop': $($_this.attr('href')).offset().top
        }, 600);
    })
    $('#nav-page a').on('click', function (e) {
        e.preventDefault();//防止目标锚点一闪而过的视觉
        var $_this = $(this);
        $('html,body').stop().animate({
            'scrollTop': $($_this.attr('href')).offset().top - 52
        }, 600)
    })
    // 打开定时器，欢迎页下箭头自动隐藏、显示
    var arrowF = play(arrowFade, 800)
    //触发旋转特效
    $('#intro-page .head-portrait').rotate(360);

    //汉堡菜单自动收起
    buttonHide();

    //轮播图
    // 初始化给一张轮播图加上过渡属性
    now();
    // 点击左右轮播按钮
    //上一张
    $('#prev').on('click', function () {
        lastImg();
    })
    // 下一张
    $('#next').on('click', function () {
        nextImg();
    })
    // 打开定时器自动轮播
    automateBanner = play(nextImg, 3000);
    //圆形轮播按钮添加点击事件，点击按钮轮播对应轮播图
    addEvent(dots, 'click', btn);
    //轮播图触摸事件
    bannerTouch();


})


$(window).resize(function () {
    // 不同的窗口大小，轮播框不同的宽高对比度
    if ($(window).width() > 1200) {
        list[0].style.height = $('.banner').width() * 0.35 + 'px';
        liDom.find('img').css('height', liDom.find('img').width() * 0.35)
    } else if (($(window).width() <= 1200 && ($(window).width() > 640))) {
        list[0].style.height = $('.banner').width() * 0.40 + 'px';
        liDom.find('img').css('height', liDom.find('img').width() * 0.40)
    } else {
        list[0].style.height = $('.banner').width() * 0.50 + 'px';
        liDom.find('img').css('height', liDom.find('img').width() * 0.50)
    }
    liDom.find('div').height(list.height())
    // 首页满屏
    $('.welcome').autoHeight();
    //文字掉落效果
    $('.welcome .greet').stop().fadeIn('normal').animate({
        'top': ($(window).height() - $('.welcome .greet').height()) / 2
    }, 600)

    //鼠标进入轮播图区，左右轮播按钮显示,并关闭自动轮播
    //鼠标离开轮博图区时，左右轮播按钮隐藏，并打开自动轮播
    //jquery的mouseleave()跟mouseenter()在此处有bug,原因不明
    $('#project-page')[0].onmouseover = function () {
        $('#prev').css('display', 'block');
        $('#next').css('display', 'block');
        stop(automateBanner);
    }
    $('#project-page')[0].onmouseout = function () {
        $('#prev').css('display', 'none');
        $('#next').css('display', 'none');
        automateBanner = play(nextImg, 3000);
    }

    //如果是移动端，左右轮播按钮永远隐藏不再出现
    //QQ调用接口改为手机端接口
    if (!isPC()){
        $('#prev').height(0).width(0);
        $('#next').height(0).width(0);
        //QQ调用接口改为手机端接口
        $('.qq').attr('href','mqqwpa://im/chat?chat_type=wpa&uin=951093467&version=1&src_type=web&web_src=oicqzone.com');
        //个人信息栏行距为1.8
        $('.infor li').css('line-height','1.8');
    }
})

// 满屏
$.fn.autoHeight = function () {
    $(this).height($(window).height());
}

//导航栏固定顶部
$.fn.navFixed = function () {
    var $_this = $(this);
    var $offsetTop = $_this.offset().top; //距离顶部偏移距离
    var $scrollTop = $(document).scrollTop(); //滚动条垂直偏移距离
    var $marginTop = parseFloat($_this.next().css('margin-top'))//导航栏下一兄弟元素的原有上外边距
    stateChange();
    // 滚动条滚动事件
    $(document).scroll(function () {
        $scrollTop = $(document).scrollTop();
        stateChange();
    })
    //窗口大小改变
    $(window).resize(function () {
        $offsetTop = $_this.offset().top;
        stateChange();
    })
    //导航栏状态改变函数
    function stateChange() {
        if ($scrollTop >= $offsetTop) {
            $_this.css('position', 'fixed');
            $_this.next().css('margin-top', $marginTop + $_this.outerHeight(true) + 'px')
        } else {
            $_this.css('position', 'relative');
            $_this.next().css('margin-top', $marginTop)
        }
    }
}


//欢迎页下箭头隐藏、显示
function arrowFade() {
    if ($('a.next-page img').css('display') == 'block') {
        $('a.next-page img').fadeOut('normal')
    } else if ($('a.next-page img').css('display') == 'none') {
        $('a.next-page img').fadeIn('normal')
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

//skills-level过渡动画
$(document).scroll(function () {
    var $scrollTop;
    $scrollTop = $(document).scrollTop();
    if ($scrollTop >= $('.skills-level').offset().top - $(window).height() / 2) {
        $('.skills-level .skills-item-name').eq(0).children('h4').widthChange($('.skills-level .skills-item-name').width() * 0.8);
        $('.skills-level .skills-item-name').eq(1).children('h4').widthChange($('.skills-level .skills-item-name').width() * 0.8);
        $('.skills-level .skills-item-name').eq(2).children('h4').widthChange($('.skills-level .skills-item-name').width() * 0.7);
        $('.skills-level .skills-item-name').eq(3).children('h4').widthChange($('.skills-level .skills-item-name').width() * 0.6);
        $('.skills-level .skills-item-name').eq(4).children('h4').widthChange($('.skills-level .skills-item-name').width() * 0.6);
        $('.skills-level .skills-item-name').eq(5).children('h4').widthChange($('.skills-level .skills-item-name').width() * 0.5);
        $('.skills-level .skills-item-name').eq(6).children('h4').widthChange($('.skills-level .skills-item-name').width() * 0.4);
    }
});
//技能水平描述的淡入淡出
$('.skills-level .skills-item-name').mouseenter(function () {
    if (parseInt($(this).find('h4').css('width')) > 25) {
         $(this).find('.skills-description').fadeIn(400);
    }
});
$('.skills-level .skills-item-name').mouseleave(function () {
    $(this).find('.skills-description').fadeOut(100);
});

//汉堡菜单自动收起
function buttonHide() {
    // 点击菜单之后隐藏菜单
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


/*轮播图部分*/
// 本轮播图总体思路
// 轮播图分为三种状态，都加absoulte
// 左：transform:translateX(-100%)
// 中：transform:translateX(0)
// 右：transform:translateX(100%)
// 每次把当前显示的加为中间的状态， 小于当前的加左边的状态，大于的加右边的状态，当最后一个激活的时候，把第一个放右边。

var list = $(".banner ul");//轮播图列表
var liDom = list.find('li')
var liLength = liDom.length;
var dots = $(".showNav");//轮播按钮
var dot = dots.find('li');//单个点按钮
var dotLength = dot.length;
var imgIndex = 0; //轮播图序号，默认赋值为0
var dotIndex = 0;//点击之前圆点轮播按钮序号，默认为0
var indexNow;//点击的那个圆点轮播按钮序号
var liW = liDom.width();//轮播图宽度
var left; //轮播图列表当前left值
var startX = 0;//手指接触屏幕时接触点的x坐标
var endX = 0;//手指离开屏幕时接触点的x坐标
var moveX = 0;//手指在屏幕上x轴方向上滑动的距离(向左划为负)
var minX = -liW * 0.25;//滑动最小值
var maxX = liW * 0.25;//滑动最大值
var oldImgIndex;//轮播图虏轮播之前的序列号
var automateBanner;//自动轮播定时器

// 下一张轮播图
function nextImg() {
    oldImgIndex = imgIndex;//取未轮播之前的 序列号
    //当oldImgIndex为最后一张时，那么轮播下一张其实就是第一张，所以imgIndex = 0;dotIndex = 0;
    if (oldImgIndex > liLength - 2) {
        imgIndex = 0;
        dotIndex = 0;
    } else {
        imgIndex++;
        dotIndex++;
    }
    prevOne();//前面一个设为translateX(-100%)
    now();//当前的设为translateX(0)
    nextOne();//后面一个设为translateX(100%)
    // 当轮播后当前的图是最后一张时，将第一张设为translateX(100%)
    if (imgIndex > liLength - 2) {
        nextOne();
    }
    //点亮圆点按钮
    dotLight();
}

//上一张轮播图
function lastImg() {
    oldImgIndex = imgIndex;
    //当oldImgIndex为第一张时，那么向上轮播的那张其实就是最后张，所以imgIndex = liLength - 1;dotIndex = dotLength - 1;
    if (oldImgIndex < 1) {
        imgIndex = liLength - 1;
        dotIndex = dotLength - 1;
    } else {
        imgIndex--;
        dotIndex--;
    }
    prevOne();//前面一个设为translateX(-100%)
    now();//当前的设为translateX(0)
    nextOne();//后面一个设为translateX(100%)
    // 当轮播后当前的图是第一张时，将最后设为translateX(-100%)
    if (imgIndex < 1) {
        prevOne();
    }
    // 点亮圆点按钮
    dotLight();
}

//圆点按钮点击函数
function btn(e) {
    e = window.e || e;//判断是标准浏览器还是ie浏览器事件
    var target = e.target ? e.target : e.srcElement;
    oldImgIndex = imgIndex;
    if (target.nodeName = "LI") {
        indexNow = $(target).index();//点击的哪个圆点的索引值
        imgIndex = indexNow;//将轮播图也转换到对应位置
        prev();
        now();
        next();
        dotIndex = indexNow;//将点击的圆点按钮序列号赋给dotIndex
        //点亮圆点按钮
        dotLight();
    }
}


// 根据索引值设置translateX
// 前面一个translateX(-100%)
function prevOne() {
    // 如果当前轮播的是第一张，那么最后一张设为放在第一张的前面
    //(oldImgIndex == (imgIndex + 1) || oldImgIndex == 0)表示是往前轮播一张或者前一张图是第一张
    if (imgIndex < 1) {
        if ((oldImgIndex == (imgIndex + 1) || oldImgIndex == 0)) {
            liDom.eq(liLength - 1).removeTransition();
        } else {
            liDom.eq(liLength - 1).addTransition();
        }
        liDom[liLength - 1].style.webkitTransform = "translateX(-100%)";
        liDom[liLength - 1].style.mozTransform = "translateX(-100%)";
        liDom[liLength - 1].style.msTransform = "translateX(-100%)";
        liDom[liLength - 1].style.oTransform = "translateX(-100%)";
        liDom[liLength - 1].style.transform = "translateX(-100%)";
    }
    //(oldImgIndex == (imgIndex + 1) || (oldImgIndex == 0 && imgIndex !== 1))表示往前轮播一张或者往后轮播一张时imgIndex不为第二张的情况下
    else {
        if ((oldImgIndex == (imgIndex + 1) || (oldImgIndex == 0 && imgIndex !== 1))) {
            liDom.eq(imgIndex - 1).removeTransition();
        } else {
            liDom.eq(imgIndex - 1).addTransition();
        }
        liDom.get(imgIndex - 1).style.webkitTransform = "translateX(-100%)";
        liDom.get(imgIndex - 1).style.mozTransform = "translateX(-100%)";
        liDom.get(imgIndex - 1).style.msTransform = "translateX(-100%)";
        liDom.get(imgIndex - 1).style.oTransform = "translateX(-100%)";
        liDom.get(imgIndex - 1).style.transform = "translateX(-100%)";
    }
}
var i, j;
// 前面所有的图设为translateX(-100%)
function prev() {
    // 如果当前轮播的是第一张，那么最后一张设为放在第一张的前面
    if (imgIndex < 1) {
        // dotIndex == dotLength - 1;表示前面一张是否为最后一张
        if (dotIndex == dotLength - 1) {
            liDom.eq(liLength - 1).addTransition();
        } else {
            liDom.eq(liLength - 1).removeTransition();
        }
        liDom[liLength - 1].style.webkitTransform = "translateX(-100%)";
        liDom[liLength - 1].style.mozTransform = "translateX(-100%)";
        liDom[liLength - 1].style.msTransform = "translateX(-100%)";
        liDom[liLength - 1].style.oTransform = "translateX(-100%)";
        liDom[liLength - 1].style.transform = "translateX(-100%)";
    } else {
        //oldImgIndex加上动画，其他的不加
        if (oldImgIndex < imgIndex) {
            for (i = 0; i < oldImgIndex; i++) {
                liDom.eq(i).removeTransition();
                liDom[i].style.webkitTransform = "translateX(-100%)";
                liDom[i].style.mozTransform = "translateX(-100%)";
                liDom[i].style.msTransform = "translateX(-100%)";
                liDom[i].style.oTransform = "translateX(-100%)";
                liDom[i].style.transform = "translateX(-100%)";
            }
            for (i = oldImgIndex + 1; i < imgIndex; i++) {
                liDom.eq(i).removeTransition();
                liDom[i].style.webkitTransform = "translateX(-100%)";
                liDom[i].style.mozTransform = "translateX(-100%)";
                liDom[i].style.msTransform = "translateX(-100%)";
                liDom[i].style.oTransform = "translateX(-100%)";
                liDom[i].style.transform = "translateX(-100%)";
            }
            // 如果是切换到最后一张，那么第一张不添加动画
            if (imgIndex == liLength - 1) {
                liDom.eq(0).removeTransition();
                liDom[0].style.webkitTransform = "translateX(-100%)";
                liDom[0].style.mozTransform = "translateX(100%)";
                liDom[0].style.msTransform = "translateX(100%)";
                liDom[0].style.oTransform = "translateX(100%)";
                liDom[0].style.transform = "translateX(100%)";
                if (oldImgIndex == 0) {
                    liDom.eq(0).addTransition();
                    liDom[0].style.webkitTransform = "translateX(-100%)";
                    liDom[0].style.mozTransform = "translateX(100%)";
                    liDom[0].style.msTransform = "translateX(100%)";
                    liDom[0].style.oTransform = "translateX(100%)";
                    liDom[0].style.transform = "translateX(100%)";
                }
                else if (oldImgIndex !== 0) {
                    liDom.eq(oldImgIndex).addTransition();
                    liDom[oldImgIndex].style.webkitTransform = "translateX(-100%)";
                    liDom[oldImgIndex].style.mozTransform = "translateX(-100%)";
                    liDom[oldImgIndex].style.msTransform = "translateX(-100%)";
                    liDom[oldImgIndex].style.oTransform = "translateX(-100%)";
                    liDom[oldImgIndex].style.transform = "translateX(-100%)";
                }
            }
            else {
                liDom.eq(oldImgIndex).addTransition();
                liDom[oldImgIndex].style.webkitTransform = "translateX(-100%)";
                liDom[oldImgIndex].style.mozTransform = "translateX(-100%)";
                liDom[oldImgIndex].style.msTransform = "translateX(-100%)";
                liDom[oldImgIndex].style.oTransform = "translateX(-100%)";
                liDom[oldImgIndex].style.transform = "translateX(-100%)";
            }

        } else if (oldImgIndex > imgIndex) {
            for (i = 0; i < imgIndex; i++) {
                liDom.eq(i).removeTransition();
                liDom[i].style.webkitTransform = "translateX(-100%)";
                liDom[i].style.mozTransform = "translateX(-100%)";
                liDom[i].style.msTransform = "translateX(-100%)";
                liDom[i].style.oTransform = "translateX(-100%)";
                liDom[i].style.transform = "translateX(-100%)";
            }
        }
    }

}
//当前设为translateX(0)，并添加过渡动画
function now() {
    liDom.eq(imgIndex).addTransition();
    liDom[imgIndex].style.webkitTransform = "translateX(0)";
    liDom[imgIndex].style.mozTransform = "translateX(0)";
    liDom[imgIndex].style.msTransform = "translateX(0)";
    liDom[imgIndex].style.oTransform = "translateX(0)";
    liDom[imgIndex].style.transform = "translateX(0)";
}



// 后面一个设为translateX(100%)
function nextOne() {
    // 如果当前是最后一张图，那么第一张设在最后一张的后面
    if (imgIndex > liLength - 2) {
        //(oldImgIndex == (imgIndex + 1) || oldImgIndex == 0)表示是往前轮播一张或者前一张图是第一张
        if ((oldImgIndex == (imgIndex + 1) || oldImgIndex == 0)) {
            liDom.eq(0).addTransition();
        } else {
            liDom.eq(0).removeTransition();
        }
        liDom[0].style.webkitTransform = "translateX(100%)";
        liDom[0].style.mozTransform = "translateX(100%)";
        liDom[0].style.msTransform = "translateX(100%)";
        liDom[0].style.oTransform = "translateX(100%)";
        liDom[0].style.transform = "translateX(100%)";
    } else if (imgIndex < 1) {
        for (i = 1; i < liLength - 1; i++) {
            //(oldImgIndex == (imgIndex + 1) || oldImgIndex == 0)表示是往前轮播一张或者前一张图是第一张
            if ((oldImgIndex == (imgIndex + 1) || oldImgIndex == 0)) {
                liDom.eq(i).addTransition();
            } else {
                liDom.eq(i).removeTransition();
            }
            liDom[i].style.webkitTransform = "translateX(100%)";
            liDom[i].style.mozTransform = "translateX(100%)";
            liDom[i].style.msTransform = "translateX(100%)";
            liDom[i].style.oTransform = "translateX(100%)";
            liDom[i].style.transform = "translateX(100%)";
        }
    } else {
        //(oldImgIndex == (imgIndex + 1) || (oldImgIndex == 0 && imgIndex !== 1))表示往前轮播一张或者往后轮播一张时imgIndex不为第二张的情况下
        if ((oldImgIndex == (imgIndex + 1) || (oldImgIndex == 0 && imgIndex !== 1))) {
            liDom.eq(imgIndex + 1).addTransition();
        } else {
            liDom.eq(imgIndex + 1).removeTransition();
        }
        liDom[imgIndex + 1].style.webkitTransform = "translateX(100%)";
        liDom[imgIndex + 1].style.mozTransform = "translateX(100%)";
        liDom[imgIndex + 1].style.msTransform = "translateX(100%)";
        liDom[imgIndex + 1].style.oTransform = "translateX(100%)";
        liDom[imgIndex + 1].style.transform = "translateX(100%)";
    }
}
// 后面所有的图设为translate(100%)
function next() {
    // 如果当前是最后一张图，那么第一张设在最后一张的后面
    if (imgIndex > liLength - 2) {
        //dotIndex == 0;表示前一张图是第一张
        if (dotIndex == 0) {
            liDom.eq(0).addTransition();
        } else {
            liDom.eq(0).removeTransition();
        }
        liDom[0].style.webkitTransform = "translateX(100%)";
        liDom[0].style.mozTransform = "translateX(100%)";
        liDom[0].style.msTransform = "translateX(100%)";
        liDom[0].style.oTransform = "translateX(100%)";
        liDom[0].style.transform = "translateX(100%)";
    }
    //oldImgIndex加动画，其他的不加
    else {
        if (oldImgIndex < imgIndex) {
            for (j = indexNow + 1; j < liLength; j++) {
                liDom.eq(j).removeTransition();
                liDom[j].style.webkitTransform = "translateX(100%)";
                liDom[j].style.mozTransform = "translateX(100%)";
                liDom[j].style.msTransform = "translateX(100%)";
                liDom[j].style.oTransform = "translateX(100%)";
                liDom[j].style.transform = "translateX(100%)";
            }
        } else if (oldImgIndex > imgIndex) {
            for (j = indexNow + 1; j < oldImgIndex; j++) {
                liDom.eq(j).removeTransition();
                liDom[j].style.webkitTransform = "translateX(100%)";
                liDom[j].style.mozTransform = "translateX(100%)";
                liDom[j].style.msTransform = "translateX(100%)";
                liDom[j].style.oTransform = "translateX(100%)";
                liDom[j].style.transform = "translateX(100%)";
            }
            for (j = oldImgIndex + 1; j < liLength; j++) {
                liDom.eq(j).removeTransition();
                liDom[j].style.webkitTransform = "translateX(100%)";
                liDom[j].style.mozTransform = "translateX(100%)";
                liDom[j].style.msTransform = "translateX(100%)";
                liDom[j].style.oTransform = "translateX(100%)";
                liDom[j].style.transform = "translateX(100%)";
            }
            // 如果当前轮播图是第一个，那么最后一个不加动画
            if (imgIndex == 0) {
                liDom.eq(liLength - 1).removeTransition();
                liDom[liLength - 1].style.webkitTransform = "translateX(-100%)";
                liDom[liLength - 1].style.mozTransform = "translateX(-100%)";
                liDom[liLength - 1].style.msTransform = "translateX(-100%)";
                liDom[liLength - 1].style.oTransform = "translateX(-100%)";
                liDom[liLength - 1].style.transform = "translateX(-100%)";
                if (oldImgIndex == liLength -1){
                    liDom.eq(liLength - 1).addTransition();
                    liDom[liLength - 1].style.webkitTransform = "translateX(-100%)";
                    liDom[liLength - 1].style.mozTransform = "translateX(-100%)";
                    liDom[liLength - 1].style.msTransform = "translateX(-100%)";
                    liDom[liLength - 1].style.oTransform = "translateX(-100%)";
                    liDom[liLength - 1].style.transform = "translateX(-100%)";
                }
                else if (oldImgIndex !== liLength - 1) {
                    liDom.eq(oldImgIndex).addTransition();
                    liDom[oldImgIndex].style.webkitTransform = "translateX(100%)";
                    liDom[oldImgIndex].style.mozTransform = "translateX(100%)";
                    liDom[oldImgIndex].style.msTransform = "translateX(100%)";
                    liDom[oldImgIndex].style.oTransform = "translateX(100%)";
                    liDom[oldImgIndex].style.transform = "translateX(100%)";
                }
            } else {
                liDom.eq(oldImgIndex).addTransition();
                liDom[oldImgIndex].style.webkitTransform = "translateX(100%)";
                liDom[oldImgIndex].style.mozTransform = "translateX(100%)";
                liDom[oldImgIndex].style.msTransform = "translateX(100%)";
                liDom[oldImgIndex].style.oTransform = "translateX(100%)";
                liDom[oldImgIndex].style.transform = "translateX(100%)";
            }
        }
    }
}

// 轮播图触摸(touch)事件
function bannerTouch() {
    //touchstart
    liDom.on('touchstart',function(event) {
        // event.preventDefault();
        startX = event.originalEvent.targetTouches[0].clientX;//获取开始x坐标
    })

    //touchmove
    liDom.on('touchmove',function (event) {
        // event.preventDefault();
        endX = event.originalEvent.targetTouches[0].clientX;//获取滑动结束时x坐标
        moveX = endX - startX;//手指移动的距离
        //图片偏移距离
        liDom[imgIndex].style.webkitTransform = "translateX("+moveX*0.75+"px)";
        liDom[imgIndex].style.mozTransform = "translateX("+moveX*0.75+"px)";
        liDom[imgIndex].style.msTransform = "translateX("+moveX*0.75+"px)";
        liDom[imgIndex].style.oTransform = "translateX("+moveX*0.75+"px)";
        liDom[imgIndex].style.transform = "translateX("+moveX*0.75+"px)";
        // 滑动过程中关闭定时器，暂停自动轮播
        stop(automateBanner);
    })

    //touchcannel
    liDom.on('touchcannel',function (event) {
        // event.preventDefault();
        if (moveX > maxX){
            lastImg();
        }
        else if(moveX < minX){
            nextImg();
        }
        // 如果滑动距离不够,图片回弹
        else {
            liDom[imgIndex].style.webkitTransform = "translateX(0)";
        }
        // 先关闭定时器然后在开启定时器
        stop(automateBanner);
        // 手指离开后，打开定时器，开始自动轮播
        automateBanner = play(nextImg,3000)

        //结束后重置各项参数
        startX = 0;
        endX = 0;
        moveX = 0;
    })

    //touchend
    liDom.on('touchend',function (event) {
        // event.preventDefault();
        if (moveX > maxX){
            lastImg();
        }
        else if(moveX < minX){
            nextImg();
        }
        // 如果滑动距离不够,图片回弹
        else {
            liDom[imgIndex].style.webkitTransform = "translateX(0)";
        }
        // 先关闭定时器然后在开启定时器
        stop(automateBanner);
        // 手指离开后，打开定时器，开始自动轮播
        automateBanner = play(nextImg,3000)

        //结束后重置各项参数
        startX = 0;
        endX = 0;
        moveX = 0;
    })
}


//添加过渡动画
$.fn.addTransition = function (event) {
    var $_this = $(this)
    $_this.css({
        "webkitTransition": "all 0.3s linear 0s",
        "mozTransition": "all 0.3s linear 0s",
        "oTransition": "all 0.3s linear 0s",
        "msTransition": "all 0.3s linear 0s",
        "transition": "all 0.3s linear 0s",
    })
}

//删除过渡动画
$.fn.removeTransition = function () {
    var $_this = $(this)
    $_this.css({
        "webkitTransition": "all 0s linear 0s",
        "mozTransition": "all 0s linear 0s",
        "oTransition": "all 0s linear 0s",
        "msTransition": "all 0s linear 0s",
        "transition": "all 0s linear 0s",
    })
}

//点亮点点按钮
function dotLight() {
    dot.eq(dotIndex).addClass('active').siblings().removeClass('active');
}

//事件监听函数
function addEvent(obj, event, fn) {
    obj.on(event, fn);
}

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