import React from 'react'
import { SwgmanLogo } from '../icons/Logo'

export const Footer: React.FC = () => {
  return (
    <>
      <footer className='footer'>
        <div className='logo'>
          <SwgmanLogo className='footer__logo' />
          <p className='slogan'>Swag on point with Swagman</p>
        </div>

        <p className='brief'>
          Welcome to Swagman, a premium men's grooming and clothing brand
          dedicated to helping men look and feel their best. At Swagman, we
          understand that men today are more conscious about their appearance
          than ever before. That's why we provide an extensive range of
          high-quality grooming and clothing products designed specifically for
          men.
          <span>
            Our grooming range includes everything from beard oils and balms to
            hair care and skincare products, all made from natural and organic
            ingredients that are gentle on the skin and hair. We also offer a
            range of fragrances designed to suit every occasion, from casual
            everyday wear to formal events.
          </span>
          <span>
            When it comes to clothing, we offer a variety of stylish and
            sophisticated options that are perfect for any occasion. Whether
            you're looking for smart casual wear or something more formal, our
            range of shirts, suits, and accessories will help you look your
            best.
          </span>
          <span>
            At Swagman, we pride ourselves on delivering exceptional customer
            service and quality products that our customers can rely on. We're
            committed to helping our customers look and feel their best, and we
            believe that our range of grooming and clothing products can help
            them achieve that goal.
          </span>
          <span>
            So why not experience the Swagman difference for yourself? Visit our
            website or one of our stores today and discover our range of premium
            grooming and clothing products.
          </span>
        </p>

        <div className='footer__details'>
          <h4 className='copyright'>Copyright 2023 Swagman</h4>
          <h4 className='my-info'>
            Designed & Developed By
            <a href='https://nuubi3e.netlify.app/' target='_blank'>
              <strong>NuuBi3E</strong>
            </a>
          </h4>
        </div>
      </footer>
    </>
  )
}
