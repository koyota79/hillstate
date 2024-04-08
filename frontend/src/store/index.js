import Vuex from 'vuex'


const SEARCH_DATA = () =>{
  return {
    scrollYn : false
  }
}

const state = {
  floor: ['B1','1','2','3'] ,
  idx : '2' ,
  search : {
    scrollYn : false
  }
}

const mutations = {
  setFloor(state ,floor) {
    //let r_idx = Math.ceil(Math.random()* 4 )
    state.idx = floor
  },
  setScrollToggle (state) {
    state.search.scrollYn  = !state.search.scrollYn
  }
}
const Store = new Vuex.Store({
   state
  ,mutations 
})

export default Store