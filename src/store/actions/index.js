/**
 * Created by worldly1013 on 2018/3/5.
 *
 * @author: worldly1013
 * @github:  https://github.com/worldly1013/vue-elementUi-admin
 * @email: 1184785075@qq.com
 * @Date: 2018/3/5 16:04
 * @Copyright(©) 2018 by worldly1013.
 *
 */

import * as actions from 'store/actions/type'
import * as mutations from 'store/mutations/type'

export default {
  //设置用户信息和登录
  [actions.SET_USER_INFO]({commit}, userinfo){
    commit(mutations.SET_USER_INFO, userinfo)
  }
}
