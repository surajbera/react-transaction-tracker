/* libraries */
import { Link } from 'react-router-dom';

/* hooks */
import { useSignout } from '../../hooks';
import { useAuthContext } from '../../hooks';

const Navbar = () => {
  const { logOut, isPending } = useSignout();
  const { authUser } = useAuthContext();

  const onLogoutHandler = async () => {
    await logOut();
  };

  return (
    <header>
      <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 border-b border-gray-300'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <div className='app-logo'>
            <Link to='/' className='text-2xl font-semibold whitespace-nowrap dark:text-white'>
              TrackIt!
            </Link>
          </div>

          {authUser && (
            <button
              type='button'
              onClick={onLogoutHandler}
              className='py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
