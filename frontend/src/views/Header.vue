<template>
  <div class ="top_log" @click="fnGoMainpage($event)">
    <img width="160px" height="40px"  src = "../assets/images/logo_hanam.png" />
  </div>
  <side-menu></side-menu>
</template>

<script>
export default {
  data() {},
  methods: {
    fnGoMainpage(event) {
      if(event){
        this.$router.push({ path: '/' })
      }

    }
  }
}
</script>
<style>
.top_log{
    right : 124px;
    display : inline-block;
    position : absolute;
    top : 8px;
}
.btn-backgroud-img {
    width : 30px;
    height : 30px;
    background-image : url("../assets/images/ic_menu.png");
    background-size : 25px;
}
.btn-group{
    right : 14px;
    display : inline-block;
    position : absolute;
    top : 8px;
}   
</style>