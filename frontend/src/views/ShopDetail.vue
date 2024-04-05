<template>
    <div class="shop-detail">
        <!-- <img style="width:350px;" :src="getSrcPath()"  @onerror="imageLoadOnError"  /> -->
        <div style="height: 300px;" >
            <swiper
                :pagination="{
                type: 'fraction',
                }"
                :modules="modules"
                class="mySwiper"
            >
                <swiper-slide><img style="width:350px;" :src="getSrcPath()"  @onerror="imageLoadOnError"  /></swiper-slide>
                <swiper-slide>Slide 2</swiper-slide>
                <swiper-slide>Slide 3</swiper-slide>
            </swiper>
        </div>
        <div class="cont_title">
            {{shopDetail.title}} 
        </div>
        <div class="cont_desc">
            없는게 없는 다이소
            없는게 없는 다이소
            없는게 없는 다이소
            없는게 없는 다이소
            없는게 없는 다이소
            없는게 없는 다이소
        </div>
        <div class="cont_time">
            <div>영업시간 : <span class="cont_time_d">{{shopDetail.open_time}} - {{shopDetail.close_time}}</span></div>
            <div>대표전화 : <span class="cont_time_d">{{shopDetail.tel_no}}</span></div>
            <div>매장위치 : <span class="cont_time_d">{{shopDetail.position}}</span></div>
        </div>

        <div class="cont_title">
            <div style="margin-top: 250px;">주요상품</div>
        </div>
        <div class="cont_menu">
            <ul>
                <li>테스트 상품</li>
            </ul>
        </div>
        <div style="margin-top: 550px;">
        </div>
    </div>
</template>

<script>
    import { Swiper, SwiperSlide } from 'swiper/vue';

    // Import Swiper styles
    import 'swiper/css';

    import 'swiper/css/pagination';
    import 'swiper/css/navigation';
    // import required modules
    import { Pagination, Navigation } from 'swiper/modules';
export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    name: 'ShopDetail',
    props: {
        shop_id: {
                type: String ,
                default: ''
            },
        shop_nm: {
            type: String ,
            default: ''
        }
    },

    data() {
        return {
            shopDetail : {},
            modules: [Pagination, Navigation]
    }

    },
    created() {
      console.log("Parent created")
      this.fetchData(history.state)
    },    
    methods: {
        fetchData (params) {
            console.log(11111111 ,params)
            let v_shop_id = params.shop_id
            let p_url   = "/api/shop_info/" + v_shop_id   
            console.log("p_url" ,p_url);
            this.$Axios.get(p_url ,{})
            .then((response) => {
            console.log(response);
            console.log(response.data);
            const v_shopInfo = response.data["shop_detail"]

            this.shopDetail.id          = v_shopInfo.shop_id
            this.shopDetail.title       = v_shopInfo.shop_nm
            this.shopDetail.open_time   = v_shopInfo.open_time
            this.shopDetail.close_time  = v_shopInfo.close_time
            this.shopDetail.tel_no      = v_shopInfo.tel_no
            this.shopDetail.position    = v_shopInfo.position
            this.shopDetail.image       = require("../assets/images/shop/"+ v_shopInfo.shop_id + "_detail_1.jpg")

            }).catch((error) => {
            console.log(error);
            })

        }
        ,getSrcPath() {
            try {
                return  require("../assets/images/shop/"+ this.shopDetail.id + "_detail_1.jpg")
            }catch(error){
                return require("../assets/images/shop/no_image.jpg")
            }
        },
        imageLoadOnError () {
            this.shopDetail.image  = "../assets/images/shop/no_image.jpg"
        }
    }
}
</script>
<style scoped>
/* swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal */
    .swiper-pagination .swiper-pagination-fraction .swiper-pagination-horizontal {
        color:red;
        font-size: 55px;
    }
    .shop-detail{
        position : relative;
    }
    .cont_title{
        margin-top :30px;
        margin-left:20px;
        font-size: 20px;
        position: absolute;
        line-height: 1.33;
        font-weight: 700;
        letter-spacing: -.02em;
    }
    .cont_desc {
        margin-top :75px;
        margin-left:20px;
        font-size: 15px;
        position: absolute;
        line-height: 1.5;
        letter-spacing: -.02em;
        word-spacing :normal;
        text-align : left;
    }
    .cont_time {
        margin-top :175px;
        margin-left:20px;
        font-size: 15px;
        position: absolute;
        line-height: 1.5;
        letter-spacing: -.02em;
        word-spacing :normal;
        text-align : left;
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
</style>