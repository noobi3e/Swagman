import { createSlice } from '@reduxjs/toolkit'

interface UI {
  navIsVis: boolean
}

const init: UI = {
  navIsVis: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: init,
  reducers: {
    showNav(state) {
      state.navIsVis = true
    },
    hideNav(state) {
      state.navIsVis = false
    },
  },
})

export const uiAction = uiSlice.actions
