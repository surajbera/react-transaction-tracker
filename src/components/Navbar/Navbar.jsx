import { Link } from 'react-router-dom'
import styles from './navbar.module.css'

const Navbar = () => {
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
      </ul>
    </nav>
  )
}

export default Navbar
