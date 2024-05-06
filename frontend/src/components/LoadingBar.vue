<template>
   <div class="loading-wrap">
      <div class="loading-spinner"></div>
    </div>
</template>

<script setup>
</script>
<style scoped>
 .loading-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #fbfbfb;
    position: fixed;
    top:0;
    z-index: 9;
}
.loading-spinner {
    width: 40px;
    height: 40px;
    border: 5px solid #3498db;
    border-top: 5px solid transparent;
    border-radius: 50%;
    animation: rotate 1s linear infinite;
}
@keyframes rotate {
from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}
}
</style>