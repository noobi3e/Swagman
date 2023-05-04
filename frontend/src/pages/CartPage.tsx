import React from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { cusSelector } from '../store/cusHooks'
import { CartItem } from '../components/CartItem'

export const CartPage: React.FC = () => {
  document.title = 'Swgman | Bag'
  const cart = cusSelector((st) => st.cart.cart)

  const cartItems =
    cart.length > 0 ? (
      cart.map((el) => (
        <CartItem key={el.prdId} id={el.prdId} quantity={el.quantity} />
      ))
    ) : (
      <h2 className='cart-head'>Cart is empty</h2>
    )

  return (
    <>
      <section className='cart'>
        <Link to='/' className='goback dark'>
          <ArrowLeft /> Go back
        </Link>
        <h3 className='cart__title'>Bag</h3>

        <div className='cart__cart'>
          <div className='cart__data'>
            {/* <h4>Items</h4> */}
            <ul className='cart__list'>{cartItems}</ul>
          </div>
          <div className='cart__price'>
            <h4>Cart Total</h4>
            <div className='cart__box'>
              <h6>Product Total</h6>
              <p>₹ 0</p>
            </div>
            <div className='cart__box'>
              <h6>Deliviery charges</h6>
              <p>₹ 0</p>
            </div>

            <div className='cart__box'>
              <h6>Total Price</h6>
              <p>₹ 0</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
