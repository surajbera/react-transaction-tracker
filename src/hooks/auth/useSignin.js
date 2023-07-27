import { useReducer } from 'react';

import { projectAuth } from '../../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { customConsoleLog } from '../utilities/customConsoleLog';
import { useAuthContext } from './useAuthContext';

export const useSignin = () => {
  const IS_PENDING = 'IS_PENDING';
  const IS_ERROR = 'IS_ERROR';
  const RESET_ERROR = 'RESET_ERROR';
  const { dispatchLoginEvent } = useAuthContext();

  const loginReducer = (state, action) => {
    switch (action.type) {
      case IS_PENDING:
        return { ...state, isPending: action.payload };
      case IS_ERROR:
        return { ...state, isError: action.payload };
      case RESET_ERROR:
        return { ...state, isError: null }; // reset the error state
      default:
        return state;
    }
  };

  const initialState = {
    isPending: false,
    isError: null,
  };

  const [state, dispatch] = useReducer(loginReducer, initialState);

  /* remove this */
  customConsoleLog('useSignin hook ran', '#d9f99d');

  const setIsPending = (value) => {
    dispatch({ type: IS_PENDING, payload: value });
  };

  const setIsError = (value) => {
    dispatch({ type: IS_ERROR, payload: value });
  };

  const resetError = () => {
    dispatch({ type: RESET_ERROR });
  };

  const login = async (email, password) => {
    setIsError(null);
    setIsPending(true);

    try {
      const userCredential = await signInWithEmailAndPassword(projectAuth, email, password);

      /* NOTE: We do not need to manually throw the error */
      // if (!userCredential.user) {
      //   throw new Error('Could not complete the login')
      // }
      // Even if the internet connection is off, control goes to the catch block, no need to manually throw the error

      setIsPending(false);
      setIsError(null);
      dispatchLoginEvent(userCredential.user);
    } catch (error) {
      console.log(error.message);
      setIsPending(false);
      setIsError(error.message);
    }
  };

  const value = { ...state, login, resetError };

  return value;
};
