import React from "react";
import "./MovieCard.css";
import Star from "../../star.png";

const MovieCard = ({ movie }) => {
  return (
    <a
      href={`https:www.themoviedb.org/movie/${movie.id}`}
      target="_blank"
      className="movie-card"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt="Movie poster"
        className="movie-poster"
      />

      <div className="movie-overlay">
        <h3 className="movie-title">{movie.original_title}</h3>

        <div className="movie-meta">
          <span className="movie-date">{movie.release_date}</span>
          <span className="movie-rating">
            {movie.vote_average.toFixed(1)} <img src={Star} alt="star" />
          </span>
        </div>

        <p className="movie-desc">{movie.overview.slice(0, 100) + "..."}</p>
      </div>
    </a>
  );
};

export default MovieCard;
