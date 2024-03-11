<template>
  <vueper-slides
    ref="myVueperSlides"
    autoplay
    :arrows="false"
    class="no-shadow"
    fixed-height="250px">
    <vueper-slide
        v-for="(slide, i) in slides"
        :key="slide.id"
        :image="slide.image"
        >       
        <!-- <div slot="slideContent">
          <a href="/go-somewhere" @click="checkDragging">
            <span>1111111111</span>
          </a>
      </div> -->
    </vueper-slide>     
  </vueper-slides>
  <br>
  <!-- :title="slide.title"    :style="'background-color: '  + ['#ff5252', '#42b983','#ffe900'][i % 3]" -->

  <vueper-slides
      fade
      ref="myVueperSubSlides"
      class="no-shadow"
      :infinite="false"
      :visible-slides="3"
      autoplay 
      :bullets="false"
      :arrows="false"
      :slide-ratio="1 / 4"
      :breakpoints="{ 800: { visibleSlides: 3, slideMultiple: 3 } }">
      <vueper-slide 
          v-for="(slide, i) in subSlides"
            :key="slide.id"
            :image="slide.image"
      />
      <!-- v-for="i in 8" :key="i" :title="i.toString()" :style="'background-color: '  + ['#ff5252', '#42b983','#ffe900'][i % 3]"   -->
    </vueper-slides> 
    <button @click="slides2()">test</button>
</template>

<script>
  import { VueperSlides, VueperSlide } from 'vueperslides'
  import 'vueperslides/dist/vueperslides.css'

  export default {
    components: { VueperSlides, VueperSlide },
    
    data() {
      return {
        slides: [],
        subSlides : []
      };
    },    
    created() {
      console.log("Parent mounted")
      this.fetchData()
      
    },    
    methods: {
       fetchData () {
        console.log("fetchData")
        let p_url   = "/shop_data/getMainSlide"   
        this.$Axios.get(p_url ,{})
        .then((response) => {
          console.log(response);
          console.log(response.data);
          const v_list = response.data["main_list"]
          for (let value of v_list) {
              this.slides.push({
                id        : value["shop_id"] 
               ,title     : value["shop_nm"] 
               //,upload_nm : value["upload_nm"] 
               ,image     : require("../assets/images/"+value["main_img_nm"]+".jpg")
            
            })
          }

          const v_sub_list = response.data["sub_list"]
          for (let value of v_sub_list) {
              this.subSlides.push({
                id        : value["shop_id"] 
               ,title     : value["shop_nm"] 
               //,upload_nm : value["upload_nm"] 
               ,image     : require("../assets/images/"+value["sub_img_nm"]+".jpg")
            
            })
          }

          console.log(this.slides)
          
            this.$refs.myVueperSlides.resumeAutoplay();
            this.$refs.myVueperSubSlides.resumeAutoplay();
        }).catch((error) => {
          console.log(error);
        })

        console.log("2222222222222222")
      },

      getPostList : async function () {

        console.log("3333333")
       },
      // pauseSlider() {
      //   //console.log("3333333" ,this.$refs.myVueperSlides.onTouchmove)
      //   this.$refs.myVueperSlides.pauseAutoplay();
      // }
      
    }
  }
</script>

<style>

</style>