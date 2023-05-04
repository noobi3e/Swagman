import React from 'react'
import { ProductBrief } from './ProductBrief'
import { cusSelector } from '../store/cusHooks'
import { Loader } from './Loaders/Loader'

export const Products: React.FC = () => {
  const { isLoading, products, err, filter } = cusSelector((st) => st.prds)

  let prds =
    products.length > 0
      ? products.map((prd) => <ProductBrief key={prd.prdId} {...prd} />)
      : [<h3 key={Math.random()}>😔No Product Found! </h3>]

  if (filter.type) {
    if (filter.type === 'price') {
      const filterPrds = products.filter(
        (el) => el.price > filter.min && el.price <= filter.max
      )

      prds =
        filterPrds.length > 0
          ? filterPrds.map((el) => <ProductBrief key={el._id} {...el} />)
          : [<h3 key={Math.random()}>😔No Product Found! </h3>]
    }

    if (filter.type === 'rating') {
      const filterPrds = products.filter(
        (el) => el.rating > filter.min && el.rating <= filter.max
      )

      prds =
        filterPrds.length > 0
          ? filterPrds.map((el) => <ProductBrief key={el._id} {...el} />)
          : [<h3 key={Math.random()}>😔No Product Found! </h3>]
    }
  }

  return (
    <>
      {!isLoading && err.isErr && <h2>{err.errTxt}</h2>}
      {isLoading && !err.isErr && <Loader />}
      {!isLoading && !err.isErr && (
        <ul className={`products__products ${prds.length === 1 && 'onePrd'}`}>
          {prds}
        </ul>
      )}
    </>
  )
}
