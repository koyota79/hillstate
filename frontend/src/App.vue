<template>
  <div id="app">
    <head>

      <meta content="yes" name="apple-mobile-web-app-capable" />  
      <meta content="minimum-scale=1.0, width=device-width, maximum-scale=1, user-scalable=no" name="viewport" />
    </head>
    <body>
      <!-- uri에 따라 해당 컴포넌트가 router-view를 대신함 -->
      <!-- <router-view  name="Header"></router-view> -->
      <div class="container clearfix">
        <router-view :key="$route.fullPath"></router-view>
      </div>
        
    </body>
  </div>
</template>
<script setup>
</script>
<style>
  /* 반응형 최대크기 */
  #app { margin:0 auto; width:468px; min-height:100%; border-left:1px #D8D8D8 solid; border-right:1px #D8D8D8 solid; text-align:center; }

  /* 여백제거 + 드래그방지 */
  body{ overflow-x: hidden; padding:0; margin:0; -ms-user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; user-select: none; }

  /* 반응형 시작 */
  @media all and (max-width:468px){
    #app{ width:100%;}
    
  }

  .container {
      background-color: rgb(254, 254, 254);
      width:100%;
      min-Height: 100vh;
  }



  .clearfix:after {
    clear: both;
    content: " ";
    display: table;
  } 
  .hidden {height:100%; min-height:100%; overflow:hidden !important; touch-action:none;}
</style>