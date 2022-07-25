import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DetailPost from "../views/DetailPost.vue";
import AdminPost  from "../views/Admin/Posts.vue"
import EditPost from "../views/Admin/EditPost.vue"
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin/posts/:slug/edit',
      name: 'admin.posts.edit',
      component: EditPost,
      props : true,
      beforeEnter: (to,from,next) => {
        if(!store.getters.authenticated)
        {
          return next({name : 'login'})
        }
        return next()
      }
    },
    {
      path: '/admin/posts',
      name: 'admin.posts',
      component: AdminPost,
      beforeEnter: (to,from,next) => {
          if(!store.getters.authenticated)
          {
            return next({name : 'login'})
          }
        return next()
      }
    },
    {
      path: '/post/detail/:slug',
      name: 'detailpost',
      component: DetailPost,
      props : true
    }
  ]
})

export default router
