/**
 * Created by worldly1013 on 2018/3/6.
 *
 * 状态管理器
 *
 * @author: worldly1013
 * @email: 1184785075@qq.com
 * @Date: 2018/3/6 15:24
 * @Copyright(©) 2018 by worldly1013.
 *
 */

import Vue from 'vue'
import Vuex from 'vuex'

//引入模块
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './states'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
