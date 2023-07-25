import { useState, useEffect } from 'react'
import { useAddDoc } from '../../hooks'

const TransactionForm = ({ userId }) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const { isPending, isSuccess, addDocument } = useAddDoc()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    await addDocument('transactions', { userUid: userId, name, amount })
  }

  useEffect(() => {
    if (isSuccess) {
      setName('')
      setAmount('')
    }
  }, [isSuccess])

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={onSubmitHandler}>
        <label>
          <span>Transaction name:</span>
          <input type='text' required onChange={(e) => setName(e.target.value)} value={name} />
        </label>
        <label>
          <span>Amount (₹):</span>
          <input
            type='number'
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        {!isPending && <button>Add Transaction</button>}
        {isPending && <button disabled>Adding Transaction</button>}
      </form>
    </>
  )
}

export default TransactionForm
