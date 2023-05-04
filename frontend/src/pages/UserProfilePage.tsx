import React, { useState } from 'react'
import { cusDispatch, cusSelector } from '../store/cusHooks'
import { userAction } from '../store/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, PersonCircle } from 'react-bootstrap-icons'

export const UserProfilePage: React.FC = () => {
  const dispatch = cusDispatch()
  const navigate = useNavigate()
  const username = cusSelector((st) => st.user.userDetails?.username)
  const [wantUserConfirmation, setWantUserConfirmation] = useState(false)

  const userCapital = username
    ? username[0].toUpperCase() + username.slice(1)
    : ''

  document.title = `SwagUser | ${userCapital}`

  return (
    <>
      <section className='userProfile'>
        <Link to={'/'} className='goback dark'>
          <ArrowLeft /> Go back
        </Link>
        <div className='content'>
          <PersonCircle />

          <h2>hello👋, {username}</h2>

          {wantUserConfirmation && <p className='confirmtext'>Are you sure?</p>}
          <div className='btns'>
            {!wantUserConfirmation && (
              <button onClick={() => setWantUserConfirmation(true)}>
                Logout
              </button>
            )}
            {wantUserConfirmation && (
              <>
                <button
                  className='confirm'
                  onClick={() => {
                    dispatch(userAction.logOut())
                    setWantUserConfirmation(false)
                    navigate('/user/login')
                  }}>
                  confirm
                </button>
                <button onClick={() => setWantUserConfirmation(false)}>
                  cancel
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
