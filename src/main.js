import { createApp } from 'vue'
import App from './App.vue'
//style
import 'flowbite'
import './assets/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from './router'
import store from './store'

import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/'
axios.defaults.withCredentials = true

store.dispatch('authenticate').then(() => {
  const app = createApp(App)
  app.use(ElementPlus);
  app.use(router);
  app.use(store);
  app.mount('#app')
})

