import { createWebHistory, createRouter } from 'vue-router';

import About from './views/About'
import Main from './views/Main'
//import Header from './views/Header'
import ErrorPage from './views/ErrorPage'
import Content from './views/Content'
import SiteMap from './views/SiteMap'
import ShopDetail from './views/ShopDetail'
import Event from './views/Event'
import Location from './views/Location.vue'
import Category from './views/Category.vue'

const routes = [
      {
        path: '/',
        name: 'defaultLayout',
        component: () => import('./views/DefaultLayout.vue'),
        children: [
            {
              path: '/',
              name: 'Main',
              component: ()=> Main
            },
            { 
              path: '/location',
              name: 'Location',
              component: ()=> Location
            },
            { 
              path: '/content',
              name: 'Content',
              component: ()=> Content
            },
            { 
              path: '/site_map',
              name: 'Site_map',
              props : true,
              component: ()=> SiteMap
            },
            { 
              path: '/shop_info/:shop_id',
              name: 'ShopDetail',
              props : true,
              component: ()=> ShopDetail
            },            
            { 
              path: '/event',
              name: 'Event',
              component: ()=> Event
            },
            { 
              path: '/category/:id',
              name: 'Category',
              props : true,
              component: ()=> Category
            },                                    
            {path: '/notFound', component: ErrorPage },
            {
              path: "/:pathMatch(.*)*",
              redirect: "/notFound"
            }         
        ],
      }
  
  // {
  // path: '/', components:{ 
  //     'Header' : Header,
  //      default : Main } 
  // }, 
  // {path: '/About', component: About },
  // {path: '/Content', component: Content},


  // {path: '/notFound', component: ErrorPage },
  // {
  //   path: "/:pathMatch(.*)*",
  //   redirect: "/notFound"
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


// router.beforeEach(function (to, from, next) {
//   // to : 이동할 url
//   // from : 현재 url
//   // next : to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
//   console.log(to , from) 
//   next()
// });

export {router}