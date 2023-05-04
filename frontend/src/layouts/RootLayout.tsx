import React from 'react'
import { Promotions } from '../components/Promotions'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'


export const RootLayout: React.FC = () => {
  
  return (
    <>
      <Promotions />
      <main className='swagman'>
        <Header />
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
