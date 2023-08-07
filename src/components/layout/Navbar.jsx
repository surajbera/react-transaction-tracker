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
            <li>
              <span onClick={onLogoutHandler}>Sign Out</span>
            </li>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
