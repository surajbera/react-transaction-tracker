import { v4 as uuidv4 } from 'uuid'

import { useDeleteDocument } from '../../hooks'

const TransactionList = ({ transactions }) => {
  const { deleteDocument } = useDeleteDocument()

  const handleDelete = async (documentId) => {
    deleteDocument('transactions', documentId)
  }

  return (
    <ul>
      {transactions.map((transaction) => (
        <li key={uuidv4()}>
          <p>{transaction.name}</p>
          <p>₹{transaction.amount}</p>
          <button onClick={() => handleDelete(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}

export default TransactionList
