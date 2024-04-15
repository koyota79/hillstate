<template>
    <div class="map"> 
        <canvas id="myCanvas"  style="z-index:-1; position:relative;"></canvas>
    </div>
</template>
 
<script setup>
import { ref, onMounted  } from 'vue'

onMounted(() => {
    let canvas = document.getElementById('myCanvas');
    canvas.width = 450
    canvas.height = 500

/*텍스트 영역을 클릭했는지 판단하는 함수/
const textSelection = function(x, y, text){
	const tx = text.x, ty = text.y, tWidth = text.width, tHeight = text.height;
	return (x >= tx - tWidth/2 && x <= tx + tWidth/2 && y >= ty - tHeight && y <= ty);
}
*/

    // 2. 2d모드의 그리기 객체를 취득한다. => 이 객체를 통해 canvas에 그림을 그릴 수 있다.
    let ctx = canvas.getContext("2d");

    const width     = canvas.clientWidth;
    const height    = canvas.clientHeight;
    let isDrag      = false;
    let isTouch     = false;
    let start       = {x:0, y: 0 ,zoom : 1}
    let offset      = {x: canvas.offsetLeft, y: canvas.offsetTop} 
    let zoom        = 1;
    const ZOOM_SPEED = 0.01;

    function fnTouchStart(e){
        //console.log(e.touches[0])
        let x1 = e.touches[0].clientX - canvas.offsetLeft;
        let y1 = e.touches[0].clientY - canvas.offsetTop;
        const winScrollTop = window.scrollY;
        //start.x = parseInt(e.touches[0].clientX - offset.x);
	    //start.y = parseInt(e.touches[0].clientY - offset.y + winScrollTop);


        var rect = canvas.getBoundingClientRect();
        var x = parseInt(e.touches[0].clientX - rect.left);
        var y = parseInt(e.touches[0].clientY - rect.top);


        start.x = x
	    start.y = y

        isTouch = true;
        console.log( x ,'좌표찾기' ,  y  , '::::::::::::' ,x1 ,'좌표찾기2' , y1 ) //, '::rateX::' ,  x1/width, y1/height
    }
    function fntouchmove(e){
        if(isTouch){
            let clientX = e.touches[0].clientX
            let clientY = e.touches[0].clientY
            const winScrollTop = window.scrollY,
            mouseX = parseInt(clientX - (width/2)),
            mouseY = parseInt(clientY - (height/2));           
            start.x = mouseX;
            start.y = mouseY;
            var rect = canvas.getBoundingClientRect();
            var x = clientX - rect.left;
            var y = clientY - rect.top;
           // canvas.width = canvas.width*start.zoom
            isDrag = clientX !=0?true:false 
            //console.log(start.x,start.y , ':::mousemove:::'  ,x ,y)
        } 
    }

    addEventListener("touchend", (e) => {
        if(isTouch && isDrag){
            //drow()
            console.log(canvas.width)
            //canvas.style.transform = `scale(${(start.zoom)})`;   
            canvas.style.transform = `translate(${start.x}px, ${start.y}px)`; 
        }

        isTouch = false
        isDrag  = false
        // console.log( start.x ,'fntouchend 좌표찾기' ,  start.y , canvas.style.translate)  
    });


    function drow(){  

        ctx.fillStyle = '#dbdada';//캔버스 바탕색
        ctx.fillRect(0,0,canvas.width,canvas.height); 
        console.log('canvas.width' , canvas.height)
        canvas.style.width = `${canvas.width}px`;
        canvas.style.height = `${canvas.height}px`;

        console.log(canvas.width ,'start.zoom' , start.zoom)


        // 3. 새선 그리기 설정
        ctx.beginPath();
        // 4. 출발점 지정
        ctx.moveTo(0, 0);
        // 5. 도착점 지정
        ctx.lineTo(460, 0); //다
        ctx.lineTo(460, 460); //라
        ctx.lineTo(100, 460);//가
        ctx.lineTo(0, 370); //모서리
        ctx.lineTo(0, 0); //나
        ctx.stroke();
    
        // 6. 선 그리기
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0,0,52,356); 

        ctx.fillStyle = '#9c6fc8';
        //나 지역 
        let v_posX = 0
        let v_posY = 0
        for(let i=0;i<16;i++){
            ctx.fillRect(0,v_posY,50,i<4?25:20); 
            v_posY+= i<4?26:21
        }


        ctx.fillStyle = '#ffffff';
        ctx.fillRect(59,0,401,52); 

        //다 지역 
        ctx.fillStyle = '#6bb3e7';
        v_posX = 60
        //ctx.fillRect(60,0,25,50); 
        //ctx.fillRect(86,0,25,50); 
        for(let i=0;i<16;i++){
            ctx.fillRect(v_posX,0,24,50); 
            v_posX+= 25
        }   
   
    }




    document.addEventListener("wheel", function (e) {
        let v_zoom = 0
        if (e.deltaY > 0) {
            v_zoom = zoom += ZOOM_SPEED
           // canvas.style.transform = `scale(${(v_zoom)})`;
        } else {
            v_zoom = zoom -= ZOOM_SPEED
           // canvas.style.transform = `scale(${(v_zoom)})`;
        }
   
        canvas.style.width = `${canvas.width*v_zoom}px`;
        canvas.style.height = `${canvas.height*v_zoom}px`;
        start.zoom = v_zoom
    });
    // document.addEventListener('mousemove', function (e) {
    //     if(isDrag){
    //         const winScrollTop = window.scrollY,
	// 		mouseX = parseInt(e.clientX - offset.x),
	// 		mouseY = parseInt(e.clientY - offset.y + winScrollTop);
    //         const dx = mouseX - start.x, dy = mouseY - start.y;
                
    //         start.x = mouseX;
    //         start.y = mouseY;
        
    //     }
    // }); 

    //document.addEventListener('click', )
    //document.addEventListener('click', fnTouchStart);
    document.addEventListener('touchstart', fnTouchStart);
    //document.addEventListener('mousemove', fntouchmove);
    document.addEventListener('touchmove', fntouchmove) ;    
   // document.addEventListener('mouseup', fntouchend);

    document.addEventListener('DOMContentLoaded', fnTouchStart); 
    document.addEventListener('DOMContentLoaded', fntouchmove); 

    drow()
})




</script>

<style scoped>
    .map{
        position : relative;
        z-index : 1;
        border:1px solid;
        width:450px;
        height:500px;
        background-color: ivory;
        overflow: hidden;
    }
    .margin_top {
        margin-top: 20px;
    }
</style>