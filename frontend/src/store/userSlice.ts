/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '.'
import { errObj } from './cusHooks'
import { getCartData } from './cartSlice'

export interface NewUserData {
  fname: string
  lname: string
  pass: string
  confirmPass: string
  email: string
}

export interface LoginUserData {
  email: string
  pass: string
}

export interface UserInfo {
  username: string
  email: string
  id: string
}

interface UserState {
  userCreated: boolean
  isLoggedIn: boolean
  err: errObj
  userDetails: UserInfo | null
}

const init: UserState = {
  userCreated: false,
  isLoggedIn: false,
  err: {
    errTxt: '',
    isErr: false,
  },
  userDetails: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: init,
  reducers: {
    setCreating(state, action: PayloadAction<boolean>) {
      state.userCreated = action.payload
    },
    setLoggin(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    },
    storeUser(state, action: PayloadAction<{ user: UserInfo; token: string }>) {
      state.userDetails = action.payload.user

      localStorage.clear()
      localStorage.setItem('usertoken', JSON.stringify(action.payload.token))
    },
    logOut(state) {
      localStorage.clear()
      state.isLoggedIn = false
      state.userDetails = null
    },
    setErr(state, action: PayloadAction<errObj>) {
      state.err = action.payload
    },
  },
})

export const userAction = userSlice.actions

export const verifyUser = (token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userAction.setLoggin(false))
    dispatch(userAction.setErr({ isErr: false, errTxt: '' }))

    const res = await fetch(`${import.meta.env.VITE_URL}/users/authenticate`, {
      method: 'POST',
      headers: {
        apikey: import.meta.env.VITE_API_KEY,
        'Content-Type': 'application/json',
        authorization: `bearer ${token}`,
      },
    })

    if (!res.ok) {
      const err = JSON.parse(await res.text())

      throw new Error(err.message)
    }

    const { credientials } = await res.json()

    const userData: UserInfo = {
      id: credientials.id,
      email: credientials.email,
      username: credientials.username,
    }

    dispatch(userAction.storeUser({ user: userData, token: token }))
    dispatch(userAction.setLoggin(true))
  } catch (err: any) {
    dispatch(userAction.setErr({ isErr: true, errTxt: err.message }))
  }
}

export const logUserIn =
  (userInpData: LoginUserData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userAction.setLoggin(false))
      dispatch(userAction.setErr({ isErr: false, errTxt: '' }))

      const res = await fetch(`${import.meta.env.VITE_URL}/users/login`, {
        method: 'POST',
        body: JSON.stringify(userInpData),
        headers: {
          'Content-Type': 'application/json',
          apikey: import.meta.env.VITE_API_KEY,
        },
      })

      if (!res.ok) {
        const err = JSON.parse(await res.text())

        throw new Error(err.message)
      }

      const { credientials } = await res.json()

      const userData: UserInfo = {
        id: credientials.id,
        email: credientials.email,
        username: credientials.fname,
      }

      dispatch(
        userAction.storeUser({ user: userData, token: credientials.authToken })
      )
      dispatch(userAction.setLoggin(true))
      dispatch(getCartData(credientials.authToken))
    } catch (err: any) {
      dispatch(userAction.setErr({ isErr: true, errTxt: err.message }))
    }
  }

export const createNewUser =
  (userInpData: NewUserData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userAction.setCreating(false))
      dispatch(userAction.setLoggin(false))
      dispatch(userAction.setErr({ isErr: false, errTxt: '' }))

      const res = await fetch(`${import.meta.env.VITE_URL}/users/signup`, {
        method: 'POST',
        body: JSON.stringify(userInpData),
        headers: {
          'Content-Type': 'application/json',
          apikey: import.meta.env.VITE_API_KEY,
        },
      })

      if (!res.ok) {
        const err = JSON.parse(await res.text())

        throw new Error(err.message)
      }

      const { credientials } = await res.json()

      const userData: UserInfo = {
        id: credientials.id,
        email: credientials.email,
        username: credientials.fname,
      }

      dispatch(
        userAction.storeUser({ user: userData, token: credientials.authToken })
      )
      dispatch(userAction.setCreating(true))
      dispatch(userAction.setLoggin(true))
    } catch (err: any) {
      dispatch(userAction.setCreating(false))
      dispatch(userAction.setErr({ isErr: true, errTxt: err.message }))
    }
  }
