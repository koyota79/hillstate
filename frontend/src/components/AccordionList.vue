<template>

    <div style="margin-top:30px;"></div>
    <div class="box" style="position: relative;" >
        <div v-for="(item ,index) in contents"  :style="item.offset" :key="index" class="collapsible" :class="[{active :item.isActive }, `menu_${index}`]" :ref="getContentRef(item.id)" >
                <div @click="switchAccordion(item ,$event)" ref="divs" :id="index" class="collapsible_hover" style="padding-bottom:10px" >
                    {{item.title}}
                </div>
                <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave" >
                        <div class="content " :class="`content_${index}`" v-if="item.isActive">
                            <div class="grid-container">
                                <div  v-for="(shopObj ,s_index) in item.shop_list" :key="index" class="grid-item"  @click="selectedShop($event , shopObj)" >
                                    {{shopObj.shop_nm}}
                                </div>
                            </div>
                        </div>
                </transition>
        </div>
    </div> 
    </template>
    
    <script>
        export default {  
        props: ['floorIdx', ],
        data() {
            return {
                isOpen : false,
                disabled: false,
                activeIndex: 0,
                prevIndex: 0 ,
                contentRefs: {} ,
                contents: [
                    {
                        id : 0 ,
                        title: '가',
                        shop_list: [{id :0 ,shop_nm : 'TEST'}],
                        isActive : true,
                        offset : {top :  56} ,
                        contentHeight : 65
                    },
                    {
                        id : 1 ,
                        title: '나',
                        shop_list : [] ,
                        isActive : false,
                        offset : {top :  112},
                        contentHeight : 0
                    },
                    {
                        id : 2 ,
                        title: '다',
                        shop_list: [],
                        isActive : false,
                        offset : {top :  168},
                        contentHeight : 0
                    },
                    {
                        id : 3 ,
                        title: '라',
                        shop_list: [],
                        isActive : false,
                        offset : {top :  224},
                        contentHeight : 0
                    },
                ],            
        }
    
        },
        created() {
            console.log("Parent mounted floorIdx" ,this.floorIdx)
            //this.props.floorIdx ='2'
            console.log(this.floorIdx==undefined?2:this.floorIdx)
            
            //this.fetchData(this.$route)
            let p_url   = "api/site_map/"+this.floorIdx 
            this.$Axios.get(p_url ,{})
            .then((response) => {
                console.log(response);
                //console.log(response.data);
                const v_list = response.data["shop_map_list"]
                for(var k = 0; k < this.contents.length; k++){
                    var v_tempArry = []
                    for (var i = 0 ;i < v_list.length; i++) {
                        if(k == v_list[i].position_area)//지역 위치와 같은 포지션만 세팅
                            v_tempArry.push(v_list[i])
                    }//end if
                    this.contents[k].shop_list  = v_tempArry 
                }//end if
                //console.log(v_posArray)
            }).catch((error) => {
                console.log(error);
            })
          
        },
        mounted(){
            //console.log(':::: 클릭한 clientHeight :::::' , this.contentRefs[1].clientHeight)
        }, 
        watch : {
            activeIndex : function(idx) {
                //this.contents[this.prevIndex].offset = {'top' : this.contents[idx].offsetY + 'px' }
                console.log( 'New msg prevIndex:::::: ' , idx )
                
    
            },
        },
        methods: {
            selectedShop (event ,shopInfo){
                    console.log(shopInfo)
            },
            switchAccordion(item ,e ,index= item.id) { 
                if(item.isActive || this.disabled) return
                //중복클릭방지
                this.disabled = true
                this.timeout = setTimeout(() => {this.disabled = false;}, 700);

                item.isActive = true //현재 메뉴 보이기
                this.prevIndex = this.activeIndex
                this.activeIndex = index
                this.contents[this.prevIndex].isActive = false //이전 메뉴 숨김
                let v_zoneHeight = this.contentRefs[index].clientHeight //구역 존 높이값
                this.contents[index].offset = {'top' : '0px' , 'position' : 'absolute'}//구역 존 상단으로 이동
    
                this.$nextTick(function() { 
                    let v_contHeight = 0
                    let v_idx = 1
                    const obj = this.$refs.divs
                    v_contHeight =  this.contents[index].contentHeight //상점 메뉴 높이값
                    for (var key in obj) {
                      
                        //console.log(obj[key].className )
                      
                        if( obj[key].className != 'active'  && index != key ){
                          
                            //console.log('::::::' ,  (obj[key]) );
                            this.contents[key].offset = {'top' : ((v_zoneHeight * v_idx )  + v_contHeight) + 'px' , 'position' : 'absolute'  }
                            // console.log(index ,'::::::'  , obj[key].nextSibling.style);
                            // obj[key].nextSibling.style = {maxHeight : '0px'}
                            v_idx++
                        }
    
                    }
                    //this.contents[index].offset = {'top' : '0px' }//클릭한건 맨위로 이동

          
                })
    
    
          
            },
            enter(el) {
                el.style.height = 'auto';
                const endHeight = getComputedStyle(el).height;//스크립트 내장함수
                el.style.height = '0';
                el.offsetHeight; // force repaint
                el.style.height = endHeight;
                console.log('el.style' ,  getComputedStyle(el).padding)
                this.contents[this.activeIndex].contentHeight  = parseInt(endHeight.replace('px',''))+30 //padding 15
            },
            afterEnter(el) {
                el.style.height = 'auto';
            },
            leave(el) {
                //el.style.height = getComputedStyle(el).height;
                el.offsetHeight; // force repaint
                el.style.height = '0';
            }
        
            ,getContentRef(id) {
                return (el) => {
                    this.contentRefs[id] = el;
                };
            }
        }//end method
    };
    </script>
    
    <style scoped>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        row-gap: 10px;
        column-gap: 10px;
    }
    .grid-item {
        border: 0.5px solid #5c0e0e;
        border-radius: 5px;
        padding : 5px;
        font-size : 15px;
    }
    .expand-enter-active, .expand-leave-active {
      transition: height 0.3s ease-out;
      overflow: hidden;
    }
    .expand-enter, .expand-leave-to {
      height: 0;
      opacity: 0%;
    }
    
    
    .box {
        transition: all 1s ease-in;
    }
    .content {
        padding-left: 5px;
        background-color: #cec5c5;
        padding: 15px;
    }
    .collapsible {
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
        /* background-color: #cec5c5; */
        content: '';
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
    .menu_0 { 
        text-align : center;
        background-color: #f8c6c9; 
    }
    .menu_1 { 
        text-align : center;
        background-color: #B57EDC; 
    }
    .menu_2 {   text-align : center; background-color: #89CFF0; }
    .menu_3 {   text-align : center; background-color: #f9d5a7; }
    .content_0 { background-color: #f4adb1 ; }
    .content_1 { background-color: #9c6fc8 ; }
    .content_2 { background-color: #6bb3e7 ; }
    .content_3 { background-color: #eab04d ; }
    .td{
        padding:3px;border-bottom: 0.8px solid #6f6f75; float:left;
        padding-bottom : 10px; padding-top : 10px;
    }
    
    .tr {
        border: 1px solid black;
        margin: 1px;
        padding: 10px;
        height: 30px;
    }
    </style>