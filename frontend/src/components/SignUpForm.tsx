import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { NewUserData, createNewUser } from '../store/userSlice'
import { cusDispatch, cusSelector } from '../store/cusHooks'

document.title = 'Swagman | Sign Up'

export const SignUpForm: React.FC = () => {
  const dispatch = cusDispatch()
  const navigate = useNavigate()
  const [disableBtn, setDisableBtn] = useState(false)
  const id = cusSelector((st) => st.user.userDetails?.id)
  const [fnameErr, setFnameErr] = useState({
    err: false,
    errTxt: '',
  })
  const fname = useRef<HTMLInputElement>(null)
  const lname = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const pass = useRef<HTMLInputElement>(null)
  const confirmPass = useRef<HTMLInputElement>(null)

  useEffect(() => {
    id && navigate(`/user/${id}`)
    id && setDisableBtn(false)
  }, [navigate, id])

  const createUserHandler = (e: React.FormEvent) => {
    e.preventDefault()

    // VALIDATION YET TO BE DONE

    // SENDING data if all fields are valid
    const userData: NewUserData = {
      confirmPass: (confirmPass.current as HTMLInputElement).value,
      pass: (pass.current as HTMLInputElement).value,
      email: (email.current as HTMLInputElement).value,
      fname: (fname.current as HTMLInputElement).value,
      lname: (lname.current as HTMLInputElement).value,
    }

    dispatch(createNewUser(userData))
    setDisableBtn(true)
  }

  return (
    <>
      <form onSubmit={createUserHandler} className='auth__form form'>
        <div className='form__two-group'>
          <div className='form__group'>
            <input
              type='text'
              id='fname'
              placeholder=' '
              className={`form__input ${fnameErr.err && 'errInp'}`}
              ref={fname}
              onChange={() => setFnameErr({ err: false, errTxt: '' })}
            />
            <label className='form__label' htmlFor='fname'>
              Enter first name
            </label>
          </div>
          <div className='form__group'>
            <input
              type='text'
              id='lname'
              placeholder=' '
              className='form__input'
              ref={lname}
            />
            <label className='form__label' htmlFor='lname'>
              Enter last name
            </label>
          </div>
        </div>

        <div className='form__two-group'>
          <div className='form__group'>
            <input
              type='email'
              id='email'
              placeholder=' '
              className='form__input'
              ref={email}
            />
            <label className='form__label' htmlFor='email'>
              Enter email
            </label>
          </div>
        </div>

        <div className='form__two-group'>
          <div className='form__group'>
            <input
              type='password'
              id='pass'
              placeholder=' '
              className='form__input'
              ref={pass}
            />
            <label className='form__label' htmlFor='pass'>
              Enter password
            </label>
          </div>
          <div className='form__group'>
            <input
              type='text'
              id='confirmPass'
              placeholder=' '
              className='form__input'
              ref={confirmPass}
            />
            <label className='form__label' htmlFor='confirmPass'>
              Confirm password
            </label>
          </div>
        </div>

        <div className='form__btns'>
          <button
            type='submit'
            disabled={disableBtn}
            onClick={() => navigate('/user/signup')}>
            {disableBtn ? 'Creating...' : 'Create a new account'}
          </button>
          <p className='or'>or</p>
          <button
            type='button'
            disabled={disableBtn}
            onClick={() => navigate('/user/login')}>
            Login
          </button>
        </div>
      </form>
    </>
  )
}
