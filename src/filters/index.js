/**
 * @intro:  全局公用过滤器.
 * @author: worldly1013.
 * @email: 1184785075@qq.com.
 * @Date: 2017/3/2 18:20.
 * @Copyright(©) 2018 by worldly1013.
 *
 */
import Vue from 'vue'

/**
 * 格式化数字，每隔三位数字用，分隔  统一保留到小数点后两位
 * @param  {str}  value  数字
 * @return {string}
 */
Vue.filter('formatNum', value => {
  var isNegative = false;
  if (value == undefined) return
  if (typeof value === 'number') value = value.toString()
  if (value.substr(0, 1) == '-') {
    value = value.substr(1, value.length)
    isNegative = true;
  }

  var decimals, int, newInt = '',
    counter = 0;
  if (value.indexOf('.') !== -1) {
    decimals = value.substring(value.indexOf('.') + 1, value.length)
    int = value.substring(0, value.indexOf('.'))
  }
  if (value.indexOf('.') === -1) int = value

  for (var i = int.length - 1; i >= 0; i--) {
    counter++;
    newInt = value.charAt(i) + newInt;
    if (!(counter % 3) && i != 0) {
      newInt = ',' + newInt;
    }
  }

  if (decimals !== undefined && isNegative == false) return newInt + '.' + decimals;
  if (decimals !== undefined && isNegative == true) return '-' + newInt + '.' + decimals;
  if (decimals == undefined && isNegative == true) return '-' + newInt + '.00';
  if (decimals == undefined && isNegative == false) return newInt + '.00';
  return newInt;
})
