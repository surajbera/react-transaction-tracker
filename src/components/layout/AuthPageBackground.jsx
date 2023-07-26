import AuthPageImg from '../../assets/login-page-img/track-it-img-1.jpg';

const AuthPageBackground = () => {
  return (
    <div className='w-full h-full relative before:w-full before:h-full before:block before:absolute before:bg-gray-700 before:bg-opacity-80'>
      <p className='absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white w-full px-14 font-medium text-2xl italic max-w-[700px]'>
        Stay on top of your finances with TrackIt, the smart solution to monitor, analyze, and track
        your transactions. Simplify your life, gain insights into your spending, and keep your
        financial goals on track. Sign up today and take the first step towards better financial
        management.
      </p>
      <img src={AuthPageImg} alt='' className='w-full h-full object-cover' />
    </div>
  );
};
export default AuthPageBackground;
