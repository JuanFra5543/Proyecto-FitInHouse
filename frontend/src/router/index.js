import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: () => import('../views/ClienteAdminViews/Clientes.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/ingredientes',
    name: 'Ingredientes',
    component: () => import('../views/IngredientesViews/Ingredientes.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/menus',
    name: 'Menus',
    component: () => import('../views/MenusViews/Menus.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/planesAlim',
    name: 'PlanesAlimenticios',
    component: () => import('../views/PlanesViews/PlanAlim.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/cronograma',
    name: 'Cronograma',
    component: () => import('../views/CronogramasViews/Cronogramas.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/cronograma/crear',
    name: 'CrearCronograma',
    component: () => import('../views/CronogramasViews/CreacionCronogramas.vue'),
    meta: {requireAuth: true},
    child:[
      
    ]
  },
  {
    path: '/cronograma/crear/:id',
    name: 'CrearPlanCronograma',
    props: true,
    component: () => import('../views/CronogramasViews/CreacionPlanCronograma.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/cronograma/revisar',
    name: 'RevisarCronograma',
    component: () => import('../views/CronogramasViews/RevisionCronogramas.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/cronograma/revisar/:id',
    name: 'RevisarPlanCronograma',
    props: true,
    component: () => import('../views/CronogramasViews/RevisionPlanCronograma.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/cronograma/revisar/:id/:mes',
    name: 'RevisarPlanMesCronograma',
    props: true,
    component: () => import('../views/CronogramasViews/RevisionPlanMesCronograma.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/cronograma/revisar/:id/:mes/:cid',
    name: 'RPMCronogramaIndividual',
    props: true,
    component: () => import('../views/CronogramasViews/RPMCronogramaIndividual.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/consejos',
    name: 'Consejos',
    component: () => import('../views/ConsejosViews/Consejos.vue'),
    meta: {requireAuth: true}
  },
  {
    path:'/creacionUsuario',
    name:'CreacionUsuario',
    component: () => import('../views/CreacionUsuario.vue'),
  },
  {
    path:'/inicio',
    name:'Inicio',
    component: () => import('../views/ClienteView/InicioCliente.vue'),
    meta: {requireAuth: true}
  },
  {
    path:'/inicio/:id',
    name:'Cambio Menu',
    component: () => import('../views/ClienteView/CambioMenu.vue'),
    meta: {requireAuth: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  const rutaProtegida =to.matched.some(record => record.meta.requireAuth)
  if(rutaProtegida && store.state.token === ''){
    next({name:'Home'})
  }else{
    next();
  }
})

export default router
