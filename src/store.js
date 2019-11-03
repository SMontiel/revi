import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    devicesData: [
      {
        title: 'Small screen',
        width: 320,
        height: 568
      },
      {
        title: 'Large screen',
        width: 1200,
        height: 980
      }
    ],
    isScrollEnabled: true,
    host: 'https://laravel.com/docs/routing'
    //host: 'https://vuejs.org/'
    //host: 'http://localhost:8000/'
  },
  mutations: {
    addFrame (state, payload) {
      state.devicesData.unshift({
        title: payload.title,
        width: payload.width,
        height: payload.height
      });
    },
    deleteFrame (state, payload) {
      state.devicesData.splice(payload.index, 1);
    },
    setHost (state, payload) {
      state.isScrollEnabled = false;
      state.host = payload.newHost;
      setTimeout(function () {
        state.isScrollEnabled = true;
      }, 500);
    }
  },
  actions: {},
  getters: {}
})
