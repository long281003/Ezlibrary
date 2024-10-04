import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultsComponent from '../components/DefaultsComponent.vue'
import store from '@/store'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultsComponent,
      children: [
         {
          path: '/',
          name: 'home',
          component: () => import('../views/HeaderView.vue')
        },
        {
          path: '/home',
          name: 'homeview',
          component: HomeView
        },
        {
          path: '/employee/update/:id',
          name: 'employee',
          component: () => import('../components/AddEmployee.vue')
        },
        {
          path: '/editmember',
          name: 'editmember',
          component: () => import('../components/EditMember.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/historyreading',
          name: 'historyreading',
          component: () => import('../views/ReadingHistory.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/readbook/:id',
          name: 'readbook',
          component: () => import('../views/ReadBook.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/detailbook/:id',
          name: 'detailbook',
          component: () => import('../components/DetailBook.vue'),
        },
        {
          path: '/payment/:id',
          name: 'payment',
          component: () => import('../views/PaymentView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/memberShip',
          name: 'memberShip',
          component: () => import('../components/MemberShip.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/security',
          name: 'security',
          component: () => import('../componentsHTMl/SecurityPolicy.vue')
        },
        {
          path: '/suportmember',
          name: 'suportmember',
          component: () => import('../views/SuportView.vue'),
          meta: {requiresAuth: true}
        },
        {
          path: '/suportuser',
          name: 'suportuser',
          component: () => import('../componentsHTMl/SupportUser.vue')
        },
        {
          path: '/booktagId/:id',
          name: 'booktag',
          component: () => import('../componentsHTMl/BookTags.vue')
        },
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('authtoken') 
    if(to.matched.some(record => record.meta.requiresAuth)){
      if (!token) {
        sessionStorage.removeItem('authtoken'); 
        store.dispatch('openAuthModal')
        next({ name: 'home' }) 
      } else {
          next() 
      }
    }else{
      next()
    }
})

export default router
