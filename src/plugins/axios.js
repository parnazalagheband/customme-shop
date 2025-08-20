import axios from 'axios';

const api = axios.create({
  baseURL: 'https://demo.spreecommerce.org/api/v2/storefront',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache'
  },
});

export default api;

export const axiosPlugin = {
  install: (app) => {
    app.config.globalProperties.$axios = api;
  },
};
