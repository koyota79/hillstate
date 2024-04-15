<template>
    <div class="map-container">
        <div class="map"  id="site-map"> 
            <canvas id="canvas" :style="{ width: v_viewReactive.width + 'px' ,height:v_viewReactive.height + 'px' }"></canvas>
        </div>
    </div>
</template>
 
<script setup>
import { ref, onMounted ,reactive  } from 'vue'

let start           = {x:0, y: 0 ,tempX :0 ,tempY : 0 ,zoom : 1 ,width:0 ,height:0 ,zoomX : 0 ,zoomY :0}
const isActive      = ref(null)
let v_viewReactive  =  reactive({ width: 400  ,height : 450})
let isDrag          = false


onMounted(() => {
    
    const canvas    = document.getElementById('canvas');
    const ctx       = canvas.getContext("2d");
    const siteMap   = document.getElementById('site-map');
    const viewSize  =  (window.innerWidth/siteMap.clientWidth).toFixed(2)

    canvas.width  = siteMap.clientWidth * viewSize
    canvas.height = siteMap.clientHeight * viewSize
    v_viewReactive.width = canvas.width
    v_viewReactive.height = canvas.height


    start.width  = canvas.width
    start.height = canvas.height

    function drowCanvas(){  
        ctx.reset();
        ctx.fillStyle = '#dbdada';//캔버스 바탕색
        ctx.fillRect(0,0,start.width,start.height); 

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

    drowCanvas()

    canvas.addEventListener("wheel", function (e) {
            e.preventDefault();
            e.stopPropagation();


            let v_zoom = e.deltaY < 0 ? 1.1 : 0.9;
            start.zoom = v_zoom

            start.width  = start.width * v_zoom
            start.height = start.height * v_zoom
            // drowCanvas()

        canvas.style.width = `${start.width}px`;
        canvas.style.height = `${start.height}px`;            
    });


    // canvas.addEventListener('touchstart', fnTouchStart);
    // canvas.addEventListener('DOMContentLoaded', fnTouchStart); 
    // canvas.addEventListener('touchmove', fntouchmove) ;    
    // canvas.addEventListener('DOMContentLoaded', fntouchmove); 
    // canvas.addEventListener('touchend', fnTouchEnd);
    // canvas.addEventListener('DOMContentLoaded', fnTouchEnd); 
})




</script>

<style scoped>
   .map-container{
        padding:5px;
    }
    .map{
        position : relative;
        z-index : 1;
        border:1px solid;
        width:100%;
        height:100%;
        background-color:white;
        overflow: hidden;
    }
    .margin_top {
        margin-top: 20px;
    }
    .menu-container{
        position: fixed;
        width: 100%;
        max-width: 920px;
        bottom: -239px;
        z-index: 2;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        border-radius: 8px 8px 0 0;
        box-shadow: 0 -7px 26px 0 rgba(0, 0, 0, 0.08);
        border:1px solid black;
        transition-property: all;
        transition-duration: .5s;
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }
    .menu-after{
        bottom: 0;
    }
</style>