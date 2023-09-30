/* libraries */
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

/* pages */
import { Home, SignIn, Signup, NotFound, ForgotPassword } from './pages';

/* components */
import { FullScreenLoader, PageLayout, PageLayoutWithoutNavbar } from './components';

/* hooks */
import { useAuthContext } from './hooks';

/* styles */
import './App.css';

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
          element: authUser ? <Home /> : <Navigate to='/auth/sign-in' />,
        },
        {
          path: 'forgot-password',
          element: <ForgotPassword />,
        },
      ],
    },
    {
      path: '/auth/',
      element: <PageLayoutWithoutNavbar />,
      errorElement: <NotFound />,
      children: [
        {
          path: 'sign-in',
          element: !authUser ? <SignIn /> : <Navigate to='/' />,
        },
        {
          path: 'sign-up',
          element: !authUser ? <Signup /> : <Navigate to='/' />,
        },
      ],
    },
  ]);

  return (
    <div className='root-inner flex flex-col'>
      {!isAuthReady && <FullScreenLoader />}
      {isAuthReady && (
        <>
          <RouterProvider router={router} />
          <Toaster position='bottom-center' reverseOrder={false} />
        </>
      )}
    </div>
  );
}

export default App;
