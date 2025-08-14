import { createApp as createVueApp } from 'vue'
import App from '@/App.vue'
import '@/assets/scss/style.scss'

import router from '@/router'

const createApplication = () => {
  const vueAppInstance = createVueApp(App)

  vueAppInstance.use(router)
  vueAppInstance.mount('#app')
}

createApplication()
