import { Link } from 'react-router-dom'
import styles from './navbar.module.css'

import { useLogout } from '../../hooks/useLogout'

const Navbar = () => {
  const { logOut } = useLogout()

  const onLogoutHandler = () => {
    logOut()
  }

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to='/'>T-Tracker</Link>
        </li>
        <li>
          <Link to='login'>Login</Link>
        </li>
        <li>
          <Link to='signup'>Signup</Link>
        </li>
        <li>
          <span onClick={onLogoutHandler}>Logout</span>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
