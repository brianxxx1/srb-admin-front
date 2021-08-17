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
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
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
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/core/integral-grade',
    component: Layout,
    redirect: '/core/integral-grade/list',
    name: 'coreIntegralGrade',
    meta: { title: 'Grade Management', icon: 'el-icon-s-marketing' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'coreIntegralGradeList',
        component: () => import('@/views/core/integral-grade/list'),
        meta: { title: 'Grade List' }
      },
      {
        path: 'create',
        name: 'coreIntegralGradeCreate',
        component: () => import('@/views/core/integral-grade/form'),
        meta: { title: 'Add a Grade' }
      },
      {
        path: 'edit/:id',
        name: 'coreIntegralGradeEdit',
        component: () => import('@/views/core/integral-grade/form'),
        meta: { title: 'Edit a Grade' },
        hidden: true
      }
    ]
  },
  {
    path: '/core/user-info',
    component: Layout,
    redirect: 'core/user-info/list',
    name: 'userInfo',
    meta: { title: 'User Management', icon: 'user' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'userInfoList',
        component: () => import('@/views/core/user-info/list'),
        meta: { title: 'User List' }
      }
    ]
  },
  {
    path: '/core/borrower',
    component: Layout,
    name: 'Borrower Management',
    meta: { title: 'Borrower Management', icon: 'el-icon-s-unfold' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'Borrower List',
        component: () => import('@/views/core/borrower/list'),
        meta: { title: 'Borrower List' }
      },
      {
        path: 'detail/:id',
        name: 'Borrower Detail',
        component: () => import('@/views/core/borrower/detail'),
        meta: { title: 'Borrower Detail' },
        hidden: true
      },
      {
        path: 'info-list',
        name: 'Request List',
        component: () => import('@/views/core/borrowInfo/list'),
        meta: { title: 'Request List' }
      },
      {
        path: 'info-detail/:id',
        name: 'Request Detail',
        component: () => import('@/views/core/borrowInfo/detail'),
        meta: { title: 'Request Detail' },
        hidden: true
      }
    ]
  },

  {
    path: '/core/lend',
    component: Layout,
    name: 'Lend Management',
    meta: { title: 'Lend Management', icon: 'el-icon-s-flag' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'Lend List',
        component: () => import('@/views/core/lend/list'),
        meta: { title: 'Lend List' }
      },
      {
        path: 'detail/:id',
        name: 'Lend Detail',
        component: () => import('@/views/core/lend/detail'),
        meta: { title: 'Lend Detail' },
        hidden: true
      }
    ]
  },

  {
    path: '/core/dict',
    component: Layout,
    redirect: '/core/dict/list',
    name: 'dict',
    meta: { title: 'System Setting', icon: 'el-icon-setting' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        name: 'Info Dict',
        component: () => import('@/views/core/dict/list'),
        meta: { title: 'Info Dict' }
      }
    ]
  },

  /**
   * asyncRoutes
   * the routes that need to be dynamically loaded based on user roles
   */
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
