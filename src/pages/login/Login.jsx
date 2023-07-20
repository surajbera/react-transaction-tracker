import { useState } from 'react'

import styles from './login.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = (evt) => {
    evt.preventDefault()
    console.log(email, password)
  }

  return (
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

      <button className='btn'>Login</button>
    </form>
  )
}

export default Login
