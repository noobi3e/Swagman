import React, { useState } from 'react'
import { displayStars } from '../utils/utility'
import { Products } from '../store/productsSlice'
import { Link } from 'react-router-dom'
import { cusDispatch } from '../store/cusHooks'
import { cartAction } from '../store/cartSlice'
import { motion, AnimatePresence } from 'framer-motion'

const divVariant = {
  initial: {
    opacity: 0,
    scale: 0,

    transition: { duration: 0.1 },
  },
  mid: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.1 },
  },
  hide: {
    opacity: 0,
    scale: 0,
    x: 200,
    y: -500,
    zIndex: 10,
    transition: { duration: 0.5 },
  },
}

export const ProductBrief: React.FC<Products> = (props) => {
  const [showOverlay, setShowOverlay] = useState(true)
  const stars = displayStars(props.rating)
  const dispatch = cusDispatch()

  return (
    <>
      <li className='products__product'>
        <AnimatePresence mode='wait'>
          {showOverlay && (
            <motion.div
              variants={divVariant}
              initial='initial'
              animate='mid'
              exit='hide'
              className='overlay'
            />
          )}
        </AnimatePresence>
        <Link to={`/product/${props._id}`}>
          <img
            src={`${import.meta.env.VITE_IMG_URL}${props.coverImg}`}
            alt={props.name}
          />
        </Link>

        <section className='products__details'>
          <h2>{props.name}</h2>
          <div className='rating'>
            <div className='stars'>{stars} </div> ({props.reviewsCount})rating
          </div>
          <p className='price'>₹ {props.price}</p>
        </section>
        <button
          onClick={() => {
            dispatch(
              cartAction.addToCart({ id: props._id, price: props.price })
            )
            setShowOverlay(false)

            setTimeout(() => setShowOverlay(true), 1000)
          }}>
          Add to cart
        </button>
      </li>
    </>
  )
}
