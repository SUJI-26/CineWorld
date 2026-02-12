import React from "react";
import "./Navbar.css";
import Fire from "../../fire.png";
import Star from "../../glowing-star.png";
import Party from "../../partying-face.png";


const Navbar = () => {
  return (
    <nav className='navbar'>
        <h1>CineWorld</h1>
        <div className="navbar-links">
            <a href="#popular">Popular <img src={Fire} alt="fire emoji" className="navbar-emoji"/></a>
            <a href="#top_rated">Top Rated <img src={Star} alt="star emoji" className="navbar-emoji"/></a>
            <a href="#upcoming">Upcoming<img src={Party} alt="party emoji" className="navbar-emoji"/></a>
        </div>
    </nav>

  )
}

export default Navbar;
