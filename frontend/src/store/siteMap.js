export const SiteMap = {
    state: () => ({ floor: '2' }),
    mutations: {
      setCounter(state, value) {
        state.counter = value;
      }
    },
    actions: {
      time() {
        console.log(4);
      }
    },
    getters: {
      time2(state) {
        return state.counter * 2;
      }
    }
  }