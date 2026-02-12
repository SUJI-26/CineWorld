import React from "react";

const FilterGroup = ({ minRating, onRatingClick, rating }) => {
  return (
    <ul className="align-center movie-filter">
      {rating.map((rate) => (
        <li
          key={rate}
          className={`movie-filter-item ${minRating === rate ? "active" : ""}`}
          onClick={() => onRatingClick(rate)}
        >
          {rate}+ Star
        </li>
      ))}
    </ul>
  );
};

export default FilterGroup;
