var WINDOW_WIDTH = 1024
var WINDOW_HEIGHT = 768
var RADIUS = 8 // 小球半径
var MARGIN_LEFT = 30
var MARGIN_TOP = 60

// var endTime = new Date()
// endTime.setTime(endTime.getTime() + 3600*1000)

var curtime = 0


var balls = []; // 存放小球
const colors= ["red","pink","yellow","orange","cyan","green","gray","purple","blue","black"] // 颜色
window.onload = function(){

    WINDOW_WIDTH = document.body.clientWidth
    WINDOW_HEIGHT = document.body.clientHeight
    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10)
    RADIUS = Math.round(WINDOW_WIDTH*4/5/108) -1
    MARGIN_TOP = Math.round(WINDOW_HEIGHT/5)

    var canvas = document.getElementById("canvas")
    canvas.width = WINDOW_WIDTH
    canvas.height = WINDOW_HEIGHT
    var context = canvas.getContext("2d")

    curtime = getcurtime()

    setInterval(() => {
        render(context)
        update()
    },50)
   
    
}


function update(){
    var nextTime = getcurtime()

    var nexthour = parseInt(nextTime/3600) < 10 ? "0"+ parseInt(nextTime/3600) : parseInt(nextTime/3600)
    var nextminites = parseInt( (nextTime - nexthour*3600)/60 ) < 10 ? "0" + parseInt( (nextTime - nexthour*3600)/60 ) : parseInt( (nextTime - nexthour*3600)/60 )
    var nextseconds = nextTime % 60 < 10 ? "0" + nextTime % 60 : nextTime % 60


    var curhour = parseInt(curtime/3600) < 10 ? "0"+ parseInt(curtime/3600) : parseInt(curtime/3600)
    var curminites = parseInt( (curtime - curhour*3600)/60 ) < 10 ? "0" + parseInt( (curtime - curhour*3600)/60 ) : parseInt( (curtime - curhour*3600)/60 )
    var curseconds = curtime % 60 < 10 ? "0" + curtime % 60 : curtime % 60

    if(nextseconds != curseconds) {
        
        if(parseInt(curhour/10) != parseInt(nexthour/10)){ // 小时的十位数
            addBall(MARGIN_LEFT+0, MARGIN_TOP,parseInt(curhour/10))
        }
        if(parseInt(curhour%10) != parseInt(nexthour%10)){ // 小时的个位数
            addBall(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP,parseInt(curhour%10))
        }

        if(parseInt(curminites/10) != parseInt(nextminites/10)){ // 分钟的十位数
            addBall(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP,parseInt(curminites/10))
        }
        if(parseInt(curminites%10) != parseInt(nextminites%10)){ // 分钟的个位数
            addBall(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP,parseInt(curminites%10))
        }

        if(parseInt(curseconds/10) != parseInt(nextseconds/10)){ // 秒的十位数
            addBall(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP,parseInt(curseconds/10))
        }
        if(parseInt(curseconds%10) != parseInt(nextseconds%10)){ // 秒的个位数
            addBall(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP,parseInt(curseconds%10))
        }



        curtime = nextTime
    }

    updateBalls()
}


function updateBalls(){
    for(var i=0;i< balls.length;i++){

        balls[i].x += balls[i].vx 
        balls[i].y += balls[i].vy

        balls[i].vy+=balls[i].g

        if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
            balls[i].y =  WINDOW_HEIGHT-RADIUS
            balls[i].vy = - balls[i].vy*0.75
        }
    }

    // 删除数组中超出边界的元素
    var cnt = 0;
    for(var i=0;i<balls.length;i++){
        if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS <　WINDOW_WIDTH){
            balls[cnt++] = balls[i]
        }
    }

    while(balls.length> Math.min(300,cnt)){
        balls.pop()
    }

    console.log(balls.length)
    
}

function addBall(x,y,num){
    for(var i=0;i<digit[num].length;i++){

        for(var j=0;j<digit[num][i].length;j++){
            if (digit[num][i][j] == 1) { // 添加小球
                var aball = {
                    x:x+j*2*(RADIUS+1) +(RADIUS+1),
                    y:y+i*2*(RADIUS+1) +(RADIUS+1),
                    r:RADIUS,
                    g:1.5+Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) *4 , // -4 或者 +4
                    vy: -5,
                    color: colors[ Math.floor(Math.random()* colors.length) ]
                }
                balls.push(aball)

            }
        }

    } // 行数

}


function getcurtime(){
    // var now = new Date()
    // var txt = endTime.getTime() - now.getTime()
    // txt = Math.round(txt/1000) // 转换成整数
    // return txt >=0 ? txt : 0;

    /**时钟 */
    var now = new Date()
    var txt = now.getHours()*3600 + now.getMinutes() *60 + now.getSeconds()
    return txt >=0 ? txt : 0;
}

function render( cxt ){

    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)

    var hour = parseInt(curtime/3600) < 10 ? "0"+ parseInt(curtime/3600) : parseInt(curtime/3600)
    var minites = parseInt( (curtime - hour*3600)/60 ) < 10 ? "0" + parseInt( (curtime - hour*3600)/60 ) : parseInt( (curtime - hour*3600)/60 )
    var seconds = curtime % 60 < 10 ? "0" + curtime % 60 : curtime % 60

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10),cxt) // 小时 十位
    renderDigit(MARGIN_LEFT+ 15*(RADIUS+1),MARGIN_TOP,parseInt(hour%10),cxt) // 小时个位
    renderDigit(MARGIN_LEFT+ 30*(RADIUS+1),MARGIN_TOP,10,cxt) // 冒号
    renderDigit(MARGIN_LEFT+ 39*(RADIUS+1),MARGIN_TOP,parseInt(minites/10),cxt) // 分钟 十位
    renderDigit(MARGIN_LEFT+ 54*(RADIUS+1),MARGIN_TOP,parseInt(minites%10),cxt) // 分钟个位
    renderDigit(MARGIN_LEFT+ 69*(RADIUS+1),MARGIN_TOP,10,cxt) // 冒号
    renderDigit(MARGIN_LEFT+ 78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt) // 分钟 十位
    renderDigit(MARGIN_LEFT+ 93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt) // 分钟个位





    for(var i=0;i<balls.length;i++){
        cxt.fillStyle = balls[i].color;
        cxt.beginPath()

        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0 ,2*Math.PI)

        cxt.closePath()

        cxt.fill()

    }
}

function renderDigit(x,y,num,cxt) {
    cxt.fillStyle = "red" // 小球颜色
    for(var i=0;i<digit[num].length;i++){ // 行数

        for(var j=0;j<digit[num][i].length;j++){ // 列数
            if(digit[num][i][j] == 1) {
                cxt.beginPath()
                cxt.arc( x+j*2*(RADIUS+1) +(RADIUS+1), y+i*2*(RADIUS+1) +(RADIUS+1), RADIUS,0, 2*Math.PI)
                cxt.closePath()
                cxt.fill()
            } else {

            }
        }

    }
}