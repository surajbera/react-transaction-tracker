/* libraries */
import { useState } from 'react';

// components
import { TransactionForm } from '../../components';
import { TransactionList } from '../../components';

/* hooks */
import { useAuthContext } from './../../hooks';
import { useRealtimeFilteredDocs } from '../../hooks';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authUser } = useAuthContext();
  const { isPending, isError, documents } = useRealtimeFilteredDocs('transactions', [
    'userUid',
    '==',
    authUser.uid,
  ]);
  const toggleModal = () => {
    console.log(isModalOpen);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div>
        <div>
          <p>Currently logged in as {authUser.email}</p>
        </div>
        <button
          onClick={toggleModal}
          className='text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
        >
          Add Expense
        </button>
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
        {isModalOpen && (
          <>
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <TransactionForm
              userId={authUser.uid}
              toggleModal={toggleModal}
              isModalOpen={isModalOpen}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
