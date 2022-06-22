import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ImageIndexType = number
type CartType = number

// Define a type for the slice state
export interface ReducerState {
  imageIndex: ImageIndexType,
  cart:CartType
}

// Define the initial state using that type
const initialState: ReducerState = {
  imageIndex: 0,
  cart:0
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    changeImage: (state, action: PayloadAction<ImageIndexType>) => {
      state.imageIndex = action.payload
    },
    addToCart: (state, action: PayloadAction<CartType>) => {
      state.cart+= action.payload
    },
    emptyCart: (state) => {
      state.cart = initialState.cart
    },
  },
})

export const { changeImage, addToCart, emptyCart } = productSlice.actions
export default productSlice.reducer