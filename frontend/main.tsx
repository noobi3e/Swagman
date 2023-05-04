import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './src/App'
import './src/sass/index.scss'
import { Provider } from 'react-redux'
import { store } from './src/store'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
