<template>
  <form @submit.prevent="searchStore.getMovies(searchMovie)">
    <input
      type="text"
      class="search-input"
      placeholder="Input movie"
      v-model="searchMovie"
    />
  </form>

  <Loader v-if="searchStore.loader"/>
  <div v-else>
    <Movie v-for="movie in searchStore.movies" :key="movie.id" :movie="movie" :isSearch="true"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Movie from "./Movie.vue";
import Loader from "../components/Loader.vue";
import { useSearchStore } from "../stores/searchStore";
const searchMovie = ref("");
const searchStore = useSearchStore();
</script>

<style lang="css">
.search-input {
  border: 1px solid #e7e7e7;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 10px;
}
</style>
