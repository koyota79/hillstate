<template>
    <div class="site_map"> site_map 
        <div v-bind:style="{ rotate: v_rotate + 'deg', transition: v_transition }">
            <div  class="circular" width="370px" height="350px" :style="{backgroundImage :'url('+ v_siteMapUrl + ')' }">
                <div class="backdoor" v-bind:style="{ rotate: v_text_rotate + 'deg', transition: v_transition }" >후문</div>
                <div class="frontdoor" v-bind:style="{ rotate: v_text_rotate + 'deg', transition: v_transition }" >정문</div>
                <div>
                    <img :src="v_markerImg" ref="2001" v-if="v_show"
                    v-bind:style="{position : 'absolute' ,left:v_left + 'px' ,top:v_top + 'px' ,width:'25px'
                        , rotate: v_text_rotate + 'deg', transition: v_transition
                    }"/>
                </div>

            
            </div>         
        </div>  
        <div class="arrow">
        </div>
        <div class="btn">
            <button @click="fnDoesRotate('L')">left</button><button @click="fnDoesRotate('R')">right</button>
        </div> 
        <div style="margin-top:30px;">
            <button @click="fnShopShow('2001')">스타벅스</button>
            <button @click="fnShopShow('2003')">폴바셋</button>
            <button @click="fnShopShow('2006')">시스템옴므</button>
        </div>
    </div> 
</template>
 
<script>

    export default {
        data() {
            return {
                v_rotate : 0 ,
                v_text_rotate : 0 ,
                v_show       : false ,
                v_transition : 'rotate 1s',
                v_siteMapUrl : require("../assets/images/site_map_2.jpg") ,
                v_markerImg  : require("../assets/images/marker.jpg"),
                v_top : "25" ,
                v_left : "10",
                v_shopPosition : {
                    "2001" : {"top" : "25" ,"left" : "10"} ,
                    "2003" : {"top" : "75" ,"left" : "10"} ,
                    "2006" : {"top" : "255" ,"left" : "10"} 
                
                }

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
                    this.left = this.v_shopPosition[shopId]["left"]                    
                }
            }
        }
        
    }
</script>

<style scoped>
    .site_map{
        display : inline-block;
        position : relative;
        top : 100px;
        text-align: center;
    }
    .circular {
         width: 370px;
         height: 350px;
         background-size: cover;
         border-radius: 50px;
         -webkit-border-radius: 50px;
         -moz-border-radius: 50px;
         text-align: center;
         position: relative;
         border: 3px dotted lightslategray;
         margin-top: 20px;
      }
    /* .rotate {
        rotate: 90deg;
        transition: rotate 1s;
    } */
    .backdoor{
       /*  display: inline-block;
        transform : rotatex(90deg); */
        border: 3px 
    }
    .frontdoor{
        display: inline-block;
        /* background-color: #3c40c6; */
        position: absolute;
        top: 330px; 
        left: 160px;

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
        margin-top: 50px;
    }   
    .arrow {
        width: 0;
        height: 0;
        border-bottom: 15px solid red;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        margin-top: 20px;
        position: absolute;
        left: 170px;
    }
    area:hover{
        filter: opacity(0.9) drop-shadow(0 0 0 #ff0000);
    }    
</style>