/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '.'
import { errObj } from './cusHooks'

export interface Review {
  userId: string
  username: string
  review: string
  rating: number
  reviewDate: string
}

export interface PrdDetails {
  name: string
  price: number
  rating: number
  details: string
  ingredients: string[]
  coverImg: string
  images: string[]
  reviews: Review[]
  _id: string
  prdId: string
  reviewsCount: number
}

interface prdInit {
  prdDetails: PrdDetails | object
  isLoading: boolean
  err: errObj
  addingReview: boolean
  alreadyReviewed: boolean
}

const init: prdInit = {
  prdDetails: {},
  isLoading: true,
  err: { isErr: false, errTxt: '' },
  addingReview: false,
  alreadyReviewed: false,
}

export const prdDetailSlice = createSlice({
  name: 'prdDetails',
  initialState: init,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setError(state, action: PayloadAction<errObj>) {
      state.err = action.payload
    },
    storeDetails(state, action: PayloadAction<PrdDetails>) {
      state.prdDetails = action.payload
      const title = action.payload.name
      document.title = `${title[0].toUpperCase() + title.slice(1)} | details`
    },
    setAddingReview(state, action: PayloadAction<boolean>) {
      state.addingReview = action.payload
    },
    updateReviews(state, action: PayloadAction<Review[]>) {
      // prettier-ignore
      (state.prdDetails as PrdDetails).reviews = action.payload
    },
    setReviewErr(state, action: PayloadAction<boolean>) {
      state.alreadyReviewed = action.payload
    },
  },
})

export const prdDetailAction = prdDetailSlice.actions

export const fetchProductDetails =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(prdDetailAction.setLoading(true))

      const res = await fetch(
        `${import.meta.env.VITE_URL}/products/product/${id}`,
        {
          headers: { apikey: import.meta.env.VITE_API_KEY },
        }
      )

      if (!res.ok) {
        const err = JSON.parse(await res.text())

        throw new Error(err.message)
      }

      const { data } = await res.json()

      const product = data.product as PrdDetails
      dispatch(prdDetailAction.setLoading(false))
      dispatch(prdDetailAction.storeDetails(product))
    } catch (err: any) {
      const message = err.message && 'something went wrong'
      dispatch(prdDetailAction.setError({ isErr: true, errTxt: message }))
    }
  }

export const addNewReview =
  (userReview: { review: string; rating: number }, id: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(prdDetailAction.setAddingReview(true))
      dispatch(prdDetailAction.setReviewErr(false))
      const token =
        'bearer ' + JSON.parse(localStorage.getItem('usertoken') as string) // as i know if code make it here means user is logged in and has a auth token in localstorage
      console.log(token)
      const res = await fetch(
        `${import.meta.env.VITE_URL}/products/review/${id}`,
        {
          method: 'POST',
          body: JSON.stringify(userReview),
          headers: {
            'Content-Type': 'application/json',
            apikey: import.meta.env.VITE_API_KEY,
            authorization: token,
          },
        }
      )

      if (!res.ok) {
        const err = JSON.parse(await res.text())

        throw new Error(err.message)
      }

      const { data } = await res.json()

      dispatch(prdDetailAction.updateReviews(data.reviews))
      dispatch(prdDetailAction.setAddingReview(false))
    } catch (err: any) {
      if (err.message === 'you already reviewed this product') {
        dispatch(prdDetailAction.setReviewErr(true))
        dispatch(prdDetailAction.setAddingReview(false))
      }
      setTimeout(() => {
        dispatch(prdDetailAction.setReviewErr(false))
      }, 1000)
    }
  }
