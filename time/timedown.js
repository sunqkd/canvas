var WINDOW_WIDTH = 1024
var WINDOW_HEIGHT = 768
var RADIUS = 8 // 小球半径
var MARGIN_LEFT = 30
var MARGIN_TOP = 60
const endTime = new Date(2018,5,10,13,30,10)

var curtime = 0

window.onload = function(){
    var canvas = document.getElementById("canvas")
    canvas.width = WINDOW_WIDTH
    canvas.height = WINDOW_HEIGHT
    var context = canvas.getContext("2d")

    curtime = getcurtime()

    setInterval(() => {
        render(context)
        update()
    },1000)
   
    
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
        curtime = nextTime
    }
}

function getcurtime(){
    var now = new Date()
    var txt = endTime.getTime() - now.getTime()
    txt = Math.round(txt/1000) // 转换成整数
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