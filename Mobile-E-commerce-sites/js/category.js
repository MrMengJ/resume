$(document).ready(function () {
    //控制category高度
    console.log($('body').height()-$('header').height())
    $('.category').height($('body').height()-$('header').height())
})



$(".category .catLeft li a").on('click',function () {
    $(this).parent().addClass('active').siblings().removeClass('active');
    var index = parseInt($(this).parent().index());
    // $('.category .catRight .catRight_con:eq(index)').addClass('active').siblings().removeClass('active');这样写就没有用
    $('.category .catRight .catRight_con').eq(index).addClass('active').siblings().removeClass('active');
})

$('.icon_menu').click(function () {
    $('.header_bar').toggle();
})