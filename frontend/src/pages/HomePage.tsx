import React, { useEffect, useState } from 'react'
import Banner1 from '../assets/images/banner-1.png'
import Banner2 from '../assets/images/banner-2.png'
import Banner3 from '../assets/images/banner-3.png'
import { ProductBrief } from '../components/ProductBrief'
import { cusDispatch, cusSelector } from '../store/cusHooks'
import { Loader } from '../components/Loaders/Loader'
import { Products, fetchProducts } from '../store/productsSlice'

document.title = 'Swagman | Swag on point with swagman'

export const HomePage: React.FC = () => {
  const dispatch = cusDispatch()
  const [beardPrd, setBeardPrd] = useState<Products | null>(null)
  const [clothingPrds, setClothingPrds] = useState<Products[] | null>(null)
  const { products, isLoading } = cusSelector((st) => st.prds)

  useEffect(() => {
    dispatch(fetchProducts('/top-rated'))

    // fetching only beard
    const fetchBeard = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_URL}/products?category=beard`,
          {
            headers: { apikey: import.meta.env.VITE_API_KEY },
          }
        )

        if (!res.ok) {
          const err = JSON.parse(await res.text())

          throw new Error(err.message)
        }

        const { data } = await res.json()

        setBeardPrd(data.products[0])
      } catch (err) {
        console.error(err)
      }
    }

    // fetching clothing
    const fetchClothing = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_URL}/products?category=clothing`,
          {
            headers: { apikey: import.meta.env.VITE_API_KEY },
          }
        )

        if (!res.ok) {
          const err = JSON.parse(await res.text())

          throw new Error(err.message)
        }

        const { data } = await res.json()

        setClothingPrds(data.products)
      } catch (err) {
        console.error(err)
      }
    }
    fetchClothing()
    fetchBeard()
  }, [dispatch])

  const prds =
    products.length > 0 ? (
      products.slice(0, 8).map((el) => <ProductBrief key={el._id} {...el} />)
    ) : (
      <h3>No Products Found!!</h3>
    )

  const clothingJSX =
    clothingPrds && clothingPrds.length > 0 ? (
      clothingPrds.map((el) => <ProductBrief key={el._id} {...el} />)
    ) : (
      <h3>No Products Found!!</h3>
    )

  return (
    <>
      <section className='offers'>
        <img src={Banner3} alt='swagman offer 3' />
        <div className='content'>
          <h2>top rated products</h2>
          {isLoading && <Loader />}
          {!isLoading && <ul className='home-products'>{prds}</ul>}
        </div>
        <img src={Banner2} alt='swagman offer 2' />

        <div className='content'>
          <h2>Swagman's Herbal beard oil</h2>
          {!beardPrd && <Loader />}
          {beardPrd && (
            <ul className='home-products beard'>
              <ProductBrief {...beardPrd} />
            </ul>
          )}
        </div>
        <img src={Banner1} alt='swagman offer 1' />

        <div className='content'>
          <h2>Swagman's Clothing Range</h2>
          {!clothingPrds && <Loader />}
          {clothingPrds && <ul className='home-products'>{clothingJSX}</ul>}
        </div>
      </section>
    </>
  )
}
