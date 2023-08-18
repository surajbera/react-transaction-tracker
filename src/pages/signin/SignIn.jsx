import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

/* hooks */
import { useSignin } from '../../hooks';

/* components */
import { AuthPageBackground, ErrorAlert, FullScreenLoader } from '../../components';

/* utils */
import { SUBMIT_BTN_CLASSES, FORM_INPUT_CLASSES } from '../../utils/htmlClasses';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isPending, isError, resetError } = useSignin();

  const onSubmitHandler = async (evt) => {
    evt.preventDefault();
    await login(email, password);
  };

  return (
    <section className='bg-gray-50 dark:bg-gray-900 h-screen auth-screen flex w-full'>
      <div className='bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700 flex items-center w-full md:w-[50%]'>
        <div className='w-full p-6 xs:max-w-[500px] xs:mx-auto'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            <p className='my-4 text-4xl'>TrackIt!</p>
            <p>Sign in to your account</p>
          </h1>
          <form className='space-y-4 md:space-y-6 pt-6' onSubmit={onSubmitHandler}>
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
                className={FORM_INPUT_CLASSES}
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
                  className={FORM_INPUT_CLASSES}
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
              <button type='submit' className={SUBMIT_BTN_CLASSES} disabled={true}>
                Signing In...
              </button>
            ) : (
              <button type='submit' className={SUBMIT_BTN_CLASSES}>
                Sign in
              </button>
            )}
            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
              Don’t have an account yet?{' '}
              <Link
                to='/auth/sign-up'
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
