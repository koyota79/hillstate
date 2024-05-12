<template>
    <div>
    <div class="searchbar"  :class="{active: r_isActive}">
        <div class="arrow-prev" @click="fnChildShowSearch($event , false)"> </div>
        <div style="position: static;height:100%;">
            <!-- <div class="input-type" ><input style="width:240px;height: 25px;" v-model="message" placeholder="검색어를 입력하세요"></div> -->

            <div class="autocomplete">
                <Autocomplete
                    @input="fnGetItems"
                    :results="r_defaultItem"
                    placeholder="검색어를 입력하세요"
                    style="width:100%;height: 25px;"
                    ref="r_auto_ref" 
                    max="8"
                    resultsItemClass="vue3-results-item results-item-class-exp"
                    @onSelect="clickItem"
                ></Autocomplete>
                <!-- :resultsItemClass="resultsItemClass" 부모 페이지에서 수정해야 함 -->
            </div>
            <div style="position: relative;top:55px;">
                <div class="recommend">
                    추천 검색어 
                </div> 
                <div style="position: relative ;top:35px;left:25px;display: flex;height:45px;">
                    <p class="recommend_text" @click="fnReCommendClick($event ,'1001','신명부동산')">신명부동산</p>
                    <p class="recommend_text" @click="fnReCommendClick($event ,'B1001','다이소')">다이소</p>
                    <p class="recommend_text" @click="fnReCommendClick($event ,'2002','거북이한의원')">거북이한의원</p>
                    <p class="recommend_text" @click="fnReCommendClick($event ,'2222','테스트상점')">테스트상점</p>
                </div>
            </div>
            <div>
                <div class="search-category-title" style="position: relative;padding:10px;">
                    매장 카테고리
                </div>
                <div>
                    <div class="search-category">
                        <p class="recommend_text" @click="fnCategoryPageMove($event ,'ALL')">전체</p>
                        <p class="recommend_text" @click="fnCategoryPageMove($event ,'FOOD')">식당/카페</p>
                        <p class="recommend_text" @click="fnCategoryPageMove($event ,'BEAUTY')">뷰티</p>
                        <p class="recommend_text" @click="fnCategoryPageMove($event ,'SHOP')">쇼핑</p>
                        <p class="recommend_text" @click="fnCategoryPageMove($event ,'SERVICE')">문화/서비스</p>
                        <!-- <router-link :to="{name : 'MapSearch' ,params : {id:2001}}"><p class="recommend_text">테스트</p></router-link> -->
                    </div>
                </div>
            </div>
            <!-- <div class="border_line">
            </div> -->
            <!-- <img width="350px" src="../assets/images/choice_tag.png" /> -->
            <!-- <div class="search_menu">
                <div class="menu_text"  @click="fnMovePage($event ,'site_map')">
                    층별안내
                </div>
                <div class="menu_text" @click="fnLocationPage($event ,'/location')">
                    위치/주차
                </div>
                <div class="menu_text" @click="fnMovePage($event ,'event')">
                    이벤트
                </div>
                <div class="menu_text" @click="fnMovePage($event ,'content')">
                    TEST
                </div>
            </div> -->
            <div class="search-menu-list">
                <ul style="margin:0;padding:0;">
                    <a href="#none"  @click="fnMovePage($event ,'MapSearch')"><li class="search-menu_sub"><div>층별안내</div></li></a>
                    <a href="#none"  @click="fnMovePage($event ,'Location')"><li class="search-menu_sub" style="border-right:none;"><div>위치/주차</div></li></a>
                    <a href="#none"  @click="fnMovePage($event ,'Event')"><li class="search-menu_sub" style="border-bottom:none;border-top:none;"><div>이벤트</div></li></a>
                    <a href="#none"  @click="fnMovePage($event ,'Content')"><li class="search-menu_sub" style="border-right:none;border-bottom:none;border-top:none;"><div>신규오픈</div></li></a>
                </ul>                
            </div>

        </div>
        
    </div>
    </div>    
</template>

<script setup>
 
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute ,useRouter } from 'vue-router'
import Autocomplete from 'vue3-autocomplete'
import 'vue3-autocomplete/dist/vue3-autocomplete.css'

const store           = useStore()
const r_isActive      = ref(false)
const r_auto_ref      = ref(null)
const r_defaultItem   = ref([])
const shopSimpleObj   = store.state.shopSimPleData
//const items_arry      = shopSimpleObj //Object.values(shopSimpleObj) //['다이소','다이슨','다날','다와서','샌드하우스','거북이한의원','다나와','신명부동산','센느','고민정헤어']
 
//서치버튼
function fnChildShowSearch(e ,isTrue){
    if(e){
        r_isActive.value =  isTrue  
        if(isTrue){
            store.commit('setOverFlow' ,true)
        }else{
            store.commit('setOverFlow' ,false)
            r_auto_ref.value.setText('')
        }
    }
}

//검색조건
function fnGetItems(keyword) {
    if(keyword.length > 0){
        const query = shopSimpleObj.filter((obj) => {
           return obj.name.indexOf(keyword) >= 0
        }) 
        r_defaultItem.value = query.length > 0 ? query : ["해당 검색조건이 없습니다."]
    }else{
        r_defaultItem.value = []
    }
}

//검색어 클릭
function clickItem(item) {
    store.commit('setOverFlow' ,false)
    router.push({ path: "/shop_info" ,name : "ShopDetail" 
        ,params : {'id' : item.key } 
    })

}
const router = useRouter()
//카테고리 이동
function fnCategoryPageMove(e ,key){
    store.commit('setOverFlow' ,false)
    router.push({ name: 'Category' ,params: {'id': key}})  
}
//하단 메뉴 이동
function fnMovePage(e ,key) {
    store.commit('setOverFlow' ,false)
    router.push({name : key ,params: {'id': '0000'}})
}

//추천메뉴
function fnReCommendClick(e ,id ,value){
    r_auto_ref.value.setText(value)
    r_defaultItem.value = [{key : id ,name:value}]
    setTimeout(() => {
        clickItem({key : id ,name:value})
    }, 500);
}

onMounted(() => { 
    
})//end mounted


defineExpose({ // 부모 컴포넌트가 자식 컴포넌트의 API에 직접적으로 접근
    fnChildShowSearch
})
</script>

<style scoped>
.results-item-class-exp{
    text-align: left;
    font-weight: bold;
    width:100%;
}
.search_menu{
    position: relative;
    float: left;
    top:135px;
    left:25px;
}
.menu_text{
    width:102px;
    height: 50px;
    float: left;
    font-weight: bold;
    padding: 15px;
}
.recommend{
    position: relative;
    top : 15px;
    width : 125px;
    font-size: 14px;
    font-weight: bold;
}
.recommend_text{
    font-size: 13px;
    border: 1px solid #EAEBEA;
    border-radius: 4px;
    padding: 5px;
    margin:5px;
    line-height:25px;
    display: inline-block;
}
.border_line {
    border: 1px solid #EAEBEA;
    width:90%;
    top:120px;
    position: relative;
    left : 15px;
}
.navbar_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.1s ease;
}
.searchbar {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    transform: translateX(100%);
    z-index: 999;
    color: #0e0e0e;
    transition: transform 0.3s ease;
}
.searchbar.active {
    transform: translateX(0);
}

.searchbar_back {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    cursor: pointer;
    color: #000000;
}
.arrow-prev {
    position: absolute;
    left: 15px; 
    top: 35px;
    content: '';
    width: 15px; /* 사이즈 */
    height: 15px; /* 사이즈 */
    border-top: 2px solid #000; /* 선 두께 */
    border-right: 2px solid #000; /* 선 두께 */
    transform: rotate(225deg); /* 각도 */
}
.autocomplete {
    position: relative;
    top:35px;
    left:55px;
    width:77%;
}
.resultsItemClass {
    text-align: left;
    border-bottom : 1px solid #000;
    padding : 5px;
    list-style-type : none;
}
.search-menu-list{
    position:relative;
    top:20%;
    display: flex;
    float: left;
}
.search-menu-list a {
  text-decoration: none;
  color: black;
  
}
.search-menu_sub{
    position: relative;
    display: inline-block;
    width: 180px; 
    /* padding: 60px 0; */
    padding: 18% 0;
    border:1px solid #cdcdcd;
    border-left : none;
    align-content:center;
    font-weight:bold;
    /* line-height: 135px */
 }
 .search-category-title{
    position: relative;
    top:115px;
    font-weight:bold;
 }
 .search-category{
    position:relative;
    /* display: flex;
    justify-content:left;
    flex-flow:wrap; */
    top:115px; 
    margin-left:15px;
 }

 .search-category p{
    font-weight:bold;
    width:100px;
    height:30px;
    align-content:center;
    float: left;
 }

 @media (max-width: 360px){
    .search-category p{
        font-weight:bold;
        width:75px;
        height:25px;
        align-content:center;
    }    
  }

</style>