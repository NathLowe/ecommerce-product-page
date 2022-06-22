import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from './reducer'

const store = configureStore({
  reducer: {
    product: ProductReducer
  },
})

export type StoreState = ReturnType<typeof store.getState>
export default store