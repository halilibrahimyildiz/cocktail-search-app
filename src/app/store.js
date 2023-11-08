import {configureStore} from "@reduxjs/toolkit"

import cocktailsReducer from "../features/cocktails/coctailsSlice"

const store = configureStore({
  reducer: {
    cocktails: cocktailsReducer,
  },
})

export default store // Do not destructure store while exporting, directly export the store
