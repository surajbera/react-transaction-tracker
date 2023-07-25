import { useState } from 'react'
import { useSignup } from '../../hooks'

import { FullScreenLoader } from '../../components'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { isPending, isError, signUp } = useSignup()

  const onSubmitHandler = async (evt) => {
    evt.preventDefault()
    if (displayName.length > 5) {
      alert('Display name cannot be more than 5 characters!')
      return
    }
    await signUp(email, password, displayName)
  }

  return (
    <div className='form-container'>
      <form onSubmit={onSubmitHandler}>
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

        {isPending ? (
          <button className='btn' disabled>
            Loading...
          </button>
        ) : (
          <button className='btn'>Signup</button>
        )}
      </form>
      {isError && <p className='error-text'>{isError}</p>}
      {isPending && <FullScreenLoader />}
    </div>
  )
}

export default Signup
