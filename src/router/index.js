import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Community from '../views/Community.vue'
import CreateArticle from '../views/CreateArticle.vue'
import Movies from '../views/Movies.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import ArticleDetail from '../components/ArticleDetail.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/community',
    name: 'Community',
    component: Community
  },
  {
    path: '/create-article',
    name: 'CreateArticle',
    component: CreateArticle
  },
  {
    path: '/article-detail/',
    name: 'ArticleDetail',
    component: ArticleDetail,
    props: true
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
