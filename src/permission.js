import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

NProgress.configure({ showSpinner: false })// NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 检测路由配置中是否有requireAuth这个meta属性
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 判断是否已登录
    if (store.getters.isLoggedIn) {
      next()
      NProgress.done()
      return
    }
    // 未登录则跳转到登录界面
    next('/login')
    NProgress.done()
  } else {
    next()
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
