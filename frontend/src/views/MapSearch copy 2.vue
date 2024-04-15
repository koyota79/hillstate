<template>
    <div class="map-container">
        <div class="map"  id="site-map"> 
            <canvas id="canvas" :style="{ width: v_viewReactive.width + 'px' ,height:v_viewReactive.height + 'px' }" ></canvas>
        </div>
    
        <div style="display:none;">
            <img id="source" src="../assets/images/site_map_2.jpg" />
        </div>


        <div class="menu-container" :class="[isActive ? 'menu-after' : '']">
            <div @click="fnShopMenuOpen($event)">매장 선택</div>
            <div style="height:239px;">
                <div>1111111</div>
                <div>22222</div>
            </div>
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
    const image     = document.getElementById("source");
    const siteMap   = document.getElementById('site-map');
    console.log(window.innerWidth ,'view' ,window.innerHeight)

    image.onload = () =>{
        //현재 화면의 사이즈 비율
        const viewSize =  (window.innerWidth/siteMap.clientWidth).toFixed(2)
        console.log(image.height , viewSize , 'viewSize' ,siteMap.clientHeight , siteMap.clientHeight * viewSize )

        canvas.width  = siteMap.clientWidth * viewSize
        canvas.height = siteMap.clientHeight * viewSize
        v_viewReactive.width = canvas.width
        v_viewReactive.height = canvas.height

        image.width  = image.width /2;
        image.height = image.height / 3.5;

        start.width  = canvas.width
        start.height = image.height
      
     

        function drowImage(){
            let drowPosX  = canvas.clientWidth/2 - start.width/2
            let drowPosY  = canvas.clientHeight/2 - start.height/2
        
            ctx.reset();
            ctx.translate(drowPosX ,drowPosY);
            ctx.drawImage(image, start.tempX, start.tempY ,start.width , start.height)
            ctx.translate(drowPosX ,drowPosY);
            //console.log(drowPosX , image.height, ':::start::' ,drowPosY)
           //requestAnimationFrame(drowImage);
        }

        drowImage()

        canvas.addEventListener("wheel", function (e) {
            e.preventDefault();
            e.stopPropagation();


            let v_zoom = e.deltaY < 0 ? 1.1 : 0.9;
            start.zoom = v_zoom

            start.width  = start.width * v_zoom
            start.height = start.height * v_zoom
            drowImage()

            let getTransPos =  ctx.getTransform()
            console.log('getTransPos wheel' ,getTransPos)
            let x = parseInt(getTransPos.e)  - (parseInt(getTransPos.e) * v_zoom)
            let y = parseInt(getTransPos.f)  - (parseInt(getTransPos.f) * v_zoom)

            setShopNm(x , y)
        });

       
       function fnTouchStart(e) {
            //let rect = canvas.getBoundingClientRect();
  
            let x = parseInt(e.touches[0].clientX)
            let y = parseInt(e.touches[0].clientY)
            //move의 마지막 위치값을 클릭한 값을 뺀다(빼면 마지막 그림의 좌표값을 가져옴)
            start.x = (x - start.tempX)
            start.y = (y - start.tempY)

            let getTransPos =  ctx.getTransform()
            //ctx.setTransform(getTransPos)

            console.log(getTransPos, x -40,'fnTouchStart' ,y -130)
    

            //console.log( start.x ,'move pass' ,start.y)
            isDrag = true
        };

        function fntouchmove(e){
            if(isDrag){  
                let clientX = parseInt(e.touches[0].clientX - start.x)
                let clientY = parseInt(e.touches[0].clientY - start.y)

                drowImage()
                //마지막 위치값 저장
                start.tempX = clientX
                start.tempY = clientY

                setShopNm(start.tempX , start.tempY)
            }
        }

        function fnTouchEnd(e) {
            isDrag = false
        };
        //  const textY = 394
        function setShopNm(x ,y){
            // 383 394  344.7 354.6
            // let width = 383
            // let height = image.height 
            // let v_width     = (width - start.width)
            // let v_height    = (height - start.height)
            console.log(x ,start.width ,'setShopNm' ,y ,start.height )
            ctx.font = "8px Arial";
            ctx.fillText("관리지원센터", x, y);
        }

        canvas.addEventListener('touchstart', fnTouchStart);
        canvas.addEventListener('DOMContentLoaded', fnTouchStart); 
        canvas.addEventListener('touchmove', fntouchmove) ;    
        canvas.addEventListener('DOMContentLoaded', fntouchmove); 
        canvas.addEventListener('touchend', fnTouchEnd);
        canvas.addEventListener('DOMContentLoaded', fnTouchEnd); 
        
    }//onload







})//onMounted

function fnShopMenuOpen(e){
    console.log('eee')
    isActive.value =! isActive.value
}
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