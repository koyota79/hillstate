<template>
    <!-- <div class="floor_top"><b>층별 안내</b></div> -->
    <div class="floor_parent">
       <div class="floor_top"><b>층별안내</b></div> 
       <div class="floor_navi" @click="fnSelectFloor($event ,'0')" :class="{ floor_navi_a : isBtnSelected[0]}"><p>B1</p></div>
       <div class="floor_navi" @click="fnSelectFloor($event ,'1')" :class="{ floor_navi_a : isBtnSelected[1]}"><p>1F</p></div>
       <div class="floor_navi" @click="fnSelectFloor($event ,'2')" :class="{ floor_navi_a : isBtnSelected[2]}"><p>2F</p></div>
       <div class="floor_navi" @click="fnSelectFloor($event ,'3')" :class="{ floor_navi_a : isBtnSelected[3]}"><p>3F</p></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                setFloorIdx : 2 ,
                isBtnSelected :[false,false,false,false] ,
                items:[
                {
                    id:1,
                    image:'https://picsum.photos/210/118/?image=1',
                    title:'3F'
                    }
                ]
            }

        },
        created() {
            //this.fetchData(history.state)
            console.log('created123' ,this.$Store) 
            
        },
        mounted() {
           console.log('index' , this.$Store.state.idx)
           this.setFloorIdx = this.$Store.state.idx
           this.isBtnSelected[this.$Store.state.idx] = true
        },    
        methods: {
            fnSelectFloor(event ,idx) {
                if(event){
                    this.$Store.commit('setFloor' , idx)
                    //this.$router.push({ path: '/site_map' , replace: true })
                    this.isBtnSelected[this.setFloorIdx] = false
                    this.setFloorIdx = idx //이전 층별 선택
                    this.isBtnSelected[idx] = true //현재 층별 선택
                    this.$parent.fnChangeFloor(this.setFloorIdx)
                }
            }
        }
    }
</script>
<style>
.floor_top {
    background-color: #d6d6d4; 
    padding : 10px;
    margin-top:15px;
    font-size :13px;
}
.floor_parent {
    background-color: #d6d6d4; 
    display: flex;
    margin-bottom : 20px;
}

.floor_navi {
    border : 1px solid #9c9696;;
    margin: 10px;
    padding-left: 10px;
    padding-right: 10px;    
    width:25px;
}
.floor_navi_a {
    border : 1px solid #403d3d;;
    background: #A00E15;
    color : white;
    font-weight : bold;
}
</style>