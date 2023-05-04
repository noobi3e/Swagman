import React from 'react'
import { NavBar } from './NavBar'
import { SearchBar } from './SearchBar'

export const Header: React.FC = () => {
  return (
    <>
      <header className='header'>
        <SearchBar />
        <NavBar />
      </header>
    </>
  )
}
