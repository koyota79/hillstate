<template>
  <div class ="header">    
    <div class="search">
        <img v-show="v_classActive" width= "25px" src = "../assets/images/btn_cont.png"  @click="fnShowSearch($event)" />
        <div v-show="v_classActive =! v_classActive" class="arrow-prev"  @click="fnRouterBack()"></div>
    </div>    
    <a href="#none" @click="fnGoMovePage($event)" ><top-logo></top-logo></a>
    <search  ref="r_showSearch"></search>
    <!-- <img width="160px" src = "../assets/images/logo_hanam.png" /> -->
  </div>
  <!-- <side-menu></side-menu> -->
</template>

<script setup>
  import { ref, onMounted ,watch  } from 'vue'
  import { useRoute ,useRouter} from 'vue-router'
  let url = history.state.current
  let v_classActive =  url.search('/shop_info')==0?false:true
  //console.log('::watch:::::::::::::::' ,url , url.search('/shop_info')==0?false:true)
  const router = useRouter()
  const route  = useRoute()

  function fnGoMovePage(e) {    
    if(e){
      router.push({ path: '/'})
    }
  }

  const r_showSearch = ref(null)
  function fnShowSearch(e){
    r_showSearch.value.fnChildShowSearch(e, true)
      //this.$emit('fnParentScrollYn', p_classBind);
      //this.$Store.commit('setScrollToggle')
  } 


  function fnRouterBack(){
    router.go(-1)
  }

  // watch(history.state.current, (newX, newY) => {
  //       console.log('::watch:::::::::::::::' ,newX , newY)
  // })
  onMounted(() => {
    //console.log('route' , route.name)

    const v_hidden = document.getElementsByTagName('body')
    if(route.name != 'MapSearch'){
      if(v_hidden[0]){
        v_hidden[0].classList.remove('hidden')
      }
    }

  });

  // onUnmounted(() => {  
  //    console.log('onUnmounted')
  //     store.commit('setSearchIcon' ,false)
  // })//end mounted

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
    width:40px;
  }
  .search div{
    float: left;
    position:relative;
    top:5px;
    left:15px;
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
    top: 35px;
    content: '';
    width: 15px; /* 사이즈 */
    height: 15px; /* 사이즈 */
    border-top: 2px solid #000; /* 선 두께 */
    border-right: 2px solid #000; /* 선 두께 */
    transform: rotate(225deg); /* 각도 */
  }
</style>