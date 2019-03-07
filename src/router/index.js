import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: resolve => require(['@/views/login/index'], resolve), hidden: true },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: '首页', requireAuth: true },
        component: resolve => require(['@/views/home/index'], resolve)
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/control',
        name: 'control',
        meta: { title: '智能控制', requireAuth: true },
        component: resolve => require(['@/views/control/index'], resolve)
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/group',
        name: 'group',
        meta: { title: '智能控制', requireAuth: true },
        component: resolve => require(['@/views/group/index'], resolve)
      }
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
