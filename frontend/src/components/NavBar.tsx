import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { cusDispatch, cusSelector } from '../store/cusHooks'
import { windowWidth } from '../utils/utility'
import { motion, AnimatePresence } from 'framer-motion'
import { uiAction } from '../store/uiSlice'

const navAnimate = {
  hidden: {
    translateX: '100%',
    opacity: 0,
    transition: { duration: 0.5 },
  },
  visible: {
    translateX: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

export const NavBar: React.FC = () => {
  const { category: categories } = cusSelector((st) => st.category)
  const { navIsVis } = cusSelector((st) => st.ui)
  const dispatch = cusDispatch()

  const hideNav = () => dispatch(uiAction.hideNav())

  const links =
    categories.length !== 0
      ? categories.map((el, i) => (
          <Fragment key={i}>
            <div className='line' />
            <NavLink
              to={`/products/${el}`}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={hideNav}>
              {el}
            </NavLink>
          </Fragment>
        ))
      : ''

  return (
    <>
      {windowWidth > 810 && (
        <nav className='header__nav'>
          <NavLink
            to={'/products/all'}
            className={({ isActive }) => (isActive ? 'active' : '')}>
            All products
          </NavLink>
          {links}
        </nav>
      )}
      <AnimatePresence mode='wait'>
        {windowWidth <= 810 && navIsVis && (
          <motion.nav
            variants={navAnimate}
            initial='hidden'
            animate='visible'
            exit='hidden'
            className='header__nav nav-small'>
            <NavLink
              to={'/products/all'}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={hideNav}>
              All products
            </NavLink>
            {links}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
