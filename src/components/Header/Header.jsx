import {FaCocktail} from "react-icons/fa"
import {HiInformationCircle, HiSearch} from "react-icons/hi"
import {HiHome} from "react-icons/hi2"
import {Link} from "react-router-dom"

import "./Header.scss"

function Header() {
  return (
    <header className='main-header'>
      <div className='header-container'>
        <Link
          to='/'
          className='anchor'
        >
          <div className='brand'>
            <FaCocktail />
            <p className='brand-title'>Cocktail Search App</p>
          </div>
        </Link>

        <div className='pages'>
          <ul>
            <li>
              <Link
                to={"/"}
                className='anchor '
              >
                <HiHome />
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/search"}
                className='anchor '
              >
                <HiSearch />
                Search
              </Link>
            </li>{" "}
            <li>
              <Link
                to={"/about"}
                className='anchor '
              >
                <HiInformationCircle />
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
