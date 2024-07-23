import { defineStore } from 'pinia'
import type { Movie } from '@/types/movie.types'
import { v4 as uuidv4 } from 'uuid'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [
      {
        id: uuidv4(),
        title: 'Inception',
        year: 2010,
        genre: 'Sci-Fi',
        rating: 9,
        description: 'A mind-bending thriller',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/ru/f/f1/%D0%94%D1%8E%D0%BD%D0%B0_%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80.jpg'
      },
      {
        id: uuidv4(),
        title: 'Murder Memories',
        year: 2003,
        genre: 'Detective',
        rating: 10,
        description: 'A real world detective',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/ru/thumb/6/61/%D0%94%D1%8E%D0%BD%D0%B0_%E2%80%94_%D0%A7%D0%B0%D1%81%D1%82%D1%8C_%D0%B2%D1%82%D0%BE%D1%80%D0%B0%D1%8F_%28%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80%29.jpg/640px-%D0%94%D1%8E%D0%BD%D0%B0_%E2%80%94_%D0%A7%D0%B0%D1%81%D1%82%D1%8C_%D0%B2%D1%82%D0%BE%D1%80%D0%B0%D1%8F_%28%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80%29.jpg'
      }
    ] as Movie[]
  }),
  actions: {
    addMovie(movie: Movie) {
      this.movies.push(movie)
    },
    updateMovie(id: string, updatedMovie: Movie) {
      const index = this.movies.findIndex((movie) => movie.id === id)
      if (index !== -1) {
        this.movies[index] = updatedMovie
      }
    },
    deleteMovie(id: string) {
      this.movies = this.movies.filter((movie) => movie.id !== id)
    },
    getMovieById(id: string): Movie | undefined {
      return this.movies.find((movie) => movie.id === id)
    }
  },
  persist: true
})
