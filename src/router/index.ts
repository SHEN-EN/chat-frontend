import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: ()=>import('@/views/Login.vue')
    },
    {
        path:'/home',
        name:"home",
        component: ()=>import('@/views/home/index.vue'),
        children: [
            {
                path:'/chat',
                name:'chat',
                component: ()=>import('@/views/home/chat/index.vue')
            },
            {
                path:'/friend',
                name:'friend',
                component: ()=>import('@/views/home/friend/index.vue'),
            }
        ]
    }
  ]
})

export default router
