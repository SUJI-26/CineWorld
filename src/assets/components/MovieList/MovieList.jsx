import React, { useEffect, useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import FilterGroup from "./FilterGroup";

const MovieList = ({type ,title , emoji}) => {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);

  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    applyFilterAndSort();
  }, [minRating, sort, allMovies]);

  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=1cbb965f8a5fb9fa46f46dacd3cd0709`
    );
    const data = await response.json();
    setAllMovies(data.results);
    setFilteredMovies(data.results);
  };

  const applyFilterAndSort = () => {
    let movies = [...allMovies];

    // 🔹 Filter by rating
    if (minRating > 0) {
      movies = movies.filter(
        (movie) => movie.vote_average >= minRating
      );
    }

    // 🔹 Sort
    if (sort.by !== "default") {
      movies.sort((a, b) => {
        if (sort.by === "release_date") {
          return sort.order === "asc"
            ? new Date(a.release_date) - new Date(b.release_date)
            : new Date(b.release_date) - new Date(a.release_date);
        }

        if (sort.by === "vote_average") {
          return sort.order === "asc"
            ? a.vote_average - b.vote_average
            : b.vote_average - a.vote_average;
        }

        return 0;
      });
    }

    setFilteredMovies(movies);
  };

  const handleFilter = (rate) => {
    setMinRating(rate === minRating ? 0 : rate);
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="movie-list" id={type}>
      <header className="align-center movie-list-header">
        <h2 className="align-center movie-list-heading">
          {title} <img src={emoji} alt= {`${emoji} icon`} className="navbar-emoji" />
        </h2>

        <div className="align-center movie-list-fs">
          <FilterGroup
            minRating={minRating}
            onRatingClick={handleFilter}
            rating={[8, 7, 6]}
          />

          <select
            name="by"
            onChange={handleSort}
            value={sort.by}
            className="movie-sorting"
          >
            <option value="default">Sort By</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>

          <select
            name="order"
            onChange={handleSort}
            value={sort.order}
            className="movie-sorting"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>

      <div className="movie-cards">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
