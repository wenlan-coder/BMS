import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

//公共页面
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
]
//权限页面
export const asyncRoutes = [
{
  path: '/library',
  component: Layout,
  redirect: '/library/books',
  name: 'library',
  meta: { title: '图书馆', icon: 'el-icon-tickets',roles:['admin','editor'] },
  children: [
    {
      path: 'books',
      name: 'books',
      component: () => import('@/views/books/All'),
      meta: { title: '书刊', icon: 'table',roles:['editor'] }
    }
  ]
},
{
  path: '/BorrowCenter',
  component: Layout,
  redirect: '/BorrowCenter/borrow',
  name: 'BorrowCenter',
  meta: { title: '借阅管理', icon: 'el-icon-message',roles:['admin','editor'] },
  children: [
    {
      path: 'borrow',
      name: 'borrow',
      component: () => import('@/views/borrowCenter/Borrow'),
      meta: { title: '图书归还', icon: 'table' }
    },
    {
      path: 'history',
      name: 'history',
      component: () => import('@/views/borrowCenter/History'),
      meta: { title: '借阅记录', icon: 'table' }
    },
  ]
},
{
  path: '/UserMangement',
  component: Layout,
  redirect: '/UserMangement/user',
  name: 'UserMangement',
  meta: { title: '用户管理', icon: 'el-icon-user',roles:['admin'] },
  children: [
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/UserMangement/User'),
      meta: { title: '角色管理', icon: 'table' }
    },
    {
      path: 'apply',
      name: 'apply',
      component: () => import('@/views/UserMangement/Apply'),
      meta: { title: '应用管理', icon: 'table' }
    },

  ]
},
{
  path: '/BooksMangement',
  component: Layout,
  redirect: '/BooksMangement/user',
  name: 'UserMangement',
  meta: { title: '图书管理', icon: 'el-icon-reading',roles:['admin'] },
  children: [
    {
      path: 'booksMessage',
      name: 'booksMessage',
      component: () => import('@/views/BooksMangement/BooksMessage'),
      meta: { title: '图书信息管理', icon: 'table' }
    },
    {
      path: 'booksCategory',
      name: 'booksCategory',
      component: () => import('@/views/BooksMangement/BooksCategory'),
      meta: { title: '图书分类管理', icon: 'table' }
    },
  ]
},
{
  path: '/Notice',
  component: Layout,
  redirect: '/Notice/noticeMangement',
  name: 'Notice',
  meta: { title: '公告管理', icon: 'el-icon-reading',roles:['admin'] },
  children: [
    {
      path: 'noticeMangement',
      name: 'noticeMangement',
      component: () => import('@/views/Notice/notice'),
      meta: { title: '通知发布', icon: 'table' }
    },
  ]
},
{
  path: '/SystemMangement',
  component: Layout,
  redirect: '/SystemMangement/system',
  name: 'SystemMangement',
  meta: { title: '系统管理', icon: 'el-icon-setting',roles:['admin'] },
  children: [
    {
      path: 'system',
      name: 'system',
      component: () => import('@/views/SystemMangement/System'),
      meta: { title: '数据管理', icon: 'el-icon-cpu' }
    },
    {
      path: 'lateMangement',
      name: 'lateMangement',
      component: () => import('@/views/SystemMangement/LateMangement.vue'),
      meta: { title: '到期管理', icon: 'el-icon-alarm-clock' }
    },
  ]
},
// 404 page must be placed at the end !!!
{ path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),   //当切换新路由，想要页面滚到顶部
  routes: constantRoutes    //不需要权限的路由首次加载
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
