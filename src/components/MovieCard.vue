<template>
  <div class="movie-card" @click="navigateToDetails">
    <img :src="movie.imageUrl" alt="Movie Image" class="movie-image" />
    <div class="movie-info">
      <h3>{{ movie.title }}</h3>
      <p class="year">Год: {{ movie.year }}</p>
      <p class="rating">Рейтинг: {{ movie.rating }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import type { Movie } from '@/types/movie.types'

const props = defineProps<{ movie: Movie }>()

const router = useRouter()

const navigateToDetails = () => {
  router.push({ name: 'MovieDetails', params: { id: props.movie.id } })
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/var';
@import '@/assets/scss/mixins';

.movie-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition:
    transform 0.3s,
    box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .movie-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .movie-info {
    padding: 20px;
    text-align: center;

    h3 {
      margin: 0 0 10px;
      font-size: 1.2rem;
      color: $primary-color;
    }

    .year,
    .rating {
      margin: 5px 0;
      font-size: 0.9rem;
    }

    .rating {
      font-weight: bold;
      color: $secondary-color;
    }

    .year {
      color: $font-color;
    }
  }
}
</style>
