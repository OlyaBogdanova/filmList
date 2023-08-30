<template>
  <main>
    <div class="tabs">
      <button
        :class="['btn', { btn_green: activeTab === 1 }]"
        @click="setActiveTab(1)"
      >
        Favorite
      </button>
      <button
        :class="['btn', { btn_green:activeTab === 2 }]"
        @click="setActiveTab(2)"
      >
        Search
      </button>
    </div>
    <header class="header">
      <h2>My Favorite Movies</h2>
    </header>
    <div class="movies" v-if="activeTab === 1">
      <div>
        <h3>Watched Movies ({{ watchedMovies.length }})</h3>
        <Movie
          v-for="movie in watchedMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
      <h3>All Movies ({{ totalCountMovies }})</h3>
      <Movie
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <div class="search" v-else>
      <Search />
    </div>
  </main>
</template>
<script setup>
import { useMovieStore } from "./stores/movieStore";
import Search from "./components/Search.vue";
import Movie from "./components/Movie.vue";
import { storeToRefs } from "pinia";
const movieStore = useMovieStore();
const {activeTab, watchedMovies, totalCountMovies, movies}=storeToRefs(movieStore)

function setActiveTab(id) {
  movieStore.setActiveTab(id);
}
</script>

<style lang="css">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.header-logo {
  max-width: 50px;
  margin-right: 10px;
}
.btn {
  border: none;
  width: 100px;
  height: 40px;
  font-size: 14px;
  margin: 0 10px;
  border-radius: 10px;
  cursor: pointer;
  background: #efefef;
}
.btn:hover {
  opacity: 0.7;
}
.btn_green {
  background: #37df5c;
}
.tabs {
  display: flex;
  justify-content: center;
}
</style>
