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
    <div className={styles.container}>
      <div className={styles.content}>transaction list</div>
      <div className={styles.sidebar}>
        <TransactionForm userId={userId} />
      </div>
    </div>
  )
}

export default Home
