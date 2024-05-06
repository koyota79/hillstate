<template>
    <div class="detail-container">
        <div class="shop-detail">


            <div style="height: 250px;margin-bottom:20px;" v-if="r_imgShow"> 
                <swiper
                    :centeredSlides="true"
                    :slidesPerView="1" 
                    :scrollbar="{
                        hide: false
                    }"
                    :loop="true"
                    :space-between="10"
                    :modules="[Autoplay, Pagination, Navigation, Scrollbar]"
                    class="mySwiper">
                    
                    <swiper-slide
                        v-for="(subSlide, index) in r_subSlides"
                        :key="index"  id="slide-swiper" >
                        <!-- {{ subSlide.title }} -->
                        <img :src="subSlide.image"   @onerror="imageLoadOnError"  />  
                    </swiper-slide>
                </swiper>
            </div>

            <div class="cont-title" v-else>
                {{v_shopDetail.title}}
            </div>
            <div class="cont-title-sub">
              {{v_shopDetail.positionArea}} / {{v_shopDetail.position}}F / <b>{{v_shopDetail.title}}</b>
            </div> 
            <div class="cont_desc-container">
                <div class="cont_time">
                        <div>영업시간 : <span class="cont_time_d">{{v_shopDetail.open_time}} - {{v_shopDetail.close_time}}</span></div>
                        <div>대표전화 : <span class="cont_time_d">{{v_shopDetail.tel_no}}</span></div>
                        <div>매장위치 : <span class="cont_time_d">{{v_shopDetail.position}}F</span>
                            <span style="float: right;" @click="fnShopMapMove($event)">
                                <img width="30px;" :src="require('@/assets/images/icon/pos_marker.jpg')">
                            </span>
                        </div>
                </div>  
                <div class="cont_desc">
                    {{v_shopDetail.description==null?v_shopDetail.title:v_shopDetail.description}}
                </div>

                <div class="cont-major">
                    <div>주요 상품</div>
                    <div class="cont-major-sub">
                        <div class="cont-major-item">
                            <span >테스트 상품</span><span>11,000 원</span>
                        </div>
                    </div>
                    <div class="cont-major-sub">
                        <div class="cont-major-item">
                            <span >테스트 상품111111</span><span>21,000 원</span>
                        </div>
                    </div>
                    <div class="cont-major-sub">
                        <div class="cont-major-item">
                            <span >테스트22</span><span>131,000 원</span>
                        </div>
                    </div>

                </div>
            </div>
            <div style="margin-top: 550px;">
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted ,inject  ,onBeforeMount } from 'vue'
    import { useRoute ,useRouter } from 'vue-router'
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { useStore } from 'vuex'
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/scrollbar';
    import { Autoplay, Pagination, Navigation, Scrollbar } from 'swiper/modules';

    const Axios        = inject('Axios')//구역
    let v_shopDetail   = ref({})
    let r_subSlides    = ref([])
    let r_imgShow      = ref(false)
    let Zone           = inject('Zone')
    let imageSlide     = false
    const route        = useRoute()
    const store        = useStore()
    store.commit('setOverFlow' ,false)
    
    
    const emit = defineEmits(["toggle-loading"]);
    emit('toggle-loading', true);
    onBeforeMount(async () => {
        fetchData()
    })

 
    function fetchData () {
        let v_shop_id = route.params.shop_id 
        let p_url   = "/api/shop_info/" + v_shop_id   
        Axios.get(p_url ,{}).then((response) => {
            const shopInfo = response.data["shop_detail"]
            
            v_shopDetail.value.id              = shopInfo.shop_id
            v_shopDetail.value.title           = shopInfo.shop_nm
            v_shopDetail.value.open_time       = shopInfo.open_time
            v_shopDetail.value.close_time      = shopInfo.close_time
            v_shopDetail.value.tel_no          = shopInfo.tel_no
            v_shopDetail.value.position        = shopInfo.position
            v_shopDetail.value.description     = shopInfo.description            
            v_shopDetail.value.positionArea    = Zone[shopInfo.position_area]
            v_shopDetail.value.image           = require("../assets/images/shop/"+ shopInfo.shop_id + "_detail_1.jpg")
            v_shopDetail.value.markerImage     = require("../assets/images/icon/pos_marker.jpg")
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            emit('toggle-loading', false);
        })

        if(v_shop_id ==='2222'){
            imageSlide = true
            fnImageSlide(imageSlide)
        }

    }
    const router = useRouter()
    function fnShopMapMove(e){
        router.push({ name: 'MapSearch'  ,params : {id : route.params.shop_id} } )
    }

    function fnImageSlide(isTrue){
        if(isTrue){
            r_imgShow.value = true
            r_subSlides.value.push({
                 id        : '123' 
                ,title     : 'test'
                ,image     : require("../assets/images/shop/2222/2222_1.jpg")
            
            })
            r_subSlides.value.push({
                 id        : '123' 
                ,title     : 'test'
                ,image     : require("../assets/images/shop/2222/2222_2.jpg")
                
            })
            r_subSlides.value.push({ 
                 id        : '123' 
                ,title     : 'test'
                ,image     : require("../assets/images/shop/2222/2222_3.jpg")
                
            })
        }
       
    }
    onMounted(() => {
        if(imageSlide){
           const scollbar =  document.getElementsByClassName('swiper-scrollbar')[0]
           scollbar.style.backgroundColor  = '#fff'
       }
    })
</script>
<style scoped>
/* swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal */
    .detail-container{
        position: relative;
        width:100%;
        height:900px;
        display:flex; 
        justify-content:center;
    }
    .shop-detail{
        position : relative;
        width:95%
    }
   
    .cont-title{
        margin:20px;
        font-size: 20px;
        height: 100px;
        position: relative;
        font-weight: bold;
        padding:10px;
        border:1px solid #dbdada;
        border-radius: 5px;
        align-content : center;
        
    }
    .cont-title-sub{
        font-size : 13px;
        padding-bottom : 20px;
    }
    .cont_desc-container{
        position: relative;
    }
    .cont_desc {
        margin :15px;
        font-size: 13px;
        line-height: 1.5;
        letter-spacing: -0.1em;
        word-spacing :normal;
        text-align : left;
        border-bottom : 1px solid #ededed;    
        border-top : 1px solid #ededed;  
        padding:30px 0 40px 20px;    
        width:80%
    }
    .cont_time {
        margin :15px;
        border-top : 1px solid ;  
        font-size: 13px;
        line-height: 1.5;
        letter-spacing: -.02em;
        word-spacing :normal;
        text-align : left;
        padding:20px;
        width:80%
    }
    .cont_time div {
        padding :5px;
    }
    .cont_time_d {
        font-weight: 700;
    }
    .cont_menu {
        margin-top :315px;
        margin-left:30px;
        font-size: 15px;
        position: absolute;
        line-height: 1.5;
        letter-spacing: -.02em;
        word-spacing :normal;
    }
    .cont-major{
        position: relative;
        top:35px;
        font-weight: bold;
    }
 
    .cont-major-sub{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    .cont-major-item{
        align-items: center;
        display: flex;
        flex: 1 1 auto;
        justify-content: space-between;
        line-height: 22px;
        margin-left: 16px;
        position: relative;
    }
    .cont-major-item span{
        font-size: 13px;
        font-weight: initial;
        z-index: 1;
        background-color: #fff;
        padding: 8px;        
    }
     .cont-major-item:after {
        border-top: 1px dashed #ccc;
        content: "";
        display: block;
        height: 1px;
        left: 0;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 0;
    }    
</style>