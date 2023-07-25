/* libraries */
import { Link, useLocation } from 'react-router-dom'

/* hooks */
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../hooks'

/* components */
import Loader from './Loader'

/* styles */
import styles from './navbar.module.css'

const Navbar = () => {
  const { logOut, isPending } = useLogout()
  const { authUser } = useAuthContext()
  const { pathname } = useLocation()

  const activeRouteStyles = {
    backgroundColor: '#2563eb',
    color: '#fff',
    borderRadius: '3px',
    padding: '5px 10px',
  }

  const onLogoutHandler = async () => {
    await logOut()
  }

  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li className={styles.title}>
            <Link to='/'>T-Tracker</Link>
          </li>
          {!authUser && (
            <>
              <li>
                <Link to='login' style={pathname === '/login' ? activeRouteStyles : {}}>
                  Login
                </Link>
              </li>
              <li>
                <Link to='signup' style={pathname === '/signup' ? activeRouteStyles : {}}>
                  Signup
                </Link>
              </li>
            </>
          )}
          {authUser && (
            <li>
              <span onClick={onLogoutHandler}>Logout</span>
            </li>
          )}
        </ul>
      </nav>
      {isPending && <Loader />}
    </>
  )
}

export default Navbar
