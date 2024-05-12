import { createApp } from 'vue'
//import { store } from './store';
import { router } from './router'; // 라우터 추가하고 

import App from './App.vue'

import { stackedUI } from 'vue-stacked-ui'
import 'vue-stacked-ui/dist/vue-stacked-ui.css'

import Menu from './components/Menu'
import MainSlide from './components/MainSlide';
import TopLogo from './components/TopLogo';
import Search from './components/Search';
import Footer from './components/Footer'; 
import LoadingBar from './components/LoadingBar'; 

import axios from 'axios';
import {Axios ,hostUrl} from './baseURL';
import Store from "./store/store";

// axios를 import



// Create Vue Instance
const app = createApp(App);

app.config.globalProperties.$axios = axios
app.config.globalProperties.$hostUrl = hostUrl
app.config.globalProperties.$Axios = Axios
app.config.productionTip = false
app.config.globalProperties.$Store = Store
app.provide('Axios', Axios)
app.config.globalProperties.$Category = [
    {id : "ALL", value: "전체"},
    {id : "FOOD", value: "식당/카페"},
    {id : "BEAUTY", value: "뷰티"},
    {id : "SHOP", value: "쇼핑"},
    {id : "SERVICE", value: "문화/서비스"}
]
app.provide('Category', 
    [
        {id : "ALL", value: "전체"},
        {id : "FOOD", value: "식당/카페"},
        {id : "BEAUTY", value: "뷰티"},
        {id : "SHOP", value: "쇼핑"},
        {id : "SERVICE", value: "문화/서비스"}
    ]
)

app.provide('Zone', {0 : '가' ,1 : '나' ,2 : '다' ,3 : '라'})
app.config.globalProperties.$Zone = {0 : '가' ,1 : '나' ,2 : '다' ,3 : '라'}


//app.use(stackedUI, {router: router}); 
app.use(router); // 사용 설정 하기
app.use(Store);
app.component('side-menu',      Menu);
app.component('main-slide',     MainSlide);
app.component('top-logo',       TopLogo);
app.component('search',         Search);
app.component('footer-cont',    Footer);
app.component('loadingBar',     LoadingBar);


app.mount('#app');