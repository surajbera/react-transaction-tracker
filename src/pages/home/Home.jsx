// styles
import styles from './home.module.css'

// components
import TransactionForm from './TransactionForm'
// import { TransactionList } from '../../components'

/* hooks */
import { useAuthContext } from './../../hooks'
// import { useRealtimeCollection } from '../../hooks'

const Home = () => {
  const { authUser } = useAuthContext()
  // const { isPending, isError, documents } = useRealtimeCollection()
  const userId = authUser.uid

  return (
    <div>
      <div className={styles['user-info-wrap']}>
        <div className={styles['user-info-container']}>
          <p className={styles['user-info']}>Currently logged in as {authUser.email}</p>
        </div>
      </div>
      <div className={styles['home-container']}>
        <div className={styles.content}></div>
        <div className={styles.sidebar}>
          <TransactionForm userId={userId} />
        </div>
      </div>
    </div>
  )
}

export default Home
