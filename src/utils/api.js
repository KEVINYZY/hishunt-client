import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import {getToken} from '@/utils/auth'
import router from '@/router'
import store from '@/store'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  timeout: 15000                  // 请求超时时间2
})
// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  //console.error(error) // for debug
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code == 1000) {
      return res;
    }
    if (res.code == 200) {
      if (res.title) {
        document.title = res.title + ' - 知书'
      }
      if (res.data) {
        return res.data;
      } else {
        router.push({path: '/404'})
      }
    } else if (res.code == 20011) {
      Message({
        showClose: true,
        message: res.message,
        type: 'error',
        duration: 500,
        onClose: () => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        }
      });
      return Promise.reject("未登录")
    } else {
      if (res.code != 10009) {//10009状态码需要表单显示不需要弹框
        Message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject(res)
    }
  },
  error => {
    Message({
      message: '请求服务器错误',
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)
export default service

