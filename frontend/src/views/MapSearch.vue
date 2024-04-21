<template>
    <div class="map-container">
        <div class="map"  id="site-map"> 
            <canvas id="canvas" class="canvas" style="width: 400px; height: 550px"></canvas>
        </div>
        <div style="display:none;">
            <img id="source" src="../assets/images/site_map_2.jpg" />
        </div>
        <div class="floor-select">
            <select name="likeLanguage" id="" class="pl">
                <option value="0" selected>B1</option>
                <option value="1">1F</option>
                <option value="2">2F</option>
                <option value="3">3F</option>
            </select>
        </div>
        <!-- <div class="pinch-zoom">
            <img src="https://github.com/manuelstofer/pinchzoom/blob/master/demo/frog.jpg?raw=true"/>
        </div> -->

        <div class="menu-container" :class="[isActive ? 'menu-after' : '']">
            <div @click="fnShopMenuOpen($event)">매장 선택</div>
            <div class="menu-list">
                <div class="fnClickShop" data-id="2001">테스트상점</div>
                <div class="fnClickShop" data-id="2002" >관리지원센터</div>
                <div class="fnClickShop" data-id="2003" >샌드하우스</div>
            </div>
        </div>        
    </div>
</template>

<script setup>
import { ref, onMounted ,reactive  } from 'vue'
import { objShopMap ,fnFillText } from '../js/shopMap.js' 
import {ImgTouchCanvas} from '../js/pinch-zoom.js'  
const isActive      = ref(null)
const isFloorActive = ref(null)
onMounted(() => {  

    const canvasObj = new ImgTouchCanvas({
        canvas: document.getElementById('canvas'),
        path: require("../assets/images/site_map_2.jpg"),
        desktop: true,
        shopNmPos : objShopMap[2].shopNmPos
    });

    const elements    = document.getElementsByClassName('fnClickShop');
    //console.log(elements)

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('touchstart', fnClickShop, false);
        elements[i].addEventListener('DOMContentLoaded', fnClickShop); 
    }



    

    function fnClickShop(e){
        const shop_id = e.touches[0].target.dataset.id
        canvasObj.selectedShop(shop_id)

        // if(shop_id=="2002"){
        //     start.tempX = -350
        //     start.tempY = -157
        // }else{
        //     start.tempX = 0
        //     start.tempY = 0
        // }
    }



})
function fnShopMenuOpen(e){
    isActive.value =! isActive.value
}

function fnClickFloor(e){
    isFloorActive.value =! isFloorActive.value
    console.log('11111111', e)
}

// label.addEventListener('click', () => {
//   if(label.parentNode.classList.contains('active')) {
//   	label.parentNode.classList.remove('active');
//   } else {
//   	label.parentNode.classList.add('active');
//   }
// })

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
    .floor-select{
        position: absolute; 
        width:100px;
        top:100px;
        z-index: 10;
        left:20px;
        cursor: pointer;
        
    }
    .pl{
        width: 100px;
        border: 1px solid #C4C4C4;
        box-sizing: border-box;
        border-radius: 2px;
        padding: 12px 13px;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
    }

    .pl:focus{
        border: 1px solid #525153;
        box-sizing: border-box;
    }
    .select-box{
        position: absolute;
        width:70px;
        height: 40px;
        text-align:center;
        left:20px;
    }
</style>