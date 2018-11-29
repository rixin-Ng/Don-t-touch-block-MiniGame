//点击开始游戏区域，区域消失，开始生成4行4列的方块
//每一行方块中随机改变其中一个的颜色,并为其添加class类名
//绑定点击事件，开始区域、main区域，点对了含有class类名的方块，分数+1，改变方块样式，清除class类名
//方块运动-->main区运动，定时在上面插入新一行，行数大于等于6时，删除最后一行
//判断游戏结束，点到白色方块（没有class类名）/最后一行出现有颜色的方块（class类名还在），弹出分数框
//main区域运动加速，游戏结束后不能再响应点击（加锁）

var topArea = $('.top');
var main = $('.main');
var timer;
var speed = 5;
var num = 0;
var colors = ['red', 'blue', 'yellow', 'green'];
var flag = true;


function createDiv() {
    var oDiv = $('<div></div>');
    var index = Math.floor(Math.random() * 4);
    oDiv.attr('class', 'row');
    for (var j = 0; j < 4; j++) {
        var iDiv = $('<div></div>');
        oDiv.append(iDiv);
    }
    if (main.children().length == 0) {
        main.append(oDiv);
    } else {
        oDiv.insertBefore(main.children()[0]);
    }
    var clickDiv = oDiv.children()[index];

    $(clickDiv).css('backgroundColor', colors[index]);
    $(clickDiv).attr('class', 'correct');
};

function move(dom) {
    clearInterval(timer);
    timer = setInterval(function () {
        var step = parseInt(dom.css('top')) + speed;
        dom.css('top', step + 'px');
        if (parseInt(dom.css('top')) >= 0) {
            createDiv();
            dom.css({
                'top': -120 + 'px',
            });
        }
        var len = dom.children().length;
        if (len == 6) {
            for (var j = 0; j < 4; j++) {
                if (dom.children()[len - 1].children[j].className == 'correct') {
                    dom.css('top', '0px');
                    alert('游戏结束,最高得分:' + num);
                    clearInterval(timer);
                }
            }
            $(dom.children()[dom.children().length - 1]).remove();
        }
    }, 20);
    bindEvent();
}

function bindEvent() {
    main.on('click', function (e) {
        if (flag) {
            if (e.target.className == 'correct') {
                e.target.style.backgroundColor = '#ccc';
                e.target.className = '';
                num++;
            } else {
                main.css('top', '0px');
                alert('游戏结束,最高得分:' + num);
                clearInterval(timer);
                flag = false;
            }
            if (num % 10 == 0) {
                speed++;
            }
        }
    })


}
function clickStart() {
    topArea.on('click', function () {
        if (main.children().length) {
            //暴力清楚main里面所有盒子
            main.html('');
        }
        //清空计分
        //隐藏开始盒子
        topArea.css('display', 'none');
        //调用定时器
        move(main);
    })
}
clickStart();