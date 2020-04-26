import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import index from '@/views/index.vue'
import slottest from '@/views/slottest/index.vue'
import slotmenu from '@/views/slottest/temp2/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      leaf:true,
      name:'首页',
      icon:'iconshouye',
      children: [
        {path: '/index', component: index, name: '首页'},
      ]
    },
    {
      path: '/',
      component: Home,
      leaf:false,
      icon:'iconshezhiluojicaowei',
      name:'插槽',
      children: [
        {path: '/slottest', component: slottest, name: '插槽1'},
        {path:'/slotmenu',component:slotmenu,name:'插槽2'}
      ]
    },
  ]
})
