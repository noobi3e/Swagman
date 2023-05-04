import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cusDispatch, cusSelector, errObj } from '../store/cusHooks'
import { logUserIn } from '../store/userSlice'

document.title = 'Swagman | Log In'

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState<errObj>({ isErr: false, errTxt: '' })
  const navigate = useNavigate()
  const dispatch = cusDispatch()
  const id = cusSelector((st) => st.user.userDetails?.id)
  const { err: userErr } = cusSelector((st) => st.user)
  const [disableBtn, setDisableBtn] = useState(false)

  useEffect(() => {
    id && navigate(`/user/${id}`)
    id && setDisableBtn(false)
    userErr.isErr && setDisableBtn(false)

    userErr.isErr && setErr({ isErr: true, errTxt: userErr.errTxt })
  }, [navigate, id, userErr])

  const loginUserHandler = (e: React.FormEvent) => {
    e.preventDefault()

    // Checking if there is any input or not
    if (email.trim().length === 0)
      return setErr({ isErr: true, errTxt: "Email can't be empty" })

    if (!(email.includes('@') && email.includes('.')))
      return setErr({
        isErr: true,
        errTxt: 'Pls enter a valid email ( example@gmail.com )',
      })

    if (pass.trim().length === 0)
      return setErr({ isErr: true, errTxt: "Pass can't be empty" })

    dispatch(
      logUserIn({
        email,
        pass,
      })
    )
    setErr({ isErr: false, errTxt: '' })

    setDisableBtn(true)
  }

  return (
    <>
      <form onSubmit={loginUserHandler} className='auth__form form'>
        <div className='form__group'>
          <input
            type='email'
            id='email'
            placeholder=' '
            className='form__input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className='form__label' htmlFor='email'>
            Enter email
          </label>
        </div>
        <div className='form__group'>
          <input
            type='password'
            id='password'
            placeholder=' '
            className='form__input'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <label className='form__label' htmlFor='password'>
            Enter password
          </label>
        </div>
        {err.isErr && <p className='form__err'>{err.errTxt}</p>}
        <div className='form__btns'>
          <button type='submit' disabled={disableBtn}>
            {disableBtn ? 'logging...' : 'login'}
          </button>
          {/* DISABLED FOR NOW */}
          {/* <p className='or'>or</p>
          <button
            type='button'
            disabled={disableBtn}
            onClick={() => navigate('/user/signup')}>
            Create a new account
          </button> */}
        </div>
      </form>
    </>
  )
}
