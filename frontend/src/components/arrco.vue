
<template>
    <!-- <div class="main_slide">
        <main-slide></main-slide>
    </div> -->

<!-- 
    <div>
        <ul id="root" @click="isShow = !isShow">
        <li>Root</li>

        <transition name="slide">
            <ul class="child" v-if="isShow">
                <li>item 1</li>
                <li>item 2</li>
                <li>item 3</li>
                <li>item 4</li>
            </ul>
        </transition>
        </ul>
        <ul id="root" @click="isShow2 = !isShow2">
        <li>Root2</li>

        <transition name="slide">
            <ul class="child" v-if="isShow2">
                <li>item 1</li>
                <li>item 2</li>
                <li>item 3</li>
                <li>item 4</li>
            </ul>
        </transition>
        </ul>        
    </div> -->

   <!-- <div class="main_img">
        <img src = "../assets/images/event1.jpg" style="width:352px;height:519px;"/>
   </div>

<div :class="{ wrap: true }">TEXT</div>

  .wrap {width:500px; height:500px; color:red;}
-->

    <div v-for="(item, index) in contents" >
        <div @click="switchAccordion($el ,item , index)" class="collapsible" :class="{active :item.isTrue}" >{{item.title}}</div>
            <div class="content" :style="[this.contents[index].isTrue ? this.contents[index].setStyle  : '']" >
                <p>{{item.msg}}</p>
            </div>

            <!-- <div @click="switchAccordion($el)" class="collapsible">나</div>
            <div class="content" :style="{ maxHeight: setHeight + 'px' }" >
            <p>222222222</p> 
            </div>-->

        
    </div>

</template> 


<script>
export default {
    props: {
    },
  data() {
    return {
            isShow:false ,
            isShow2:false,
            isOpen : false,
            setHeight : 0,
            contents: [
                {
                    id : 1 ,
                    title: '가',
                    msg: 'I am fine thank you.',
                    isTrue : true,
                    setStyle : {
                        maxHeight : '56px'
                    }
                },
                {
                    id : 2 ,
                    title: '나',
                    msg: '222222222222222222222\n2222222222222222\n222222222222\n222222222222222222\n2222222222222222\n2222222\n222222\n2222\n2222222222222222222222222222',
                    isTrue : false,
                    setStyle : {
                            maxHeight : '0px'
                    }
                },
            ],

    }
  },
  methods : {
    switchAccordion(el, item ,idx) {
        console.log(el)
        item.isTrue = true
        //this.contents[idx].isTrue = true
        let content = el.nextElementSibling
        const element = document.querySelector('.active');
        console.log('content11111111' ,content , element , element.nextElementSibling.style.maxHeight)
        
        if(element.nextElementSibling.style.maxHeight != "0px"){
            //this.contents[0].isTrue = false
            //this.contents[0].setStyle['maxHeight'] = '0px'
            //this.contents[idx].setStyle['maxHeight'] = content.scrollHeight + 'px'
            item.setStyle['maxHeight'] = content.scrollHeight + 'px'
            element.nextElementSibling.style.maxHeight = '0px'
        }else{
            item.setStyle['maxHeight'] = content.scrollHeight + 'px'
        }
        

        // var before = document.getElementsByClassName("active")[0] 
        // console.log(document.getElementsByClassName("active") ,idx)

        // if (before && document.getElementsByClassName("active")[0] ) {  // 자신 이외에 이미 활성화된 버튼이 있으면
        //         before.nextElementSibling.style.maxHeight = null;   // 기존에 펼쳐진 내용 접고
        //         before.classList.remove("active");                  // 버튼 비활성화
        //         this.isOpen = false
        // }else{
        //     this.isOpen = true
        // }
        // var content = el.nextElementSibling
        // console.log(this.contentClass,'content' ,content )

        // if (this.isOpen ) {         // 버튼 다음 요소가 펼쳐져 있으면
        //     let v_Height = content.scrollHeight ; 
        //     this.setHeight = v_Height
        //     console.log(v_Height , 'content11111111' ,content.scrollHeight )
        // } else {
        //     this.setHeight = 0;         // 접기
        //      // 접혀있는 경우 펼치기
        // }
        // var coll = document.getElementsByClassName("collapsible");
        // var i;
        // var before = document.getElementsByClassName("active")[0]
        // console.log(before)
        // for (i = 0; i < coll.length; i++) {
        //     coll[i].addEventListener("click", function() {
        //         this.classList.toggle("active");
        //         var content = this.nextElementSibling;
        //         console.log(content)
        //         if (content.style.maxHeight){
        //             content.style.maxHeight = null;
        //         } else {
        //             content.style.maxHeight = content.scrollHeight + "px";
        //         }
        //     });
        // }
    }
      
  
  }
}
</script>
<style>
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
.accordion {
  transition: all .3s cubic-bezier(.25,.8,.5,1);
} 

.accordion-body {
  font-size: 1.3rem;
  padding: 0 16px; 
  opacity:0
}

.is-open .accordion-body {
  opacity:0
}
</style>