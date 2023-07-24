import { useState } from 'react'

import styles from './login.module.css'

import { useLogin } from '../../hooks'
import { Loader } from '../../components'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isPending, isError } = useLogin()

  const onSubmitHandler = (evt) => {
    evt.preventDefault()
    login(email, password)
  }

  return (
    <div className='form-container'>
      <form className={styles['login-form']} onSubmit={onSubmitHandler}>
        <h2>Login</h2>
        <label>
          <span>Email: </span>
          <input
            type='email'
            required
            value={email}
            onChange={(evt) => {
              setEmail(evt.target.value)
            }}
          />
        </label>
        <label>
          <span>Password: </span>
          <input
            type='password'
            required
            value={password}
            onChange={(evt) => {
              setPassword(evt.target.value)
            }}
          />
        </label>
        {/* {isPending ? (
          <button className='btn'>Loading...</button>
        ) : (
          <button className='btn'>Login</button>
        )} */}
      </form>
      {isError && <p className='error-text'>{isError}</p>}
      {isPending && <Loader />}
    </div>
  )
}

export default Login
