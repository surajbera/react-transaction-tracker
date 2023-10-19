/* library */
import { useReducer } from 'react';

/* firebase */
import { projectAuth } from '../../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

/* context */
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

      if (userCredential.user.emailVerified) {
        setIsError(null);
        dispatchLoginEvent(userCredential.user);
      } else {
        setIsError('Please verify your email before signing in.');
      }
    } catch (error) {
      console.log(error.message);
      setIsError(error.message);
    } finally {
      setIsPending(false);
    }
  };

  const value = { ...state, login, resetError };

  return value;
};
