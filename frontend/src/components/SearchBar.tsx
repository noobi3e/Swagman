import React from 'react'
import { SwgmanLogo } from '../icons/Logo'
import { CartIcon } from '../icons/CartIcon'
import { ProfileIcon } from '../icons/ProfileIcon'
import { List, X } from 'react-bootstrap-icons'
import { windowWidth } from '../utils/utility'
import { cusDispatch, cusSelector } from '../store/cusHooks'
import { uiAction } from '../store/uiSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ProductSearchBar } from './ProductSearchBar'

const btnAnimate = {
  hidden: {
    scale: 0,
    opacity: 0,
    transition: { duration: 0.5 },
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

export const SearchBar: React.FC = () => {
  const { navIsVis } = cusSelector((st) => st.ui)
  const { isLoggedIn } = cusSelector((st) => st.user)
  const id = cusSelector((st) => st.user.userDetails?.id)
  const dispatch = cusDispatch()
  const navigate = useNavigate()
  const { cart } = cusSelector((st) => st.cart)

  const userHandler = () => {
    if (!isLoggedIn) return navigate('/user/login')

    id && navigate(`/user/${id}`)
  }

  return (
    <>
      <section className='header__search'>
        <AnimatePresence mode='wait'>
          {windowWidth <= 810 && !navIsVis && (
            <motion.button
              variants={btnAnimate}
              initial='hidden'
              animate='visible'
              exit='hidden'
              className='hamburger'
              onClick={() => dispatch(uiAction.showNav())}>
              <List />
            </motion.button>
          )}
          {windowWidth <= 810 && navIsVis && (
            <motion.button
              variants={btnAnimate}
              initial='hidden'
              animate='visible'
              exit='hidden'
              className='hamburger'
              onClick={() => dispatch(uiAction.hideNav())}>
              <X />
            </motion.button>
          )}
        </AnimatePresence>

        <Link to='/'>
          <SwgmanLogo className='header__logo' />
        </Link>

        <ProductSearchBar />

        <div className='cta'>
          <button onClick={() => navigate('/bag')}>
            <span className='cartTotal'>{cart.length}</span>
            <CartIcon className='cta__cart' />
          </button>
          <button onClick={userHandler}>
            <ProfileIcon className='cta__icon' />
          </button>
        </div>
      </section>
    </>
  )
}
