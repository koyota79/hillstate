<template>

<div class="box" style="position: relative;" >
    <div v-for="(item ,index) in contents" :class="`parent_${index}`"  :style="item.offset">
        <div @click="switchAccordion($el ,item , index)" ref="divs" class="collapsible" :class="{active :item.isTrue}" 

        >{{item.title}} :: {{key}}</div>
            <div class="content"   ref="cont_divs"
            :style="[this.contents[index].isTrue ? this.contents[index].setStyle  : '']" >
                <p ref="p_divs">{{item.msg}}</p>
            </div>
    </div>

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
            beforeTop : 0,

            items: [
                { id: 1, content: 'A' },
                { id: 2, content: 'B' },
                { id: 3, content: 'C' }
            ],
            positions: [0, 0, 0] ,


            contents: [
                {
                    id : 0 ,
                    title: '가',
                    msg: 'I am fine thank you.',
                    isTrue : true,
                    setStyle : {
                        maxHeight : '56px'
                    },
                   // offset : {transform :  'translateY(0px)'},
                    offset : {top :  0} ,
                    offsetY : 0
                    

                },
                {
                    id : 1 ,
                    title: '나',
                    msg: '222222222222222222222',
                    isTrue : false,
                    setStyle : {
                        maxHeight : '0px'
                    },
                    offset : {top :  110},
                    offsetY : 110
                },
                {
                    id : 2 ,
                    title: '다',
                    msg: '33333333333333',
                    isTrue : false,
                    setStyle : {
                        maxHeight : '0px'
                    },
                    offset : {top :  166},
                    offsetY : 166
                },
            ],            
    }

    },
    created() {
      console.log("Parent mounted")
      this.fetchData(this.$route)
      
    },
    mounted(){
   
    }, 
    watch : {
        activeIndex : function(idx) {
            console.log('New msg: ' + idx)

            this.contents[this.prevIndex].offset = {'top' : this.contents[idx].offsetY + 'px' }



        },
    },
    methods: {


       fetchData (params) {
        //console.log(11111111 ,params)
        //console.log('history.state: ', history.state)
       },
       switchAccordion(el, item ,idx ) {
         
         

            // classList.forEach(function (item ,index) {
            //     console.log( index , item , item)
            //     // if(item.className.contains('active') ){
            //     //     console.log( 'kkkkkk' + index )
            //     // }
            // });

            this.prevIndex = this.activeIndex
            this.activeIndex = idx; 
      
            

            let heights = this.$refs.divs.map(div => div.clientHeight);
            let cont_heights = this.$refs.p_divs.map(div => div.offsetHeight);
            let maxContHeights = Math.max(...cont_heights)

            this.beforeTop = item.offsetY
            item.offset['top'] = 0
        
            //console.log('v_offIdx' , this.beforeTop)
  

            //console.log('heights=' +  heights + '=heights' , cont_heights  , 'max' , Math.max(...cont_heights))
         
            // for(var i=0; i < this.contents.length ;i++){
            //      if( i != idx && this.prevIndex != i){
            //         this.contents[i].offset['transform'] ='translateY(' + ( this.contents[i].offsetY[i]) + 'px)';  
            //      }
            // }
            // this.contents[idx].offset['transform'] = 'translateY(' + ( this.contents[idx].offsetY[idx]) + 'px)';  
            // this.contents[this.prevIndex].offset['transform'] = 'translateY(' + ( this.contents[this.prevIndex].offsetY[idx]) + 'px)';  
       
            if(!item.isTrue){
                let content = el.nextElementSibling     
                //console.log(content.scrollHeight)   
                let clickIdx = this.contents[idx]['id']
                //this.contents[clickIdx].offset['transform'] = 'translateY(' + -56 * idx + 'px)';     
                this.contents[clickIdx].isTrue = true
                let v_maxHeight =  ( maxContHeights-26 + heights[this.prevIndex] ) + 'px'
                this.contents[clickIdx].setStyle['maxHeight'] = v_maxHeight
                //this.contents[this.prevIndex]['offset'] = 'translateY(100px)'
                let contHeights = item.setStyle['maxHeight'];
             
                let v_Height = parseInt(contHeights.replace('px',''))
                v_Height = v_Height + heights[this.prevIndex]
                
                this.contents[this.prevIndex].isTrue = false
                this.contents[this.prevIndex].setStyle['maxHeight']  = '0px'
                //this.contents[this.prevIndex].offset['transform'] = 'translateY('+(-56 * idx  )+'px)';  
                //console.log(this.contents , idx , clickIdx)

            }
          

            
            var classNode = document.getElementsByClassName('collapsible')
            for(let i=0;i<classNode.length;i++){
                console.log(classNode[i] + '::::i:::' +i )
                let className = classNode[i].classList[1]
                console.log('className::::::' + className)
                if(className == 'active'){
                    console.log('i::::::' + i)
                }
            }



      
        }//end switchAccordion
    }
    };
</script>

<style scoped>
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
.content {
    padding: 0 18px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
    background-color: #f1f1f1;
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
    top:110px;
    width:100%;
}
.parent_2{
    position: absolute;
    top:166px;
    width:100%;
}
</style>