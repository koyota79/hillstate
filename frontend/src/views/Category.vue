<template>
    <div class="category-container">
        <div><h2>{{v_selected}}</h2></div>
        <div class="category-list"> 
            <div  v-for="(item, key) in v_categoryObj"  :key="key" @click="fnCategoryClick(item.id)" >
                {{item.value}}
            </div>
        </div>
        <div class="category-info">
            매장안내
        </div>
        <div class="shop-list">
            <div class="shop-list-item" v-for="(item, key) in v_shop_list"  :key="key" >
                <div  @click="fnShopDetail($event ,item)" >{{item.shop_nm}}</div>
                <p> {{v_position[item.position_area]}} / {{item.position}}F</p>
            </div>
        </div>
        <!-- <select v-model="selected" class="category-select"  >
            <option
                v-for="(item, index) in categoryList"
                :key="index"
                :value="item.value">
                {{ item.name }}
            </option>
        </select> -->
    </div>


</template>

<script setup>
    import { ref, onMounted ,inject  ,watch  } from 'vue'
    import { useRoute ,useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    const store = useStore()

    //카테고리 
    const route         = useRoute()
    const v_position    = inject('Zone')//구역
    const v_categoryObj = inject('Category')
    let category        = route.params.id
    
    //배열을 오브젝트로 변환
    const categoryReduce = v_categoryObj.reduce(function(object, v) {
        object[v.id] = v.value;
    return object;
    }, {})

    //카테고리 선택
    let v_selected = categoryReduce[category]

    // let categorySelected = v_categoryObj.filter(function(v){
    //  return v.id == category
    // })
    //let v_selected = ref(categorySelected[0].value)
    //let v_categoryArry = categoryObj.map((item) => ({ ...item}));
    //console.log('object' ,categoryReduce )
 


    //매장안내
    let Axios           = inject('Axios')
    let v_shop_list     = ref([])
    const arryList      = []
    onMounted(async () => {
        try{
            const res = await Axios.get('/api/site_map');
            arryList.value = res.data['shop_map_list'];            
            if(arryList.value == undefined)
                throw new Error("response null");           
            fnCategoryClick(category)     
        }catch(err){
            console.log(err)
        }
    });

    //카테고리 선택 상점
    function fnCategoryClick(p_category){
        v_selected = categoryReduce[p_category]
        v_shop_list.value = arryList.value.filter(function(v){
            if(p_category=='ALL')
                return arryList.value

            return v.category == p_category
        })
    }

    // watch(v_shop_list, ([newX, newY]) => {
    //     console.log(':::' ,newX , newY)
    // })


    //매장클릭
    const router = useRouter()
    function fnShopDetail(event ,item) {
       if(event){
            store.commit('setSearchIcon' ,false)
            router.push({ path: "/shop_info" ,name : "ShopDetail" 
             ,params : {shop_id : item.shop_id } 
             ,state: { //url 에서 안보이게 처리
                name: 'shop_id',
                shop_id: item.shop_id ,
                shop_nm: item.shop_nm
              }
            }) 
       }
    }

</script>


<style scoped>
.category-container{
    position: relative;
    align-content :center;
    width:100%;
}
.category-container h2{
    width:91%;
    height:70px;
    border:1px solid #dbdada;
    align-content:center;
    display: inline-block;
    border-radius:3px;
}
.category-list{
    display:flex;
    margin-left:20px;
    flex-wrap:wrap;
}
.category-list div{
    padding:10px;
    border:1px solid #dbdada;
    width:80px;
    font-size:12px;
    margin:5px;
}
.category-info{
    margin:15px;
    border-bottom:1px solid #dbdada;
    padding : 15px;
    font-weight: bold;
}.shop-list{
    display:flex;
    flex-wrap:wrap; 
    justify-content: flex-start;
    margin:0 auto 20px 5%;
    column-gap:1em;
}
.shop-list-item{
    padding:10px;
    border:1px solid #dbdada;
    width:calc(40%);
    font-size:12px;
    height:60px;
    align-content:center;
    border-radius:5px;
    margin-bottom:45px;
}
.shop-list-item div{
    position:relative;
    top:20px;
    font-weight: bold;
}

.shop-list-item p{
    position:relative;
    top:80%;
}

</style>