/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from '.'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { errObj } from './cusHooks'

const init: { category: string[]; catIsLoading: boolean; err: errObj } = {
  category: [],
  catIsLoading: true,
  err: {
    isErr: false,
    errTxt: '',
  },
}

export const categorySlice = createSlice({
  name: 'category',
  initialState: init,
  reducers: {
    storeCategory(state, action: PayloadAction<string[]>) {
      state.category = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.catIsLoading = action.payload
    },
    setErr(state, action: PayloadAction<errObj>) {
      state.err = action.payload
    },
  },
})

export const categoryAction = categorySlice.actions

export const fetchCategories = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(categoryAction.setErr({ errTxt: '', isErr: false }))

    const res = await fetch(`${import.meta.env.VITE_URL}/products/categories`, {
      headers: {
        apikey: import.meta.env.VITE_API_KEY,
      },
    })

    if (!res.ok) {
      const err = JSON.parse(await res.text())

      console.log(err)
      throw new Error(err.message)
    }

    const { data } = await res.json()

    const category = data.categories.map((el: { title: string }) => el.title)

    dispatch(categoryAction.storeCategory(category))
    dispatch(categoryAction.setLoading(false))
  } catch (err: any) {
    dispatch(categoryAction.setLoading(false))
    dispatch(categoryAction.setErr({ errTxt: err.message + '😔', isErr: true }))
  }
}
