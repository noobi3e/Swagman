/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { ArrowLeft, Info } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { cusDispatch, cusSelector } from '../store/cusHooks'
import { CartItem } from '../components/CartItem'
import { sendCartToBackend } from '../store/cartSlice'

export const CartPage: React.FC = () => {
  document.title = 'Swgman | Bag'
  const cart = cusSelector((st) => st.cart.cart)
  const totalPrice = cusSelector((st) => st.cart.totalPrice)
  const dispatch = cusDispatch()
  const { isLoggedIn } = cusSelector((st) => st.user)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // if user is logged in and cart changes then we send store cart
    isLoggedIn && dispatch(sendCartToBackend({ cart, totalPrice }))
  }, [cart, dispatch, totalPrice])

  const cartItems =
    cart.length > 0 ? (
      cart.map((el) => (
        <CartItem key={el.prdId} id={el.prdId} quantity={el.quantity} />
      ))
    ) : (
      <h2 className='cart-head'>Cart is empty</h2>
    )

  const deliveryCharge = totalPrice < 999 && totalPrice > 0 ? 50 : 0

  const cartTotal = totalPrice + deliveryCharge

  return (
    <>
      <section className='cart'>
        <Link to='/' className='goback dark'>
          <ArrowLeft /> Go back
        </Link>
        <h3 className='cart__title'>Bag</h3>

        <div className='cart__cart'>
          <div className='cart__data'>
            {cart.length > 0 && <h4>Products</h4>}
            <ul className='cart__list'>{cartItems}</ul>
          </div>
          <div className='cart__price'>
            <h4>Cart Total</h4>
            <div className='cart__box'>
              <h6>Product Total</h6>
              <p>₹ {totalPrice}</p>
            </div>
            <div className='cart__box'>
              <h6>
                Deliviery charges <Info />
                <span>delivery charge is ₹50 for order below 999</span>
              </h6>
              <p>₹ {deliveryCharge}</p>
            </div>

            <div className='cart__box'>
              <h6>Total Price</h6>
              <p>₹ {cartTotal}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
