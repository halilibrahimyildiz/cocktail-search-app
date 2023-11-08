import {useDispatch} from "react-redux"

import useLocalStorage from "./useLocalStorage"

function useLocalStorageToRedux(key, storeActions, defaultValue = []) {
  const dispatch = useDispatch()
  const [storedCocktails, setStoredCocktails] = useLocalStorage(key, defaultValue)

  const updateStoredCocktails = (newCocktails) => {
    setStoredCocktails(newCocktails)
    dispatch(storeActions(newCocktails))
  }

  const updateStoredCocktailsAndLocalStorage = (newCocktails) => {
    updateStoredCocktails(newCocktails)
    localStorage.setItem(key, JSON.stringify(newCocktails))
  }

  return [storedCocktails, updateStoredCocktailsAndLocalStorage]
}

export default useLocalStorageToRedux
