import Vuex from 'vuex'
import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state: {
      floor: ['B1','1','2','3'] ,
      idx : '2' ,
      search : {
        scrollYn : false
      },
      searchIcon : true,
      shopData : [],
      shopSimPleData : {},
      overFlow : false,
    },
    mutations: {
      setFloor(state ,floor) {
        //let r_idx = Math.ceil(Math.random()* 4 )
        state.idx = floor
      },
      setScrollToggle (state) {
        state.search.scrollYn  = !state.search.scrollYn
      },
      setSearchIcon (state ,isTrue ) {
        state.searchIcon  = isTrue
      },
      setShopData (state ,data) {
        state.shopData  = data
      },
      setShopSimpleData(state ,data){
        state.shopSimPleData  = data
      },
      setOverFlow(state ,isTrue){ //스크롤 차단
        state.overFlow = isTrue
        const v_hidden = document.getElementsByTagName('body')
        if(isTrue){
          v_hidden[0].classList.add('hidden')
        }else{
          v_hidden[0].classList.remove('hidden')
        }
      },
    },
    plugins : [ createPersistedState() ],
});


 

// const SEARCH_DATA = () =>{
//   return {
//     scrollYn : false
//   }
// }

// const state = {
//   floor: ['B1','1','2','3'] ,
//   idx : '2' ,
//   search : {
//     scrollYn : false
//   },
//   searchIcon : true
// }

// const mutations = {
//   setFloor(state ,floor) {
//     //let r_idx = Math.ceil(Math.random()* 4 )
//     state.idx = floor
//   },
//   setScrollToggle (state) {
//     state.search.scrollYn  = !state.search.scrollYn
//   },
//   setSearchIcon (state ) {
//     state.searchIcon != state.searchIcon
//   }
// }

// const Store = new Vuex.Store({
//    state
//   ,mutations 
// })

// export default Store