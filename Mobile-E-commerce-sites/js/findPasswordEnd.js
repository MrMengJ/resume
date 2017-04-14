$(function () {

})

// 切换默认的隐藏的导航栏显示状态
$('.icon_menu').on('click', function () {
    $('.header_bar').toggle();
})


// "完成"按钮高亮
$('.import input').on('input propertychange', function () {
    if ($('.password input').val() !== '' && $('.passwordAgain input').val() !== '') {
        $('.finishBtn').addClass('active')
    } else {
        $('.finishBtn').removeClass('active')
    }
})


// 限制密码长度为6到20位长度
$('.password input').blur(function () {
    var truePassword = /^\S{6,20}$/;
    if (!(truePassword.test($(this).val()))) {
        $('.password p').text('登录密码长度应为6到20位');
        $(this).val('');
        $('.registerBtn').removeClass('active');
    } else {
        $('.password p').text('');
    }
    if ($(this).val() !== $('.passwordAgain input').val()) {
        $('.passwordAgain p').text('前后密码不一致');
        $('.passwordAgain').val("");
        $('.finishBtn').removeClass('active');
    }else{
        $('.passwordAgain p').text('');
    }
})

//验证密码
$('.passwordAgain input').blur(function () {
    if ($(this).val() !== $('.password input').val()) {
        $('.passwordAgain p').text('前后密码不一致');
        $(this).val("");
        $('.finishBtn').removeClass('active');
    }else{
        $('.passwordAgain p').text('');
    }
})
//"完成"按钮是否可用
