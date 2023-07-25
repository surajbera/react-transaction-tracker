import { useReducer } from 'react'

import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { projectDb } from '../../firebase/config'
// import { useCustomDelay } from '../useCustomDelay'

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

export const useAddDoc = () => {
  const [state, dispatch] = useReducer(addDocumentReducer, initialState)

  const setIsPending = (value) => {
    dispatch({ type: IS_PENDING, payload: value })
  }

  const setIsError = (value) => {
    dispatch({ type: IS_ERROR, payload: value })
  }

  const setIsSuccess = (value) => {
    dispatch({ type: IS_SUCCESS, payload: value })
  }

  const addDocument = async (collectionName, documentData) => {
    const collectionRef = collection(projectDb, collectionName)
    setIsError(null)
    setIsPending(true)
    setIsSuccess(false)
    try {
      /* we don't just add in the Date object, because firebase won't be able to order them correctly, instead we make use of the Timestamp object */
      const createdAt = Timestamp.fromDate(new Date())

      const amount = Number(documentData.amount)
      let isExpensive = false
      if (amount > 500) {
        isExpensive = true
      }

      await addDoc(collectionRef, { ...documentData, createdAt, isExpensive })
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

    return {}
  }

  return { ...state, addDocument }
}
