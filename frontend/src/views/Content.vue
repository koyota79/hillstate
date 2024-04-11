<template>
<div style="margin-top:30px;"></div>
<div class="new-container"></div>
    <div class="box" >
        <ul>
            <li>
                <div class="new-shop"><h2>힐스테이트 헬스장</h2></div>
                <div class="cont-desc"> 
                    <p class="cont-desc-item1"><span>B1</span>헬스장 신규오픈</p>
                    <p class="cont-desc-item2">500평규모의 복합 헬스커뮤니티</p>
                </div>
            </li>
            <li>
                <div class="new-shop"><h2>힐스 카페</h2></div>
                <div class="cont-desc"> 
                    <p class="cont-desc-item1"><span>1F</span>카페 신규오픈</p>
                    <p class="cont-desc-item2">아기자기한 디저트 카페</p>
                </div>
            </li>            
        </ul>
    </div> 
</template>

<script>
   
</script>

<style scoped>
    .new-container{
        padding:10px;
    }
    .box{
        position: relative;
        margin:0;
        padding:0;
    }
    .new-shop{
        border: 1px solid #b9b9b9; 
        border-radius: 5px;
        height: 150px;
        align-content: center;
        font-weight: bold;
    }
    .cont-desc-item1{
        font-weight: bold;
        font-size:15px;
    }
    .cont-desc-item2{
        font-size:13px;
    }
    .box ul {
        display: inline-block;
        padding:0px;
        width:80%;
    }
    ul{
        list-style: none outside;
    }
    li{
        margin-bottom:50px;
    }
</style>