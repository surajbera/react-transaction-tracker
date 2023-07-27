import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useLogin } from '../../hooks';
import { AuthPageBackground, FullScreenLoader } from '../../components';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isPending, isError } = useLogin();

  const onSubmitHandler = async (evt) => {
    evt.preventDefault();
    await login(email, password);
  };

  return (
    // <div className='form-container'>
    //   <form onSubmit={onSubmitHandler}>
    //     <h2>Login</h2>
    //     <label>
    //       <span>Email: </span>
    //       <input
    //         type='email'
    //         required
    //         value={email}
    //         onChange={(evt) => {
    //           setEmail(evt.target.value)
    //         }}
    //       />
    //     </label>
    //     <label>
    //       <span>Password: </span>
    //       <input
    //         type='password'
    //         required
    //         value={password}
    //         onChange={(evt) => {
    //           setPassword(evt.target.value)
    //         }}
    //       />
    //     </label>
    //     {isPending ? (
    //       <button className='btn'>Loading...</button>
    //     ) : (
    //       <button className='btn'>Login</button>
    //     )}
    //   </form>
    //   {isError && <p className='error-text'>{isError}</p>}
    //   {isPending && <FullScreenLoader />}
    // </div>

    <section className='bg-gray-50 dark:bg-gray-900 h-screen auth-screen flex w-full'>
      <div className='bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-end'>
        <div className='space-y-4 md:space-y-6 w-9/12 max-w-[550px] pr-24 pl-14'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            <p className='my-4'>TrackIt!</p>
            <p>Sign in to your account</p>
          </h1>
          <form className='space-y-4 md:space-y-6' action='#'>
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
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='name@company.com'
                required=''
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required=''
              />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-start'>
                <div className='flex items-center h-5'></div>
              </div>
              <Link
                to='/forgot-password'
                className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
              >
                Forgot password?
              </Link>
            </div>
            <button
              type='submit'
              className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
              Sign in
            </button>
            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
              Don’t have an account yet?{' '}
              <Link
                to='/signup'
                className='font-medium text-primary-600 hover:underline dark:text-primary-500'
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div>
        <AuthPageBackground />
      </div>
    </section>
  );
};

export default Login;
