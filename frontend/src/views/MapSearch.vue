<template>
    <div class="map-container">
        <div class="map"  id="site-map"> 
            <canvas id="canvas" class="canvas" style="width: 400px; height: 650px"></canvas>
        </div>
        <div style="display:none;">
            <img id="source" src="../assets/images/site_map_2.jpg" />
        </div>
        <div class="floor-select">
            <select id="floor" class="pl">
                <option value="B1">B1</option>
                <option value="1">1F</option>
                <option value="2" selected>2F</option>
                <option value="3">3F</option>
            </select>
        </div>
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
import { useStore } from 'vuex'
import { objShopMap ,fnFillText } from '../js/shopMap.js' 
import {ImgTouchCanvas} from '../js/pinch-zoom.js'  
const isActive      = ref(null)
const store         = useStore()
//console.log(store.state.shopData)
const shopObj  = store.state.shopData

onMounted(() => {  
    const floorSelect =  document.getElementById('floor')
    floorSelect.options[2].selected = true

   
    //맵위치와 상점 정보 합치기
    function fnShopAssign(index){
        for(let i=0; i< objShopMap[index].shopNmPos.length; i++){
            const o = objShopMap[index].shopNmPos[i]
            const item =  shopObj.find(function(data){ return data[o.shop_id] })

            if(o.shop_id === objShopMap[index].shopNmPos[i].shop_id){
                Object.assign(objShopMap[index].shopNmPos[i], item[o.shop_id]);
            }
        }
        ///console.log(objShopMap[index].shopNmPos) 
        return objShopMap[index].shopNmPos
       
    }

    //디폴드 이미지 생성
    let mapObject = new ImgTouchCanvas({
        canvas: document.getElementById('canvas'),
        path: require("../assets/images/site_map_2.jpg"),
        desktop: true,
        shopNmPos : fnShopAssign(2) //objShopMap[2].shopNmPos
    })


    //하단 메뉴 함수 셋팅
    const elements    = document.getElementsByClassName('fnClickShop');
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('touchstart', fnClickShop, false);
        elements[i].addEventListener('DOMContentLoaded', fnClickShop); 
    }

    //하단 메뉴 클릭
    function fnClickShop(e){
        const shop_id = e.touches[0].target.dataset.id
        mapObject.selectedShop(shop_id)
    }

   
    floorSelect.addEventListener('input', fnSelectFloor, false)
    floorSelect.addEventListener('DOMContentLoaded', fnSelectFloor) 

    //층별 선택
    function fnSelectFloor(e){
        console.log(e.target.value)
        const idx = e.target.value
        mapObject = new ImgTouchCanvas({
            canvas: document.getElementById('canvas'),
            path: require("../assets/images/site_map_" + idx +".jpg"),
            desktop: true,
            shopNmPos : fnShopAssign(idx=='B1'?0:Number(idx)) //objShopMap[idx=='B1'?0:Number(idx)].shopNmPos
        })
    }

})


function fnShopMenuOpen(e){
    isActive.value =! isActive.value
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
        padding:1px;
    }
    .map{
        position : relative;
        z-index : 1;
        /* border:1px solid; */
        width:420px;
        height:650px;
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
        bottom: -220px;
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
        position: relative; 
        width:100px;
        top:-630px;
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