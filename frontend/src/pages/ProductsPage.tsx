import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Products } from '../components/Products'
import { cusDispatch } from '../store/cusHooks'
import { fetchProducts } from '../store/productsSlice'
import { windowWidth } from '../utils/utility'
import { FilterOptions } from '../components/FilterOptions'

export const ProductsPage: React.FC = () => {
  const params = useParams()
  const dispatch = cusDispatch()
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    let id
    // changing ID to show products by category
    if (params.id === 'all') {
      id = ''
      document.title = 'Swagman | All Products'
    } else if (params.id === 'top-rated') {
      id = '/top-rated'

      document.title = 'Swagman | Top Rated Products'
    } else {
      id = `?category=${params.id}`
      document.title = `Swagman | ${params.id} products`
    }

    dispatch(fetchProducts(id))
  }, [dispatch, params.id])

  return (
    <>
      <p className='qoutes'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        exercitationem saepe amet, ratione, veritatis at suscipit, in iusto
        omnis perspiciatis voluptatibus! Aliquid esse fugiat repudiandae veniam
        neque placeat sunt labore!
      </p>
      <section className='products'>
        <section className='products__filter'>
          <h2
            className='filterHead'
            onClick={() => {
              if (windowWidth <= 810) setShowFilter(!showFilter)
              else setShowFilter(false)
            }}>
            Filter By
          </h2>

          {windowWidth > 810 && <FilterOptions />}
          {windowWidth <= 810 && showFilter && <FilterOptions />}
        </section>
        <Products />
      </section>
    </>
  )
}
