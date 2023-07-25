import { useState } from 'react'

import { useLogin } from '../../hooks'
import { FullScreenLoader } from '../../components'

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
      <form onSubmit={onSubmitHandler}>
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
        {isPending ? (
          <button className='btn'>Loading...</button>
        ) : (
          <button className='btn'>Login</button>
        )}
      </form>
      {isError && <p className='error-text'>{isError}</p>}
      {isPending && <FullScreenLoader />}
    </div>
  )
}

export default Login
