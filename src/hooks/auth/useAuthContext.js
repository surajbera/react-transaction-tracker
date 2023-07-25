import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw Error('Make sure useAuthContext is used within AuthContextProvider')
  }

  return context
}
