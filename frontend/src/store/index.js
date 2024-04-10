import Vuex from 'vuex'
import { createStore } from "vuex";

export default createStore({
    state: {
      floor: ['B1','1','2','3'] ,
      idx : '2' ,
      search : {
        scrollYn : false
      },
      searchIcon : true
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
      }
    }
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