<template>
   <div class="loading-wrap">
      <!-- <div class="loading-spinner"></div> -->

      <div class="loading-spinner2">
        <svg version="1.1" id="layer_1"  class="spinner" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
	      y="0px" viewBox="0 0 550 120"  xml:space="preserve">
              <g>
                <g>
                    <path class="st6" d="M127.8,81.2c-2.5,5.7-2.3,8.5,0.9,10.9c0.1,0,5.2,3.7,7.2,5.2c1.4,1.1,3.4,1.2,3.8-0.7
                    c5.6-26.4,26-66.4,49.7-72.3c1-0.2,0.9-1.5-0.3-1.4c-10.6,0.4-22,5.4-30.6,12.8c-11.2,9.7-20.8,26.4-20.8,26.4
                    c-3.6-6.1-9.3-10.2-9.3-10.2s9.8-14.9,12.6-18.5c4.1-5.2,8-7.8,11.8-9.2c1-0.4,0.7-1.5-0.3-1.4c-2.7,0.3-8.4,1.4-12.4,3.4
                    c-4.1,2.1-10.9,5-21.3,20.1c-6.6-2.8-12.5-3.3-12.5-3.3c-1.3-5-6.5-7.1-14.9-7.1c-5.5,0-13.5,1-22.1,5.1
                    c-1-3.9,1-10.5,12.8-16c5.4-2.6,22-11.1,55.6-11.1c12.9,0,26.5,2.2,30.6,3.1c1.2,0.2,1.4-1.1,0.5-1.4
                    c-3.9-1.3-22.9-6.2-43.6-6.2c-23.2,0-46.1,6.4-55,19.2c-2.1,3-4.8,8.4-3.1,13.6C48.1,53,37.9,74,45.6,86.9
                    C49.3,93,55.8,96,64.7,96c29.5,0,46.9-19,60.4-39.2c0,0,4.4,5,7.9,13.7C133,70.5,130.4,75.5,127.8,81.2z M94.8,38.9
                    c3.4,0,8.3,0.7,9.4,4c-13.1-0.7-25.4,4.6-32.5,10.4C64.1,59.6,60.3,65.9,59.3,71c-1.2,5.8,1.2,11,9.2,10.9
                    c10.2,0,24.3-9.8,33-22.6c3.3-4.8,4.9-9.1,5.2-14c0,0,4.6,0.3,10.1,3.9l-7.2,9.6c-15.2,19.9-27,31.7-47.4,33.4
                    C45,93.6,41.8,75.7,56.5,58.9C67.2,46.6,83,38.9,94.8,38.9z M61.4,74.9c1.1-6.6,13.3-17.3,17.9-20.5c7-4.9,16.7-9.2,25.1-9.3
                    c-0.2,3.9-4.5,11.1-15.2,20.6c-12.9,11.5-20,13.8-23.7,13.8C63.4,79.5,60.9,78.2,61.4,74.9z"/>
                </g>
              </g>
      </svg>
      </div>
    </div>
</template>

<script setup>
</script>
<style scoped>

.st0{fill:none;stroke:#009EE2;stroke-width:0.25;stroke-miterlimit:10;}
.st1{fill:none;stroke:#009EE2;stroke-width:0.25;stroke-miterlimit:10;stroke-dasharray:2.0071,2.0071;}
.st2{fill:none;stroke:#009EE2;stroke-width:0.25;stroke-miterlimit:10;stroke-dasharray:2.014,2.014;}
.st3{fill:#009EE2;}
.st4{font-family:'Roboto-Medium';}
.st5{font-size:6.9724px;}
.st6{fill:#A00E15;}

 .loading-wrap {
    display: flex;
    /* flex-direction: column;
    align-items: center;
    justify-content: center; */

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
.loading-spinner2 {
    position: fixed;
    top: calc(45%);
    left: calc(38%);
    width:70%;
}
svg.spinner {
  animation: 2s linear infinite svg-animation;
}
@keyframes svg-animation {
  0%, 50%,100% {
    opacity: 0;
  }
  30% ,70% {
    opacity: 1;
  }
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