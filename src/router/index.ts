import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AddEditMovieView from '@/views/AddEditMovieView.vue';
import MovieDetailsView from '@/views/MovieDetailsView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/add',
    name: 'AddMovie',
    component: AddEditMovieView,
  },
  {
    path: '/edit/:id',
    name: 'EditMovie',
    component: AddEditMovieView,
    props: true,
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetailsView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;