<template>
    <div class="map-container">
        <div class="map"  id="site-map"> 
            <canvas id="canvas" class="canvas" style="width: 400px; height: 550px"></canvas>
        </div>
        <div style="display:none;">
            <img id="source" src="../assets/images/site_map_2.jpg" />
        </div>

        <!-- <div class="pinch-zoom">
            <img src="https://github.com/manuelstofer/pinchzoom/blob/master/demo/frog.jpg?raw=true"/>
        </div> -->

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
import {ImgTouchCanvas} from '../js/pinch-zoom.js'  
 
onMounted(() => {  
   
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d'); 
   

    function drawImage() {

             //중정1
        ctx.beginPath();
        ctx.roundRect(10 ,10,50 ,50 ,5) // x y ,width ,height ,radius
        ctx.strokeStyle = '#DCDCDC'
        ctx.fillStyle = '#DCDCDC'; //DCDCDC 회색
        ctx.fill();
        ctx.stroke();



        ctx.restore();
    }

    drawImage()

    var topLeft = new ImgTouchCanvas({
        canvas: document.getElementById('canvas'),
        path: require("../assets/images/site_map_2.jpg"),
        desktop: true
    });

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