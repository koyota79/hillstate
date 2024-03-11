import { createApp } from 'vue'
//import { store } from './store';
import { router } from './router'; // 라우터 추가하고 

import App from './App.vue'

import { stackedUI } from 'vue-stacked-ui'
import 'vue-stacked-ui/dist/vue-stacked-ui.css'

import Menu from './components/Menu'
import MainSlide from './components/MainSlide.vue';
import axios from 'axios';
import {Axios ,hostUrl} from './baseURL';

// axios를 import



// Create Vue Instance
const app = createApp(App);

app.config.globalProperties.$axios = axios
app.config.globalProperties.$hostUrl = hostUrl
app.config.globalProperties.$Axios = Axios

//app.use(stackedUI, {router: router}); 
app.use(router); // 사용 설정 하기
app.component('side-menu', Menu);
app.component('main-slide', MainSlide);
app.mount('#app');