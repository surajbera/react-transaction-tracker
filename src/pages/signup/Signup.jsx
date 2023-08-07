/* libraries */
import { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

/* hooks */
import { useSignup } from '../../hooks';
import { AuthPageBackground, ErrorAlert, FullScreenLoader } from '../../components';

/* icons */
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isPending, isError, signUp, resetError } = useSignup();

  const onSubmitHandler = async (evt) => {
    evt.preventDefault();
    if (displayName.length > 5) {
      alert('Display name cannot be more than 5 characters!');
      return;
    }
    await signUp(email, password, displayName);
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
    // <div className='form-container'>
    //   <form onSubmit={onSubmitHandler}>
    //     <h2>Signup</h2>
    //     <label>
    //       <span>Email: </span>
    //       <input
    //         type='email'
    //         required
    //         value={email}
    //         onChange={(evt) => {
    //           setEmail(evt.target.value);
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
    //           setPassword(evt.target.value);
    //         }}
    //       />
    //     </label>

    //     <label>
    //       <span>Display Name: </span>
    //       <input
    //         type='text'
    //         required
    //         value={displayName}
    //         onChange={(evt) => {
    //           setDisplayName(evt.target.value);
    //         }}
    //       />
    //     </label>

    //     {isPending ? (
    //       <button className='btn' disabled>
    //         Loading...
    //       </button>
    //     ) : (
    //       <button className='btn'>Signup</button>
    //     )}
    //   </form>
    //   {isError && <p className='error-text'>{isError}</p>}
    //   {isPending && <FullScreenLoader />}
    // </div>
    <>
      <section className='bg-gray-50 dark:bg-gray-900 h-screen auth-screen flex w-full'>
        <div className='bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700 flex items-center w-full md:w-[50%]'>
          <div className='space-y-4 md:space-y-6 w-full p-6 xs:max-w-[500px] xs:mx-auto'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              <p className='my-4 text-4xl'>TrackIt!</p>
              <p>Create an account</p>
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
              <div>
                <label
                  htmlFor='display-name'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Display Name
                </label>
                <input
                  type='text'
                  name='display-name'
                  id='display-name'
                  className={formInputClasses()}
                  placeholder='john'
                  required
                  value={displayName}
                  onChange={(evt) => {
                    setDisplayName(evt.target.value);
                  }}
                />
              </div>
              {isPending ? (
                <button type='submit' className={submitBtnClasses()}>
                  Signing Up...
                </button>
              ) : (
                <button type='submit' className={submitBtnClasses()}>
                  Sign Up
                </button>
              )}
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Already have an account?
                <Link
                  to='/sign-in'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Sign In
                </Link>
              </p>
            </form>
            {isError && <ErrorAlert text={isError} closeAlert={() => resetError()} />}
          </div>
        </div>
        <div className='hidden md:block md:w-[50%]'>
          <AuthPageBackground />
        </div>
      </section>
      {isPending && <FullScreenLoader />}
    </>
  );
};

export default Signup;
