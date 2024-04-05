<template>
    <div class="location">
        <img style="width:350px;" :src="this.location_img"  />
    </div>
    <div>
        <img style="width:350px;" :src="this.location_cont"  />
    </div>
</template>

<script>
    export default {
        data() {
        return {
            location_img : require("../assets/images/location.png") ,
            location_cont : require("../assets/images/location_cont.jpg") 
    }

    },
    created() {
      console.log("Parent mounted")
      this.fetchData(this.$route)
      
    },    
    methods: {
       fetchData (params) {
        //console.log(11111111 ,params)
        console.log('history.state: ', history.state)
       }
    }
  
    };
</script>

<style scoped>
    .content{
        top : 100px;
    }
</style>