import { v4 as uuidv4 } from 'uuid'

import { useDeleteDocument } from '../../hooks'

import styles from './transaction-list.module.css'

const TransactionList = ({ transactions }) => {
  const { deleteDocument } = useDeleteDocument()

  const handleDelete = async (documentId) => {
    deleteDocument('transactions', documentId)
  }

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={uuidv4()}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>₹{transaction.amount}</p>
          <button onClick={() => handleDelete(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}

export default TransactionList
