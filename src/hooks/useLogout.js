import { useReducer, useEffect, useState } from 'react'

import { projectAuth } from '../firebase/config'
import { signOut } from 'firebase/auth'

import { useConsole } from './useConsole'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const IS_PENDING = 'IS_PENDING'
  const IS_ERROR = 'IS_ERROR'
  const { dispatchLogoutEvent } = useAuthContext()
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  const logoutReducer = (state, action) => {
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

  const [state, dispatch] = useReducer(logoutReducer, initialState)

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  /* remove this */
  useConsole('useLogout hook ran', '#93c5fd')

  const setIsPending = (value) => {
    dispatchIfNotCancelled({ type: IS_PENDING, payload: value })
  }

  const setIsError = (value) => {
    dispatchIfNotCancelled({ type: IS_ERROR, payload: value })
  }

  const logOut = async () => {
    setIsError(null)
    setIsPending(true)
    try {
      await signOut(projectAuth)
      dispatchLogoutEvent()
      setIsPending(false)
      setIsError(null)
    } catch (error) {
      console.log(error.message)
      setIsPending(false)
      setIsError(error.message)
    }
  }

  const value = { ...state, logOut }

  return value
}
