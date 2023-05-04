import React from 'react'
import { Review } from '../store/productDetailsSlice'
import { UserReview } from './UserReview'

export const Reviews: React.FC<{ reviews: Review[] }> = (props) => {
  const reviews = props.reviews.map((el) => (
    <UserReview key={el.userId} {...el} />
  ))

  return (
    <>
      <section className='reviews'>{reviews}</section>
    </>
  )
}
