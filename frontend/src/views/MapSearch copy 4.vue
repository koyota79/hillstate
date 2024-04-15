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
    var position = [
        {x:10,y:50},
        {x:85,y:50},
        {x:85,y:75},
        {x:10,y:75},   
        {x:10,y:50}   
    ];

    function drowCanvas(){  
        ctx.reset();
        ctx.scale(start.zoom,start.zoom);
        ctx.beginPath();
        position.forEach( (element,idx)=> {
            if(idx == 0){
                ctx.moveTo(element.x,element.y)
            } else {
                ctx.lineTo(element.x,element.y)
            }
        });
        ctx.stroke();
        ctx.font = "8px Arial";
        ctx.fillText("관리지원센터", position[0].x, position[2].y-10);  


    }

    drowCanvas()

    canvas.addEventListener("wheel", function (e) {
        e.preventDefault();
        e.stopPropagation();


        let v_zoom = e.deltaY < 0 ? start.zoom+0.1 : start.zoom-0.1;
        start.zoom = v_zoom

        start.width  = start.width * v_zoom
        start.height = start.height * v_zoom
   
        drowCanvas()

        // canvas.width = `${start.width}px`;
        // canvas.height = `${start.height}px`;            
    });
    canvas.addEventListener('touchstart', function (event) {
        console.log(event.touches[0].clientX , canvas.offsetLeft)
        var x1 = event.touches[0].clientX - canvas.offsetLeft;
        var y1 = event.touches[0].clientY - canvas.offsetTop;
        var result = isInside({x:x1, y:y1});
        console.log(x1, y1, result)
    });

    function isInside(event) {
        //crosses는 점과 오른쪽 반직선과 다각형과의 교점의 개수
        var cross = 0;
        for (var i = 0; i < position.length; i++) {
            var pos = position[i];
            var j = (i + 1) % position.length;  //교점구할 j값, 1,2,3..순으로 인덱스가 증가하다 마지막은 초기값 0이 나와 비교를 함.
            var otherPos = position[j];
            if ((pos.y > event.y) != (otherPos.y > event.y)) {  //점 event가 선분에 있는지 여부
                //visit는 점 event를 지나는 수평선과 선분(pos, otherPos)의 교점
                var visit = (otherPos.x - pos.x) * (event.y - pos.y) / (otherPos.y - pos.y) + pos.x; 
                //atX가 오른쪽 반직선과의 교점이 맞으면 교점의 개수를 증가시킨다.
                if (event.x < visit){
                    cross++;
                }
            }
        }
        return cross % 2 > 0;  //홀짝 후 리턴
    }

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