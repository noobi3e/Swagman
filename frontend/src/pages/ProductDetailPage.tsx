import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { displayStars, windowWidth } from '../utils/utility'
import { cusDispatch, cusSelector } from '../store/cusHooks'
import { fetchProductDetails, PrdDetails } from '../store/productDetailsSlice'
import { Ingredients } from '../components/Ingredients'
import { CompanyFeatures } from '../components/CompanyFeatures'
import { Reviews } from '../components/Reviews'
import { NewReview } from '../components/NewReview'
import { Loader } from '../components/Loaders/Loader'
import { cartAction } from '../store/cartSlice'
import { ErrorPage } from './ErrorPage'
import ReactDOM from 'react-dom'
import { Modal } from '../components/Modal'
import { AnimatePresence } from 'framer-motion'

export const ProductDetailsPage: React.FC = () => {
  const params = useParams()
  const dispatch = cusDispatch()
  const { isLoading, err } = cusSelector((st) => st.prdDetail)
  const details = cusSelector((st) => st.prdDetail.prdDetails as PrdDetails)
  const [curImg, setCurImg] = useState('')
  const [showImgModal, setShowImgModal] = useState(false)

  useEffect(() => {
    // scrolling page to top
    window.scrollTo(0, 0)
    dispatch(fetchProductDetails(params.id as string))
  }, [dispatch, params.id])

  // loading img
  useEffect(() => {
    details && setCurImg(`${import.meta.env.VITE_IMG_URL}${details.coverImg}`)
  }, [details])

  const stars =
    details && details.rating ? displayStars(details.rating) : displayStars(0)

  const smallImgs =
    details &&
    details.images &&
    details.images.map((el, i) => (
      <div
        className='smallImgBox'
        key={el + i}
        data-img={import.meta.env.VITE_IMG_URL + el}>
        <img
          src={import.meta.env.VITE_IMG_URL + el}
          onClick={(e) => {
            setCurImg((e.target as HTMLImageElement).src)
          }}
          alt={details.name}
        />
      </div>
    ))

  const splitedDetails =
    details &&
    details.details &&
    details.details.split('%').map((el, i) => <span key={i + el}>{el}</span>)

  const ingrds =
    details &&
    details.ingredients &&
    details.ingredients.map((el, i) => <Ingredients key={el + i} ing={el} />)

  const hideModal = () => setShowImgModal(false)

  return (
    <>
      <AnimatePresence mode='wait'>
        {showImgModal && (
          <Modal hideModal={hideModal} alt={details.name} img={curImg} />
        )}
      </AnimatePresence>
      {!isLoading && err.isErr && <ErrorPage />}
      {isLoading && !err.isErr && <Loader />}
      {!isLoading && !err.isErr && (
        <section className='product'>
          <section className='product__info'>
            <figure className='product__img img'>
              <img
                src={curImg}
                alt={details.name}
                className='img__main'
                onClick={() => setShowImgModal(true)}
              />
              <div className='img__small'>{smallImgs}</div>
            </figure>

            <div className='info'>
              <h2 className='title'>{details.name}</h2>
              <div className='ratings'>
                {stars} ({details.reviewsCount}) Rating
                {details.reviews.length > 1 ? 's' : ''}
              </div>
              <h3 className='price'>₹{details.price}</h3>

              <div className='btns'>
                <button
                  className='btn btn--addToCart'
                  onClick={() => {
                    dispatch(
                      cartAction.addToCart({
                        id: details._id,
                        price: details.price,
                      })
                    )
                  }}>
                  add to cart
                </button>
                <button className='btn btn--buynow'>buy now</button>
              </div>
              {windowWidth > 1200 && <CompanyFeatures />}
            </div>
          </section>

          {windowWidth <= 1200 && <CompanyFeatures />}

          <div className='product__details'>
            <h2 className='heading'>Product Details</h2>
            <p className='details'>{splitedDetails}</p>
          </div>

          {details.ingredients.length !== 0 && (
            <div className='product__details'>
              <h2 className='heading'>Ingredient's</h2>
              <ul className='ings'>{ingrds}</ul>
            </div>
          )}

          <section className='product__reviews'>
            <h2 className='heading'>User Reviews</h2>
            <div className='review-filter'></div>
            <div className='review-container'>
              <NewReview />
              <Reviews reviews={details.reviews} />
            </div>
          </section>
        </section>
      )}
    </>
  )
}
