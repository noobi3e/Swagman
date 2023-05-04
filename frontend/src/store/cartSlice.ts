import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Cart {
  prdId: string
  quantity: number
}

interface CartSt {
  cart: Cart[]
  totalPrice: number
}

const init: CartSt = {
  cart: [],
  totalPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: init,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const id = action.payload

      const index = state.cart.findIndex((el) => el.prdId === id)

      // if product doesn't exist
      if (index < 0) {
        state.cart.push({ prdId: id, quantity: 1 })
        // state.totalPrice += 
        return
      }
      // if product exists
      state.cart[index].quantity += 1
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload

      const index = state.cart.findIndex((el) => el.prdId === id)

      if (index >= 0) state.cart.splice(index, 1)
    },
  },
})

export const cartAction = cartSlice.actions
