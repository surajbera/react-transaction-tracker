/* libraries */
import { Link, useLocation, useMatch } from 'react-router-dom';
import classNames from 'classnames';

/* hooks */
import { useLogout } from '../../hooks';
import { useAuthContext } from '../../hooks';

/* components */
import FullScreenLoader from '../ui/full-screen-loader/FullScreenLoader';

const Navbar = () => {
  const { logOut, isPending } = useLogout();
  // const { authUser } = useAuthContext()
  // const { pathname } = useLocation()

  const isLoginRoute = useMatch('/login');
  const isSignupRoute = useMatch('/signup');

  const activeRouteStyles = {};

  const onLogoutHandler = async () => {
    await logOut();
  };

  const isRouteMatched = () => {
    return false;
  };

  const authLinkCLasses = (isMatched) => {
    return classNames([
      'text-gray-800',
      'dark:text-white',
      'hover:bg-gray-50',
      'focus:ring-4',
      'focus:ring-gray-300',
      'font-medium',
      'rounded-lg',
      'text-sm',
      'px-4',
      'lg:px-4',
      'py-2',
      'lg:py-2',
      'ml-3',
      'dark:hover:bg-gray-700',
      'focus:outline-none',
      'dark:focus:ring-gray-800',
      { 'text-white': isMatched },
      { 'bg-primary-600': isMatched },
      { 'hover:bg-primary-700': isMatched },
      { 'focus:ring-primary-300': isMatched },
      { 'dark:bg-primary-600': isMatched },
      { 'dark:hover:bg-primary-700': isMatched },
      { 'dark:focus:ring-primary-800': isMatched },
    ]);
  };

  return (
    // <>
    //   <nav>
    //     <ul>
    //       <div className='app-logo'>
    //         <Link to='/'>TrackIt</Link>
    //       </div>
    //       {!authUser && (
    //         <ul>
    //           <li>
    //             <Link to='login' style={pathname === '/login' ? activeRouteStyles : {}}>
    //               Login
    //             </Link>
    //           </li>
    //           <li>
    //             <Link to='signup' style={pathname === '/signup' ? activeRouteStyles : {}}>
    //               Signup
    //             </Link>
    //           </li>
    //         </ul>
    //       )}
    //       {authUser && (
    //         <li>
    //           <span onClick={onLogoutHandler}>Logout</span>
    //         </li>
    //       )}
    //     </ul>
    //   </nav>
    //   {isPending && <FullScreenLoader />}
    // </>

    <header>
      <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow-sm'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <div className='app-logo'>
            <Link to='/' className='text-xl font-semibold whitespace-nowrap dark:text-white'>
              TrackIt!
            </Link>
          </div>

          <div className='flex items-center lg:order-2'>
            <Link to='/sign-in' className={authLinkCLasses(isLoginRoute)}>
              Signin
            </Link>
            <Link to='/sign-up' className={authLinkCLasses(isSignupRoute)}>
              Signup
            </Link>
            <li>
              <span onClick={onLogoutHandler}>Logout</span>
            </li>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
