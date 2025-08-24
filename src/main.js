import { createApp as createVueApp } from 'vue';
import App from '@/App.vue';
import '@/assets/scss/style.scss';
import { axiosPlugin } from '@/plugins/axios.js';
import router from '@/router';
import { createPinia } from 'pinia';

import toastPlugin from '@/plugins/toast.js';

const createApplication = () => {
  const vueAppInstance = createVueApp(App);

  const pinia = createPinia();
  vueAppInstance.use(pinia);

  vueAppInstance.use(router);
  vueAppInstance.use(axiosPlugin);
  vueAppInstance.use(toastPlugin);

  vueAppInstance.mount('#app');
};

createApplication();
