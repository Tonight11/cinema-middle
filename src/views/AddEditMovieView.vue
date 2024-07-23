<template>
  <div class="add-edit-movie">
    <h1>{{ isEdit ? 'Изменить' : 'Добавить' }}</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="title">Название:</label>
        <Field id="title" name="title" type="text" />
        <ErrorMessage name="title" />
      </div>

      <div>
        <label for="year">Год:</label>
        <Field id="year" name="year" type="number" />
        <ErrorMessage name="year" />
      </div>

      <div>
        <label for="genre">Жанр:</label>
        <Field id="genre" name="genre" type="text" />
        <ErrorMessage name="genre" />
      </div>

      <div>
        <label for="rating">Рейтинг:</label>
        <Field id="rating" name="rating" type="number" />
        <ErrorMessage name="rating" />
      </div>

      <div>
        <label for="description">Описание:</label>
        <Field id="description" name="description" type="text" />
        <ErrorMessage name="description" />
      </div>

      <div>
        <label for="imageUrl">Обложка:</label>
        <Field id="imageUrl" name="imageUrl" type="text" />
        <ErrorMessage name="imageUrl" />
      </div>

      <button type="submit">
        {{ isEdit ? 'Обновить' : 'Добавить' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useForm, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useMoviesStore } from '@/stores/movies'
import { v4 as uuidv4 } from 'uuid'
import type { Movie } from '@/types/movie.types'

const moviesStore = useMoviesStore()
const router = useRouter()
const route = useRoute()
const isEdit = !!route.params.id
const movieId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

const validationSchema = yup.object({
  title: yup.string().required('Название обязательный пункт'),
  year: yup
    .number()
    .required('Год обязательный пункт')
    .min(1800, 'Год ниже 1800')
    .max(new Date().getFullYear(), `Год не может быть выше ${new Date().getFullYear()}`),
  genre: yup.string().required('Жанр обязательный пункт'),
  rating: yup
    .number()
    .required('Рейтинг обязательный пункт')
    .min(1, 'Рейтинг между 1 и 10')
    .max(10, 'Рейтинг между 1 и 10'),
  description: yup.string().required('Описание обязательный пункт'),
  imageUrl: yup.string().url('Ссылка не валидна').required('Ссылка обязательный пункт')
})

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: isEdit
    ? moviesStore.getMovieById(movieId)
    : {
        id: uuidv4(),
        title: '',
        year: new Date().getFullYear(),
        genre: '',
        rating: 1,
        description: '',
        imageUrl: ''
      }
})

const onSubmit = handleSubmit((values: Movie) => {
  const movieId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  if (movieId) {
    moviesStore.updateMovie(movieId, values)
  } else {
    moviesStore.addMovie(values)
  }
  router.push({ name: 'Home' })
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/var';
@import '@/assets/scss/mixins';

.add-edit-movie {
  h1 {
    margin-bottom: 20px;
    font-size: 2rem;
    color: $primary-color;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    label {
      font-size: 1rem;
      margin-bottom: 5px;
    }

    input {
      @include input-style;
    }

    .error {
      color: #e74c3c;
      font-size: 0.875rem;
    }

    button {
      @include button-style($primary-color, #fff);
      align-self: flex-start;
    }
  }
}
</style>
