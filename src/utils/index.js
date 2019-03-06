/**
 * Created by luyanan on 18/12/14.
 */
/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || ['', ''])[1].replace(/\+/g, '%20')) || null
}

/**
 * 去除str前后空格
 * @param str
 */
export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * String与Array之间的转换
 */
export function strToArr(str) {
  var subs = []
  if (str) {
    if (str.indexOf(',')) {
      subs = str.split(',')
    } else {
      subs[0] = str
    }
    return subs
  } else {
    return subs
  }
}
export function arrToStr(arr) {
  var strs = ''
  if (arr) {
    strs = arr.join(',')
    return strs
  } else {
    return strs
  }
}
