import React, { useEffect } from 'react'
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

export const ProductDetailsPage: React.FC = () => {
  const params = useParams()
  const dispatch = cusDispatch()
  const isLoading = cusSelector((st) => st.prdDetail.isLoading)
  const details = cusSelector((st) => st.prdDetail.prdDetails as PrdDetails)

  useEffect(() => {
    // scrolling page to top
    window.scrollTo(0, 0)
    dispatch(fetchProductDetails(params.id as string))

    console.log()
  }, [dispatch, params.id])

  const stars = details.rating ? displayStars(details.rating) : displayStars(0)

  const smallImgs =
    details.images &&
    details.images.map((el, i) => (
      <img
        key={el + i}
        src={import.meta.env.VITE_IMG_URL + el}
        alt={details.name}
      />
    ))

  const splitedDetails =
    details.details &&
    details.details.split('%').map((el, i) => <span key={i + el}>{el}</span>)

  const ingrds =
    details.ingredients &&
    details.ingredients.map((el, i) => <Ingredients key={el + i} ing={el} />)

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <section className='product'>
          <section className='product__info'>
            <figure className='product__img img'>
              <img
                src={`${import.meta.env.VITE_IMG_URL}${details.coverImg}`}
                alt=''
                className='img__main'
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
                    console.log('i am here')
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
