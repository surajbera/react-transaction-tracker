import { useReducer } from 'react';

import { projectAuth } from '../../firebase/config';
import { signOut } from 'firebase/auth';

import { customConsoleLog } from '../utilities/customConsoleLog';
import { useAuthContext } from './useAuthContext';

export const useSignout = () => {
  const IS_PENDING = 'IS_PENDING';
  const IS_ERROR = 'IS_ERROR';
  const { dispatchLogoutEvent } = useAuthContext();

  const logoutReducer = (state, action) => {
    switch (action.type) {
      case IS_PENDING:
        return { ...state, isPending: action.payload };
      case IS_ERROR:
        return { ...state, isError: action.payload };
      default:
        return state;
    }
  };

  const initialState = {
    isPending: false,
    isError: null,
  };

  const [state, dispatch] = useReducer(logoutReducer, initialState);

  /* remove this */
  customConsoleLog('useSignout hook ran', '#93c5fd');

  const setIsPending = (value) => {
    dispatch({ type: IS_PENDING, payload: value });
  };

  const setIsError = (value) => {
    dispatch({ type: IS_ERROR, payload: value });
  };

  const logOut = async () => {
    setIsError(null);
    setIsPending(true);
    try {
      await signOut(projectAuth);
      dispatchLogoutEvent();
      setIsPending(false);
      setIsError(null);
    } catch (error) {
      console.log(error.message);
      setIsPending(false);
      setIsError(error.message);
    }
  };

  const value = { ...state, logOut };

  return value;
};
