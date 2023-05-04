import React from 'react'
import { SwgmanLogo } from '../icons/Logo'

export const ErrorPage: React.FC<{ msg?: string }> = ({ msg }) => {
  // setting title
  document.title = 'Swagman | Not Found❗'
  document.body.style.background = '#f0f0f0'

  const errMsg = msg || 'There is no data for this page right now😔.'

  return (
    <>
      <section className='error'>
        <a href='/'>
          <SwgmanLogo className='error__logo' />
        </a>
        <h2 className='error__head'>OOPS!</h2>
        <p className='error__text'>
          {errMsg} <span>Try Again Later!</span>{' '}
          <span>
            <a href='/'>Go Back</a>
          </span>
        </p>
      </section>
    </>
  )
}
