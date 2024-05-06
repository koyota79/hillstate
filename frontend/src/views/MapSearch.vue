<template>
    <div class="map-container">
        <div style="display:none;">
            <img id="marker" src="../assets/images/marker.jpg"  width="50px" height="50px"/>
            <img id="mapImg" src="../assets/images/site_map_2.jpg">
        </div>
        <div class="map"  id="site-map"> 
            <canvas id="canvas" class="canvas" width="1200" height="1300" style="width: 400px; height: 650px"></canvas>
        </div>

        <div class="floor-select">
            <select id="floor" class="pl">
                <option value="0">B1</option>
                <option value="1">1F</option>
                <option value="2" selected>2F</option>
                <option value="3">3F</option>
            </select>
        </div>
        <div class="dim-layer btn-close" id="dim-layer">
            <!-- <div class="dimBg"></div> -->
            <div class="pop-layer">
                <p class="layer-title" id="layer-title"></p>
                <p class="layer-title" id="layer-cont"></p>
                <!-- <div class="btn-layerStart">출발</div>
                <div class="btn-layerEnd">도착</div> -->
                <div class="btn-r btn-layerClose">close</div>          
            </div>
        </div>
        <div class="menu-container" :class="[r_isActive ? 'menu-after' : '']">
            <div @click="r_isActive =! r_isActive " class="menui-upper">
                <div class="menu-upper-line"></div>
                <div class="menu-upper-line"></div>
            </div>
            <div class="menu-list">
                <!-- <div style="overflow-y:auto;display: ruby-text;height: 200px;">  @click="fnMenuClick($event ,item)"-->
                <div class="menu-list-fade">
                    <div class="tabs">
                        <mapTabMenu
                            v-for="item in r_menu_list"
                            v-bind="item" :key="item.id"  
                            @tabSelected="fnClickTabMenu" 
                            v-model="r_currentId" />
                    </div>    
                    <div class="contents" :style="r_contentColor">
                        <transition>
                            <section class="item" :key="r_currentId">   
                            <div v-for="(item, id) in menuList.content"  :key="id" @click="fnShopMenuSelect(item)">
                                {{ item.shop_nm}} 
                                <span style="position:relative;float:right;">
                                    <img src="../assets/images/marker.jpg"  width="15px" height="15px"/>
                                </span>
                            </div>
                            </section>
                        </transition>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script setup>
import { ref, onMounted ,watch ,computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute ,useRouter } from 'vue-router'
import { objShopMap ,fnFillText } from '../js/shopMap.js' 
import {ImgTouchCanvas} from '../js/pinch-zoom.js'  
import mapTabMenu from '../components/MapTabMenu'; 

const route          = useRoute()
const r_isActive     = ref(null)
const r_currentId    = ref(0)
const r_menu_list    = ref([])
const store          = useStore()

//console.log(store.state.shopData)
const shopObj  = store.state.shopData
let mapObject  = null

r_menu_list.value = [
        { id: 0, label: '가', color : '#f8c6c9' 
            ,content: [
                 {shop_id : '2011' ,shop_nm : '상점1'}, 
                 {shop_id : '2012' ,shop_nm : '상점1'}, 
                 {shop_id : '2011' ,shop_nm : '상점1'}, 
                 {shop_id : '2012' ,shop_nm : '상점1'}, 
                 {shop_id : '2011' ,shop_nm : '상점1'}, 
                 {shop_id : '2011' ,shop_nm : '상점1'}, 
                 {shop_id : '2011' ,shop_nm : '상점1'}, 
                 {shop_id : '2011' ,shop_nm : '상점1'}, 
                 {shop_id : '2011' ,shop_nm : '상점1'}, 
                 {shop_id : '2011' ,shop_nm : '상점1'}, 
                 {shop_id : '2011' ,shop_nm : '상점1'}, 
                 {shop_id : '2011' ,shop_nm : '상점1'}, 
                 {shop_id : '2011' ,shop_nm : '상점1'}, 
                 {shop_id : '2011' ,shop_nm : '상점1'}, 
            ] 
        },
        { id: 1, label: '나', color : '#B57EDC' ,content: [{shop_id : '2001' ,shop_nm : '관리지원센터'} ] },
        { id: 2, label: '다', color : '#89CFF0' ,content: [{shop_id : '2002' ,shop_nm : '거북이한의원'} ] },
        { id: 3, label: '라', color : '#f9d5a7' ,content: [{shop_id : '2003' ,shop_nm : '샌드하우스'} ] },
]

const emit = defineEmits(["toggle-loading"]);
emit('toggle-loading', true);
store.commit('setOverFlow' ,true)
onMounted(() => {  
    const p_shop_id = route.params.id 
    const paramItem =  shopObj.find(function(data){ return data[p_shop_id] })
    console.log(paramItem[p_shop_id] )

    const floorSelect =  document.getElementById('floor')
    let floorIdx =  Number(paramItem[p_shop_id].position=='B1'?0:paramItem[p_shop_id].position)
    console.log('floorIdx' , floorIdx )
    floorSelect.options[floorIdx].selected = true

   
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

    //하단 메뉴 함수 셋팅
    // const elements    = document.getElementsByClassName('fnClickShop');
    // for (var i = 0; i < elements.length; i++) {
    //     elements[i].addEventListener('touchstart', fnClickStartShop, false);
    //     elements[i].addEventListener('DOMContentLoaded', fnClickStartShop); 
    //     elements[i].addEventListener('touchmove', fnClickMoveShop, false);
    //     elements[i].addEventListener('DOMContentLoaded', fnClickMoveShop); 
    //     elements[i].addEventListener('touchend', fnClickEendShop, false);
    //     elements[i].addEventListener('DOMContentLoaded', fnClickEendShop); 
    // }


    // //하단 메뉴 클릭
    // let v_shop_id = ''
    // let v_clickScrollPos = {x : 0 ,y : 0 }
    // function fnClickStartShop(e){
    //     v_shop_id = e.touches[0].target.dataset.id
    // }
    // //하단 메뉴 클릭
    // function fnClickMoveShop(e){
    //     v_clickScrollPos.y = e.target.scrollHeight
    // }

    // //하단 메뉴 클릭
    // function fnClickEendShop(e){
    //     if(v_clickScrollPos.y == 0){
    //         mapObject.menuClickShop(v_shop_id)
    //     }
    //     v_clickScrollPos.y = 0
    // }

   
    floorSelect.addEventListener('input', fnSelectFloor, false)
    floorSelect.addEventListener('DOMContentLoaded', fnSelectFloor)

   
    //층별 선택
    function fnSelectFloor(e){
        emit('toggle-loading', true);
        const idx = e.target.value
        fnInitCanvas(idx)
    }


    const layer = document.getElementById('dim-layer')
    //디폴드 이미지 생성
    function fnInitCanvas(idx){
        mapObject = new ImgTouchCanvas({
            canvas     : document.getElementById('canvas'),
            path       : require("../assets/images/site_map_" + idx + ".jpg"),
            dimLayer   : layer,
            desktop    : true,
            isActive   : r_isActive,
            shopNmPos  : fnShopAssign(idx), //objShopMap[2].shopNmPos
        })

        emit('toggle-loading', false);
    }

   

    const closeBtn = document.getElementsByClassName('btn-layerClose')[0]
    closeBtn.addEventListener('touchstart', e =>{
       e.preventDefault();
       layer.classList.add('btn-close');
    })
    
    fnInitCanvas(floorIdx)
})

//하단 메뉴 시작
function fnShopMenuSelect(obj){
    console.log('obj' , obj)
    mapObject.menuClickShop(obj.shop_id)
}

const menuList = computed(() => {
    return r_menu_list.value.find(o => o.id === r_currentId.value) || {}
})

const r_contentColor = ref({background : r_menu_list.value[0].color})
function fnClickTabMenu(id){
    console.log('fnMenuClick' , id )
    r_currentId.value = id
    r_contentColor.value = {background : r_menu_list.value[id].color} //content color
}

//하단 메뉴 proc
// function fnShopMenuOpen(e){
//     r_isActive.value =! r_isActive.value
//     const menuBtn = document.getElementsByClassName('menu-list-fade')[0]
//     if(!r_isActive.value){
//         menuBtn.style.opacity = 0 
//     }else{
//         menuBtn.style.opacity = 1
//     }
// }

//하단 메뉴 제어
watch(r_isActive ,(newValue) => {
    const menuBtn = document.getElementsByClassName('menu-list-fade')[0] //탭 메뉴
    const layer = document.getElementById('dim-layer')
    if(!newValue){
        menuBtn.style.opacity = 0 
    }else{
        menuBtn.style.opacity = 1
        layer.classList.add('btn-close');
    }  
    
})

// label.addEventListener('click', () => {
//   if(label.parentNode.classList.contains('active')) {
//   	label.parentNode.classList.remove('active');
//   } else {
//   	label.parentNode.classList.add('active');
//   }
// })
//#f8c6c9 #B57EDC #89CFF0 #f9d5a7
</script>

<style scoped>
.menu-list-fade{
    opacity: 1;
    overflow-y:auto;
    height: 200px;
}
.menui-upper{
    padding: 5px;
    width: 50px;
    margin: 0 auto;
}
.menu-upper-line{
    border: 1px solid #949494;
    padding: 1px 5px 0 5px;
    border-width: 3px 0 0 0;
    width: 5%;
    margin: 0 auto;
    border-radius: 2px;
    width:40%;
}
.contents {
    position: relative;
    overflow: hidden;
    width: 350px;
    /* border: 1px solid #4f4f4f3d; */
    margin: 0 auto;
}
.item {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    transition: all 0.8s ease;
}
.item div{
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ffffffbd;
    color : #fff;
    font-size :13px;
}
/* 트랜지션 전용 스타일 */
.v-leave-active {
    position: absolute;
}
.v-enter-active {
    transition: .1s;
}
.v-enter-active  {
    transform: translateX(-100%);
}
.v-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

.pop-layer{
    position :absolute;
    top:50%;
    left:12%;
    width:300px;
    height:150px;
    background-color:#ffff;
    border:5px solid #357185;        
    z-index:9;
}
.dim-layer{
    /* position:fixed; */
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:9;
}
.dim-layer .dimBg{
    height:100%;
    background:#000;
    opacity:0.5;
    filter:alpha(opacity=50);
}
.dim-layer .pop-layer{
    display:block;
}
.pop-layer .btn-r{
    width:100%;
    margin:20px 0 20px;
    padding-top:10px;
    border-top:1px solid #DDD;
    text-align:right;
}
.btn-layerStart{
    display: inline-block;
    height:25px;
    padding: 0 14px 0;
    border:1px solid #175969;
    background-color:#09969b;
    font-size:13px;
    color:#fff;
    line-height:25px;
    margin-right: 10px;
}
.btn-layerEnd{
    display: inline-block;
    height:25px;
    padding: 0 14px 0;
    border:1px solid #6e1e5a;
    background-color:#b607ad;
    font-size:13px;
    color:#fff;
    line-height:25px;
    margin-right: 10px;
}
.btn-close{
    display: none !important;
}
.map-container{
    padding:1px;
}
.map{
    position : relative;
    z-index : 1;
    /* border:1px solid; */
    width:400px;
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
    bottom: -230px; 
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
    transition:opacity 0.3s;
    opacity: 1;
    position: relative;
    top:5px;
}

.canvas{
    transition: all 0.3s ease-out;
}
.floor-select{
    position: absolute; 
    width:100px;
    top:100px;
    z-index: 9;
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
.fnClickShop{
    width:150px;
    padding: 5px;
}
</style>