import { useReducer, useEffect } from 'react'

import { projectDb } from '../../firebase/config'
import { collection, query, onSnapshot } from 'firebase/firestore'
// import { useCustomDelay } from '../useCustomDelay'

const IS_PENDING = 'IS_PENDING'
const IS_ERROR = 'IS_ERROR'
const IS_SUCCESS = 'IS_SUCCESS'
const DOCUMENTS = 'DOCUMENTS'

const realtimeCollectionReducer = (state, action) => {
  switch (action.type) {
    case IS_PENDING:
      return { ...state, isPending: action.payload }
    case IS_ERROR:
      return { ...state, isError: action.payload }
    case IS_SUCCESS:
      return { ...state, isSuccess: action.payload }
    case DOCUMENTS:
      return { ...state, documents: action.payload }
    default:
      return state
  }
}

const initialState = {
  isPending: false,
  isError: null,
  isSuccess: false,
  documents: null,
}

export const useRealtimeDocs = (collectionName) => {
  const [state, dispatch] = useReducer(realtimeCollectionReducer, initialState)
  console.log(state)

  const setIsPending = (value) => {
    console.log('isPending', value)
    dispatch({ type: IS_PENDING, payload: value })
  }

  const setIsError = (value) => {
    dispatch({ type: IS_ERROR, payload: value })
  }

  const setIsSuccess = (value) => {
    dispatch({ type: IS_SUCCESS, payload: value })
  }

  const setDocuments = (value) => {
    dispatch({ type: DOCUMENTS, payload: value })
  }

  useEffect(() => {
    const q = query(collection(projectDb, collectionName))

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        setIsPending(true)
        setIsSuccess(false)
        setIsError(null)
        setDocuments(null)

        const results = []
        querySnapshot.forEach((doc) => {
          results.push({ ...doc.data() })
        })

        setIsPending(false)
        setIsSuccess(true)
        setIsError(null)
        setDocuments(results)
      },
      (error) => {
        console.log(error.message)
        setIsPending(false)
        setIsError(error.message)
        setIsSuccess(false)
        setDocuments(null)
      }
    )

    return () => unsubscribe()
  }, [collectionName])

  return { ...state }
}
