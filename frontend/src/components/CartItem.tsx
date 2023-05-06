import React from 'react'
import { cusDispatch, cusSelector } from '../store/cusHooks'
import { Link } from 'react-router-dom'
import { Trash3Fill } from 'react-bootstrap-icons'
import { cartAction } from '../store/cartSlice'

export const CartItem: React.FC<{ id: string; quantity: number }> = ({
  id,
  quantity,
}) => {
  const prds = cusSelector((st) => st.prds.limitProductInfo)
  const dispatch = cusDispatch()

  const data = prds.find((prd) => prd._id === id)

  return (
    <>
      <li className='cart__items'>
        <Link to={`/product/${data?._id}`}>
          <img
            src={`${import.meta.env.VITE_IMG_URL}${data?.coverImg}`}
            alt={data?.name}
          />
        </Link>
        <div className='cart__content'>
          <h2 className='title'>{data?.name}</h2>
          <p className='price'>₹{data?.price}</p>
        </div>

        <div className='box'>
          <p className='quantity'>({quantity})</p>
          <Trash3Fill
            onClick={() =>
              dispatch(
                cartAction.removeFromCart({
                  id: data?._id as string,
                  price: data?.price as number,
                })
              )
            }
          />
        </div>
      </li>
    </>
  )
}
