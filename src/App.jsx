import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Home } from './pages';
import { SignIn } from './pages';
import { Signup } from './pages';
import { NotFound } from './pages';
import { ForgotPassword } from './pages';

import { FullScreenLoader } from './components';
import { PageLayout } from './components';

import { useAuthContext } from './hooks';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isAuthReady, authUser } = useAuthContext();

  return (
    <div className='root-inner flex flex-col'>
      {!isAuthReady && <FullScreenLoader />}
      {isAuthReady && (
        <>
          <Router>
            <Routes>
              <Route element={<PageLayout />}>
                <Route path='/' element={authUser ? <Home /> : <Navigate to='/sign-in' />} />
                <Route path='/sign-in' element={!authUser ? <SignIn /> : <Navigate to='/' />} />
                <Route path='/sign-up' element={!authUser ? <Signup /> : <Navigate to='/' />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='*' element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;
