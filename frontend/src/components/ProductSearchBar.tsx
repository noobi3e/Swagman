import React, { useState } from 'react'
import { SearchIcon } from '../icons/SearchIcon'
import { cusSelector } from '../store/cusHooks'
import { FilterList } from './FilterList'

export const ProductSearchBar: React.FC = () => {
  const headlines = cusSelector((st) => st.prds.limitProductInfo)
  const [search, setSearch] = useState('')
  const [listIsVis, setlistIsVis] = useState(false)

  const resetSearchBar = () => {
    setSearch('')
    setlistIsVis(false)
  }

  const filterList = headlines.filter((el) => el.name.includes(search))
  const displayList =
    filterList.length > 0 ? (
      filterList.map((el) => (
        <FilterList key={el._id} details={el} func={resetSearchBar} />
      ))
    ) : (
      <h2 className='no-data'>No Product found</h2>
    )

  return (
    <>
      <form className='header__form'>
        <SearchIcon className='show' />
        {listIsVis && <ul className='filter__list'>{displayList}</ul>}
        <input
          type='search'
          className='header__input'
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase())
            setlistIsVis(true)
            if (e.target.value.trim().length === 0) setlistIsVis(false)
          }}
          value={search}
          placeholder='Search Swagman'
        />
      </form>
    </>
  )
}
