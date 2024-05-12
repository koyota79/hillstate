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
                        v-for="(item, index) in r_subSlides"
                        :key="index"  id="slide-swiper" >
                        <img src=""  class="slide-img"   @onerror="imageLoadOnError"  />  
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
                        
                        <div v-if="v_shopDetail.time_type == 'B'">특이사항 : <span class="cont_time_d">{{v_shopDetail.time_desc}}</span></div>

                        <div v-if="v_shopDetail.time_type == 'A'">브레이크 타임 : <span class="cont_time_d">{{r_timeBreak[0] }} ~ {{ r_timeBreak[1]}} </span></div>
                        <div v-if="v_shopDetail.time_type == 'A'">라스트 오더 : <span class="cont_time_d">{{r_timeBreak[2]}}</span></div>

                        <div>휴무일 : <span class="cont_time_d">{{v_shopDetail.close_day?v_shopDetail.close_day:'없음'}}</span></div>
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

                <div class="cont-major" v-if="v_shopDetail.time_type == 'A'">
                    <div>주요 상품</div>

                    <div class="cont-major-sub" v-for="item in r_majorItem"  >
                        <div class="cont-major-item">
                            <span >{{item.split(':')[0]}}</span><span>{{item.split(':')[1]}} 원</span>
                        </div>
                    </div>
<!-- 
                    <div class="cont-major-sub">
                        <div class="cont-major-item">
                            <span >테스트 상품111111</span><span>21,000 원</span>
                        </div>
                    </div>
                    <div class="cont-major-sub">
                        <div class="cont-major-item">
                            <span >테스트22</span><span>131,000 원</span>
                        </div>
                    </div> -->

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
    let r_timeBreak    = ref([])
    let r_majorItem    = ref([])
    let r_imgShow      = ref(false)
    let Zone           = inject('Zone')
    let imageSlide     = false
    const route        = useRoute()
    const store        = useStore()
    store.commit('setOverFlow' ,false)
    const shopObj  = store.state.shopData
    
    const emit = defineEmits(["toggle-loading"]);
    emit('toggle-loading', true);
    onBeforeMount(async () => {
        //fetchData()
        getFetchData()
        
    })
    /*
        1. img_slide_yn 1 컬럼 추가 디폴트 N
        2. time_type    1  브레이크타임 등등
        3. time_desc    50 월요일 휴무 수요일 야간진료 등등     "13:00;14:00;21:00" , "매주 수요일 21:00 야간진료"
        4. close_day   30 매주 월요일   "매주 토,일요일"
        5. major_item  125          "파스타:12,000;자몽에이드:6,500;파니니:13,500"
    */
    function getFetchData(){
        try{
            const v_shop_id =  route.params.id
            const shopInfo = shopObj.find(function(data){ return data[v_shop_id] })[v_shop_id]  

            console.log(shopInfo , route.params.id)
            v_shopDetail.value.id              = shopInfo.shop_id
            v_shopDetail.value.title           = shopInfo.shop_nm
            v_shopDetail.value.open_time       = shopInfo.open_time
            v_shopDetail.value.close_time      = shopInfo.close_time
            v_shopDetail.value.tel_no          = shopInfo.tel_no
            v_shopDetail.value.position        = shopInfo.position
            v_shopDetail.value.description     = shopInfo.description            
            v_shopDetail.value.img_slide_yn    = shopInfo.img_slide_yn   
            v_shopDetail.value.time_type       = shopInfo.time_type   
            v_shopDetail.value.time_desc       = shopInfo.time_desc  
            v_shopDetail.value.close_day       = shopInfo.close_day   
            v_shopDetail.value.positionArea    = Zone[shopInfo.position_area]
            v_shopDetail.value.image           = ''//require("../assets/images/shop/"+ shopInfo.shop_id + "_detail_1.jpg")
            v_shopDetail.value.markerImage     = require("../assets/images/icon/pos_marker.jpg")

            if(shopInfo.time_type =='A'){
                if(shopInfo.time_desc != undefined ){
                    r_timeBreak.value = shopInfo.time_desc.split(';')
                }

                if(shopInfo.major_item != undefined ){
                    r_majorItem.value = shopInfo.major_item.split(';') 
                }
            }

            //console.log(r_timeBreak.value)
            //이미지 슬라이드가 가능한경우
            if(shopInfo.img_slide_yn == "Y"){
                imageSlide = true
                fnImageSlide(shopInfo)
            }
        }catch(e){
            alert('예외사항 오류.')
            console.log('err', e)
        }finally{
            setTimeout(() => {
                emit('toggle-loading', false);
            },1000)
        }
    }

    //매장위치 이동
    const router = useRouter()
    function fnShopMapMove(e){
        router.push({ name: 'MapSearch'  ,params : {id : route.params.shop_id} } )
    }

    //이미지 슬라이드
    function fnImageSlide(item){

        r_imgShow.value = true
        r_subSlides.value.push({
                id     : item.shop_id
            ,title     : item.shop_nm
            ,image     : require('../assets/images/shop/' + item.shop_id + '/' + item.shop_id + '_1.jpg')
        
        })
        r_subSlides.value.push({
                id     : item.shop_id
            ,title     : item.shop_nm
            ,image     : require('../assets/images/shop/' + item.shop_id + '/' + item.shop_id + '_2.jpg')
            
        })
        r_subSlides.value.push({ 
                id     : item.shop_id
            ,title     : item.shop_nm
            ,image     : require('../assets/images/shop/' + item.shop_id + '/' + item.shop_id + '_3.jpg')
        })
        
       
    }

    onMounted(() => {
        const slideImg = document.getElementsByClassName('slide-img')
        for(let i=0; i < slideImg.length; i++){
            //let item = slideImg[i]
            let img = new Image() 
                img.src = r_subSlides.value[i].image
                //const imageTag = document.createElement("img");
                slideImg[i].classList.add('img-load')
                //slideImg[i].style.width = '300px'
                slideImg[i].style.height = '130px'
                slideImg[i].style.marginLeft = '20px'
                //slideImg[i].style.padding = '20px'
                slideImg[i].src = require('../assets/images/event/event-loading.gif')
                img.addEventListener("load", function() {
                //     setTimeout(() => {
                    slideImg[i].style.height = '260px'
                    slideImg[i].style.marginLeft = '0px'
                    slideImg[i].src = r_subSlides.value[i].image  
                //     }, 2000);
                });

        }

        //이미지 슬라이드 네이게이션 스크롤 css
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