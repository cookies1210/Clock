/**
 * Created by Administrator on 2017/5/19 0019.
 */
var window_width = 1024;
var window_height = 768;
var margin_left = 30;
var margin_top = 60;
var R = 8;
var endTime = new Date(2017,4,20,20,40,50);
var balls = [];
var colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function(){
    window_width = document.body.clientWidth;
    /*window_height = document.body.clientHeight;*/
    alert(document.body.clientWidth)
    margin_left = Math.round(window_width/10);
    R = Math.round(window_width*4/5/108)-1;
   /* margin_top = Math.round(window_height/5);*/
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    canvas.width = window_width;
    canvas.height = window_height;
    setInterval(function(){
        count();
        clockStart(context);
    },50)

}


/*得到倒计时的秒数*/
var getCurtime = function(){
    var curTime = new Date();
    needTime = endTime.getTime()-curTime.getTime();
    needSTime = Math.floor(needTime/1000);
    return needSTime>=0?needSTime:0;
}
var curNeedTime = getCurtime();
/*得到时间差*/
var count = function(){
    var nextShowTimeSeconds = getCurtime();

    var nextHours = parseInt( nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 )
    var nextSeconds = nextShowTimeSeconds % 60

    var curHours = parseInt( curNeedTime / 3600);
    var curMinutes = parseInt( (curNeedTime - curHours * 3600)/60 )
    var curSeconds = curNeedTime % 60

    if( nextSeconds != curSeconds ){

        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( margin_left , margin_top , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( margin_left + 15*(R+1) , margin_top , parseInt(curHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( margin_left + 39*(R+1) , margin_top , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( margin_left + 54*(R+1) , margin_top , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( margin_left + 78*(R+1) , margin_top , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( margin_left + 93*(R+1) , margin_top , parseInt(nextSeconds%10) );
        }

        curNeedTime = nextShowTimeSeconds;
    }
    updataBalls();
}

/*在balls数组中增加元素*/
var addBalls=function(x,y,num){
    for(var i = 0 ;i<react[num].length ; i++)
        for(var j = 0; j<react[num][i].length; j++)
        {
            if(react[num][i][j] ==1){
                var ball ={
                    x:x+(R+1)*2*j+(R+1),
                    y:y+(R+1)*2*i+(R+1),
                    g:1.5+Math.random(),
                    vx: Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    /*vx:Math.pow(-1,(Math.random())*1000),*/
                    vy:-5,
                    color:colors[Math.ceil(Math.random()*colors.length)]
                }
                balls.push(ball);


            }

        }


}
/*更新彩球*/
var updataBalls = function(){

    for(var i = 0 ;i<balls.length;i++){
        balls[i].x +=balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy+=balls[i].g;

        if( balls[i].y >= window_height-R ){
            balls[i].y = window_height-R;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }
    var count = 0;
    for(var i = 0; i<balls.length;i++){
        if(balls[i].x>0&&balls[i].x<window_width){
            balls[count++] = balls[i];
        }
    }
    while(balls.length>Math.min(300,count)){
        balls.pop();
    }

}

/*得到需要倒计时展现在页面上的时间*/
var clockStart=function(obj){
    obj.clearRect(0,0,window_width, window_height);//清除从0,0坐标开始清除宽为window_width，高为window_height的矩形

    var hour =parseInt(curNeedTime/3600);
    var minutes = parseInt((curNeedTime-hour*3600)/60);
    var second = curNeedTime-hour*3600-minutes*60;

    writeMath(margin_left, margin_top, parseInt(hour/10), obj);
    writeMath(margin_left+15*(R+1), margin_top, parseInt(hour%10), obj);
    writeMath(margin_left+30*(R+1),margin_top,10,obj);
    writeMath(margin_left+39*(R+1),margin_top,parseInt(minutes/10),obj);
    writeMath(margin_left+54*(R+1),margin_top,parseInt(minutes%10),obj);
    writeMath(margin_left+69*(R+1),margin_top,10,obj);
    writeMath(margin_left+78*(R+1),margin_top,parseInt(second/10),obj);
    writeMath(margin_left+93*(R+1),margin_top,parseInt(second%10),obj);


    /*画出彩色小球*/

    for( var i = 0 ; i < balls.length ; i ++ ){
        obj.fillStyle=balls[i].color;

        obj.beginPath();
        /*obj.arc( balls[i].x , balls[i].y , R , 0 , 2*Math.PI , true );*/
        obj.arc(balls[i].x,balls[i].y,R,0,2*Math.PI);
        obj.closePath();

        obj.fill();
    }

}

/*用canvas画出时间*/
var writeMath = function(x,y,num,obj){
    obj.fillStyle ="#21F017";
    for(var i = 0;i<react[num].length;i++)
        for(var j = 0;j<react[num][i].length;j++){
            if(react[num][i][j]==1){
                obj.beginPath();
                obj.arc(x+(R+1)*2*j+(R+1),y+(R+1)*2*i+(R+1),R,0,2*Math.PI);
                obj.closePath();
                obj.fill();
            }
        }

}

