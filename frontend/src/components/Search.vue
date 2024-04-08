<template>
    <div>
    <div class="searchbar"  :class="{ active: isActive}">
        <div class="arrow-prev" @click="fnShowSearch($event , false)"> </div>
        <div style="position: static;">
            <!-- <div class="input-type" ><input style="width:240px;height: 25px;" v-model="message" placeholder="검색어를 입력하세요"></div> -->

            <div class="autocomplete">
                <Autocomplete
                    @input="getItems"
                    :results="items"
                    placeholder="검색어를 입력하세요"
                    style="width:100%;height: 25px;"
                    ref="auto_ref" 
                    results-item-class="vue3-results-item item-class-exp"
                    @onSelect="clickItem"
                ></Autocomplete>
                <!-- :resultsItemClass="resultsItemClass" 부모 페이지에서 수정해야 함 -->
            </div>
            <div style="position: relative;top:55px;">
                <div class="recommend">
                    추천 검색어
                </div>
                <div style="position: relative ;top:35px;left:25px;display: -webkit-box;">
                    <p class="recommend_text" >다이소</p>
                    <p class="recommend_text">시네큐</p>
                    <p class="recommend_text">신명부동산</p>
                    <input type="hidden" ref="recommend_ref" >
                </div>
            </div>
            <div>
                <div class="search-category-title">
                    매장 카테고리
                </div>
                <div style="position: relative;padding:30px;">
                    <div class="search-category">
                        <p class="recommend_text" @click="fnCategoryPageMove($event ,'ALL')">전체</p>
                        <p class="recommend_text" @click="fnCategoryPageMove($event ,'FOOD')">식당/카페</p>
                        <p class="recommend_text" @click="fnCategoryPageMove($event ,'BEAUTY')">뷰티</p>
                        <p class="recommend_text" @click="fnCategoryPageMove($event ,'SHOP')">쇼핑</p>
                        <p class="recommend_text" @click="fnCategoryPageMove($event ,'SERVICE')">문화/서비스</p>
                    </div>
                </div>
            </div>
            <!-- <div class="border_line">
            </div> -->
            <!-- <img width="350px" src="../assets/images/choice_tag.png" /> -->
            <!-- <div class="search_menu">
                <div class="menu_text"  @click="fnMovePage($event ,'site_map')">
                    층별안내
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
            </div> -->
            <div class="search-menu-list">
                <ul style="margin:0;padding:0;">
                    <li @click="fnMovePage($event ,'Site_map')" class="search-menu_sub"><div>층별안내</div></li>
                    <li @click="fnMovePage($event ,'Location')" class="search-menu_sub" style="border-right:none;"><div>위치/주차</div></li>
                    <li @click="fnMovePage($event ,'Event')" class="search-menu_sub" style="border-bottom:none;border-top:none;"><div>이벤트</div></li>
                    <li @click="fnMovePage($event ,'Content')" class="search-menu_sub" style="border-right:none;border-bottom:none;border-top:none;"><div>신규오픈</div></li>
                </ul>                
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
                items: [],
                items_arry : ['다이소','다이슨','다날','다와서','샌드하우스','거북이한의원','다나와','신명부동산','센느','고민정헤어'] ,
                textDecoration : {},
                body : {},
                setText : '',
                focusout : true
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
                    this.items = []
                }else{
                    this.body.classList.remove('hidden');
                    this.$refs.auto_ref.searchText = ''
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
                this.body.classList.remove('hidden');
                //this.$router.push({ path: key })
                this.$router.push({name : key})
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
                    if(query.length > 0 ) {
                        this.items = query
                    }else{
                        this.items = ["해당 검색조건이 없습니다."]
                    } 

                }else{
                    this.items = []
                }
            
            },
            clickItem (text) {
                console.log('::clickItem::',text)
                this.$refs.auto_ref.searchText = text
               // this.$nextTick(() => this.$refs.recommend_ref.focus())

            },
            fnCategoryPageMove(event ,key){
                this.body.classList.remove('hidden');
                this.$router.push({ name: 'Category' ,params: {'id': key}})  
            }

        }
  
    };
</script>

<style scoped>
.results-item-class{
    text-align: left;
    font-weight: bold;
    width:100%;
}
.search_menu{
    position: relative;
    float: left;
    top:135px;
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
    border: 1px solid #EAEBEA;
    border-radius: 4px;
    padding: 5px;
    margin:5px;
}
.border_line {
    border: 1px solid #EAEBEA;
    width:90%;
    top:120px;
    position: relative;
    left : 15px;
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
.search-menu-list{
    position:relative;
    top:135px;
}
.search-menu_sub{
    position: relative;
    display: inline-block;
    width:47%; 
    text-align :center;
    height:150px;
    border:1px solid #cdcdcd;
    border-left : none;
    align-content:center;
    font-weight:bold;
 }
 .search-category-title{
    position: relative;
    top:115px;
    font-weight:bold;
 }
 .search-category{
    position:relative;
    display: flex;
    flex-flow:wrap;
    top:105px; 
 }

 .search-category p{
    font-weight:bold;
    width:80px;
    height:30px;
    align-content:center;
 }

 
 @media (max-width: 360px){
    .search-category p{
        font-weight:bold;
        width:75px;
        height:25px;
        align-content:center;
    }    
  }

</style>