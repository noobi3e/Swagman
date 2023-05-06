import React, { useState } from 'react'
import { displayStars } from '../utils/utility'
import { Review, updateUserReview } from '../store/productDetailsSlice'
import { PencilSquare, XLg, CheckLg } from 'react-bootstrap-icons'
import { cusDispatch, cusSelector } from '../store/cusHooks'

interface NewReview extends Review {
  prdID: string
}

export const UserReview: React.FC<NewReview> = ({
  review,
  rating,
  reviewDate,
  username,
  userId,
  prdID,
}) => {
  const { curUserId } = cusSelector((st) => st.user)
  const [editMode, setEditMode] = useState(false)
  const stars = displayStars(rating)
  const [newReview, setNewReview] = useState(review)
  const calDate = new Date(reviewDate).toLocaleDateString('en-IN')
  const dispatch = cusDispatch()

  const updateReview = () => {
    setEditMode(false)

    dispatch(updateUserReview({ review: newReview }, prdID))
  }

  return (
    <>
      <article className='user'>
        {curUserId === userId && (
          <PencilSquare
            className='editMode'
            onClick={() => setEditMode(true)}
          />
        )}
        <h5 className='user__name'>{username}</h5>

        <div className='user__rating'>
          <div className='stars'>{stars}</div>
          <p className='user__reviewDate'>{calDate}</p>
        </div>

        <div className='user__review-box'>
          <input
            className={'user__review ' + `${editMode ? 'writeMode' : ''}`}
            value={newReview}
            readOnly={!editMode}
            onChange={(e) => setNewReview(e.target.value)}
          />
          {editMode && <CheckLg onClick={updateReview} />}
          {editMode && (
            <XLg
              onClick={() => {
                setEditMode(false)
                setNewReview(review)
              }}
            />
          )}
        </div>
      </article>
    </>
  )
}
