<template>
  <div class ="header">    
    <div class="search">
        <img v-if="v_classActive" width= "25px" src = "../assets/images/btn_cont.png"  @click="fnShowSearch($event)" />
        <div v-else class="arrow-prev"  @click="fnRouterBack()"></div>
    </div>    
    <top-logo  @click="fnGoMovePage($event)" ></top-logo>
    <search  ref="v_showSearch"></search>
    <!-- <img width="160px" src = "../assets/images/logo_hanam.png" /> -->
  </div>
  <!-- <side-menu></side-menu> -->
</template>

<script setup>
  import { ref, onMounted ,inject  ,watch  } from 'vue'
  import { useRoute ,useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  const store = useStore()

  let v_classActive = store.state.searchIcon
  const router = useRouter()
  
  function fnGoMovePage(event) {      
    if(event){
      router.push({ path: '/' })
    }

  }

  const v_showSearch = ref(null)
  function fnShowSearch(e){
    v_showSearch.value.fnShowSearch(e, true)
      //this.$emit('fnParentScrollYn', p_classBind);
      //this.$Store.commit('setScrollToggle')
  } 

  // watch(v_classActive, ([newX, newY]) => {
  //     console.log(':::' ,newX , newY)
  // })

  function fnRouterBack(){
    store.commit('setSearchIcon' ,true)
    router.go(-1)
  }

  onMounted(() => {
    v_classActive = store.state.searchIcon
    console.log('store.state.searchIcon22222' , v_classActive)
  });

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
  .search div{
    float: left;
    position:relative;
    top:5px;
    left:5px;
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

  .arrow-prev {
    position: absolute;
    left: 15px; 
    top: 35px;
    content: '';
    width: 15px; /* 사이즈 */
    height: 15px; /* 사이즈 */
    border-top: 2px solid #000; /* 선 두께 */
    border-right: 2px solid #000; /* 선 두께 */
    transform: rotate(225deg); /* 각도 */
  }
</style>