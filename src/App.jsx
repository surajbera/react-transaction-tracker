/* libraries */
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

/* pages */
import { Home, SignIn, Signup, NotFound, ForgotPassword } from './pages';

/* components */
import { FullScreenLoader, PageLayout, PageLayoutWithoutNavbar } from './components';

/* hooks */
import { useAuthContext } from './hooks';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isAuthReady, authUser } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <PageLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: authUser ? <Home /> : <Navigate to='/sign-in' />
        },
        {
          path: 'forgot-password',
          element: <ForgotPassword />
        },
      ]
    },
    {
      path: '/',
      element: <PageLayoutWithoutNavbar />,
      errorElement: <NotFound />,
      children: [
        {
          path: 'sign-in',
          element: !authUser ? <SignIn /> : <Navigate to='/' />
        },
        {
          path: 'sign-up',
          element: !authUser ? <Signup /> : <Navigate to='/' />
        },
      ]
    }
  ])

  return (
    <div className='root-inner flex flex-col'>
      {!isAuthReady && <FullScreenLoader />}
      {isAuthReady && (
        <>
          <RouterProvider router={router} />
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;
