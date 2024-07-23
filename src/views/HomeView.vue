<template>
  <div class="home-page">
    <h1 class="title">Каталог Фильмов</h1>
    <button class="home-page__btn" @click="navigateToAddMovie">Добавить фильм</button>
    <div class="movie-list">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMoviesStore } from '@/stores/movies'
import type { Movie } from '@/types/movie.types'
import MovieCard from '@/components/MovieCard.vue'

const router = useRouter()
const moviesStore = useMoviesStore()
const movies = ref<Movie[]>([])

onMounted(() => {
  movies.value = moviesStore.movies
})

const navigateToAddMovie = () => {
  router.push({ name: 'AddMovie' })
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/var';
@import '@/assets/scss/mixins';

.home-page {

  &__btn {
    @include button-style($secondary-color, #fff);
    margin-bottom: 20px;
  }

  .movie-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
}
</style>
