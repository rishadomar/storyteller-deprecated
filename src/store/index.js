import Vue from 'vue'
import Vuex from 'vuex'
import stories from '@/store/modules/stories';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    stories,
  }
})

