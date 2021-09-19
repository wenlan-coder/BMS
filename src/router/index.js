import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
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
  path: '/SystemMangement',
  component: Layout,
  redirect: '/SystemMangement/system',
  name: 'SystemMangement',
  meta: { title: '系统管理', icon: 'el-icon-tickets',roles:['admin'] },
  children: [
    {
      path: 'system',
      name: 'system',
      component: () => import('@/views/SystemMangement/System'),
      meta: { title: '数据管理', icon: 'el-icon-setting' }
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
