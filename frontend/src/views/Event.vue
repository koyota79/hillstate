<template>
    <div class="event"> 
        <div>
            <p style="font-weight: bold;font-size: 20px;">이벤트</p>
        </div>  
        <!-- <div v-for="(item, index) in eventImg"> -->
            <div id="event_images">
                <!-- <img width="350px" src="../assets/images/shop/no_image.jpg" v-show="r_loadingImage"/> -->
                 <!-- <img width="350px" class="img-load v-lazy-image" :src="item"  @onerror="imageLoadOnError" />  -->
                <!-- <div class="loading" v-show="r_loadingImage">
                    <span></span>
                    <span></span>
                    <span></span>
                </div> -->  
            </div>
        <!-- </div> -->


       


    </div>
</template>
  
<script setup>
    import {ref, onMounted } from 'vue'
    //let r_loadingImage      = ref(true)
    let imageLoadingSize    = 0
    let startImageSize      = 4


    const imagesArry = [
        require('@/assets/images/event/event_1.png'),
        require('@/assets/images/event/event_2.png'),
        require('@/assets/images/event/event_3.png'),
        require('@/assets/images/event/event_4.png'),
        require('@/assets/images/event/event_5.png'),
        require('@/assets/images/event/event_1.png'),
        require('@/assets/images/event/event_2.png'),
        // require('@/assets/images/event/event_3.png'),
        // require('@/assets/images/event/event_1.png'),
        // require('@/assets/images/event/event_2.png'),
        // require('@/assets/images/event/event_3.png'),
        // require('@/assets/images/event/event_1.png'),
        // require('@/assets/images/event/event_2.png'),
        // require('@/assets/images/event/event_3.png'),   
    ]
    //let scrollHeight    = document.body.scrollHeight
    //let viewScrollSize  = parseInt(totalScrollTop /scrollHeight)
    
    //console.log( startImageSize, 'scrollHeight' ,Math.round(13/4) ,'index' ,imageLoadingSize )
    onMounted(() => {
        const div = document.getElementById('event_images') 
        window.addEventListener('scroll', function() {
            if ((window.innerHeight + window.scrollY ) + 200 >= document.body.offsetHeight) {
                if(imageLoadingSize == imagesArry.length){
                    return
                }else{
                    fnLoadingImage(2)
                }
            }
        });

        
        function fnLoadingImage(size){
            for(let i = imageLoadingSize ; i < (size + imageLoadingSize); i ++){
                let item = imagesArry[i]
                if(item == undefined)
                    return

                let img = new Image() 
                img.src = item
                const imageTag = document.createElement("img");
                imageTag.classList.add('img-load')
                imageTag.style.width = '350px'
                imageTag.style.padding = '20px'
                imageTag.src = require('../assets/images/event/event-loading_large.gif')
                div.appendChild(imageTag)
                img.addEventListener("load", function() {
                    //r_loadingImage.value = false
                    setTimeout(() => {
                        imageTag.src = item  
                    }, 300);
                
                    imageLoadingSize +=  1 
             
                });
            }
        }

        fnLoadingImage(startImageSize)
    })

    
</script>

<style scoped>
    .event{
        display : inline-block;
        position : relative;
        
    }
    .margin_top {
        margin-top: 20px;
    }
    .v-lazy-image{
        filter : blur(10px);
        transition: filter 0.7s;
    }
    .v-lazy-image-loaded{
        filter : blur(0);
    }
    #loading {
        display: none;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(255, 255, 255, 0.8) url('../assets/images/event/event-loading.gif') 50% 50% no-repeat;
    }

    .loading span {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: gray;
        border-radius: 50%;
        animation: loading 1s 0s linear infinite;
    }

    .loading span:nth-child(1) {
        animation-delay: 0s;
        background-color: red;
    }

    .loading span:nth-child(2) {
        animation-delay: 0.2s;
        background-color: orange;
    }

    .loading span:nth-child(3) {
        animation-delay: 0.4s;
        background-color: yellowgreen;
    }
    @keyframes loading {
        0%, 100% {
            opacity: 0;
            transform: scale(0.5);
        }
        50% {
            opacity: 1;
            transform: scale(1.2);
        }
    }
</style>