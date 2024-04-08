<template>
  <div class ="header">    
    <div class="search"  @click="fnShowSearch($event)">
        <img width= "25px" src = "../assets/images/btn_cont.png"  />
    </div>    
    <top-logo  @click="fnGoMovePage($event)" ></top-logo>
    <search  ref="ShowSearch"></search>
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
    fnShowSearch(e){
      this.$refs.ShowSearch.fnShowSearch(e,true);
       //this.$emit('fnParentScrollYn', p_classBind);
       //this.$Store.commit('setScrollToggle')
    }
  }
}
</script>
<style scoped>
  .header{
    float: left;
    padding : 15px 0 0 20px;
    position: relative;
    z-index: 999;
  }
  .header .top-logo{
    width:250px;
    float: left;
  }
  .search{
    float: left;
    position:relative;
    top:15px;
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
  .item-class-exp{
      text-align: left;
  }  
</style>