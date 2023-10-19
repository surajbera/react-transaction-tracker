/* library */
import { createContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

/* firebase config */
import { projectAuth } from '../firebase/config';

/* utils */
import { customConsoleLog } from '../utils';

export const AuthContext = createContext();

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const IS_AUTH_READY = 'IS_AUTH_READY';
const SET_USER = 'SET_USER';

const initialState = {
  authUser: null,
  isAuthReady: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        authUser: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        authUser: null,
      };
    case IS_AUTH_READY:
      return {
        ...state,
        isAuthReady: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        authUser: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const dispatchLoginEvent = (value) => {
    dispatch({ type: LOGIN, payload: value });
  };

  const dispatchLogoutEvent = () => {
    dispatch({ type: LOGOUT });
  };

  const setIsAuthReady = (value) => {
    dispatch({ type: IS_AUTH_READY, payload: value });
  };

  const setUser = (value) => {
    dispatch({ type: SET_USER, payload: value });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(projectAuth, (user) => {
      if (user && user.emailVerified) {
        customConsoleLog(
          'onAuthStateChanged inside useEffect is running(Auth Provider Component)',
          '#cbd5e1'
        );
        setUser(user);
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, dispatchLoginEvent, dispatchLogoutEvent, setIsAuthReady }}
    >
      {children}
    </AuthContext.Provider>
  );
};
