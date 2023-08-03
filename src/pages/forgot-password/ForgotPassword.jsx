import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import classNames from 'classnames';

/* firebase imports */
import { sendPasswordResetEmail } from 'firebase/auth';
import { projectAuth } from '../../firebase/config';

const ForgotPassword = () => {
  const [resetEmail, setResetEmail] = useState('');
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const submitBtnClasses = () => {
    return classNames(
      'w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
    );
  };

  const onSubmitHandler = async (evt) => {
    evt.preventDefault();
    if (resetEmail === '') return;
    setIsPending(true);
    try {
      await sendPasswordResetEmail(projectAuth, resetEmail);
      setIsPending(false);
      navigate('/sign-in');
      toast.success('Verification email sent, check your email!');
    } catch (error) {
      setIsPending(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <section className='bg-gray-50 dark:bg-gray-900 flex items-center justify-center w-full'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0'>
        <div className='w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8'>
          <h1 className='mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Forgot your password?
          </h1>
          <p className='font-light text-gray-500 dark:text-gray-400'>
            Don't fret! Just type in your email and we will send you a code to reset your password!
          </p>
          <form className='mt-4 space-y-4 lg:mt-5 md:space-y-5' onSubmit={onSubmitHandler}>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Your email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                value={resetEmail}
                onChange={(evt) => setResetEmail(evt.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='name@company.com'
                required
              />
            </div>
            <button type='submit' className={submitBtnClasses()}>
              {isPending ? 'Sending Verification Link...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default ForgotPassword;
