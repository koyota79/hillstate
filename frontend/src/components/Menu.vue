<template>
  <div class="navbar_overlay" @click="fnNavbarClose($event)"></div>
  <div class="navbar_burger" @click="fnNavbarOpen($event)" >
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
    </svg>
  </div>
  <div class="navbar_menu">
    <a href="#" @click="fnLocationPage($event ,'/location')">위치/주차</a>
    <a href="#" @click="fnMovePage($event ,'site_map')" >층별 안내도</a>
    <a href="#" @click="fnMovePage($event ,'event')">이벤트</a>
    <a href="#" @click="fnMovePage($event ,'content')">CONTACT</a>
    <div class="navbar_burger_back" @click="fnNavbarClose($event)">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';

const navbarMenu    = ref(0);
const navbarOverlay = ref(1); 

export default {
  created () {
    this.$Store.commit('setFloor' , 2)
  },
  data() {},
    methods: {
      fnMovePage(event ,key) {
        //console.log(key)
        
        let p_url   = ""
        let p_setData = {};
        p_setData.id = "";
        p_setData.name = "test";

        switch (key) {
          case "site_map":
            p_url = "api/site_map"
            break;   
          case "event":
            p_url = "/event"
            break;  
          default:
            p_url = "/"
            break;
        }

        this.$Axios.get(p_url, p_setData)
        .then((response) => {
          console.log('response' , response);
          console.log(response.data);
          // 이름을 가지는 라우트
          //router.push({ name: 'Content', params: { userId: 123 }})

        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          console.log("항상 마지막에 실행");
          this.fnNavbarClose(event)
          this.$router.push({ path: key })
        });
      },
      fnLocationPage(event ,key) {
        console.log('event' ,event ,key )
        this.$router.push({ name: 'Location' })
        this.fnNavbarClose(event)
      },
      fnNavbarOpen(event) {
        navbarMenu.value = document.querySelector('.navbar_menu');
        navbarOverlay.value = document.querySelector('.navbar_overlay');
        if(event){
          navbarMenu.value.classList.toggle('active');
          navbarOverlay.value.classList.toggle('active');
        }
      },
      fnNavbarClose(event){
        if(event){
          navbarMenu.value.classList.remove('active');
          navbarOverlay.value.classList.remove('active'); 
        }
      }
    }//end method
}
</script>
<!-- 
<script setup>
  import { ref } from 'vue';

  const navbarMenu    = ref(0);
  const navbarOverlay = ref(1); 
  
  function fnNavbarOpen(event){
      navbarMenu.value = document.querySelector('.navbar_menu');
      navbarOverlay.value = document.querySelector('.navbar_overlay');
      if(event){
        navbarMenu.value.classList.toggle('active');
        navbarOverlay.value.classList.toggle('active');
      }
 }

 function fnNavbarClose (event) {
    if(event){
        navbarMenu.value.classList.remove('active');
        navbarOverlay.value.classList.remove('active'); 
    }
 }
</script> -->

<style>

/* 모바일 버전 입력*/
.navbar_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.1s ease;
}

.navbar_burger {
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  cursor: pointer;
  color: #000;
}

.navbar_burger_back {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  cursor: pointer;
  color: #000000;
}

.navbar_menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background-color: #ffffff;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  transform: translateX(100%);
  z-index: 999;
  color: #0e0e0e;
  transition: transform 0.3s ease;
}

.navbar_menu a {
  position: relative;
  color: #0a0000;
  font-size: 1.5rem;
  margin-left: 1rem;
  margin-bottom: 3rem;
  text-decoration: none;
}

.navbar_menu.active {
  transform: translateX(0);
}

.navbar_overlay.active {
  opacity: 1;
  pointer-events: auto;
}
</style>