
<template>
    <div class="main-cont">
        <router-link :to="{name : 'MapSearch' ,params : {id:2001}}" ><img src = "../assets/images/special_map.png"/></router-link>
        <div class="brand_event">
            <h3>브랜드 이벤트</h3>
        </div>
        <div class="main_img">
            <router-link to="Event"><img src = "../assets/images/event1.jpg"/></router-link>
        </div>
        <div class="main-category">
            <ul>
                <li v-for="(item, key) in v_categoryObj"  :key="key" @click="fnCategoryPageMove($event ,item.id)" 
                class="main-category_sub" v-show="item.id !='ALL'">
                    <div>{{item.value }}</div>
                </li>
            </ul>
        </div>
        <div class="new-shop">
            <router-link to="Content"><img src = "../assets/images/new_brand.jpg"/></router-link>
        </div>
        <div class="parking-info">
            <router-link to="Location">주차 안내</router-link>
        </div>
        <!-- <button @click="plus()">숫자: {{ cnt }}</button>
        <div v-html="rawHtml"></div> -->
        <!-- <main-slide></main-slide>         -->
    </div>
   <div class="footer-cont">
       <footer-cont></footer-cont>
   </div>
</template>
<script setup> 
import { ref, onMounted ,computed ,inject} from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store         = useStore()
const router        = useRouter()
const v_categoryObj = inject('Category')


function fnCategoryPageMove(event ,key){
    //console.log('event' ,event ,key ,router )
    //this.body.classList.remove('hidden');
    router.push({ name: 'Category' ,params: {'id': key}})  
}

const emit = defineEmits(["toggle-loading"]);
emit('toggle-loading', true);
const $Axios = inject('Axios')
$Axios.get('/api/main' ,{})
.then((response) => {
    //console.log(response);
    console.log(response.data);
    const objData       = response.data
    const shopObj       = []
    const shopSimpleObj = []
    for(let i=0; i < objData.length;i++ ){
        const item = objData[i]        
        let shopId = {}
        shopId[item.shop_id] = item
        shopObj.push(shopId) 
        shopSimpleObj.push({key : item.shop_id ,name : item.shop_nm}) 
    }
    //console.log('shopSimpleObj' , shopSimpleObj)
    store.commit('setShopData' ,shopObj)
    store.commit('setShopSimpleData' ,shopSimpleObj)

    //console.log(store.state.shopData)
    // const v_list = response.data["shop_map_list"]
    // for(var k = 0; k < this.contents.length; k++){
    //     var v_tempArry = []
    //     for (var i = 0 ;i < v_list.length; i++) {
    //         if(k == v_list[i].position_area)//지역 위치와 같은 포지션만 세팅
    //             v_tempArry.push(v_list[i])
    //     }//end if
    //     this.contents[k].shop_list  = v_tempArry 
    // }//end if
    //console.log(v_posArray)
}).catch((error) => {
    console.log(error);
}).finally(() => {
   emit('toggle-loading', false);
})
</script>
<style>
    .main-cont{
        padding:10px;
    } 
    .main-cont img{
        width:98%;
    } 
    .brand_event{
        padding-top : 20px;
    }  
    .footer-cont{
        width:100%
    }   
    .main-category{
        border : 1px solid #e1e1e1;
    }
    .main-category ul{
        margin :0;
        padding:0; 
    }
    .main-category_sub{
        position: relative;
        display: inline-block;
        width:47%; 
        text-align :center;
        height:70px;
        border:1px solid #979797;
        align-content:center;
        margin:5px 0  5px 5px;
        font-weight:bold;
    }
    .new-shop{
        margin-top:20px;
    }
    .parking-info{
        margin-top : 20px;
        border:1px solid #cdcdcd;
        align-content:center;
        height: 100px;
        font-size : 20px;
        font-weight:bold;
    }
    .parking-info a{
        text-decoration-line:none;
        color:black;
    }
</style>