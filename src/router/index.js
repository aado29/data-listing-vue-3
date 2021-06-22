import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Character from '../views/Character.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: ':id',
        component: Character,
        props: true,
        meta: {
          showModal: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
