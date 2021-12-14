import { createRouter, createWebHistory } from 'vue-router'
import Index from '/@/pages/Index.vue'
import Hello from '/@/pages/Hello.vue'

import Explorer from '/@/pages/Explorer.vue'
import Targeted from '/@/pages/Targeted.vue'
import Results from '/@/pages/Results.vue'
import Questionnaires from '/@/pages/Questionnaire.vue'

import Responses from '/@/pages/Responses.vue'
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
      path: '/explorer',
      name: 'explorer',
      component: Explorer
    },
    {
      path: '/targeted',
      name: 'targeted',
      component: Targeted
    },
    {
      path: '/results/:id',
      name: 'results',
      component: Results
    },
    {
      path: '/questionnaires/:id',
      name: 'questionnaires',
      component: Questionnaires
    },
    {
      path: '/responses',
      name: 'responses',
      component: Responses
    }
  ]
})
