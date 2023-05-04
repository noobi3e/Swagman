import React from 'react'
import { displayStars } from '../utils/utility'
import { Review } from '../store/productDetailsSlice'

export const UserReview: React.FC<Review> = ({ review, rating, reviewDate, username }) => {
  const stars = displayStars(rating)
  const calDate = new Date(reviewDate).toLocaleDateString('en-IN')

  return (
    <>
      <article className='user'>
        <h5 className='user__name'>{username}</h5>

        <div className='user__rating'>
          <div className='stars'>{stars}</div>
          <p className='user__reviewDate'>{calDate}</p>
        </div>
        <p className='user__review'>{review}</p>
      </article>
    </>
  )
}
