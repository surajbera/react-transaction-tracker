import { Link } from 'react-router-dom'
import styles from './navbar.module.css'

import { useLogout } from '../../hooks/useLogout'
import Loader from '../loader/Loader'

import { useAuthContext } from '../../hooks'
import { projectAuth } from '../../firebase/config'

const Navbar = () => {
  const { logOut, isPending } = useLogout()
  const { authUser } = useAuthContext()

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
          {authUser && (
            <li>
              <span>{`Hello, ${projectAuth.currentUser.displayName}`}</span>
            </li>
          )}
          {!authUser && (
            <>
              <li>
                <Link to='login'>Login</Link>
              </li>
              <li>
                <Link to='signup'>Signup</Link>
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
