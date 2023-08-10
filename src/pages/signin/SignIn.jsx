import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

import { useSignin } from '../../hooks';
import { AuthPageBackground, ErrorAlert, FullScreenLoader } from '../../components';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isPending, isError, resetError } = useSignin();

  const onSubmitHandler = async (evt) => {
    evt.preventDefault();
    await login(email, password);
  };

  const formInputClasses = () => {
    return classNames(
      'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
    );
  };

  const submitBtnClasses = () => {
    return classNames(
      'w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
    );
  };

  return (
    <section className='bg-gray-50 dark:bg-gray-900 h-screen auth-screen flex w-full'>
      <div className='bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700 flex items-center w-full md:w-[50%]'>
        <div className='w-full p-6 xs:max-w-[500px] xs:mx-auto'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            <p className='my-4 text-4xl'>TrackIt!</p>
            <p>Sign in to your account</p>
          </h1>
          <form className='space-y-4 md:space-y-6' onSubmit={onSubmitHandler}>
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
                className={formInputClasses()}
                placeholder='name@company.com'
                required
                value={email}
                onChange={(evt) => {
                  setEmail(evt.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className={formInputClasses()}
                  required
                  value={password}
                  onChange={(evt) => {
                    setPassword(evt.target.value);
                  }}
                />
                <span
                  className='absolute right-[10px] top-1/2 -translate-y-2/4'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </div>
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
            {isPending ? (
              <button type='submit' className={submitBtnClasses()}>
                Signing In...
              </button>
            ) : (
              <button type='submit' className={submitBtnClasses()}>
                Sign in
              </button>
            )}
            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
              Don’t have an account yet?{' '}
              <Link
                to='/sign-up'
                className='font-medium text-primary-600 hover:underline dark:text-primary-500'
              >
                Sign up
              </Link>
            </p>
          </form>
          {isError && <ErrorAlert text={isError} closeAlert={() => resetError()} />}
          {isPending && <FullScreenLoader />}
        </div>
      </div>
      <div className='hidden md:block md:w-[50%]'>
        <AuthPageBackground />
      </div>
    </section>
  );
};

export default SignIn;
