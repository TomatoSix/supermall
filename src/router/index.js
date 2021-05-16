import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
<<<<<<< HEAD
const Detail = () => import('../views/detail/Detail')

=======
>>>>>>> f142d536a34deb6a048aef49983de911444270a1

Vue.use(VueRouter)

const routes =[
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopcart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
<<<<<<< HEAD
  },
  {
    path: '/detail/:iid',
    component: Detail
=======
>>>>>>> f142d536a34deb6a048aef49983de911444270a1
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
