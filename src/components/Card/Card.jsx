import {Link, useNavigate} from "react-router-dom"

import {extractIngredientsAndMeasures} from "../../utils/extractIngredientsAndMeasures"
import {getFirstTwoSentences, replacedCategory} from "../../utils/stringMethods"

import "./Card.scss"

function Card({cocktail}) {
  const {idDrink, strDrink, strCategory, strDrinkThumb, strInstructions} = cocktail

  const navigate = useNavigate()

  const strInstruction = getFirstTwoSentences(strInstructions)

  const {ingredients, measures} = extractIngredientsAndMeasures(cocktail)

  const onClick = () => {
    const categoryName = strCategory.toLowerCase()
    const replaceCategory = replacedCategory(categoryName)
    console.log("Hello")

    navigate(`/cocktails/${replaceCategory}/${idDrink}`)
  }

  return (
    <div className='card'>
      <img
        src={strDrinkThumb}
        className='card__image'
        alt={strDrinkThumb}
      />

      <div className='card__overlay'>
        <div className='card__header'>
          <svg
            className='card__arc'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path />
          </svg>
          <img
            className='card__thumb'
            src={strDrinkThumb}
            alt={strDrink}
          />
          <div className='card__header-text'>
            <h3 className='card__title'>{strDrink}</h3>
            <span className='card__status'>{strCategory}</span>
          </div>
        </div>
        <div className='ingredient-list'>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                <p className='ingredient'>
                  {ingredient}: <span>{measures[index]}</span>
                </p>
              </li>
            ))}
          </ul>
          <button
            type='submit'
            className='details'
            onClick={onClick}
          >
            Show details
          </button>
        </div>

        {/* <div className='navigate'>
          <p className='navigate_details'>Show details</p>
        </div> */}
      </div>
    </div>
  )
}

/* old jsx
    <div className='cards'>
      <div
        className='card'
        onClick={() => {
          const categoryName = strCategory.toLowerCase()
          const replaceCategory = replacedCategory(categoryName)

          navigate(`/cocktails/${replaceCategory}/${idDrink}`)
        }}
      >
        <div className='card-title'>
          <p>{strDrink}</p>
        </div>
        <div className='card-image'>
          <img
            src={strDrinkThumb}
            alt={strDrink}
          />
        </div>
        <div className='card-features'>
          <p>{strInstruction}</p>
        </div>
        <div className='card-backdrop'></div>
      </div>
    </div>


*/

export default Card
