import { useReducer } from 'react'

import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { projectDb } from '../../firebase/config'
// import { useCustomDelay } from '../useCustomDelay'

export const useAddDocument = (collectionName) => {
  const IS_PENDING = 'IS_PENDING'
  const IS_ERROR = 'IS_ERROR'
  const IS_SUCCESS = 'IS_SUCCESS'

  const addDocumentReducer = (state, action) => {
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

  const [state, dispatch] = useReducer(addDocumentReducer, initialState)

  const collectionRef = collection(projectDb, collectionName)

  const addDocument = async (documentData) => {
    setIsError(null)
    setIsPending(true)
    setIsSuccess(false)
    let docRef = null
    try {
      const createdAt = Timestamp.fromDate(new Date())
      docRef = await addDoc(collectionRef, { ...documentData, createdAt })
      // await useCustomDelay(1000)
      console.log('Document written with ID: ', docRef.id)
      setIsPending(false)
      setIsError(null)
      setIsSuccess(true)
    } catch (error) {
      console.log(error.message)
      setIsPending(false)
      setIsError(error.message)
      setIsSuccess(false)
    }

    return { documentId: docRef.id }
  }

  return { ...state, addDocument }
}
