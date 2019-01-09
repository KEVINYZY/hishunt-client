import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {getToken} from '@/utils/auth' // 验权
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (null != to.meta.login) {//判断是登录还是注册页面
    localStorage.setItem('login', to.meta.login)
  }
  if (null != to.meta.index) {
    store.dispatch('ChanageNavIndex', to.meta.index)
  }

  NProgress.start()
  if (getToken()) {
    //如果已经登录
    if (to.path === '/login') {
      next({path: '/'})
      NProgress.done() // 结束Progress
    } else if (!store.getters.role) {
      store.dispatch('GetInfo').then(() => {
        next({...to})
      })
    } else {
      next()
    }
  } else if (!to.meta.validate) {//白名单

    next()
  } else {
    //如果路由是黑名单内的就跳转到登录页面
    next({path: '/login'})
    NProgress.done() // 结束Progress
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
