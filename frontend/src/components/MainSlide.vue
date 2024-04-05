<template>
  <!-- <div style="width:100%; height: 350px;position: relative; left:5px;">
  <swiper 
    :spaceBetween="0"
    :centeredSlides="true"
    :autoplay="{
      delay: 3500,
      disableOnInteraction: false,
    }"
    :loop="true"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    :observer = "true"
    :observeParents = "true"

    class="mySwiper"
    >
    <swiper-slide
      v-for="(slide, index) in slides"
      :key="slide.id">
      <img :src="slide.image" />
    </swiper-slide>
  </swiper>
  </div> -->
  <div class="slide_middle">
    <h3>디포레 추천</h3>
  </div>
  <div class="sub_slide">
    <swiper
    :watchSlidesProgress="true" 
    :slidesPerView="3" 
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :scrollbar="{
      hide: true,
    }"
    :loop="true"
    :space-between="10"
    :modules="modules"
    class="mySwiper"

    >
      <swiper-slide
        v-for="(subSlide, index) in subSlides"
        :key="index">
          <!-- {{ subSlide.title }} -->
          <img :src="subSlide.image"   @click="fnShopDetail($event ,subSlide)" />
      </swiper-slide>
    </swiper>
  </div>  
  <div style="height: 40px;"></div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/navigation';
  import 'swiper/css/scrollbar';
  
  import { Autoplay, Pagination, Navigation, Scrollbar } from 'swiper/modules';

  export default {
    components: { Swiper, SwiperSlide, },
    data() {
      return {
        slides: [],
        subSlides : [],
        modules: [Autoplay, Pagination, Navigation, Scrollbar ],

        swiperOptions: {
          breakpoints: {       
            '@1.00': {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            '@1.50': {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }
        }
      }  
    },  
    created() {
      console.log("Parent mounted")
      this.fetchData()
      
    },    
    methods: {
       fetchData () {
        
        //console.log("fetchData" ,this.modules)
        let p_url   = "api/shop_data/getMainSlide"   
        this.$Axios.get(p_url ,{})
        .then((response) => {
          //console.log(response);
          //console.log(response.data);

          // const v_list = response.data["main_list"]
          // for (var value of v_list) {
          //     this.slides.push({
          //       id        : value["shop_id"] 
          //      ,title     : value["shop_nm"] 
          //      //,upload_nm : value["upload_nm"] 
          //      ,image     : require("../assets/images/"+value["main_img_nm"]+".jpg")
            
          //   })
          // }


          const v_sub_list = response.data["sub_list"]
          for (let value of v_sub_list) {
              this.subSlides.push({
                id        : value["shop_id"] 
               ,title     : value["shop_nm"] 
               //,upload_nm : value["upload_nm"] 
               ,image     : require("../assets/images/shop/"+value["sub_img_nm"]+".jpg")
            
            })
          }

          //console.log(this.slides)
          
            //this.$refs.myVueperSlides.resumeAutoplay();
            //this.$refs.myVueperSubSlides.resumeAutoplay();
        }).catch((error) => {
          console.log(error);
          alert(error)
        })

        //console.log("2222222222222222")
      },

      getPostList : async function () {

        //console.log("3333333")
       },
      fnShopDetail(event ,shopObject) {
       
        if(event){
          //console.log("fnShopDetail")
          this.$router.push({ path: "/shop_info" 
              ,name : "ShopDetail" 
              ,params : {shop_id : shopObject.id} 
              ,state: { //url 에서 안보이게 처리
                name: 'shop_id',
                shop_id: shopObject.id,
                shop_nm: shopObject.title
              }
          }) 
        }
      }
      
    }
  }
</script>

<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.sub_slide {
  height: 120px;
}
.slide_middle {
  margin-left:10px;
  float : left;
  color:#A00E15
}
</style>