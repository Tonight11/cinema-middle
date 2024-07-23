<template>
  <div class="home-page">
    <h1 class="title">Каталог Фильмов</h1>
    <button class="home-page__btn" @click="navigateToAddMovie">Добавить фильм</button>
    <div class="movie">
      <div class="movie__filters">
        <div class="movie__label">
          <label for="search">Поиск:</label>
          <input id="search" v-model="searchQuery" placeholder="Введите название фильма" />
        </div>
        <div class="movie__label">
          <label for="sort">Сортировать по:</label>
          <select id="sort" v-model="sortBy">
            <option value="title">Название</option>
            <option value="year">Год</option>
            <option value="rating">Рейтинг</option>
          </select>
        </div>
      </div>
      <div class="movie-list">
        <MovieCard v-for="movie in filteredAndSortedMovies" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMoviesStore } from '@/stores/movies'
import type { Movie } from '@/types/movie.types'
import MovieCard from '@/components/MovieCard.vue'

const router = useRouter()
const moviesStore = useMoviesStore()
const movies = ref<Movie[]>([])
const searchQuery = ref('')
const sortBy = ref('title')

const filteredAndSortedMovies = computed(() => {
  const filteredMovies = moviesStore.movies.filter((movie: Movie) =>
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )

  return filteredMovies.sort((a, b) => {
    if (sortBy.value === 'title') {
      return a.title.localeCompare(b.title)
    }
    if (sortBy.value === 'year') {
      return a.year - b.year
    }
    if (sortBy.value === 'rating') {
      return b.rating - a.rating
    }
    return 0
  })
})

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

.movie {
  &__filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__label {
    display: flex;
    flex-direction: column;

    label {
      font-size: 1rem;
      margin-bottom: 5px;
      color: $secondary-color;
    }

    input,
    select {
      @include input-style; /* assuming you have defined this mixin for consistent styling */
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #ccc;
      font-size: 1rem;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: $primary-color;
        outline: none;
      }
    }
    select {
      cursor: pointer;
    }
  }
}
</style>
