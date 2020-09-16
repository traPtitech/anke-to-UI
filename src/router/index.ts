import { createRouter, createWebHistory } from 'vue-router'
import Index from '/@/pages/Index.vue'
import Hello from '/@/pages/Hello.vue'
<<<<<<< HEAD
import Explorer from '/@/pages/Explorer.vue'
=======
import Targeted from '/@/pages/Targeted.vue'
>>>>>>> なんとなくそれっぽい感じに

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
<<<<<<< HEAD
      path: '/explorer',
      name: 'explorer',
      component: Explorer
=======
      path: '/targeted',
      name: 'targeted',
      component: Targeted
>>>>>>> なんとなくそれっぽい感じに
    }
  ]
})
