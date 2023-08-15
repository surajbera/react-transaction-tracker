/* libraries */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

/* hooks */
import { useSignup } from '../../hooks';
import { AuthPageBackground, ErrorAlert, FullScreenLoader } from '../../components';

/* icons */
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

/* utils */
import { successToast, errorToast } from '../../utils/toastConfig';
import {
  SIGN_UP_PAGE_SUBMIT_BTN_CLASSES,
  SIGN_UP_PAGE_FORM_INPUT_CLASSES,
} from '../../utils/htmlClasses';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { isPending, isError, signUp, resetError } = useSignup();

  const onSubmitHandler = async (evt) => {
    evt.preventDefault();

    if (formData.email === '' || formData.password === '' || formData.displayName === '') {
      toast('Please fill in all fields!', errorToast);
      return;
    }

    if (formData.displayName.length > 5) {
      toast('Display name cannot be more than 5 characters!', errorToast);
      return;
    }

    const success = await signUp(formData.email, formData.password, formData.displayName);

    if (success) {
      toast('Email Verification link dispatched!', successToast);
      setFormData((prev) => {
        return { ...prev, email: '', password: '', displayName: '' };
      });
    }
  };

  const UpdateFormFields = (field, value) => {
    setFormData((formData) => {
      return { ...formData, [field]: value };
    });
  };

  return (
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
                  className={SIGN_UP_PAGE_FORM_INPUT_CLASSES}
                  placeholder='name@company.com'
                  required
                  value={formData.email}
                  onChange={(evt) => {
                    UpdateFormFields(evt.target.name, evt.target.value);
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
                    className={SIGN_UP_PAGE_FORM_INPUT_CLASSES}
                    required
                    value={formData.password}
                    onChange={(evt) => {
                      UpdateFormFields(evt.target.name, evt.target.value);
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
                  name='displayName'
                  id='display-name'
                  className={SIGN_UP_PAGE_FORM_INPUT_CLASSES}
                  placeholder='john'
                  required
                  value={formData.displayName}
                  onChange={(evt) => {
                    UpdateFormFields(evt.target.name, evt.target.value);
                  }}
                />
              </div>
              {isPending ? (
                <button type='submit' className={SIGN_UP_PAGE_SUBMIT_BTN_CLASSES}>
                  Signing Up...
                </button>
              ) : (
                <button type='submit' className={SIGN_UP_PAGE_SUBMIT_BTN_CLASSES}>
                  Sign Up
                </button>
              )}
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Already have an account?
                <Link
                  to='/auth/sign-in'
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
