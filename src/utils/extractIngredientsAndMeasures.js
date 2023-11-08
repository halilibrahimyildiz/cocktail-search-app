export const extractIngredientsAndMeasures = (cocktailObject) => {
  const ingredients = []
  const measures = []

  Object.keys(cocktailObject).forEach((key) => {
    if (key.startsWith("strIngredient") && cocktailObject[key] !== null) {
      ingredients.push(cocktailObject[key])
    }
    if (key.startsWith("strMeasure") && cocktailObject[key] !== null) {
      measures.push(cocktailObject[key])
    }
  })

  return {ingredients, measures}
}
