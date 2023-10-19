/* libraries */
import { useContext } from 'react';
import { AuthContext } from '../../context';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('Make sure useAuthContext is used within AuthContextProvider');
  }

  return context;
};
