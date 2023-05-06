import React, { useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { HomePage } from './pages/HomePage'
import { ProductDetailsPage } from './pages/ProductDetailPage'
import { ProductsPage } from './pages/ProductsPage'
import { AuthLayout } from './layouts/AuthLayout'
import { LoginForm } from './components/LoginForm'
import { SignUpForm } from './components/SignUpForm'
import { ErrorPage } from './pages/ErrorPage'
import { UserProfilePage } from './pages/UserProfilePage'
import { cusDispatch, cusSelector, errObj } from './store/cusHooks'
import { verifyUser } from './store/userSlice'
import { fetchPrdHealines } from './store/productsSlice'
import { fetchCategories } from './store/categoriesSlice'
import { Loader } from './components/Loaders/Loader'
import { CartPage } from './pages/CartPage'
import { getCartData } from './store/cartSlice'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products/:id',
        element: <ProductsPage />,
      },
      {
        path: 'product/:id',
        element: <ProductDetailsPage />,
      },
    ],
  },
  {
    path: '/user',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'signup',
        element: <SignUpForm />,
      },
    ],
  },
  {
    path: '/user/:id',
    element: <UserProfilePage />,
  },
  {
    path: '/bag',
    element: <CartPage />,
  },
])

export const App: React.FC = () => {
  document.title = 'Swagman | Swag on point with swagman'

  const dispatch = cusDispatch()
  const { catIsLoading, err: catErr } = cusSelector((st) => st.category)
  const { limitLoading, err: prdErr } = cusSelector((st) => st.prds)

  useEffect(() => {
    console.log('i am here')
    const token = JSON.parse(localStorage.getItem('usertoken') as string)

    token && dispatch(verifyUser(token))
    token && dispatch(getCartData(token))
    dispatch(fetchPrdHealines())
    dispatch(fetchCategories())
  }, [dispatch])

  const err: errObj = {
    errTxt: '',
    isErr: false,
  }

  if (catErr.isErr || prdErr.isErr) {
    err.isErr = true

    err.errTxt = catErr.errTxt || prdErr.errTxt
  } else {
    err.isErr = false
  }

  return (
    <>
      {catIsLoading && limitLoading && !err.isErr && !prdErr.isErr && (
        <div className='main-content'>
          <Loader showText={true} />
        </div>
      )}
      {!catIsLoading && !limitLoading && !err.isErr && !prdErr.isErr && (
        <RouterProvider router={router} />
      )}
      {err.isErr && <ErrorPage msg={prdErr.errTxt} />}
    </>
  )
}
