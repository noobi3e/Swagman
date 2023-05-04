/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { errObj } from './cusHooks'
import { AppDispatch } from '.'

export interface Products {
  _id: string
  prdId: string
  name: string
  price: number
  coverImg: string
  reviewsCount: number
  rating: number
}

export interface lessProductDetail {
  _id: string
  name: string
  rating: number
  coverImg: string
  price: number
}

interface Filter {
  type: 'price' | 'rating' | null
  min: number
  max: number
}

interface PrdState {
  products: Products[]
  isLoading: boolean
  err: errObj
  limitProductInfo: lessProductDetail[]
  limitLoading: boolean
  filter: Filter
}

const init: PrdState = {
  products: [],
  isLoading: true,
  err: { errTxt: '', isErr: false },
  limitProductInfo: [],
  limitLoading: true,
  filter: { type: null, min: 0, max: 0 },
}

export const productsSlice = createSlice({
  name: 'products',
  initialState: init,
  reducers: {
    storeProducts(state, action: PayloadAction<Products[]>) {
      state.products = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setErr(state, action: PayloadAction<errObj>) {
      state.err = action.payload
    },
    setHeadlines(state, action: PayloadAction<lessProductDetail[]>) {
      state.limitProductInfo = action.payload
    },
    setHeadlineLoading(state, action: PayloadAction<boolean>) {
      state.limitLoading = action.payload
    },
    setFilterVal(state, action: PayloadAction<Filter>) {
      state.filter = action.payload
    },
  },
})

export const productsAction = productsSlice.actions

export const fetchPrdHealines = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(productsAction.setHeadlineLoading(true))
    dispatch(productsAction.setErr({ isErr: false, errTxt: '' }))

    const res = await fetch(`${import.meta.env.VITE_URL}/products/headlines`, {
      headers: {
        apikey: import.meta.env.VITE_API_KEY,
      },
    })

    if (!res.ok) {
      const err = JSON.parse(await res.text())

      throw new Error(err.message)
    }

    const { data } = await res.json()

    dispatch(productsAction.setHeadlineLoading(false))
    dispatch(productsAction.setHeadlines(data.products))
  } catch (err: any) {
    dispatch(productsAction.setHeadlineLoading(false))
    dispatch(productsAction.setErr({ isErr: true, errTxt: err.message }))
  }
}

export const fetchProducts = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(productsAction.setErr({ errTxt: '', isErr: false }))
    dispatch(productsAction.setLoading(true))

    const res = await fetch(`${import.meta.env.VITE_URL}/products${id}`, {
      headers: { apikey: import.meta.env.VITE_API_KEY },
    })

    if (!res.ok) {
      const err = JSON.parse(await res.text())

      throw new Error(err.message)
    }

    const { data } = await res.json()

    dispatch(productsAction.storeProducts(data.products))
    dispatch(productsAction.setLoading(false))
  } catch (err: any) {
    dispatch(productsAction.setLoading(false))
    dispatch(productsAction.setErr({ errTxt: err.message, isErr: true }))
  }
}
