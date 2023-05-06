import React from 'react'
import { Review } from '../store/productDetailsSlice'
import { UserReview } from './UserReview'

export const Reviews: React.FC<{ reviews: Review[]; prdId: string }> = (
  props
) => {
  const reviews =
    props.reviews.length > 0 ? (
      props.reviews.map((el) => (
        <UserReview key={el.userId} prdID={props.prdId} {...el} />
      ))
    ) : (
      <h2>This product has no reviews </h2>
    )

  return (
    <>
      <section className='reviews'>{reviews}</section>
    </>
  )
}
