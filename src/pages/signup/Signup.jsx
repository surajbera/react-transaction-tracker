import { useState } from 'react'

import styles from './signup.module.css'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  const onSubmitHandler = (evt) => {
    evt.preventDefault()
    console.log(email, password, displayName)
  }

  return (
    <form className={styles['signup-form']} onSubmit={onSubmitHandler}>
      <h2>Signup</h2>
      <label>
        <span>Email: </span>
        <input
          type='email'
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
          value={password}
          onChange={(evt) => {
            setPassword(evt.target.value)
          }}
        />
      </label>

      <label>
        <span>Display Name: </span>
        <input
          type='text'
          value={displayName}
          onChange={(evt) => {
            setDisplayName(evt.target.value)
          }}
        />
      </label>

      <button className='btn'>Signup</button>
    </form>
  )
}

export default Signup
