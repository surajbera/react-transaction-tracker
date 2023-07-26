import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Home } from './pages';
import { Login } from './pages';
import { Signup } from './pages';
import { NotFound } from './pages';

import { FullScreenLoader } from './components';
import { PageLayout } from './components';

import { useAuthContext } from './hooks';

import './App.css';

function App() {
  const { isAuthReady, authUser } = useAuthContext();

  return (
    <div className='root-inner flex flex-col'>
      {!isAuthReady && <FullScreenLoader />}
      {isAuthReady && (
        <Router>
          <Routes>
            <Route element={<PageLayout />}>
              <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
              <Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
              <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to='/' />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
