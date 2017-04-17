$(document).ready(function () {
    categoryMove();
})

// 切换默认的隐藏的导航栏显示状态
$('.icon_menu').on('click',function () {
    $('.header_bar').toggle();
})

// // 选择栏切换效果
// $('.bar li span').on('click',function () {
//     $(this).addClass('active').parent().siblings().children().removeClass('active');
//     var index = $(this).parent().index();
//     $('.yhq .container ul').eq(index).addClass('active').siblings().removeClass('active');
// })

//领取优惠券
$('.yhq .content_rf_box1').on('click',function () {
    $(this).css('display','none').siblings().css('display','block');
})


// 优惠券分类滑动选择
function categoryMove() {
    var parentDom = document.getElementsByClassName('bar_left')[0];//获取父盒子
    var childDom =parentDom.getElementsByTagName('ul')[0];//获取子盒子
    var liDom = $('.bar_left li');//li标签，类别列表
    var liW = liDom.width();//单个类别的宽
    var productWidth = 0;//所有类别总占用总宽度
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

    var startTime = 0;//开始时的时间
    var endTime = 0;//结束时的时间
    // 限制最大、最小滑动距离
    var minMoveX = -(childW - parentW);
    var maxMoveX = 0;
    //touchstart 手指接触屏幕
    childDom.addEventListener('touchstart',function(event){
        startX = event.touches[0].clientX;//获取开始时的X坐标
        startTime = new Date().getTime();//获取开始时间
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
        if((currentX+moveX) >= minMoveX && (currentX+moveX) <= maxMoveX){
            currentX = moveX + currentX;
        }
    },false)

    //touchend 手指离开屏幕
    childDom.addEventListener('touchend',function () {
        //记录当前的translateX值
        if((currentX+moveX) >= minMoveX && (currentX+moveX) <= maxMoveX){
            currentX = moveX + currentX;
        }

        endTime  = new Date().getTime();
        if ((endTime - startTime) < 200 && moveX == 0){
            // 判断事件发生身上
            if (event.target.tagName == 'span'){
                var target = event.target.parentNode;
            }else if(event.target.tagName == 'li'){
                var target = event.target;
            }
            $(target).addClass('active').siblings().removeClass('active');
            var index = parseInt($(target).index());
            var yhqPannel =  $('.yhq .container ul').eq(index);
            yhqPannel.addClass('active').siblings().removeClass('active');
            //点击才加载图片，不点击不加载，提升性能，优化体验
            yhqPannel.find('img').each(function () {
                $(this).attr('src',$(this).data('src'))
            })
        }
    },false)
}