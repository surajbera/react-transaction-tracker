import { useReducer } from 'react'

import { projectAuth } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

import { useConsole } from './useConsole'

export const useSignup = () => {
  const IS_PENDING = 'IS_PENDING'
  const IS_ERROR = 'IS_ERROR'

  const signUpReducer = (state, action) => {
    switch (action.type) {
      case IS_PENDING:
        return { ...state, isPending: action.payload }
      case IS_ERROR:
        return { ...state, isError: action.payload }
      default:
        return state
    }
  }

  const initialState = {
    isPending: false,
    isError: null,
  }
  const [state, dispatch] = useReducer(signUpReducer, initialState)

  /* remove this */
  useConsole('useSignup hook ran')

  const setIsPending = (value) => {
    dispatch({ type: IS_PENDING, payload: value })
  }

  const setIsError = (value) => {
    dispatch({ type: IS_ERROR, payload: value })
  }

  const signUp = async (email, password, displayName) => {
    setIsError(null)
    setIsPending(true)
    try {
      await createUserWithEmailAndPassword(projectAuth, email, password)

      /* NOTE: We do not need to manually throw the error */
      // if (!userCredential) {
      //   throw new Error('Could not complete the signup')
      // }
      // Even if the internet connection is off, control goes to the catch block, no need to manually throw the error

      await updateProfile(projectAuth.currentUser, { displayName })

      setIsPending(false)
      setIsError(null)
    } catch (error) {
      console.log(error.message)
      setIsPending(false)
      setIsError(error.message)
    }
  }

  const value = { ...state, signUp }

  return value
}
