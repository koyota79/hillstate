
<template>
    <div class="main-cont">
        <img src = "../assets/images/special_map.png"/>
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

const router = useRouter()
const v_categoryObj = inject('Category')

function fnCategoryPageMove(event ,key){
    //console.log('event' ,event ,key ,router )
    //this.body.classList.remove('hidden');
    router.push({ name: 'Category' ,params: {'id': key}})  
}

 

// const cnt = ref(0)
// const plus = () => { cnt.value++ }
// const rawHtml = '<div style="color: red;">HTML 출력</div>'

// const user = {
//   name: 'HEROPY',
//   age: 85
// }
// const refUser = ref(user)
// const reactiveUser = reactive(user) //Watch 사용못함

// console.log(refUser.value.name) // 'HEROPY'
// console.log(reactiveUser.name) // 'HEROPY'


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
        border:1px solid #d9c086;
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