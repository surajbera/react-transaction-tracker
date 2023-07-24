import { useState } from 'react'
import { useSignup } from '../../hooks'

import { Loader } from '../../components'

import styles from './signup.module.css'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { isPending, isError, signUp } = useSignup()

  const onSubmitHandler = (evt) => {
    evt.preventDefault()
    if (displayName.length > 5) {
      alert('Display name cannot be more than 5 characters!')
      return
    }
    signUp(email, password, displayName)
  }

  return (
    <div className='form-container'>
      <form className={styles['signup-form']} onSubmit={onSubmitHandler}>
        <h2>Signup</h2>
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

        <label>
          <span>Display Name: </span>
          <input
            type='text'
            required
            value={displayName}
            onChange={(evt) => {
              setDisplayName(evt.target.value)
            }}
          />
        </label>

        {/* {isPending ? (
          <button className='btn' disabled>
            Loading...
          </button>
        ) : (
          <button className='btn'>Signup</button>
        )} */}
      </form>
      {isError && <p className='error-text'>{isError}</p>}
      {isPending && <Loader />}
    </div>
  )
}

export default Signup
