/**
 * Created by worldly1013 on 2018/5/21.
 *
 * @author: worldly1013
 * @github: https://github.com/worldly1013/vue-elementUi-admin
 * @email:  1184785075@qq.com
 * @Date: 2018/5/21 16:04
 * @Copyright(©) 2018 by worldly1013.
 *
 */
import * as type from 'store/mutations/type'
import {cookieStorage} from 'common/storage'

export default {
  //设置用户信息和是否登录
  [type.SET_USER_INFO](state, userinfo){
    state.user_info = userinfo || {}
    if (userinfo === null) {
      cookieStorage.remove('user_info')
    } else {
      cookieStorage.set('user_info', userinfo)
    }
  }
}
