$(function () {
    // drawChessboard();//绘制棋盘
    $('canvas.chessboard').on('click', playChess);//下棋
    $('canvas.chessboard').on('click', deuce);
    $('.restart').on('click',restart);//重新开始游戏
    //选择棋子颜色，若不选择系统默认是白色棋子
    $('.white-chessman').chooseChess('white');//选择白色棋子
    $('.black-chessman').chooseChess('black');//选择黑色棋子

    // 棋子跟随效果
    $('canvas.chessboard').mousemove(function () {
        chessFlying()
    })
    $('canvas.chessboard').mouseenter(function () {
        $('.move_chess').css('display','block')
    })
    $('canvas.chessboard').mouseleave(function () {
        $('.move_chess').css('display','none')
    })
    //悔棋
    $('.chess_back').on('click',chessBack)

    // 禁止选中文本（一些低版本浏览器不支持）
    forbidCharacterSelected(document.getElementsByClassName('options')[0]);
})

var row, col;
var playable = 1;//是否还可以继续下棋，默认为1可以下棋
var chooseChessable = true;//选择棋子颜色是否有效，1表示选择棋子颜色有效，只能开始游戏之前选择才有效，游戏开始之后选择无效
var isWhiteChess = true;//当前是否是白的棋子，默认是白色棋子
var count = parseInt($(".chess_back .count").text());//剩余悔棋次数
var map = new Array(15);//记录棋盘坐标点数组
// map[i][j] = 0用于表示当前点没有棋子，用于后面下棋棋盘上该点是否有棋子的判断
var i, j;
for (i = 0; i < 15; i++) {
    map[i] = new Array(15)
    for (j = 0; j < 15; j++) {
        // map[i][j] = 0用于表示当前点没有棋子，用于后面下棋棋盘上该点是否有棋子的判断
        map[i][j] = 0;
    }
}
var existingChooseCount = 0;
//记录已经放有棋子的点的位置信息
var existingChoose = new Array(196);
for (i = 0; i <= 196 ; i++) {
    existingChoose[i] = new Array(2)
}

var blackChess = new Image();
var whiteChess = new Image();
blackChess.src = "img/black.png";//是"img/black.png"而不是"../img/black.png"
whiteChess.src = "img/white.png";
var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
var offsetX = $(".container").offset().left;
var offsetY = $(".container").offset().top;

// 窗口大小改变时
$(window).resize(function () {
    scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    scrollY = document.documentElement.scrollTop || document.body.scrollTop;
})
//滚动页面时
$(document).scroll(function () {
    scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    scrollY = document.documentElement.scrollTop || document.body.scrollTop;
})

// 绘制棋盘
function drawChessboard() {
    var i, j;
    for (i = 0; i < 15; i++) {
        map[i] = new Array(15)
        for (j = 0; j < 15; j++) {
            // map[i][j] = 0用于表示当前点没有棋子，用于后面下棋棋盘上该点是否有棋子的判断
            map[i][j] = 0;
        }
    }

    var ctx = $('.chessboard')[0].getContext('2d');
    ctx.strokeStyle = "#a21e51";
    for (i = 0; i < 15; i++) {
        for (j = 0; j < 15; j++) {
            ctx.strokeRect(i * 40, j * 40, 40, 40)
        }
    }
}


//
function play() {

}

//下棋
function playChess(event) {
    chooseChessable = false;//不能再选择棋子颜色
    var e = event || window.event;
    var chessX = e.clientX + scrollX - offsetX;//点击位置x坐标
    var chessY = e.clientY + scrollY - offsetY;//点击位置y坐标
    //下棋位置
    if (chessX > 20 && chessX < 580 && chessY > 20 && chessY < 580) {
        if (chessX % 40 >= 0 && chessX % 40 < 20) {
            col = parseInt(chessX / 40);
        } else if (chessX % 40 >= 20) {
            col = parseInt(chessX / 40) + 1;
        }
        if (chessY % 40 >= 0 && chessY % 40 < 20) {
            row = parseInt(chessY / 40);
        } else if (chessY % 40 >= 20) {
            row = parseInt(chessY / 40) + 1;
        }

        var ctx = $('.chessboard')[0].getContext('2d');
        if(map[col][row] == 0 && playable){
            if (isWhiteChess) {
                ctx.drawImage(whiteChess, col * 40 - 20, row * 40 - 20);
                // 记录棋子颜色,改变下次使用棋子颜色
                isWhiteChess = false;
                // 改变该点状态，表示此点已经下有白色棋子了
                map[col][row] = 1;
                isWin(col,row)
            } else {
                ctx.drawImage(blackChess, col * 40 - 20, row * 40 - 20);
                // 记录棋子颜色,改变下次使用棋子颜色
                isWhiteChess = true;
                // 改变该点状态，表示此点已经下有黑色棋子了
                map[col][row] = 2;
                isWin(col,row)
            }
            //检测是否平手
            deuce();
            // 重置剩余悔棋次数
            count = 3;
            $(".chess_back .count").text(count)
            //记录放有棋子的点的信息
            existingChooseCount++;
            existingChoose[existingChooseCount][0] = row;
            existingChoose[existingChooseCount][1] = col;
            // console.log(existingChooseCount)
            // console.log(existingChoose[existingChooseCount][1]);
            // console.log(existingChoose[existingChooseCount][0]);
        }
    }
}

//判断胜出
function isWin(col,row) {
    // 判断一条线上是否有五个一样的棋子了
    var total;//同一条线上同色棋子总数
    var nowcol = col;//记录当前点击点列数
    var nowrow = row;//记录当前点击点行数
    //水平方向
    //白子
    total = 1;
    col = nowcol;
    row = nowrow;
    while(col-1 > 0 && col-1 < 14 && (map[col-1][row] == 1)){
        col--;
        total++;
    }
    col = nowcol;
    row = nowrow;
    while(col+1 > 1 && col+1 < 15 && (map[col+1][row] == 1)){
        col++;
        total++;
    }
    if (total >= 5){
        alert("白方胜")
        showCorfirm();
        // setTimeout(restart,500);//一方胜利后清空画布
    }
    //黑子
    total = 1;
    col = nowcol;
    row = nowrow;
    while(col-1 > 0 && col-1 < 14 && (map[col-1][row] == 2)){
        col--;
        total++;
    }
    col = nowcol;
    row = nowrow;
    while(col+1 > 1 && col+1 < 15 && (map[col+1][row] == 2)){
        col++;
        total++;
    }
    if (total >= 5){
        alert("黑方胜")
        showCorfirm();
        // setTimeout(restart,500);//一方胜利后清空画布
    }
    //垂直方向
    //白子
    total = 1;
    col = nowcol;
    row = nowrow;
    while(row-1 > 0 && row-1 < 14 && (map[col][row-1] == 1)){
        row--;
        total++;
    }
    col = nowcol;
    row = nowrow;
    while(row+1 > 1 && row+1 < 15 && (map[col][row+1] == 1)){
        row++;
        total++;
    }
    if (total >= 5){
        alert("白方胜")
        showCorfirm();
        // setTimeout(restart,500);//一方胜利后清空画布
    }
    //黑子
    total = 1;
    col = nowcol;
    row = nowrow;
    while(row-1 > 0 && row-1 < 14 && (map[col][row-1] == 2)){
        row--;
        total++;
    }
    col = nowcol;
    row = nowrow;
    while(row+1 > 1 && row+1 < 15 && (map[col][row+1] == 2)){
        row++;
        total++;
    }
    if (total >= 5){
        alert("黑方胜")
        showCorfirm();
        // setTimeout(restart,500);//一方胜利后清空画布
    }

    // 斜角方向
    //白子
    total = 1;
    col = nowcol;
    row = nowrow;
    while(col-1 > 0 && col-1 < 14 && row+1 > 1 && row+1 < 15 && (map[col-1][row+1] == 1)){
        col--;
        row++;
        total++;
    }
    col = nowcol;
    row = nowrow;
    while(col+1 > 1 && col+1 < 15 && row-1 > 0 && row-1 < 14 && (map[col+1][row-1] == 1)){
        col++;
        row--;
        total++;
    }
    if (total >= 5){
        alert("白方胜")
        showCorfirm();
        // setTimeout(restart,500);//一方胜利后清空画布
    }
    //黑子
    total = 1;
    col = nowcol;
    row = nowrow;
    while(col-1 > 0 && col-1 < 14 && row+1 > 1 && row+1 < 15 && (map[col-1][row+1] == 2)){
        col--;
        row++;
        total++;
    }
    col = nowcol;
    row = nowrow;
    while(col+1 > 1 && col+1 < 15 && row-1 > 0 && row-1 < 14 && (map[col+1][row-1] == 2)){
        col++;
        row--;
        total++;
    }
    if (total >= 5){
        alert("黑方胜")
        showCorfirm();
        // setTimeout(restart,500);//一方胜利后清空画布
    }
}

//重新开始游戏
function restart(){
    //初始化数值
    chooseChessable = true;
    playable = 1;
    // 重置剩余悔棋次数
    count = 3;
    $(".chess_back .count").text(count)

    isWhiteChess = true;//当前是否是白的棋子，默认是白色棋子
    map = new Array(15);//记录棋盘坐标点数组
    var i, j;
    for (i = 0; i < 15; i++) {
        map[i] = new Array(15)
        for (j = 0; j < 15; j++) {
            // map[i][j] = 0用于表示当前点没有棋子，用于后面下棋棋盘上该点是否有棋子的判断
            map[i][j] = 0;
        }
    }
    col = null;
    row = null;
    // 清空画布并重新绘制棋盘
    $('.chessboard')[0].height = $('.chessboard')[0].height;
    // drawChessboard();

}

//选择棋子
$.fn.chooseChess = function(color){
    var _this = $(this);
        _this.on('click',function () {
            if (color == 'white' && chooseChessable === true){
                isWhiteChess = true;
            }else if(color == 'black' && chooseChessable === true){
                isWhiteChess = false;
            }
        })
}

//棋盘已满，平局
function deuce() {
    var i,j;
    var total = 0;//记录空格个数
    for (i = 1;i < 15;i++){
        for (j = 1;j < 15;j++){
            if (map[i][j] == 0){
                total++;
            }
        }
    }
    if (total == 0){
        alert("平局");
        showCorfirm();
    }
}

// 胜负已分后的提示
function showCorfirm(){
    var r = confirm("是否重新开始游戏？")
    if (r == true){
        restart();
    }else{
        playable = 0;
        alert("若你想要继续游戏，可以点击右下角“restart”按钮重新开始游戏")
    }

}

//棋子跟随效果
function chessFlying(event){
    if (isWhiteChess){
        //当jquery的css设置样式时就是设置dom元素的style属性
        $('.move_chess').css("background","url('img/white.png') no-repeat")
    }else{
        $('.move_chess').css("background","url('img/black.png') no-repeat")
    }
    var e = event || window.event;
    var intX = e.clientX + scrollX;
    var intY = e.clientY + scrollY;
    $('.move_chess').css("left",intX+"px")
    $('.move_chess').css("top",intY+"px")
}


// 悔棋
function chessBack(){
    var ctx = $("canvas.chessboard")[0].getContext("2d");
    if (existingChooseCount > 0){
        if (count == 3){
            // 棋盘上对应棋子消失
            ctx.beginPath();
            // ctx.clearRect(col*40-20,row*40-20,36,36)
            ctx.clearRect(existingChoose[existingChooseCount][1]*40-20,existingChoose[existingChooseCount][0]*40-20,36,36);
            map[existingChoose[existingChooseCount][1]][existingChoose[existingChooseCount][0]] = 0;
            // map[col][row] = 0;
            // existingChoose[existingChooseCount][0] = null;
            // existingChoose[existingChooseCount][1] = null;
            existingChooseCount--;
            // 字数变化
            count--;
            $(".chess_back .count").text(count);
            // 下棋颜色改变
            if (isWhiteChess){
                isWhiteChess = false;
            }else{
                isWhiteChess = true;
            }
        }
        else if(count == 2){
            if (existingChooseCount > 1){
                ctx.beginPath();
                ctx.clearRect(existingChoose[existingChooseCount][1]*40-20,existingChoose[existingChooseCount][0]*40-20,36,36);
                ctx.clearRect(existingChoose[existingChooseCount-1][1]*40-20,existingChoose[existingChooseCount-1][0]*40-20,36,36);
                map[existingChoose[existingChooseCount][1]][existingChoose[existingChooseCount][0]] = 0;
                map[existingChoose[existingChooseCount-1][1]][existingChoose[existingChooseCount-1][0]] = 0;
                // existingChoose[existingChooseCount][0] = null;
                // existingChoose[existingChooseCount][1] = null;
                // existingChoose[existingChooseCount-1][0] = null;
                // existingChoose[existingChooseCount-1][1] = null;
                existingChooseCount -= 2;
                // 字数变化
                count--;
                $(".chess_back .count").text(count);
            }
        }else if (count == 1){
            if (existingChooseCount > 1){
                ctx.beginPath();
                ctx.clearRect(existingChoose[existingChooseCount][1]*40-20,existingChoose[existingChooseCount][0]*40-20,36,36);
                ctx.clearRect(existingChoose[existingChooseCount-1][1]*40-20,existingChoose[existingChooseCount-1][0]*40-20,36,36);
                map[existingChoose[existingChooseCount][1]][existingChoose[existingChooseCount][0]] = 0;
                map[existingChoose[existingChooseCount-1][1]][existingChoose[existingChooseCount-1][0]] = 0;
                // existingChoose[existingChooseCount][0] = null;
                // existingChoose[existingChooseCount][1] = null;
                // existingChoose[existingChooseCount-1][0] = null;
                // existingChoose[existingChooseCount-1][1] = null;
                existingChooseCount -= 2;
                // 字数变化
                count--;
                $(".chess_back .count").text(count);
            }

        }
    }
}
// 禁止文字被选择
var forbidCharacterSelected = function (obj) {
    obj.onselectstart = obj.ondrag = function () {
        return false;
    }
}
