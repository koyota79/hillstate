<template>
    <div class="search">
      <img width= "25px" src = "../assets/images/btn_cont.png" @click="fnShowSearch($event ,true)" />
    </div>
    <div class="searchbar"  :class="{ active: isActive}">
        <div style="position: static;">
            <div class="arrow-prev" @click="fnShowSearch($event , false)">
            </div>
            <!-- <div class="input-type" ><input style="width:240px;height: 25px;" v-model="message" placeholder="검색어를 입력하세요"></div> -->

            <div class="autocomplete">
                <Autocomplete
                    @input="getItems"
                    :results="items"
                    placeholder="검색어를 입력하세요"
                    style="width:100%;height: 25px;"
                    ref="auto_ref" 
                ></Autocomplete>
                <!-- resultsItemClass="resultsItemClass" -->
            </div>
            <div style="position: relative;top:155px;">
                <div class="recommend">
                    추천 검색어
                </div>
                <div style="position: relative ;top:35px;left:25px;display: -webkit-box;">
                    <p class="recommend_text">다이소</p>
                    <p class="recommend_text">시네큐</p>
                    <p class="recommend_text">신명부동산</p>
                </div>
            </div>

            <div class="border_line">
            <!-- <img width="350px" src="../assets/images/choice_tag.png" /> -->
            </div>
            <div class="search_menu">
                <div class="menu_text"  @click="fnMovePage($event ,'site_map')">
                    층별안내도
                </div>
                <div class="menu_text" @click="fnLocationPage($event ,'/location')">
                    위치/주차
                </div>
                <div class="menu_text" @click="fnMovePage($event ,'event')">
                    이벤트
                </div>
                <div class="menu_text" @click="fnMovePage($event ,'content')">
                    TEST
                </div>
            </div>


        </div>
        
    </div>
</template>

<script>
    import Autocomplete from 'vue3-autocomplete'
    // Optional: Import default CSS
    import 'vue3-autocomplete/dist/vue3-autocomplete.css'

    export default {
        components: {
            Autocomplete,
        },
        data() {
            return {
                isActive : false ,//검색 페이지 
                item: {id: 9, name: 'Lion', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
                items: ['다이소','다이슨'],
                items_arry : ['다이소','다이슨','다날','다와서','샌드하우스','거북이한의원','다나와'] ,
                textDecoration : {},
                body : {}
            }

        },
        created() {
            //console.log("Parent mounted")
            //this.fetchData(this.$route)
             //navbarMenu.value = document.querySelector('.navbar_menu');
        },    
        mounted(){
            //console.log('results')
            //console.log(document.querySelector('.vue3-results-item'))
            let itemClass =  document.querySelector(".vue3-results-item")
            //console.log(this.$refs.auto_ref )
            //itemClass.style.textAlign = "left"
            this.body =  document.querySelector('body')
            
        },
        watch : {
            isActive(active) {
                console.log('active' , active)
                //window.scrollTo(0, 0);
                if(active){
                    this.body.classList.add('hidden');
                }else{
                    this.body.classList.remove('hidden');
                }
            }
        },
        methods: {
            fetchData (params) {
                //console.log(11111111 ,params)
                //console.log('history.state: ', history.state)
            },

            fnMovePage(event ,key) {
                //console.log(key)
                
                let p_url   = ""
                let p_setData = {};
                p_setData.id = "";
                p_setData.name = "test";

                switch (key) {
                case "site_map":
                    p_url = "api/site_map/2"
                    break;   
                case "event":
                    p_url = "/event"
                    break;  
                default:
                    p_url = "/"
                    break;
                }
                console.log(p_setData)
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
                    this.body.classList.remove('hidden');
                    this.$router.push({ path: key })
                });
            },
            fnLocationPage(event ,key) {
                console.log('event' ,event ,key )
                this.body.classList.remove('hidden');
                this.$router.push({ name: 'Location' })
            },
            fnShowSearch(event ,isTrue){
                if(event){
                    this.isActive =  isTrue  
                   // this.$emit('fnChildScrollYn', isTrue);
                }
            },
            getItems (item) {
                //this.$refs.auto_ref.$el.classList.add('auto_class_item');

                if(item.length > 0) {
                    let query = this.items_arry.filter((obj) => {
                        return obj.indexOf(item) >= 0
                    })  
                    console.log(query)
                    if(query.length > 0 )   
                        this.items = query

                }else{
                    this.items = []
                }
            
            },
            updateItems (text) {
                yourGetItemsMethod(text).then( (response) => {
                    this.items = response
                })
            }
        }
  
    };
</script>

<style scoped>
.search_menu{
    position: relative;
    float: left;
    top:235px;
    left:25px;
}
.menu_text{
    width:102px;
    height: 50px;
    float: left;
    font-weight: bold;
    padding: 15px;
}
.recommend{
    position: relative;
    top : 15px;
    width : 125px;
    font-size: 14px;
    font-weight: bold;
}
.recommend_text{
    font-size: 13px;
    border: 1px solid #c1baba;
    border-radius: 4px;
    padding: 5px;
    margin:5px;
}
.border_line {
    border: 0.5px solid #c1baba;
    width:90%;
    top:215px;
    position: relative;
    left : 15px;
}
.vue3-results-container {
    text-align: left !important;
}
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
.searchbar {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    transform: translateX(100%);
    z-index: 999;
    color: #0e0e0e;
    transition: transform 0.3s ease;
}
.searchbar.active {
    transform: translateX(0);
}

.searchbar_back {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    cursor: pointer;
    color: #000000;
}
.arrow-prev {
    position: absolute;
    left: 15px; 
    top: 35px;
    content: '';
    width: 15px; /* 사이즈 */
    height: 15px; /* 사이즈 */
    border-top: 2px solid #000; /* 선 두께 */
    border-right: 2px solid #000; /* 선 두께 */
    transform: rotate(225deg); /* 각도 */
}
.autocomplete {
    position: relative;
    top:35px;
    left:55px;
    width:77%;
}
.resultsItemClass {
    text-align: left;
    border-bottom : 1px solid #000;
    padding : 5px;
    list-style-type : none;
}
</style>