import React from "react"
import {Link} from "react-router-dom"

import "./Home.scss"

function Home() {
  return (
    <div className='home'>
      <h2 className='home-title'>Welcome to Cocktail Search App!</h2>
      <div className='home-container'>
        <p className='home-promotion'>
          Cocktail Lab is a discovery platform that brings you the most delightful cocktails from
          all around the world. Here, you're at the right place to dive into the depths of the
          cocktail world and savor creative beverages.
        </p>
        <p className='home-promotion--title'>
          <strong>What Can You Do?</strong>
        </p>
        <ul>
          <li>
            Discover thousands of different cocktail recipes, from classics to unique creations.
          </li>
          <li>Search for cocktails based on specific ingredients or types of spirits.</li>
          <li>Access detailed recipes with step-by-step instructions and ingredient lists.</li>
        </ul>
        {/* <p className='home-promotion--title'>
          <strong>Why Choose Cocktail Lab?</strong>
        </p>
        <p>
          It's not just a recipe source; it's a community where you can learn, exchange ideas, and
          expand your knowledge about beverages.
        </p> */}
        <div className='navigate-button'>
          <Link
            to={"/search"}
            className='btn btn-dark'
          >
            Let's Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
