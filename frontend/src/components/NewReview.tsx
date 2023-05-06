import React, { useState } from 'react'
import { displayStars } from '../utils/utility'
import { SubmitArrow } from '../icons/SubmitArrow'
import { cusDispatch, cusSelector } from '../store/cusHooks'
import { XLg } from 'react-bootstrap-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { PrdDetails, addNewReview } from '../store/productDetailsSlice'

export const NewReview: React.FC = () => {
  const navigate = useNavigate()
  const { id: prdId } = useParams()
  const [canWriteReview, setCanWriteReview] = useState(false)
  const [userReview, setUserReview] = useState('')
  const [userRating, setUserRating] = useState(0)
  const [err, setErr] = useState({
    isErr: false,
    errTxt: '',
  })
  const { isLoggedIn } = cusSelector((st) => st.user)
  const { rating } = cusSelector((st) => st.prdDetail.prdDetails as PrdDetails)
  const { addingReview, alreadyReviewed } = cusSelector((st) => st.prdDetail)
  const dispatch = cusDispatch()

  const reviewChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // setting user review
    setUserReview(e.target.value)
    setErr({ isErr: false, errTxt: '' })

    if (e.target.value.trim().length === 0)
      setErr({ isErr: true, errTxt: 'Please write a valid review' })
  }

  const addNewReviewHandler = (e: React.FormEvent) => {
    e.preventDefault()

    // checking if any user is logged in or not if not then redirecting them to login page
    if (!isLoggedIn) return navigate('/user/login')

    // Validating user review and rating
    if (userReview.trim().length === 0)
      return setErr({ isErr: true, errTxt: 'Please write a valid review' })

    if (userRating < 1)
      return setErr({ isErr: true, errTxt: 'Please provide some rating' })

    // disabling review box
    setCanWriteReview(false)

    const review = {
      review: userReview,
      rating: userRating,
    }
    console.log(review)
    // sending user review to server
    dispatch(addNewReview(review, prdId as string))

    // resetting field
    setUserReview('')
    setUserRating(0)
  }

  const setRating = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    const id = (e.target as HTMLElement).closest('svg')?.id

    id && setUserRating(+id)
    setErr({ isErr: false, errTxt: '' })
  }

  // stars for rating for user input
  const starsForGettingUserRating = displayStars(userRating, setRating)

  // overall rating
  const stars = rating ? displayStars(rating) : displayStars(0)
  return (
    <>
      <section className='overall'>
        <h3 className='heading'>Overall Ratings</h3>
        <div className='stars'>{stars}</div>
        {!alreadyReviewed && (
          <form className='new-review' onSubmit={addNewReviewHandler}>
            {!canWriteReview && (
              <input
                className='show-review'
                placeholder={addingReview ? 'Posting...' : 'Write a review'}
                readOnly
                disabled={addingReview}
                onClick={() => {
                  setCanWriteReview(true)
                }}
              />
            )}
            {canWriteReview && (
              <>
                <div className='stars'>{starsForGettingUserRating}</div>
                <textarea value={userReview} onChange={reviewChangeHandler} />
              </>
            )}

            {canWriteReview && (
              <div className='btns'>
                <button
                  className='cross'
                  onClick={() => setCanWriteReview(false)}>
                  <XLg />
                </button>
                <button type='submit' className='add'>
                  <SubmitArrow />
                </button>
              </div>
            )}
          </form>
        )}
        {err.isErr && <p className='errTxt'>{err.errTxt}</p>}
        {alreadyReviewed && (
          <p className='already'>You already reviewed this product 🙂</p>
        )}
      </section>
    </>
  )
}
