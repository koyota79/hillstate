import { createWebHistory, createRouter } from 'vue-router';

import About from './views/About'
import Main from './views/Main'
import Header from './views/Header'
import ErrorPage from './views/ErrorPage'
import Content from './views/Content'
import SiteMap from './views/SiteMap'

const routes = [
      {
        path: '/',
        name: 'defaultLayout',
        component: () => import('./views/DefaultLayout.vue'),
        children: [
            {
              path: '/',
              name: 'Main',
              component: ()=> import('./views/Main.vue'),
            },
            { 
              path: '/content',
              name: 'Content',
              component: ()=> import('./views/Content.vue'),
            },
            { 
              path: '/site_map',
              name: 'Site_map',
              component: ()=> import('./views/SiteMap.vue'),
          },
          // {path: '/notFound', component: ErrorPage },
          // {
          //     path: "/:pathMatch(.*)*",
          //     redirect: "/notFound"
          //   }            
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

export {router}