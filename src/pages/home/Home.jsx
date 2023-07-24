// styles
import styles from './home.module.css'

// components
import TransactionForm from './TransactionForm'

/* hooks */
import { useAuthContext } from './../../hooks/useAuthContext'

const Home = () => {
  const { authUser } = useAuthContext()
  const userId = authUser.uid

  return (
    <div>
      <div className={styles['user-info-wrap']}>
        <div className={styles['user-info-container']}>
          <p className={styles['user-info']}>Currently logged in as {authUser.email}</p>
        </div>
      </div>
      <div className={styles['home-container']}>
        <div className={styles.content}>transaction list</div>
        <div className={styles.sidebar}>
          <TransactionForm userId={userId} />
        </div>
      </div>
    </div>
  )
}

export default Home
