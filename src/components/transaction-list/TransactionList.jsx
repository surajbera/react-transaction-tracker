import { v4 as uuidv4 } from 'uuid'
import styles from './transaction-list.module.css'

const TransactionList = ({ transactions }) => {
  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={uuidv4()}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
        </li>
      ))}
    </ul>
  )
}

export default TransactionList
