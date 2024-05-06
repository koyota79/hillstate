<template>
    <div class="event"> 
        <div>
            <p style="font-weight: bold;font-size: 20px;">이벤트</p>
        </div>  
        
        <div v-for="(item, index) in r_eventImages">
            <div>
                <img width="350px" class="img-load" :src="item"  @onerror="imageLoadOnError" />
            </div>
        </div>


       


    </div>
</template>
  
<script setup>
    import {ref, onMounted } from 'vue'
    let r_eventImages    = ref([])
    r_eventImages.value = [
        require('@/assets/images/event/event_1.png'),
        require('@/assets/images/event/event_2.png'),
        require('@/assets/images/event/event_3.png'),
    ]
    // const emit = defineEmits(["toggle-loading"]);
    // emit('toggle-loading', true);
    // onMounted(() => {
    //     const imgNodes = document.getElementsByClassName("img-load");
    //     for(let item of imgNodes){
    //         item.addEventListener("load", function() {
    //             //console.log(this.complete); // true
    //             emit('toggle-loading', false); 
    //         });
    //     }  
    
    // })

    function imageLoadOnError(e) {
        console.log('imageLoadOnError')
        e.target.src = require('../assets/images/shop/no_image.jpg');
    }

   // emit('toggle-loading', false);
</script>

<style scoped>
    .event{
        display : inline-block;
        position : relative;
    }
    .margin_top {
        margin-top: 20px;
    }
</style>