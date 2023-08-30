import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useMovieStore = defineStore("movieStore", () => {
  const movies = ref([]);
  const activeTab = ref(2);
  const moviesInLocaStorage = localStorage.getItem("movies");
  if (moviesInLocaStorage) {
    movies.value = JSON.parse(moviesInLocaStorage)._value;
  }
  const watchedMovies = computed(() => {
    if (movies.value.length) {
      return movies.value.filter((movie) => movie.isWatched === true);
    }
    return [];
  });
  const totalCountMovies = computed(() => {
    return movies.value.length;
  });
  function setActiveTab(id) {
    activeTab.value = id;
  }
  function toggleWatched(id) {
    const idx = movies.value.findIndex((movie) => movie.id === id);
    movies.value[idx].isWatched = !movies.value[idx].isWatched;
  }
  function removeMovie(id) {
    movies.value = movies.value.filter((movie) => movie.id !== id);
  }

  watch(
    () => movies,
    (state) => {
      localStorage.setItem("movies", JSON.stringify(state));
    },
    { deep: true }
  );

  return {
    movies,
    activeTab,
    watchedMovies,
    totalCountMovies,
    toggleWatched,
    removeMovie,
    setActiveTab,
  };
});
