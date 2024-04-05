<template>
    <Header></Header>
    <router-view></router-view>
</template>

<script>

import Header from './Header'

export default {
  components: {
    Header
  }
}
</script>