import React from 'react'
import { Link } from 'react-router-dom'
import { displayStars } from '../utils/utility'
import { lessProductDetail } from '../store/productsSlice'

type func = () => void

export const FilterList: React.FC<{
  details: lessProductDetail
  func: func
}> = ({ details, func }) => {
  const stars = displayStars(details.rating)

  return (
    <>
      <Link to={`/product/${details._id}`} onClick={() => func()}>
        <li className='filter__item'>
          <img
            src={`${import.meta.env.VITE_IMG_URL}${details.coverImg}`}
            alt=''
          />

          <div className='data'>
            <h3 className='title'>{details.name}</h3>
            <div className='ratings'>{stars}</div>
          </div>
        </li>
      </Link>
    </>
  )
}
