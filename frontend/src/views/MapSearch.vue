<template>
    <div class="map-container">
        <div class="map"  id="site-map"> 
            <canvas id="canvas" :style="{ width: v_viewReactive.width + 'px' ,height:v_viewReactive.height + 'px' }" class="canvas"></canvas>
        </div>


        <div class="menu-container" :class="[isActive ? 'menu-after' : '']">
            <div @click="fnShopMenuOpen($event)">매장 선택</div>
            <div class="menu-list">
                <div class="fnClickShop" data-id="2001">관리지원센터</div>
                <div class="fnClickShop" data-id="2002" >테스트상점2</div>
            </div>
        </div>        
    </div>
</template>

<script setup>
import { ref, onMounted ,reactive  } from 'vue'
import { objShopMap ,fnFillText } from '../js/shopMap.js' 
const dpr = window.devicePixelRatio;

let start           = {x:0, y: 0 ,tempX :0 ,tempY : 0 ,zoom : 0.9 ,width:0 ,height:0 ,zoomX : 0 ,zoomY :0}
const isActive      = ref(null)
const ZOOM_SPEED    = 0.05
let v_viewReactive  =  reactive({ width: 400  ,height : 550})
let isDrag          = false


onMounted(() => {
    
    const canvas    = document.getElementById('canvas');
    const ctx       = canvas.getContext("2d");
    const siteMap   = document.getElementById('site-map');
    const viewSize  =  (window.innerWidth/siteMap.clientWidth).toFixed(2)
    const rect = canvas.getBoundingClientRect();
    
    canvas.width  = siteMap.clientWidth * dpr
    canvas.height = siteMap.clientHeight * dpr //rect.height * dpr 
    v_viewReactive.width = canvas.width
    v_viewReactive.height = canvas.height


    start.width  = canvas.width
    start.height = canvas.height


    function drowCanvas(){  
        //console.log('drowCanvas 호출')
        let drowPosX  = parseInt(canvas.width/2)
        let drowPosY  = parseInt(canvas.height/2)
        //console.log(drowPosX , drowPosY ,'getTransPos wheel' ,getTransPos.e ,getTransPos.f)

        ctx.reset();
        ctx.translate(drowPosX ,drowPosY);
        ctx.transform(start.zoom, 0 , 0, start.zoom, start.tempX, start.tempY);
        ctx.translate(-drowPosX ,-drowPosY);
 

        //ctx.fillStyle = '#dbdada';//캔버스 바탕색
        //ctx.fillRect(0,0,400,450); 
        // 지도 배경색

        // 3. 새선 그리기 설정
        ctx.beginPath();
        // 4. 출발점 지정
        ctx.moveTo(5, 0);
        // 5. 도착점 지정
        ctx.lineTo(615, 0); //다
        ctx.lineTo(620, 5); //다
        ctx.lineTo(620, 670); //라
        ctx.lineTo(600, 688);
        ctx.lineTo(135, 688);//가
        ctx.lineTo(85, 665); //모서리
        ctx.lineTo(0, 560); //모서리
        ctx.lineTo(0, 5); //나
        ctx.lineTo(5, 0); 
        ctx.strokeStyle = '#6f6f75'
        ctx.fillStyle = '#FFFFFF'; //
        ctx.fill(); 
        ctx.stroke();
    
        //중정1
        ctx.beginPath();
        ctx.moveTo(180, 200);
        ctx.lineTo(445, 200);
        ctx.lineTo(445, 300);
        ctx.lineTo(180, 300);
        ctx.lineTo(180, 200);
        ctx.strokeStyle = '#DCDCDC'
        ctx.fillStyle = '#DCDCDC'; //DCDCDC 회색
        ctx.fill();
        ctx.stroke();

        //중정2
        ctx.beginPath();
        ctx.moveTo(180, 370);
        ctx.lineTo(445, 370);
        ctx.lineTo(445, 470);
        ctx.lineTo(180, 470);
        ctx.lineTo(180, 370);
        ctx.fillStyle = '#DCDCDC'; //DCDCDC 회색
        ctx.fill();
        ctx.stroke();

        

        let pWidth   = 0
        let preSize  = 0
        let item     = objShopMap[2].A
        ctx.strokeStyle = item.strokeStyle;
        ctx.fillStyle = item.color;
        ctx.beginPath();
        //가 지역
        for(let i=0;i < item.data.length;i++){
            let value = item.data[i]
            if(value['R'] == 99){//라인으로 그릴때 R 99 구분
                ctx.moveTo(value['X'], value['Y']);
                //line 갯수
                value['L'].forEach(function(v, i) {
                    ctx.lineTo(v[0], v[1]);
                })
            }else{
        
                if(value['X'] != 0){
                    pWidth = value['X']
                }else if(preSize != 0){
                    pWidth += preSize //value['H']
                }
                ctx.roundRect(pWidth ,value['Y'] ,value['W'] ,value['H'] ,value['R']) // x y ,width ,height ,radius
            }
            preSize = value['W']
        }//end for
        ctx.fill();
        ctx.stroke();



        // ctx.beginPath();
        // ctx.moveTo(93, 622);
        // ctx.lineTo(64, 645);
        // ctx.lineTo(45, 625);
        // ctx.lineTo(74, 601);
        // ctx.fillStyle = '#DCDCDC'; //DCDCDC 회색
        // ctx.fill();
        // ctx.stroke();

        //나 지역 보라색
        pWidth  = 0
        preSize = 0
        item = objShopMap[2].B
        ctx.strokeStyle = item.strokeStyle;
        ctx.fillStyle = item.color;
        ctx.beginPath();
        for(let i=0;i < item.data.length;i++){
            let value = item.data[i]
            if(value['R'] == 99){//라인으로 그릴때 R 99 구분
                ctx.moveTo(value['X'], value['Y']);
                //line 갯수
                value['L'].forEach(function(v, i) {
                    ctx.lineTo(v[0], v[1]);
                })
            }else{
        
                if(value['Y'] != 0){
                    pWidth = value['Y']
                }else if(preSize != 0){
                    pWidth += preSize //value['H']
                }
                ctx.roundRect(value['X'] ,pWidth ,value['W'] ,value['H'] ,value['R']) // x y ,width ,height ,radius
            }
            preSize = value['H']
        }//end for
        ctx.fill();
        ctx.stroke();



        //다 지역 
        pWidth  = 0
        preSize = 0
        item = objShopMap[2].C
        ctx.strokeStyle = item.strokeStyle;
        ctx.fillStyle   = item.color;
        ctx.beginPath();
        for(let i=0;i < item.data.length;i++){
            let value = item.data[i]
            if(value['R'] == 99){//라인으로 그릴때 R 99 구분
                ctx.moveTo(value['X'], value['Y']);
                //line 갯수
                value['L'].forEach(function(v, i) {
                    ctx.lineTo(v[0], v[1]);
                })
            }else{
        
                if(value['X'] != 0){
                    pWidth = value['X']
                }else if(preSize != 0){
                    pWidth += preSize //value['H']
                }
                ctx.roundRect(pWidth ,value['Y'] ,value['W'] ,value['H'] ,value['R']) // x y ,width ,height ,radius
            }
            preSize = value['W']
        }//end for
        ctx.fill();
        ctx.stroke();   

        //라 지역 
        pWidth  = 0
        preSize = 0
        item = objShopMap[2].D
        ctx.strokeStyle = item.strokeStyle;
        ctx.fillStyle = item.color;
        ctx.beginPath();
        for(let i=0;i < item.data.length;i++){
            let value = item.data[i]
            if(value['R'] == 99){//라인으로 그릴때 R 99 구분
                ctx.moveTo(value['X'], value['Y']);
                //line 갯수
                value['L'].forEach(function(v, i) {
                    ctx.lineTo(v[0], v[1]);
                })
            }else{
        
                if(value['Y'] != 0){
                    pWidth = value['Y']
                }else if(preSize != 0){
                    pWidth += preSize //value['H']
                }
                ctx.roundRect(value['X'] ,pWidth ,value['W'] ,value['H'] ,value['R']) // x y ,width ,height ,radius
            }
            preSize = value['H']
        }//end for
        ctx.fill();
        ctx.stroke();
       
 



        fnFillText("관리지원\n센터",200, 105 ,ctx);  
        fnFillText("크린토피아",2, 45 ,ctx);  
        fnFillText('거북이\n한의원' ,400 ,560 ,ctx)

        //requestAnimationFrame(drowCanvas);
    }
    drowCanvas()

    //https://github.com/robinrodricks/vue3-touch-events/issues/7
    canvas.addEventListener("wheel", function (e) {
            e.preventDefault();
            e.stopPropagation();

            let v_zoom = e.deltaY < 0 ? start.zoom + ZOOM_SPEED : start.zoom- ZOOM_SPEED;
            start.zoom = v_zoom

            start.width  = start.width * v_zoom
            start.height = start.height * v_zoom
            drowCanvas()         
    });

    function fnTouchStart(e) {
            //let rect = canvas.getBoundingClientRect();
  
            let x = parseInt(e.touches[0].clientX)
            let y = parseInt(e.touches[0].clientY)
            //move의 마지막 위치값을 클릭한 값을 뺀다(빼면 마지막 그림의 좌표값을 가져옴)
            start.x = (x - start.tempX)
            start.y = (y - start.tempY)

            console.log( x ,'move pass' ,y)
            //console.log( x ,'move pass' ,y)
            isDrag = true
        
    };

    function fntouchmove(e){
        if(isDrag){  
            let clientX = parseInt(e.touches[0].clientX - start.x)
            let clientY = parseInt(e.touches[0].clientY - start.y)

            //마지막 위치값 저장
            drowCanvas()
            //requestAnimationFrame(drowCanvas);
            start.tempX = clientX
            start.tempY = clientY
        }
    }

    function fnTouchEnd(e) {
        isDrag = false
    };

    canvas.addEventListener('touchstart', fnTouchStart);
    canvas.addEventListener('DOMContentLoaded', fnTouchStart); 
    canvas.addEventListener('touchmove', fntouchmove) ;    
    canvas.addEventListener('DOMContentLoaded', fntouchmove); 
    canvas.addEventListener('touchend', fnTouchEnd);
    canvas.addEventListener('DOMContentLoaded', fnTouchEnd); 

    const elements    = document.getElementsByClassName('fnClickShop');
    //console.log(elements)

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('touchstart', fnClickShop, false);
        elements[i].addEventListener('DOMContentLoaded', fnClickShop); 
    }

    // click.addEventListener('touchstart', fnClickShop);
    // click.addEventListener('DOMContentLoaded', fnClickShop); 

    function fnClickShop(e){
        console.log(e)
        console.log(e.touches[0].target.dataset.id)
        const shop_id = e.touches[0].target.dataset.id
        if(shop_id=="2002"){
            start.tempX = -350
            start.tempY = 137
        }else{
            start.tempX = 124
            start.tempY = 137
        }
        start.zoom = 1.5
        drowCanvas()
   
    }

})


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
        width:400px;
        height:550px;
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
    .menu-list{
        height:239px;
    }
    .menu-list div{
        position: relative;
        top:20px;
    }
    .canvas{
        transition: all 0.3s ease-out;
    }
</style>