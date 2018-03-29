/**
 * Created by zzmhot on 2018/5/21.
 *
 * @author: worldly1013
 * @github: https://github.com/worldly1013/vue-elementUi-admin
 * @email: 1184785075@qq.com
 * @Date: 2018/5/21 17:04
 * @Copyright(©) 2018 by worldly1013.
 *
 */

import * as type from 'store/getters/type'

export default {
  //获取用户信息
  [type.GET_USER_INFO]: state => {
    return state.user_info
  }
}
