$(document).ready(function () {
    // 切换默认的隐藏的导航栏显示状态
    $('.icon_menu').on('click',function () {
        $('.header_bar').toggle();
    })
    //页面加载设置fixed-wrap.wrap的宽度
    $('.fixed-wrap .wrap').width($(window).width());
    //领取优惠券
    $('.yhq .content_rf_box1').on('click',function () {
        $(this).css('display','none').siblings().css('display','block');
    })

    $(".all-category-wrap").height(0);

    categoryMove();
    toggle_category();
})


// // 选择栏切换效果
// $('.bar li span').on('click',function () {
//     $(this).addClass('active').parent().siblings().children().removeClass('active');
//     var index = $(this).parent().index();
//     $('.yhq .container ul').eq(index).addClass('active').siblings().removeClass('active');
// })


//优惠券面板（.yhq）的动态margin-top值



//选择栏bar的top值
// function barTop() {
//     var headerH = $('.header').height();
//     console.log(headerH)
//     $(".bar").css('top',headerH);
// }


// 优惠券分类滑动选择
function categoryMove() {
    var parentDom = document.getElementsByClassName('bar_left')[0];//获取父盒子
    var childDom =parentDom.getElementsByTagName('ul')[0];//获取子盒子
    var liDom = $('.bar_left li');//li标签，类别列表
    var yhqDom = $('.yhq .container');
    var liW = liDom.width();//单个类别的宽
    var productWidth = 0;//所有类别总占用总宽度
    // 遍历设置商品总宽度
    liDom.each(function(index,element){
        productWidth += element.offsetWidth;
    })

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

    //添加过渡动画
    function addTransition() {
        childDom.style.webkitTransition = 'all .3s ease 0s';
        childDom.style.mozTransition = 'all .3s ease 0s';
        childDom.style.oTransition = 'all .3s ease 0s';
        childDom.style.transition = 'all .3s ease 0s';
    }

    //删除过渡动画
    function removeTransition() {
        childDom.style.webkitTransition = 'all 0s ease 0s';
        childDom.style.mozTransition = 'all 0s ease 0s';
        childDom.style.oTransition = 'all 0s ease 0s';
        childDom.style.transition = 'all 0s ease 0s';
    }


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

        //重置数据
        startX = 0;
        endX = 0;
        moveX = 0;
    },false)

    //touchend 手指离开屏幕
    childDom.addEventListener('touchend',function () {
        //记录当前的translateX值
        if((currentX+moveX) >= minMoveX && (currentX+moveX) <= maxMoveX){
            currentX = moveX + currentX;
            // console.log(currentX)
        }

        endTime  = new Date().getTime();

        //点击效果
        if ((endTime - startTime) < 200 && moveX == 0){
            // console.log(123)
            // 判断事件发生身上
            if (event.target.tagName == 'SPAN'){
                var target = event.target.parentNode;
                //当前span为'active'状态
                $(event.target).addClass('active').parent().siblings().children().removeClass('active');

            }else if(event.target.tagName == 'LI'){
                var target = event.target;
                //当前span为'active'状态
                $(target).children().addClass('active').parent().siblings().children().removeClass('active')
            }

            //获取当前li为第几个
            var index = parseInt($(target).index());
            //计算滑动的距离
            var left = liW * index;
            var integer = parseInt(childW/parentW); //取整
            var remainder = childW%parentW; //取余
            if (left <= ((integer-1)*parentW+remainder)){
                addTransition();
                childDom.style.webkitTransform = "translateX("+(-left)+"px)";
                childDom.style.mozTransform = "translateX("+(-left)+"px)";
                childDom.style.oTransform = "translateX("+(-left)+"px)";
                childDom.style.msTransform = "translateX("+(-left)+"px)";
                childDom.style.Transform = "translateX("+(-left)+"px)";
                //设置当前的translateX的值
                currentX = -(childW - parentW);
            }else{
                childDom.style.webkitTransform = "translateX("+(-(childW - remainder))+"px)";

                //设置当前的translateX的值
                currentX = -(childW - remainder);
            }

            //模拟加载效果
            yhqDom[0].style.webkitTransition= "all 0.2s ease 0s";
            yhqDom[0].style.transition = "all 0.2s ease 0s";
            yhqDom[0].style.opacity = 0;
            setTimeout(function(){
                yhqDom[0].style.opacity = 1;
            },300);
            // 优惠券部分加载
            var yhqPannel =  $('.yhq .container ul').eq(index);
            //点击才加载图片，不点击不加载，提升性能，优化体验
            yhqPannel.find('img').each(function () {
                $(this).attr('src',$(this).data('src'))
            })
            yhqPannel.addClass('active').siblings().removeClass('active');
            // 以上两个有的话，fixed-wrap的宽度会变为640,原因不明，所以先暂时加了下面的代码
            //设置fixed-wrap wrap的宽度为窗口的宽度
            $('.fixed-wrap .wrap').width($(window).width());
        }


        //重置数据
        startX = 0;
        endX = 0;
        moveX = 0;
    },false)
}

//点击右边三角按钮显示/隐藏all-category-wrap
function toggle_category() {
    $(".bar_right").on('click',function () {
        var all_category =  $(".all-category");
        var all_categoryH = all_category.height();
        //添加过渡动画
        function addTransition() {
            all_category[0].style.webkitTransition = 'all .3s ease0s';
            all_category[0].style.mozTransition = 'all .3s ease0s';
            all_category[0].style.oTransition = 'all .3s ease0s';
            all_category[0].style.transition = 'all .3s ease 0s';
        }
        //删除过渡动画
        function removeTransition() {
            all_category[0].style.webkitTransition = 'all 0s linear 0s';
            all_category[0].style.mozTransition = 'all 0s linear 0s';
            all_category[0].style.oTransition = 'all 0s linear 0s';
            all_category[0].style.transition = 'all 0s linear 0s';e
        }
        addTransition();
        // 判断是隐藏还是显示
        if( all_category.hasClass('active')){
            all_category.removeClass('active');
            $('.shade').height(0);
            $(".all-category-wrap").height(0);

        }else{
            all_category.addClass('active')
            $('.shade').height($(window).height());
            $(".all-category-wrap").height('300px');
        }



    })
}

//点击遮罩区域隐藏all-category-wrap
function show_category(){
    var all_category =  $(".all-category");
    //添加过渡动画
    function addTransition() {
        all_category[0].style.webkitTransition = 'all .3s ease0s';
        all_category[0].style.mozTransition = 'all .3s ease0s';
        all_category[0].style.oTransition = 'all .3s ease0s';
        all_category[0].style.transition = 'all .3s ease 0s';
    }
    //删除过渡动画
    function removeTransition() {
        all_category[0].style.webkitTransition = 'all 0s linear 0s';
        all_category[0].style.mozTransition = 'all 0s linear 0s';
        all_category[0].style.oTransition = 'all 0s linear 0s';
        all_category[0].style.transition = 'all 0s linear 0s';e
    }
    addTransition();
    $('.shade').on('click',function () {
        console.log("hello")
        all_category.removeClass('active');
    })
}
