import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import store from "@/store"
import App from './../App.vue';
import Categoria from '../views/admin/categoria/Categoria'
import Producto from '../views/admin/producto/Producto'

const routes = [
  {
    path: '/',
    name: 'app',
    component: App,
    children: [
      {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/categoria',
        name: 'categoria',
        component: Categoria
      },
      {
        path: '/producto',
        name: 'Producto',
        component: Producto
      }
      
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Guards
router.beforeEach((to, from, next) => {
  console.log(to);
  
  if(to.meta.requireAuth){
    if(store.state.usuario != null) {
      next()
    }
    let token = localStorage.getItem("access_token")
    if(token){
      next()
    }
    next("/login")
  }
  next();
});


export default router
