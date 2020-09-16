import { createRouter, createWebHistory } from 'vue-router'
import Index from '/@/pages/Index.vue'
import Hello from '/@/pages/Hello.vue'
import Targeted from '/@/pages/Targeted.vue'

export const routerHistory = createWebHistory()

export default createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/hello',
      name: 'hello',
      component: Hello
    },
    {
      path: '/targeted',
      name: 'targeted',
      component: Targeted
    }
  ]
})
