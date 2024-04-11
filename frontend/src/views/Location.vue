<template>
    <div class="location-container">
        <div class="location">
            <img style="width:350px;" src="../assets/images/parking_img.png"  />
        </div>

        <div class="parking-way">
            <h3>주차 진입로</h3>
            <div>- 파란색 선으로 이동하여 주차장 입구로 진입</div>
            <div>- 도농역 또는 남양주 경찰서 방향에서 올경우에도 파란색 진입로 방향으로 이동하여 주차장 입구로 진입</div>
        </div>
        
        <div class="parking-way">
            <h3>주차 요금</h3>
            <div>- 10분이내 출차시 무료</div>
            <div>- 10분당 1500원</div>
            <div>- 1일주차 최고50,000원 최대 5시간</div>
            <div>- 최초30분 무료(초과시 10분당 1500원)</div>
        </div>       

        <div class="parking-way">
            <h3>주요 매장 할인</h3>
            <div>- 카페 판매시설 1시간 무료</div>
            <div>- 영화관 3시간 무료</div>
            <div>- 무료 주차시간 합산 불가</div>
        </div>
    </div>
    <div style="margin-top: 50px;"></div>
    <!-- <div>
        <img style="width:350px;" :src="this.location_cont"  />
    </div> -->
</template>

<script>
    export default {
        data() {
        return {
            location_img : require("../assets/images/location.png") ,
            location_cont : require("../assets/images/location_cont.jpg") 
    }

    },
    created() {
      console.log("Parent mounted")
      this.fetchData(this.$route)
      
    },    
    methods: {
       fetchData (params) {
        //console.log(11111111 ,params)
        console.log('history.state: ', history.state)
       }
    }
  
    };
</script>

<style scoped>
    .content{
        top : 100px;
    }
    .parking-way{
        margin: 30px;
        float: left;
        text-align:left;
    }
    .parking-way div{
        font-size:13px;
    }
</style>