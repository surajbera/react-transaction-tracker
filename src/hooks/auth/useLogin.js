import { useReducer } from 'react'

import { projectAuth } from '../../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { customConsoleLog } from '../utilities/customConsoleLog'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const IS_PENDING = 'IS_PENDING'
  const IS_ERROR = 'IS_ERROR'
  const { dispatchLoginEvent } = useAuthContext()

  const loginReducer = (state, action) => {
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

  const [state, dispatch] = useReducer(loginReducer, initialState)

  /* remove this */
  customConsoleLog('useLogin hook ran', '#d9f99d')

  const setIsPending = (value) => {
    dispatch({ type: IS_PENDING, payload: value })
  }

  const setIsError = (value) => {
    dispatch({ type: IS_ERROR, payload: value })
  }

  const login = async (email, password) => {
    setIsError(null)
    setIsPending(true)
    try {
      const userCredential = await signInWithEmailAndPassword(projectAuth, email, password)

      /* NOTE: We do not need to manually throw the error */
      // if (!userCredential.user) {
      //   throw new Error('Could not complete the login')
      // }
      // Even if the internet connection is off, control goes to the catch block, no need to manually throw the error
      dispatchLoginEvent(userCredential.user)
      setIsPending(false)
      setIsError(null)
    } catch (error) {
      console.log(error.message)
      setIsPending(false)
      setIsError(error.message)
    }
  }

  const value = { ...state, login }

  return value
}
