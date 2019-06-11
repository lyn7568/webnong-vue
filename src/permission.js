import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.getters.isLoggedIn) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // if (store.getters.menuList) {
      //   store.dispatch('GenerateRoutes', store.getters.menuList).then(() => {
      //     router.addRoutes(store.getters.addRouters)
      //     next({ ...to, replace: true })
      //   })
      // } else {
        next()
      // }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
