<template>
  <div class ="header">
    <search @fnChildScrollYn="fnChildScrollYn"></search>
    <top-logo  @click="fnGoMovePage($event)" ></top-logo>
    <!-- <img width="160px" src = "../assets/images/logo_hanam.png" /> -->
  </div>
  <!-- <side-menu></side-menu> -->
</template>

<script>
export default {
  data() {},
  methods: {
    fnGoMovePage(event) {
      if(event){
          this.$router.push({ path: '/' })
      }

    },
    fnChildScrollYn(p_classBind){
       this.$emit('fnParentScrollYn', p_classBind);
       //this.$Store.commit('setScrollToggle')
    }
  }
}
</script>
<style>
.header{
  padding:20px 0 40px 0 ;
}
.header .search{
  float: left;
  padding : 15px 0 0 20px;
}
.header .top-logo{
  width:250px;
  float: left;
}

.top_log{
    right : 124px;
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
    top : 8px;
}   
</style>