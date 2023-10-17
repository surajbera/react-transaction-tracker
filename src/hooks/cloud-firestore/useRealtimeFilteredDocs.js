import { useReducer, useEffect, useRef } from 'react';

import { projectDb } from '../../firebase/config';
import { collection, query, onSnapshot, where } from 'firebase/firestore';

const IS_PENDING = 'IS_PENDING';
const IS_ERROR = 'IS_ERROR';
const IS_SUCCESS = 'IS_SUCCESS';
const DOCUMENTS = 'DOCUMENTS';

const realtimeCollectionReducer = (state, action) => {
  switch (action.type) {
    case IS_PENDING:
      return { ...state, isPending: action.payload };
    case IS_ERROR:
      return { ...state, isError: action.payload };
    case IS_SUCCESS:
      return { ...state, isSuccess: action.payload };
    case DOCUMENTS:
      return { ...state, documents: action.payload };
    default:
      return state;
  }
};

const initialState = {
  isPending: false,
  isError: null,
  isSuccess: false,
  documents: null,
};

export const useRealtimeFilteredDocs = (collectionName, queryParam) => {
  const [state, dispatch] = useReducer(realtimeCollectionReducer, initialState);

  let cachedQueryParam = useRef(queryParam).current;

  const setIsPending = (value) => {
    dispatch({ type: IS_PENDING, payload: value });
  };

  const setIsError = (value) => {
    dispatch({ type: IS_ERROR, payload: value });
  };

  const setIsSuccess = (value) => {
    dispatch({ type: IS_SUCCESS, payload: value });
  };

  const setDocuments = (value) => {
    dispatch({ type: DOCUMENTS, payload: value });
  };

  useEffect(() => {
    setIsPending(true);
    setIsSuccess(false);
    setIsError(null);
    setDocuments(null);

    let q = query(collection(projectDb, collectionName));

    if (cachedQueryParam) {
      q = query(
        collection(projectDb, collectionName),
        where(...cachedQueryParam)
        // orderBy('createdAt', 'desc')
      );
    }

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setIsPending(false);
        setIsSuccess(true);
        setIsError(null);
        setDocuments(results);
      },
      (error) => {
        console.log(error.message);
        setIsPending(false);
        setIsError(error.message);
        setIsSuccess(false);
        setDocuments(null);
      }
    );

    return () => unsubscribe();
  }, [collectionName, cachedQueryParam]);

  return { ...state };
};
