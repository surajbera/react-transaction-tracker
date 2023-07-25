import { useReducer } from 'react'

import { doc, deleteDoc } from 'firebase/firestore'
import { projectDb } from '../../firebase/config'
// import { useCustomDelay } from '../useCustomDelay'

const IS_PENDING = 'IS_PENDING'
const IS_ERROR = 'IS_ERROR'
const IS_SUCCESS = 'IS_SUCCESS'

const deleteDocumentReducer = (state, action) => {
  switch (action.type) {
    case IS_PENDING:
      return { ...state, isPending: action.payload }
    case IS_ERROR:
      return { ...state, isError: action.payload }
    case IS_SUCCESS:
      return { ...state, isSuccess: action.payload }
    default:
      return state
  }
}
const initialState = {
  isPending: false,
  isError: null,
  isSuccess: false,
}

export const useDeleteDoc = () => {
  const [state, dispatch] = useReducer(deleteDocumentReducer, initialState)

  const setIsPending = (value) => {
    dispatch({ type: IS_PENDING, payload: value })
  }

  const setIsError = (value) => {
    dispatch({ type: IS_ERROR, payload: value })
  }

  const setIsSuccess = (value) => {
    dispatch({ type: IS_SUCCESS, payload: value })
  }

  const deleteDocument = async (collectionName, documentId) => {
    const documentRef = doc(projectDb, collectionName, documentId)
    setIsError(null)
    setIsPending(true)
    setIsSuccess(false)
    let returnValue = null
    try {
      returnValue = await deleteDoc(documentRef)
      // await useCustomDelay(1000)
      setIsPending(false)
      setIsError(null)
      setIsSuccess(true)
    } catch (error) {
      console.log(error.message)
      setIsPending(false)
      setIsError(error.message)
      setIsSuccess(false)
    }

    return { returnValue }
  }

  return { ...state, deleteDocument }
}
