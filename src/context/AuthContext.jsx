import { useEffect } from 'react'
import { createContext, useReducer } from 'react'

import { onAuthStateChanged } from 'firebase/auth'
import { projectAuth } from '../firebase/config'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const LOGIN = 'LOGIN'
  const LOGOUT = 'LOGOUT'
  const IS_AUTH_READY = 'IS_AUTH_READY'
  const SET_USER = 'SET_USER'

  const initialState = {
    user: null,
    isAuthReady: false,
  }

  const authReducer = (state, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          user: action.payload,
        }
      case LOGOUT:
        return {
          ...state,
          user: null,
        }
      case IS_AUTH_READY:
        return {
          ...state,
          isAuthReady: action.payload,
        }
      case SET_USER:
        return {
          ...state,
          user: action.payload,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  const dispatchLoginEvent = (value) => {
    dispatch({ type: LOGIN, payload: value })
  }

  const dispatchLogoutEvent = () => {
    dispatch({ type: LOGOUT })
  }

  const setIsAuthReady = (value) => {
    dispatch({ type: IS_AUTH_READY, payload: value })
  }

  const setUser = (value) => {
    dispatch({ type: SET_USER, payload: value })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(projectAuth, (user) => {
      if (user) {
        setUser(user)
        setIsAuthReady(true)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{ ...state, dispatchLoginEvent, dispatchLogoutEvent, setIsAuthReady }}
    >
      {children}
    </AuthContext.Provider>
  )
}
