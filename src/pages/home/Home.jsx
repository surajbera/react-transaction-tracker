// styles
import styles from './home.module.css'

// components
import TransactionForm from './TransactionForm'
import { TransactionList } from '../../components'

/* hooks */
import { useAuthContext } from './../../hooks'
import { useRealtimeCollectionWithParams } from '../../hooks'

const Home = () => {
  const { authUser } = useAuthContext()
  const { isPending, isError, documents } = useRealtimeCollectionWithParams('transactions', [
    'userUid',
    '==',
    authUser.uid,
  ])
  const userId = authUser.uid

  return (
    <div>
      <div className={styles['user-info-wrap']}>
        <div className={styles['user-info-container']}>
          <p className={styles['user-info']}>Currently logged in as {authUser.email}</p>
        </div>
      </div>
      <div className={styles['home-container']}>
        <div className={styles.content}>
          {isPending && <p>Loading Documents...</p>}
          {documents && <TransactionList transactions={documents} />}
          {isError && <p>Could not fetch data!!!</p>}
          {documents && documents.length < 1 && <p>No Transactions Found!!!</p>}
        </div>
        <div className={styles.sidebar}>
          <TransactionForm userId={userId} />
        </div>
      </div>
    </div>
  )
}

export default Home
