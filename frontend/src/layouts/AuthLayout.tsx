import React from 'react'
import { SwgmanLogo } from '../icons/Logo'
import { Outlet, Link } from 'react-router-dom'
import { ArrowLeft } from 'react-bootstrap-icons'

export const AuthLayout: React.FC = () => {
  return (
    <>
      <section className='auth'>
        <Link to='/' className='goback'>
          <ArrowLeft /> go back
        </Link>
        <div className='auth__content'>
          <div className='dummy-user'>
            **** You can use below credentials to continue ****
            <p>
              <span> Email: dummy@user.swagman</span>{' '}
              <span>Pass: dummy.user@1234</span>
            </p>
          </div>
          <Link to='/'>
            <SwgmanLogo className='auth__logo' />
          </Link>

          <Outlet />
        </div>
      </section>
    </>
  )
}
