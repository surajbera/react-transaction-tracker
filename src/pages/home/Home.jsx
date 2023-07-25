// components
import { TransactionForm } from '../../components'
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
      <div>
        <div>
          <p>Currently logged in as {authUser.email}</p>
        </div>
      </div>
      <div>
        <div>
          {isPending && <p>Loading Documents...</p>}
          {documents && <TransactionList transactions={documents} />}
          {isError && <p>Could not fetch data!!!</p>}
          {documents && documents.length < 1 && <p>No Transactions Found!!!</p>}
        </div>
        <div>
          <TransactionForm userId={userId} />
        </div>
      </div>
    </div>
  )
}

export default Home
