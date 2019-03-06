/**
 * Created by luyanan on 18/12/14.
 * form validator rules
 */

export function requiredTip(str) {
  return `请输入${str}`
}

// 邮箱,@,50个字
export function checkEmailV(rule, value, callback) {
  const reg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/
  if (value && !reg.test(value) && value.length < 50) {
    return callback(new Error('邮箱格式有误，请检查后重新填写'))
  } else {
    return callback()
  }
}

// 手机号码验证
export function checkPhoneV(rule, value, callback) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  if (value === 'admin') {
    callback()
  }
  if (!value) {
    return callback(new Error('请输入您的账号'))
  } else if (!reg.test(value)) {
    return callback(new Error('请输入正确的手机号码'))
  } else {
    return callback()
  }
}

// 表示了小数点后可以保留0位、1位、或2位小数
export function checkFloatNum(rule, value, callback) {
  const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/
  if (!reg.test(value)) {
    return callback(new Error('小数点后最多俩位'))
  } else {
    return callback()
  }
}
