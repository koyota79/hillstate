<template>
    <div class="site_map">
        <div class="floor_info">
            <FloorInfo></FloorInfo>
        </div>

        <div v-bind:style="{ rotate: v_rotate + 'deg', transition: v_transition }">
            <div  class="circular" :style="{backgroundImage :'url('+ v_siteMapUrl + ')' }">
                <div class="backdoor" v-bind:style="{ rotate: v_text_rotate + 'deg', transition: v_transition}" >대로변</div>
                <div class="frontdoor" v-bind:style="{ rotate: v_text_rotate + 'deg', transition: v_transition }" >주차장입구</div>
                <div>
                    <img :src="v_markerImg" ref="2001" v-if="v_show"
                    v-bind:style="{position : 'absolute' ,left:v_left + '%' ,top:v_top + '%' ,width:'25px'
                        , rotate: v_text_rotate + 'deg', transition: v_transition 
                    }"/>
                </div>

            
            </div>         
        </div>  

        
        <div class="arrow"></div>
        <div @click="fnDoesRotate('L')" ><img style="float:left;margin-left:20px;margin-top:10px;width:20px;rotate:250deg;" src="../assets/images/arrow.jpg"></div>
        <div @click="fnDoesRotate('R')"><img style="float:right;margin-right:20px;margin-top:10px;width:20px;rotate:100deg;transform: scaleX(-1);" src="../assets/images/arrow.jpg"></div>
        <div class="btn">
        </div> 

        <div style="margin-top:20px; width:91%;position: relative;left:3px;">
            <AccordionList :floorIdx="v_floorIdx" :key="refreshKey" ></AccordionList>
        </div>
    </div> 
    <div style="margin-top:200px;">&nbsp;</div>
    
</template>
 
<script>
    import { Swiper, SwiperSlide } from 'swiper/vue';

    import FloorInfo from '../components/FloorInfo.vue'; 
    
    import AccordionList from '../components/AccordionList.vue'; 

    // Import Swiper styles
    import 'swiper/css';

    import 'swiper/css/effect-cards';

    // import required modules
    import { EffectCards } from 'swiper/modules';

    export default {
        components: {
            Swiper,
            SwiperSlide,
            FloorInfo,
            AccordionList,
        },
        data() {
            return {
                v_rotate : 0 ,
                v_text_rotate : 0 ,
                refreshKey : 0 ,
                v_floorIdx : '2',
                v_show       : false ,
                v_transition : 'rotate 1s',
                v_siteMapUrl : require("../assets/images/site_map_2.jpg") ,
                v_markerImg  : require("../assets/images/marker.jpg"),
                v_top : "25" ,
                v_left : "10",
                v_shopPosition : {
                    "2001" : {"top" : "35" ,"left" : "74"} , //샌드
                    "2002" : {"top" : "38" ,"left" : "90"}, //반값TV
                    "2003" : {"top" : "24" ,"left" : "35"}, //관리
                    "2004" : {"top" : "68" ,"left" : "4"}  //센느
                
                },
                modules: [EffectCards]
            } 
        },
        methods: {
            fnDoesRotate(type){
                console.log(this.v_rotate  )  
                if(type == "R"){
                    this.v_rotate += 90 
                    this.v_text_rotate -= 90 
                }else{
                    this.v_rotate -= 90  
                    this.v_text_rotate += 90 
                }                                 
            },
            fnShopShow(shopId){
                console.log(this.v_shopPosition)
                if(this.v_show){
                    this.v_show = false
                }else{
                    this.v_show = true
                    this.v_top = this.v_shopPosition[shopId]["top"]
                    this.v_left = this.v_shopPosition[shopId]["left"]                    
                }
            },
            fnChangeFloor(p_floorIdx) {
                this.refreshKey += 1 //자식 컴포넌트 재호출
                this.v_siteMapUrl = require('../assets/images/site_map_' + p_floorIdx +'.jpg')
                this.v_floorIdx = p_floorIdx
                // this.$Axios.get('/api/site_map', {floor : floorIdx})
                // .then((response) => {
                //     console.log('response' , response);
                //     console.log(response.data);
        
                // }).catch((error) => {
                //     console.log(error);
                // }).finally(() => {
                //     console.log("항상 마지막에 실행");
            
                // });
            }


        }
        
    }
</script>

<style scoped>
.floor_info {
    width:100%;
    position: sticky;
    right: 300px;
    overflow-y: auto;
    z-index: 100;
}

.site_map{
    position : relative;
    text-align: center;
}
.circular { 
    width: 91%;
    height: 300px;
    background-size: cover;
    border-radius: 50px;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    text-align: center;
    border: 3px dotted lightslategray;
    display: inline-block;
    position : relative;
    }
/* .rotate {
    rotate: 90deg;
    transition: rotate 1s;
} */
.backdoor{
    /*  display: inline-block;
    transform : rotatex(90deg); */
    position: absolute;
    top:-23px;
    left:150px;
    border: 3px 
}
.frontdoor{
    display: inline-block;
    /* background-color: #3c40c6; */
    position: absolute;
    top: 300px; 
    left: 130px;

    /* transform : rotatex(90deg); */
}    
.rotate-45 {
    width: 50px;
    margin-left : 150px;
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -ms-transform: rotate(90deg);
    -o-transform: rotate(-90deg);
    transform: rotate(-90deg);
}
.rotate {
    border: solid black 2px;
    background-color: lightcoral;
    width: 60px;
    height: 60px;
}   
.btn {
    margin-top: 80px;
}   
.arrow {
    width: 0;
    height: 0;
    border-bottom: 15px solid red;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    margin-top: 30px;
    position: absolute;
    left: 170px;
}
area:hover{
    filter: opacity(0.9) drop-shadow(0 0 0 #ff0000);
}    
.margin_top_10 {
    margin-top : 10px;
} 
.swiper {
width: 240px;
height: 320px;
}

.swiper-slide {
display: inline;
align-items: center;
justify-content: center;
border-radius: 18px;
font-size: 22px;
font-weight: bold;
color: #fff;
}

.swiper-slide:nth-child(1n) {
background-color: rgb(206, 17, 17);
}

.swiper-slide:nth-child(2n) {
background-color: rgb(0, 140, 255);
}

.swiper-slide:nth-child(3n) {
background-color: rgb(10, 184, 111);
}

.swiper-slide:nth-child(4n) {
background-color: rgb(211, 122, 7);
}

.swiper-slide:nth-child(5n) {
background-color: rgb(118, 163, 12);
}

.swiper-slide:nth-child(6n) {
background-color: rgb(180, 10, 47);
}

.swiper-slide:nth-child(7n) {
background-color: rgb(35, 99, 19);
}

.swiper-slide:nth-child(8n) {
background-color: rgb(0, 68, 255);
}

.swiper-slide:nth-child(9n) {
background-color: rgb(218, 12, 218);
}

.swiper-slide:nth-child(10n) {
background-color: rgb(54, 94, 77);
}
</style>