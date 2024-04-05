<template>
    <div class="event"> Event 
        <div>
            <img width="350px" src="../assets/images/event/event_1.png" />
        </div>
        <div class="margin_top">
            <img width="350px" src="../assets/images/event/event_2.png" />
        </div>
    </div>
</template>
 
<script>
    export default {
        data() {
            return {
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
    .event{
        display : inline-block;
        position : relative;
    }
    .margin_top {
        margin-top: 20px;
    }
</style>