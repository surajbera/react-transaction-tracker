/* libraries */
import { useState, useEffect } from 'react';
/* hooks */
import { useAddDoc } from '../../hooks';

const TransactionForm = ({ userId, toggleModal, isModalOpen }) => {
  console.log(isModalOpen);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const { isPending, isSuccess, addDocument } = useAddDoc();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await addDocument('transactions', { userUid: userId, name, amount });
  };

  useEffect(() => {
    if (isSuccess) {
      setName('');
      setAmount('');
    }
  }, [isSuccess]);

  return (
    <>
      {/* <h3>Add a Transaction</h3>
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
      </form> */}

      <div
        id='updateProductModal'
        aria-hidden={!isModalOpen}
        className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal h-full'
      >
        {/* Modal content */}
        <div className='relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto'>
          <div className='relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
            <div className='flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Add New Expense
              </h3>
              <button
                type='button'
                onClick={toggleModal}
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-toggle='updateProductModal'
              >
                <svg
                  aria-hidden={!isModalOpen}
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            <form action='#'>
              <div className='grid gap-4 mb-4 sm:grid-cols-2'>
                <div>
                  <label
                    htmlFor='name'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    // value='iPad Air Gen 5th Wi-Fi'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='Ex. Apple iMac 27&ldquo;'
                  />
                </div>
                <div>
                  <label
                    htmlFor='brand'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Brand
                  </label>
                  <input
                    type='text'
                    name='brand'
                    id='brand'
                    // value='Google'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='Ex. Apple'
                  />
                </div>
                <div>
                  <label
                    htmlFor='price'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Price
                  </label>
                  <input
                    type='number'
                    // value='399'
                    name='price'
                    id='price'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='$299'
                  />
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <button
                  type='submit'
                  className='text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionForm;
