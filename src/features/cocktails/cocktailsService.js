import axios from "axios"

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1"
const SEARCH_QUERY = "/search.php?s="
const DETAILS_QUERY = "/lookup.php?i="
const LETTER_QUERY = "/search.php?f=a"

const getCocktailsByName = async (cocktailName) => {
  try {
    const response = await axios.get(API_URL + SEARCH_QUERY + cocktailName)

    if (response.data.drinks) {
      localStorage.setItem("cocktails", JSON.stringify(response.data.drinks))
    }
    return response.data.drinks // response değerini döndür
  } catch (error) {
    console.log(error)
  }
}

const getCocktailFirstLetter = async (letter) => {
  try {
    const response = await axios.get(API_URL + LETTER_QUERY + letter)

    if (response.data.drinks) {
      localStorage.setItem("cocktail", JSON.stringify(response.data.drinks))
    }

    return response.data.drinks[0] // response değerini döndür
  } catch (error) {
    console.log(error)
  }
}

const getCocktailById = async (cocktailId) => {
  try {
    const response = await axios.get(API_URL + DETAILS_QUERY + cocktailId)

    if (response.data.drinks) {
      localStorage.setItem("cocktail", JSON.stringify(response.data.drinks))
    }

    return response.data.drinks[0] // response değerini döndür
  } catch (error) {
    console.log(error)
  }
}

const cocktailsService = {
  getCocktailsByName,
  getCocktailById,
  getCocktailFirstLetter,
}

export default cocktailsService
