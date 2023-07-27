import AuthPageImg from '../../assets/login-page-img/track-it-img-1.jpg';

const AuthPageBackground = () => {
  return (
    <div className='w-full h-full relative before:w-full before:h-full before:block before:absolute before:bg-gray-700 before:bg-opacity-80'>
      <p className='absolute top-2/4 -translate-y-2/4 text-white w-full pr-14 pl-20 font-medium text-2xl italic max-w-[700px] leading-relaxed'>
        TrackIt empowers you to effortlessly monitor, analyze, and track your finances. Gain
        insights, achieve your financial goals, and simplify your life. Sign up today for smarter
        financial management.
      </p>
      <img src={AuthPageImg} alt='' className='w-full h-full object-cover' />
    </div>
  );
};
export default AuthPageBackground;
