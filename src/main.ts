import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import './index.scss'
import VueCompositionApi from '@vue/composition-api'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
app.use(VueCompositionApi)
