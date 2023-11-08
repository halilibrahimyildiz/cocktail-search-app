import {useEffect, useState} from "react"
import {MdOutlineSearchOff} from "react-icons/md"
import {useDispatch, useSelector} from "react-redux"

import Card from "../../components/Card/Card"
import Pagination from "../../components/Pagination/Pagination"
import Spinner from "../../components/Spinner/Spinner"
import {
  getCocktailFirstLetter,
  getCocktailsByName,
  setLastSearchAction,
  setStoredCocktailsAction,
} from "../../features/cocktails/coctailsSlice"
import useLocalStorage from "../../hooks/useLocalStorage"
import useLocalStorageToRedux from "../../hooks/useLocalStorageToRedux"

import "./Search.scss"

function Search() {
  const {cocktails, isSuccess, isLoading, isError} = useSelector((state) => state.cocktails)
  const [cocktailName, setCocktailName] = useState("")

  // eslint-disable-next-line no-unused-vars
  const [searchValue, setSearchValue] = useLocalStorage("lastSearch", "")
  const [localStorageValue, updateReduxState] = useLocalStorageToRedux(
    "cocktails",
    setStoredCocktailsAction,
  )
  const [lastsearch, updateReduxSearch] = useLocalStorageToRedux("lastSearch", setLastSearchAction)

  const [currentPage, setCurrentPage] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [cocktailsPerPage, setCocktailsPerPage] = useState(8)

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  const lastCocktailIndex = currentPage * cocktailsPerPage
  const firstCocktailIndex = lastCocktailIndex - cocktailsPerPage

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      console.log(isError)
    }
    if (!isSuccess) {
      updateReduxState(localStorageValue)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageValue, lastsearch, cocktails])

  const onSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    setSearchValue(cocktailName)

    dispatch(getCocktailsByName(cocktailName))
    updateReduxSearch(cocktailName)

    if (localStorageValue.lenght) {
      updateReduxState(localStorageValue)
    }
  }

  const onClick = (e) => {
    e.preventDefault()

    setCurrentPage(1)
    dispatch(getCocktailFirstLetter(e.target.innerText))
  }

  return (
    <>
      <section className='input-container'>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='search-input'
            placeholder={`Enter a cocktail name - Last search '${lastsearch}'`}
            value={cocktailName}
            onChange={(e) => setCocktailName(e.target.value)}
          />
          <button
            type='submit'
            className='btn btn-dark'
          >
            Search
          </button>
        </form>
      </section>

      <div className='card-main-container'>
        {!isLoading ? (
          <section className='card-container'>
            {cocktails ? (
              cocktails.slice(firstCocktailIndex, lastCocktailIndex).map((cocktail, key) => (
                <Card
                  cocktail={cocktail}
                  key={key}
                />
              ))
            ) : (
              <div className='not-result'>
                <MdOutlineSearchOff className='search-off' />

                <p style={{fontSize: "32px", fontWeight: "600"}}>Not Result...</p>
                <p style={{fontSize: "24px", fontWeight: "300"}}>
                  Please enter a correct cocktail name or click a letter{" "}
                </p>
              </div>
            )}
          </section>
        ) : (
          <Spinner />
        )}

        <section className='pagination-container'>
          <div className='alphabet'>
            {alphabet.split("").map((letter, key) =>
              letter === "Z" ? (
                <span
                  key={key}
                  className='letter'
                  onClick={onClick}
                >
                  {letter}
                </span>
              ) : (
                <>
                  <span
                    className='letter'
                    onClick={onClick}
                  >
                    {letter}
                  </span>
                  <span> / </span>
                </>
              ),
            )}
          </div>
          <Pagination
            totalCocktails={!cocktails ? 0 : cocktails.length}
            cocktailsPerPage={cocktailsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </section>
      </div>
    </>
  )
}

export default Search
