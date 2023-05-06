import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '.'

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
  totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: init,
  reducers: {
    loadCart(state, action: PayloadAction<CartSt>) {
      state.cart = action.payload.cart
      state.totalPrice = action.payload.totalPrice
    },
    addToCart(
      state,
      action: PayloadAction<{
        id: string
        price: number
      }>
    ) {
      const id = action.payload.id

      // updating price
      state.totalPrice += action.payload.price

      const index = state.cart.findIndex((el) => el.prdId === id)

      // if product doesn't exist
      if (index < 0) {
        state.cart.push({ prdId: id, quantity: 1 })
      }
      // if product exists
      else {
        state.cart[index].quantity += 1
      }
    },
    removeFromCart(
      state,
      action: PayloadAction<{ id: string; price: number }>
    ) {
      const id = action.payload.id

      const index = state.cart.findIndex((el) => el.prdId === id)

      if (index >= 0) {
        const qt = state.cart[index].quantity
        state.totalPrice -= qt * action.payload.price
        state.cart.splice(index, 1)
      }
    },
  },
})

export const cartAction = cartSlice.actions

export const sendCartToBackend = (cart: CartSt) => async () => {
  try {
    const token = JSON.parse(localStorage.getItem('usertoken') as string)

    const res = await fetch(`${import.meta.env.VITE_URL}/users/cart`, {
      method: 'POST',
      body: JSON.stringify(cart),
      headers: {
        'Content-Type': 'application/json',
        apikey: import.meta.env.VITE_API_KEY,
        authorization: 'bearer ' + token,
      },
    })

    if (!res.ok) {
      const err = JSON.parse(await res.text())

      throw new Error(err.message)
    }

    await res.json()
  } catch (err) {
    console.warn(err)
  }
}

export const getCartData = (token: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_URL}/users/cart`, {
      headers: {
        apikey: import.meta.env.VITE_API_KEY,
        authorization: 'bearer ' + token,
      },
    })

    if (!res.ok) {
      const err = JSON.parse(await res.text())

      throw new Error(err.message)
    }

    const { data } = await res.json()

    dispatch(
      cartAction.loadCart({
        cart: data.cart.cart,
        totalPrice: data.cart.totalPrice,
      })
    )
  } catch (err) {
    console.warn(err)
  }
}
