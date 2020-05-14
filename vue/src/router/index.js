import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Home from '@/views/Home.vue'
import index from '@/views/index.vue'
import slottest from '@/views/slottest/index.vue'
import dialogDrag from '@/views/component/dialogDrag.vue'
import login from '@/views/login.vue'
import clipboard from '@/views/component/clipboard.vue'
export const constantRoutes=[
  {
    path: '/login',
    component: login,
    hidden:true,
  },
  {
    path: '/',
    component: Home,
    leaf:true,
    icon:'iconshouye',
    children: [
      {path: '/index', component: index, name: '首页'},
    ]
  },
  {
    path: '/slottest',
    component: Home,
    leaf:false,
    icon:'iconshezhiluojicaowei',
    name:'插槽',
    children: [
      {path: '/slottest', component: slottest, name: '插槽练习'}
    ]
  },
  { path: '/', redirect: '/index',hidden:true }
]
export const adminRoutes=[
  {
    path: '/dialogDrag',
    component: Home,
    leaf:false,
    icon:'iconapplications',
    name:'组件',
    children: [
      {path: '/dialogDrag', component: dialogDrag, name: '弹窗拖动'},
      {path:'/clipboard',component:clipboard,name:'文本复制'}
    ]
  }
]
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  routes: constantRoutes,
});
export default router;
