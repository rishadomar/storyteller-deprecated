import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/stories'
  },
  {
      path: '/stories',
      name: 'Stories',
      component: () => import('@/views/Stories.vue')
  },
  {
      path: '/story/:storyId',
      name: 'Story',
      props: (route) => ({ storyId: route.params.storyId }),
      component: () => import('@/views/Story.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
