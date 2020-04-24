import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index.vue'
import slottest from '@/views/slottest/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/slottest',
      name: 'slottest',
      component: slottest
    }
  ]
})
