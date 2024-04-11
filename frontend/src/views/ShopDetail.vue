<template>
    <div class="detail-container">
        <div class="shop-detail">
            <!-- <img style="width:350px;" :src="getSrcPath()"  @onerror="imageLoadOnError"  /> -->
            <!-- <div style="height: 300px;" >
                <swiper :pagination="{ type: 'fraction',}" :modules="modules" class="mySwiper" >
                    <swiper-slide><img style="width:350px;" :src="getSrcPath()"  @onerror="imageLoadOnError"  /></swiper-slide>
                    <swiper-slide>Slide 2</swiper-slide>
                    <swiper-slide>Slide 3</swiper-slide>
                </swiper>
            </div> -->
            <div class="cont-title">
                {{v_shopDetail.title}}
            </div>
            <div class="cont-title-sub">
              {{v_shopDetail.positionArea}} / {{v_shopDetail.position}}F / {{v_shopDetail.title}}
            </div> 
            <div class="cont_desc-container">
                <div class="cont_time">
                        <div>영업시간 : <span class="cont_time_d">{{v_shopDetail.open_time}} - {{v_shopDetail.close_time}}</span></div>
                        <div>대표전화 : <span class="cont_time_d">{{v_shopDetail.tel_no}}</span></div>
                        <div>매장위치 : <span class="cont_time_d">{{v_shopDetail.position}}F</span><span style="float: right;"><img width="30px;" :src="require('@/assets/images/icon/pos_marker.jpg')"></span></div>
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
    import { ref, onMounted ,inject  ,watch , } from 'vue'
    import { useRoute ,useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    const store        = useStore()
    const route        = useRoute()

    const Axios        = inject('Axios')//구역
    let v_shopDetail   = ref({})
    let Zone           = inject('Zone')
   
    function fetchData () {
        let v_shop_id = history.state.shop_id
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
        })

    }
    onMounted(async () => {
       // store.commit('setSearchIcon' ,false)
        fetchData()
        //console.log( 'mounted iconf' , store)
    })
//     import { Swiper, SwiperSlide } from 'swiper/vue';

//     // Import Swiper styles
//     import 'swiper/css';

//     import 'swiper/css/pagination';
//     import 'swiper/css/navigation';
//     import { Pagination, Navigation } from 'swiper/modules';
// export default {
//     components: {
//       Swiper,
//       SwiperSlide,
//     },
//     name: 'ShopDetail',
//     props: {
//         shop_id: {
//                 type: String ,
//                 default: ''
//             },
//         shop_nm: {
//             type: String ,
//             default: ''
//         }
//     },

//     data() {
//         return {
//             shopDetail : {},
//             modules: [Pagination, Navigation],
//     }

//     },
//     created() {
//       console.log("Parent created")
//       this.fetchData(history.state)
//     }, 
//     mounted(){
//         this.$Store.commit('setSearchIcon');
//       //this.$Store.searchIcon = true
//       console.log( 'mounted iconf' , this.$Store)
//     } ,  
//     methods: {
//         fetchData (params) {
//             let v_shop_id = params.shop_id
//             let p_url   = "/api/shop_info/" + v_shop_id   
//             this.$Axios.get(p_url ,{}).then((response) => {
//                 const shopInfo = response.data["shop_detail"]

//                 v_shopDetail.id              = shopInfo.shop_id
//                 v_shopDetail.title           = shopInfo.shop_nm
//                 v_shopDetail.open_time       = shopInfo.open_time
//                 v_shopDetail.close_time      = shopInfo.close_time
//                 v_shopDetail.tel_no          = shopInfo.tel_no
//                 v_shopDetail.position        = shopInfo.position
//                 v_shopDetail.description     = shopInfo.description            
//                 v_shopDetail.position_area   = this.$Zone[shopInfo.position_area]
//                 v_shopDetail.image       = require("../assets/images/shop/"+ shopInfo.shop_id + "_detail_1.jpg")

//             }).catch((error) => {
//                 console.log(error);
//             })

//         }
//         ,getSrcPath() {
//             try {
//                 return  require("../assets/images/shop/"+ v_shopDetail.id + "_detail_1.jpg")
//             }catch(error){
//                 return require("../assets/images/shop/no_image.jpg")
//             }
//         },
//         imageLoadOnError () {
//             v_shopDetail.image  = "../assets/images/shop/no_image.jpg"
//         }
//     }
// }
</script>
<style scoped>
/* swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal */
    .swiper-pagination .swiper-pagination-fraction .swiper-pagination-horizontal {
        color:red;
        font-size: 55px;
    }
    .detail-container{
        position: relative;
        width:100%;
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
        padding-bottom : 30px;
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
        top:55px;
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