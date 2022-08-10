import { createRouter, createWebHistory } from 'vue-router'
import Index from '/@/pages/Index.vue'
import Hello from '/@/pages/Hello.vue'

import Explorer from '/@/pages/Explorer.vue'
import Targeted from '/@/pages/Targeted.vue'
import Results from '/@/pages/Results.vue'
import Questionnaires from '/@/pages/Questionnaire.vue'

import NewQuestionnaire from '/@/pages/NewQuestionnaire.vue'
import Responses from '/@/pages/Responses.vue'
import NewResponses from '/@/pages/NewResponses.vue'
import Administrates from '/@/pages/Administrates.vue'
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
      path: '/questionnaires/new',
      name: 'questionnaire-details-new',
      component: NewQuestionnaire
    },
    {
      path: '/responses',
      name: 'responses',
      component: Responses
    },
    {
      path: '/responses/new/:id',
      name: 'responses-details-new',
      component: NewResponses
    },
    {
      path: '/administrates',
      name: 'administrates',
      component: Administrates
    }
  ]
})
