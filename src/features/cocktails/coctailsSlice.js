import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

import cocktailsService from "./cocktailsService"

const initialState = {
  cocktails: [],
  cocktail: {},
  lastSearch: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
}

export const getCocktailsByName = createAsyncThunk(
  "cocktails/getByName",
  async (cocktailName, thunkApı) => {
    try {
      return await cocktailsService.getCocktailsByName(cocktailName)
    } catch (error) {
      console.log(error)
    }
  },
)

export const getCocktailFirstLetter = createAsyncThunk(
  "cocktails/getCocktailFirstLetter",
  async (cocktailName, thunkApı) => {
    try {
      return await cocktailsService.getCocktailsByName(cocktailName)
    } catch (error) {
      console.log(error)
    }
  },
)

export const getCocktailById = createAsyncThunk(
  "cocktails/getById",
  async (cocktailId, thunkAPI) => {
    try {
      const state = thunkAPI.getState()
      const cocktails = state.cocktails.cocktails
      let cocktail

      // Statten kokteyli al
      if (!cocktails || cocktails.length === 0) {
        const storedCocktails = localStorage.getItem("cocktails")
        if (storedCocktails) {
          const parsedCocktails = JSON.parse(storedCocktails)
          cocktail = parsedCocktails.find((obj) => obj.idDrink === cocktailId)
        }
      } else {
        cocktail = cocktails.find((obj) => obj.idDrink === cocktailId)
      }

      // Kokteyl yoksa API'den al
      if (!cocktail) {
        return await cocktailsService.getCocktailById(cocktailId)
      }

      // Kokteyl statte varsa onu döndür
      return cocktail
    } catch (error) {
      console.log(error)
      throw error
    }
  },
)

export const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState,
  reducers: {
    reset: (state) => initialState,

    setStoredCocktailsAction: (state, action) => {
      state.cocktails = action.payload
    },
    setLastSearchAction: (state, action) => {
      state.lastSearch = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      //* Get a cocktails By name
      .addCase(getCocktailsByName.pending, (state, action) => {
        state.isLoading = true
        state.isSuccess = false
      })
      .addCase(getCocktailsByName.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cocktails = action.payload
      })
      .addCase(getCocktailsByName.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      //* Get a cocktails by first letter
      .addCase(getCocktailFirstLetter.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getCocktailFirstLetter.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cocktails = action.payload
      })
      .addCase(getCocktailFirstLetter.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      //* Get a cocktails By Id
      .addCase(getCocktailById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cocktail = action.payload
      })
      .addCase(getCocktailById.pending, (state, action) => {
        state.isLoading = true
        state.isError = false
      })
  },
})

export const {reset, setStoredCocktailsAction, setLastSearchAction} = cocktailsSlice.actions
export default cocktailsSlice.reducer
