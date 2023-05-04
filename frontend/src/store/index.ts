import { configureStore } from '@reduxjs/toolkit'
import { categorySlice } from './categoriesSlice'
import { uiSlice } from './uiSlice'
import { prdDetailSlice } from './productDetailsSlice'
import { productsSlice } from './productsSlice'
import { userSlice } from './userSlice'
import { cartSlice } from './cartSlice'

export const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    ui: uiSlice.reducer,
    prdDetail: prdDetailSlice.reducer,
    prds: productsSlice.reducer,
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
