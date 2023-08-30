import { defineStore } from "pinia";
import { useMovieStore } from "./movieStore";
import { ref } from "vue";
import Movie from "../models/Movie";

const url = "https://kinopoiskapiunofficial.tech/api/v2.1/films/";
const API_KEY = "1a9d7811-b08f-4cde-ad8c-2fafa8b5c435";

export const useSearchStore = defineStore("searchStore", () => {
  const loader = ref(false);
  const movies = ref([]);

  async function getMovies(search) {
    loader.value = true;
    const res = await fetch(
      `${url}search-by-keyword?${new URLSearchParams({
        keyword: search,
      }).toString()}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    movies.value = data.films.map((el) => {
      return Movie.createFromApi(el);
    });
    loader.value = false;
  }
  function addToUserMovies(obj) {
    const movieStore = useMovieStore();
    movieStore.movies.push({ ...obj, isWatched: false });
    movieStore.activeTab = 1;
  }

  return {
    loader,
    movies,
    getMovies,
    addToUserMovies,
  };
});
