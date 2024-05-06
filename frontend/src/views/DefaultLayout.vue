<template>
    <Header></Header>
    <router-view @toggle-loading="setLoadingToggle"></router-view>
    <loadingBar  v-if="r_loading" ></loadingBar>
</template>

<script setup>

import Header from './Header'
import { ref } from 'vue'
let r_loading = ref(false)

function setLoadingToggle(isTrue){
  console.log('setLoadingToggle' , isTrue)
  r_loading.value = isTrue
}

</script>