import { Link } from 'react-router-dom'
import styles from './notfound.module.css'

const NotFound = () => {
  return (
    <div>
      <h2 className={styles['not-found-text']}>404 - Not Found</h2>
      <p>
        Go back to{' '}
        <Link to='/' className={styles['not-found-link']}>
          Homepage
        </Link>
      </p>
    </div>
  )
}

export default NotFound
