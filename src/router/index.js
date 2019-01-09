import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const _import = require('./_import_' + process.env.NODE_ENV)

import UserLayout from '@/views/layout/UserLayout'
import UserSetting from '@/views/layout/UserSetting'

const app = {
  getPageTitle(title) {
    return title + ' - 知书'
  }
}
export const constantRouterMap = [{
  path: '/',
  name: 'index',
  component: _import('index/index'),
  meta: {
    title: "知书 - 发现更多有趣",
    validate: false,
    index: '1'
  }
}, {
  path: '/p/:id',
  name: 'article',
  component: _import('article/index'),
  meta: {
    validate: false,
    index: '0'
  }
}, {
  path: '/404',
  component: _import('404'),
  hidden: true,
  meta: {
    title: app.getPageTitle('未找到知书资源'),
    validate: false
  }
}, {//404页面
  path: '*',
  redirect: '/404'
}, {
  path: '/writer',
  component: _import('writer/index'),
  meta: {
    title: app.getPageTitle('写文章'),
    validate: true
  }
}, {
  path: '/login',
  component: _import('login/index'),
  meta: {
    title: "知书 - 找兴趣上知书",
    validate: false,
    login: true//登录注册专有属性
  }
}, {
  path: '/signup',
  component: _import('login/index'),
  meta: {
    title: "知书 - 找兴趣上知书",
    validate: false,
    login: false//登录注册专有属性
  }
}, {
  path: '/user',
  component: UserLayout,
  meta: {
    validate: false,
    login: false,//登录注册专有属性
    index: '0'
  }, children:
    [
      {
        path: 'settings',
        component: UserSetting,
        meta: {
          title: app.getPageTitle('个人资料'),
          validate: false,
          index: '0'
        }, children:
          [{
            path: 'profile',
            component: _import('user/profile'),
            meta: {
              title: app.getPageTitle('个人资料'),
              validate: true,
              index: '0'
            }
          }]
      }, {
      path: ':id',
      component: _import('user/account'),
      meta: {
        title: app.getPageTitle('个人资料'),
        validate: false,
        index: '0'
      }
    },
    ]
}]

export default new Router({
  routes: constantRouterMap,
  mode: 'history'
})
