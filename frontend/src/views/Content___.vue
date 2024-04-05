<template>

<div class="box" style="position: relative;" >
    <div v-for="(item ,index) in contents"  :key="index" :class="`parent_${index}`"  :style="item.offset">
        <div @click="switchAccordion(item ,$event)" ref="divs" :id="index" class="collapsible" :class="{active :item.isTrue}" 

        >{{item.title}} :: {{key}}</div>
        <div class="content" v-if="item.isTrue"  :style="{ height: item.contentHeight + 'px' }"
              :ref="getContentRef(item.id)"  >
                <p>{{item.msg}}</p>
            </div>
    </div>
    <!-- v-if="item.isTrue"     :style="{ height: item.contentHeight + 'px' }"  -->
</div> 
</template>

<script>
    export default {  
    data() {
        return {
            isShow:false ,
            isShow2:false,
            isOpen : false,
            setHeight : 0,
            activeIndex: 0,
            prevIndex: 0 ,
            divIndex: 0 ,
            preClickPos : 0,

            items: [
                { id: 1, content: 'A' },
                { id: 2, content: 'B' },
                { id: 3, content: 'C' }
            ],
            tempContHeight : [56, 112, 56] ,
            contentRefs: {} ,

            contents: [
                {
                    id : 0 ,
                    title: '가',
                    msg: 'I am fine thank you.',
                    isTrue : true,
                    setStyle : {
                        maxHeight : '65px'
                    },
                   // offset : {transform :  'translateY(0px)'},
                    offset : {top :  56} ,
                    contentHeight : 65
                    

                },
                {
                    id : 1 ,
                    title: '나',
                    msg: '2222222222222222222\n222222222222222222222222\n2222222222222222222222222\n2222222222222222',
                    isTrue : false,
                    setStyle : {
                        maxHeight : '0px'
                    },
                    offset : {top :  112},
                    contentHeight : 0
                },
                {
                    id : 2 ,
                    title: '다',
                    msg: '33333333333333',
                    isTrue : false,
                    setStyle : {
                        maxHeight : '0px'
                    },
                    offset : {top :  168},
                    contentHeight : 0
                },
            ],            
    }

    },
    created() {
      console.log("Parent mounted")
      this.fetchData(this.$route)

   
      
    },
    mounted(){
        // this.contents[0].contentHeight = 65
        // this.contents[1].contentHeight = 112
        // this.contents[2].contentHeight = 65
       // console.log(':::: 클릭한 clientHeight :::::' , this.contentRefs[1].clientHeight)


    }, 
    watch : {
        activeIndex : function(idx) {
            //this.contents[this.prevIndex].offset = {'top' : this.contents[idx].offsetY + 'px' }
            console.log( 'New msg prevIndex:::::: ' , idx )
          //.nextSibling.style = {maxHeight : 'auto'}
        },
    },
    methods: {

       updateContentHeight(item) {
        console.log('contentElement this.contentRefs', this.contentRefs)
            const contentElement = this.contentRefs[item.id];
            console.log('contentElement', contentElement)
            if (contentElement) {
                item.contentHeight = contentElement.scrollHeight;
            }
       } ,
       fetchData (params) {
        //console.log(11111111 ,params)
        //console.log('history.state: ', history.state)
       },
       switchAccordion(item ,e) {
        if(item.isTrue) return

        this.prevIndex = this.activeIndex
     
        const index = item.id

        item.isTrue = true //현재 메뉴 보이기
        this.contents[this.prevIndex].isTrue = false //이전 메뉴 숨김
    
        // this.contents[0].contentHeight = 0
        // this.contents[1].contentHeight = 0
        // this.contents[2].contentHeight = 0
      

        this.$nextTick(function() { 
            //console.log('클릭시 모든 오브젝트:::' , this.contentRefs)
            //console.log(index , '클릭한 오브젝트:::' , this.contentRefs[index])
            //console.log(':::: 클릭한 clientHeight :::::' , this.contentRefs[index].clientHeight)
            const v_contHeight =  this.tempContHeight[index] //this.contentRefs[index].clientHeight
           // this.contentRefs[index].nextSibling.style = {maxHeight : '0px'}
           //this.contentRefs[index].style.height = '112px'
            
            item.contentHeight = v_contHeight
           // item.contentHeight = v_contHeight
            console.log('::::refs 밀려난 div에 현재 Top을 가져와야 한다:::::' , v_contHeight)

          
            
            //const even = obj.filter(value => value.classList[1] != 'active');
            //console.log('filter ::  ', even);
           // const found = obj.find((element) => element.classList[1] === 'active');
            //console.log('found ::  ', found);



            const v_clientTop =  this.$refs.divs[this.prevIndex ].clientTop

            this.contents[index].offset = {'top' : '0px' }//클릭한건 맨위로 이동

            const obj = this.$refs.divs
            let v_idx = 1
            for (var key in obj) {
                //console.log(index ,'::::::' , key , obj[key]);
                //console.log(index ,'::::::' , key , obj[key].classList);
                if( obj[key].classList[1] != 'active'){
                    this.contents[key].contentHeight  = 0
                    //console.log(index ,'::::::' , key , obj[key]);
                    console.log(v_clientTop ,'::::::' ,  ((56* v_idx ) + v_clientTop + v_contHeight) );
                    this.contents[key].offset = {'top' : ((56* v_idx )  + v_clientTop + v_contHeight) + 'px'  }
                    // console.log(index ,'::::::'  , obj[key].nextSibling.style);
                    // obj[key].nextSibling.style = {maxHeight : '0px'}
                    v_idx++
                }else{
                    //obj[key].nextSibling.style = {height : 'auto'}
                    
                    console.log(':::contentRefs:::'  , this.contentRefs[key]);
                }

            }
      
            
            //this.contents[this.prevIndex].offset = {'top' : (56 + v_clientTop + v_contHeight) + 'px' }
            //this.contents[2].offset = {'top' : ((56*2) + v_clientTop + v_contHeight) + 'px' }

            // let temp = this.contents[index]
            // this.contents.splice(index , 1) //클릭한 인덱스 삭제
            // this.contents.splice(0, 0, temp) //start ,삭제갯수 ,오브젝트 지우지 말고 0번째에 추가
            // this.prevIndex = 0
 


            this.activeIndex = item.id; 
        });// end nextTick 

      
       }//end switchAccordion
    
    
        ,getContentRef(id) {
            console.log("getContentRef" ,id)
            return (el) => {
                this.contentRefs[id] = el;
            };
        }

    }//end method
};
</script>

<style scoped>

.box {
    transition: all 1s ease-in;
}
.content {
    padding: 0 18px;
    /* max-height: 0; */
    height: 0px;
    overflow: hidden;
    transition: height 0.4s ease-out;
    background-color: #f1f1f1;
}
.alternate{
    animation-duration:2s
}

.collapsible {
    background-color: #777;
    color: white;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
}
.active,
.collapsible:hover {
    background-color: #555;
}
.collapsible:after {
    content: '';
    color: white;
    font-weight: bold;
    float: right;
    margin-left: 5px;
}
.active:after {
    content: "";
}

.main_img{
    margin-top : 20px;
    display : inline-block;
}   
.main_slide{
    margin-top : 60px;
    width : 350px;
    display : inline-block;
}  

ul {
   cursor: pointer;
}

.parent_0{
    position: absolute;
    top:0px;
    width:100%;
}
.parent_1{
    position: absolute;
    top:112px;
    width:100%;
}
.parent_2{
    position: absolute;
    top:168px;
    width:100%;
}
</style>