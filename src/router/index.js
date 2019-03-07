import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: resolve => require(['@/views/login/index'], resolve), hidden: true },
  {
    path: '/',
    redirect: '/manageGoods',
    component: Layout,
    children: [
      {
        path: 'manageGoods',
        name: 'manageGoods',
        meta: { title: '管理商品', requireAuth: true },
        component: resolve => require(['@/views/manageGoods/index'], resolve)
      }
    ]
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'addGoods',
        name: 'addGoods',
        meta: { title: '添加商品', requireAuth: true },
        component: resolve => require(['@/views/addGoods/index'], resolve)
      }
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
