/* libraries */
import { useReducer } from 'react';

/* firebase config */
import { projectAuth } from '../../firebase/config';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';

/* utilities */
import { customConsoleLog } from '../utilities/customConsoleLog';

/* constants */
const IS_PENDING = 'IS_PENDING';
const IS_ERROR = 'IS_ERROR';
const RESET_ERROR = 'RESET_ERROR';

const signUpReducer = (state, action) => {
  switch (action.type) {
    case IS_PENDING:
      return { ...state, isPending: action.payload };
    case IS_ERROR:
      return { ...state, isError: action.payload };
    case RESET_ERROR:
      return { ...state, isError: null };
    default:
      return state;
  }
};

const initialState = {
  isPending: false,
  isError: null,
};

export const useSignup = () => {
  const [state, dispatch] = useReducer(signUpReducer, initialState);

  /* remove this */
  customConsoleLog('useSignup hook ran');

  const setIsPending = (value) => {
    dispatch({ type: IS_PENDING, payload: value });
  };

  const setIsError = (value) => {
    dispatch({ type: IS_ERROR, payload: value });
  };

  const resetError = () => {
    dispatch({ type: 'RESET_ERROR' });
  };

  const signUp = async (email, password, displayName) => {
    setIsError(null);
    setIsPending(true);

    try {
      await createUserWithEmailAndPassword(projectAuth, email, password);

      /* NOTE: We do not need to manually throw the error */
      // if (!userCredential.user) {
      //   throw new Error('Could not complete the signup')
      // }
      // Even if the internet connection is off, control goes to the catch block, no need to manually throw the error, firebase does it automatically

      // Set the display name for the user
      await updateProfile(projectAuth.currentUser, { displayName });

      // dispatchLoginEvent(userCredential.user);
      await sendEmailVerification(projectAuth.currentUser);

      setIsError(null);

      /* indicate success */
      return true;
    } catch (error) {
      console.log(error.message);
      setIsError(error.message);

      /* indicate failure */
      return false;
    } finally {
      setIsPending(false);
    }
  };

  const value = { ...state, signUp, resetError };

  return value;
};
