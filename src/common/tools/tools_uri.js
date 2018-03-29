/**
 * @file: tools_uri.
 * @intro: uri编码工具类.
 * @author: worldly1013.
 * @email: 1184785075@qq.com
 * @Date: 2018/2/5 14:03.
 * @Copyright(©) 2017 by worldly1013.
 *
 */

export default new class Uri {
  constructor() {
  }

  //URI 解码
  decode(value) {
    return decodeURIComponent(value)
  }

  //URI 编码
  encode(value) {
    return encodeURIComponent(value)
  }
}
