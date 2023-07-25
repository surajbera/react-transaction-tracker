// components
import { TransactionForm } from '../../components'
import { TransactionList } from '../../components'

/* hooks */
import { useAuthContext } from './../../hooks'
import { useRealtimeFilteredDocs } from '../../hooks'

const Home = () => {
  const { authUser } = useAuthContext()
  const { isPending, isError, documents } = useRealtimeFilteredDocs('transactions', [
    'userUid',
    '==',
    authUser.uid,
  ])
  const userId = authUser.uid

  return (
    <div>
      <div>
        <div>
          <p>Currently logged in as {authUser.email}</p>
        </div>
      </div>
      <div>
        <div>
          {isPending && <p>Loading Documents...</p>}
          {documents && <TransactionList transactions={documents} />}
          {isError && <p>{isError}</p>}
          {documents && documents.length < 1 && (
            <p>
              Start your financial journey today! Add your first transaction to track your spending.
            </p>
          )}
        </div>
        <div>
          <TransactionForm userId={userId} />
        </div>
      </div>
    </div>
  )
}

export default Home
