import { useReducer } from 'react'

import { updateDoc, doc } from 'firebase/firestore'
import { projectDb } from '../../firebase/config'

export const useUpdateDocument = async (collectionName, documentId) => {
  const IS_PENDING = 'IS_PENDING'
  const IS_ERROR = 'IS_ERROR'
  const IS_SUCCESS = 'IS_SUCCESS'

  const updateDocumentReducer = (state, action) => {
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
  const setIsPending = (value) => {
    dispatch({ type: IS_PENDING, payload: value })
  }

  const setIsError = (value) => {
    dispatch({ type: IS_ERROR, payload: value })
  }

  const setIsSuccess = (value) => {
    dispatch({ type: IS_SUCCESS, payload: value })
  }

  const [state, dispatch] = useReducer(updateDocumentReducer, initialState)

  const documentRef = doc(projectDb, collectionName, documentId)

  const updateDocument = async (documentData) => {
    setIsError(null)
    setIsPending(true)
    setIsSuccess(false)

    try {
      await updateDoc(documentRef, documentData)
      setIsPending(false)
      setIsError(null)
      setIsSuccess(true)
    } catch (error) {
      console.log(error.message)
      setIsPending(false)
      setIsError(error.message)
      setIsSuccess(false)
    }
  }

  return { ...state, updateDocument }
}
