/* eslint-disable no-unused-vars */
import {useCallback, useEffect, useState} from "react"
import {BsArrowLeftCircle, BsArrowRightCircle} from "react-icons/bs"
import {MdOutlineArrowBackIosNew} from "react-icons/md"
import {useDispatch, useSelector} from "react-redux"
import {Link, useNavigate, useParams} from "react-router-dom"

import {
  getCocktailById,
  getCocktailsByName,
  setStoredCocktailsAction,
} from "../../features/cocktails/coctailsSlice"
import useLocalStorage from "../../hooks/useLocalStorage"
import useLocalStorageToRedux from "../../hooks/useLocalStorageToRedux"
import {extractIngredientsAndMeasures} from "../../utils/extractIngredientsAndMeasures"
import {replacedCategory} from "../../utils/stringMethods"

import "./CardDetails.scss"

/* Using useLocalStorage and useLocalStorageToRedux hooks 

 const [storeValue, seStoreValue] = useLocalStorage(key, value)
 const [localStorageValue, updateReduxState] = useLocalStorageToRedux(
   key,
   reduxActions,
 )
*/
function CardDetails({routeVisible}) {
  const {cocktails, cocktail, lastSearch, isLoading, isError} = useSelector(
    (state) => state.cocktails,
  )
  const {strDrink, strDrinkThumb, strInstructions, strCategory, strAlcoholic} = cocktail
  const {ingredients, measures} = extractIngredientsAndMeasures(cocktail)
  const [index, setIndex] = useState(0)

  const [localStorageValue, updateReduxState] = useLocalStorageToRedux(
    "cocktails",
    setStoredCocktailsAction,
  )
  const [value, setValue] = useLocalStorageToRedux("cocktails", [])

  const dispatch = useDispatch()
  const memoizedDispatch = useCallback(dispatch, [dispatch])
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    //Get ReduxState With LocalStorage

    if (!localStorageValue) {
      dispatch(getCocktailsByName(lastSearch))
    } else {
      updateReduxState(localStorageValue)
    }

    calculateIndex()
    memoizedDispatch(getCocktailById(id))
    routeVisible(true)

    return () => {
      routeVisible(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, index])

  const calculateIndex = () => {
    const newIndex =
      cocktails.indexOf(cocktail) ||
      cocktails.findIndex((item) => item.idDrink === cocktail.idDrink)
    const secondIndex = cocktails.findIndex((item) => item.idDrink === cocktail.idDrink)

    setIndex(newIndex)
  }

  const changeCocktail = (e) => {
    e.preventDefault()

    const categoryName = strCategory.toLowerCase()
    const lastIndex = cocktails.length - 1
    const replaceCategory = replacedCategory(categoryName)

    const goLeft = () => {
      const newIndex = index === 0 ? lastIndex : index - 1
      setIndex(newIndex)
      navigate(`/cocktails/${replaceCategory}/${cocktails[newIndex].idDrink}`)
    }

    const goRight = () => {
      const newIndex = index === lastIndex ? 0 : index + 1
      setIndex(newIndex)
      navigate(`/cocktails/${replaceCategory}/${cocktails[newIndex].idDrink}`)
    }

    if (e.target.id === "left") {
      goLeft()
    } else if (e.target.id === "right") {
      goRight()
    }
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>
  }

  return (
    <>
      <Link
        to='/search'
        className='back-button'
      >
        <MdOutlineArrowBackIosNew />
        Back to Search
      </Link>

      <div className='card-details-container'>
        {!isLoading && (
          <>
            <section className='card-details-image'>
              <div className='card-title'>
                <h1>{strDrink}</h1>
              </div>
              <img
                src={strDrinkThumb}
                className='details-image'
                alt={strDrink}
              />
            </section>

            <section className='card-details'>
              <div className='card-details-features'>
                <h3>Category - Alcoholic</h3>
                <p className='category'>
                  {strCategory} - {strAlcoholic}
                </p>

                <h3>Measures</h3>
                <ul className='ingredient-list'>
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>
                      <p className='ingredient'>{ingredient}</p>
                      <p className='measures'>{measures[index]}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <h3>Instructions</h3>
              <div className='card-instructions'>
                <p>{strInstructions}</p>
              </div>
            </section>
          </>
        )}
      </div>
      <BsArrowLeftCircle
        id='left'
        onClick={changeCocktail}
      />
      <BsArrowRightCircle
        id='right'
        onClick={changeCocktail}
      />
    </>
  )
}

export default CardDetails
