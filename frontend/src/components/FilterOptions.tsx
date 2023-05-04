import React from 'react'
import { cusDispatch } from '../store/cusHooks'
import { productsAction } from '../store/productsSlice'

export const FilterOptions: React.FC = () => {
  const dispatch = cusDispatch()
  const filterProductHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = +e.target.min
    const max = +e.target.max
    const type = e.target.name as 'price' | 'rating'

    if (e.target.checked) {
      dispatch(productsAction.setFilterVal({ type: type, min, max }))
    } else {
      dispatch(productsAction.setFilterVal({ type: null, min: 0, max: 0 }))
    }
  }

  return (
    <>
      <div className='options'>
        <h2>Price Range</h2>
        <div className='options__option'>
          <input
            type='checkbox'
            id='500'
            min={0}
            max={500}
            name='price'
            onChange={filterProductHandler}
          />
          <label htmlFor='500'>0 - 500</label>
        </div>

        <div className='options__option'>
          <input
            type='checkbox'
            id='1000'
            min={500}
            max={1000}
            name='price'
            onChange={filterProductHandler}
          />
          <label htmlFor='1000'>500 - 1000</label>
        </div>

        <div className='options__option'>
          <input
            type='checkbox'
            id='above'
            min={1000}
            max={2000}
            name='price'
            onChange={filterProductHandler}
          />
          <label htmlFor='above'>1000 and above</label>
        </div>
      </div>
      <div className='options'>
        <h2>Rating</h2>
        <div className='options__option'>
          <input
            type='checkbox'
            id='2'
            min={2}
            max={3}
            name='rating'
            onChange={filterProductHandler}
          />
          <label htmlFor='2'>2 - 3</label>
        </div>

        <div className='options__option'>
          <input
            type='checkbox'
            id='3'
            min={3}
            max={4}
            name='rating'
            onChange={filterProductHandler}
          />
          <label htmlFor='3'>3 - 4</label>
        </div>

        <div className='options__option'>
          <input
            type='checkbox'
            id='4'
            min={4}
            max={5}
            name='rating'
            onChange={filterProductHandler}
          />
          <label htmlFor='4'>4 and above</label>
        </div>
      </div>
      <p className='note'>
        <strong> ****</strong> more than one filter might not produce desired
        results right now i am working on it
        <strong> ****</strong>
      </p>
    </>
  )
}
