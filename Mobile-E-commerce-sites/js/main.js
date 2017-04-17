$(document).ready(function () {
    search();
    bannerMove()
    secondKill();
    productMove();
})


//轮播图自动播放
function bannerMove() {
    var banner = $(".banner"),  //获取最外层框架的名称
        ul = banner.find("ul"),
        showNumber = banner.find(".showNav li"),//获取按钮
        oneWidth = banner.find("ul li").eq(0).width(); //获取每个图片的宽度
    var timer = null; //定时器返回值，主要用于关闭定时器
    var iNow = 0;  //iNow为正在展示的图片索引值，当用户打开网页时首先显示第一张图，即索引值为0
    showNumber.on("click", function () {   //为每个按钮绑定一个点击事件
        $(this).addClass("active").siblings().removeClass("active"); //按钮点击时为这个按钮添加高亮状态，并且将其他按钮高亮状态去掉
        var index = $(this).index(); //获取哪个按钮被点击，也就是找到被点击按钮的索引值
        iNow = index;

        ul.animate({

            "left": -oneWidth * iNow, //注意此处用到left属性，所以ul的样式里面需要设置position: relative; 让ul左移N个图片大小的宽度，N根据被点击的按钮索引值iNOWx确定
        })
    });

    timer = setInterval(function () {  //打开定时器
        iNow++;       //让图片的索引值次序加1，这样就可以实现顺序轮播图片
        if (iNow > showNumber.length - 1) { //当到达最后一张图的时候，让iNow赋值为第一张图的索引值，轮播效果跳转到第一张图重新开始
            iNow = 0;
        }
        showNumber.eq(iNow).trigger("click"); //模拟触发数字按钮的click
    }, 2500); //2000为轮播的时间
}



// 搜索框固定，变色
var search = function () {
    /*搜索框对象*/
    var search = document.getElementsByClassName('header_box')[0];
    /*banner对象*/
    var banner = document.getElementsByClassName('banner')[0];
    /*高度*/
    var height = banner.offsetHeight;

    window.onscroll = function () {
        var top = document.body.scrollTop;
        /*当滚动高度大于banner的高度时候颜色不变*/
        if (top > height) {
            search.style.background = "rgba(201,21,35,0.85)";
        } else {
            var op = top / height * 0.85;
            search.style.background = "rgba(201,21,35," + op + ")";
        }
    };
};

/*秒杀倒计时*/
var secondKill = function () {
    /*父盒子*/
    var parentTime = document.getElementsByClassName('sk_time')[0];
    /*span时间*/
    var timeList = parentTime.getElementsByClassName('num');
    var times = 6 * 60 * 60;
    timer = setInterval(function () {
        times--;
        var h = Math.floor(times / (60 * 60));
        var m = Math.floor(times / 60 % 60);
        var s = times % 60;
        timeList[0].innerHTML = h > 10 ? Math.floor(h / 10) : 0;
        timeList[1].innerHTML = h % 10;
        timeList[2].innerHTML = m > 10 ? Math.floor(m / 10) : 0;
        timeList[3].innerHTML = m % 10;
        timeList[4].innerHTML = s > 10 ? Math.floor(s / 10) : 0;
        timeList[5].innerHTML = s % 10;
        if (times <= 0) {
            clearInterval(timer);
        }
    }, 1000);

}

// 计算秒杀区商品栏长度
// function productLength() {
//     var productNum = $('.product_bot li');
//     var productWidth = null;
//     //设置商品的宽度
//     productNum.width($('.product_bot').width()*0.3);
//
//     //遍历获取所有商品的总长度
//     productNum.each(function (index,element) {
//         productWidth += element.clientWidth;
//     })
//     // console.log(productWidth)
//     // console.log($('.product_bot').width()*0.3)
//     productNum.parent('ul').width(productWidth+10);
//
//     //设置product_wrap跟product_bot的高度
//     // console.log($('.product_bot ul').height());
//     // console.log($('.product_bot ul').height()+50);
//     // $(".product_wrap").height($('.product_bot ul').height()+50);
//     // $(".product_bot").height($('.product_wrap').height()-30);
//     // console.log($('.product_bot ul').height());
//     // // 这种方法返回undefined，为什么
//     // for (var i = 0; i < productNum; i++) {
//     //     console.log(parseFloat($('.product_bot li :eq(i)').width()))
//     //     productWidth += $('.product_bot li :eq(i)').width();
//     //     // console.log(productWidth)
//     // }
//
// }



// 商品滑动
function productMove() {
    var parentDom = document.getElementsByClassName('product_bot')[0];//获取父盒子
    var childDom =parentDom.getElementsByTagName('ul')[0];//获取子盒子
    var liDom = $('.product_bot li');//li标签，商品列表
    var liW = parentDom.offsetWidth*0.3;
    liDom.width(liW);//单个商品的宽
    var productWidth = 0;//所有商品总占用总宽度
    // 遍历设置商品总宽度
    liDom.each(function(index,element){
        productWidth += element.offsetWidth;
    })
    productWidth += 30;
    //获取父盒子宽度
    var parentW = parentDom.offsetWidth;

    //设置子盒子宽度
    // childDom.offsetWidth = productWidth; //无效
    // childDom.clientWidth = productWidth; //无效
    $(childDom).width(productWidth);//有效  这是为何？？
    var childW = childDom.offsetWidth;

    var startX = 0;//开始时的X坐标
    var endX = 0; //结束时的X坐标
    var moveX = 0;//手指滑动的距离
    var currentX = 0;//当前translateX值

    // 限制最大、最小滑动距离
    var minMoveX = -childW;
    var maxMoveX = 0;
    //touchstart 手指接触屏幕
    childDom.addEventListener('touchstart',function(event){
        startX = event.touches[0].clientX;//获取开始时的X坐标
    },false)

    //touchmove  手指滑动屏幕
    childDom.addEventListener('touchmove',function (event) {
        // event.preventDefault();
        endX = event.touches[0].clientX; //获取结束时的X坐标
        moveX = endX - startX;
        if ((currentX+moveX) <= maxMoveX && (currentX+moveX) >= minMoveX){
            childDom.style.webkitTransform = "translateX("+(currentX+moveX)+"px)";
            childDom.style.mozTransform = "translateX("+(currentX+moveX)+"px)";
            childDom.style.oTransform = "translateX("+(currentX+moveX)+"px)";
            childDom.style.msTransform = "translateX("+(currentX+moveX)+"px)";
            childDom.style.Transform = "translateX("+(currentX+moveX)+"px)";
        }
    },false)

    //touchcannel touch事件意外中断
    childDom.addEventListener('touchcannel',function () {
        //记录当前的translateX值
        if((currentX+moveX) >= -(childW - parentW) && (currentX+moveX) <= maxMoveX){
            currentX = moveX + currentX;
        }
    },false)

    //touchend 手指离开屏幕
    childDom.addEventListener('touchend',function () {
        //记录当前的translateX值
        if((currentX+moveX) >= -(childW - parentW) && (currentX+moveX) <= maxMoveX){
            currentX = moveX + currentX;
        }
        //向左划过头就跳转到更多秒杀页面
        else if((currentX + moveX) < -(childW - parentW)){
            window.location = "goods.html"
        }

    },false)
}
