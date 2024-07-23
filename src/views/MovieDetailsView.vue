<template>
  <div class="movie-details-page">
    <div class="movie-details-page__edit">
      <button @click="navigateToEditMovie">Изменить</button>
      <button @click="confirmDeletion">Удалить</button>
    </div>
    <div class="movie-details-page__info">
      <h1>{{ movie?.title }}</h1>
      <p>год: {{ movie?.year }}</p>
      <p>рейтинг: {{ movie?.rating }}</p>
      <p>жанр: {{ movie?.genre }}</p>
      <p>{{ movie?.description }}</p>
      <img :src="movie?.imageUrl" alt="Movie Image" v-if="movie?.imageUrl" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMoviesStore } from '@/stores/movies'
import type { Movie } from '@/types/movie.types'

const router = useRouter()
const route = useRoute()
const moviesStore = useMoviesStore()
const movie = ref<Movie | null>(null)

onMounted(() => {
  const movieId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  const movieToEdit = moviesStore.getMovieById(movieId)
  if (movieToEdit) {
    movie.value = { ...movieToEdit }
  }
})

const navigateToEditMovie = () => {
  router.push({ name: 'EditMovie', params: { id: movie.value?.id } })
}

const confirmDeletion = async () => {
  const movieId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  if (confirm('Реально хочешь удалить?')) {
    moviesStore.deleteMovie(movieId)
    router.push({ name: 'Home' })
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/var';
@import '@/assets/scss/mixins';

.movie-details-page {
  border-radius: 8px;
  box-shadow: 0 15px 15px rgba(146, 54, 231, 0.1);
  padding: 20px;

  &__edit {
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }

  &__info {
  }

  h3 {
    margin: 0 0 10px;
    font-size: 1.2rem;
  }

  p {
    margin: 5px 0;
    font-size: 0.9rem;
  }
}
</style>
