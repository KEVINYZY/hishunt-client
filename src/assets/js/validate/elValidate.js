import store from '@/store'
import {default as api} from '@/utils/api'

//登录时验证手机
export function elValidatePhoneLogin(rule, value, callback) {
  if (value == '') {
    return callback(new Error('请输入手机号'))
  } else {
    let re = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (!re.test(value)) {
      return callback(new Error('手机号码输入格式有误'))
    }
    return callback()
  }
}

export function elValidatePass(rule, value, callback) {
  if (value == '') {
    return callback(new Error('请输入密码'))
  } else if (value.length < 6) {
    return callback(new Error('密码必须大于6位'))
  }
  return callback()
}
