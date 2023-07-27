import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const PageLayout = () => {
  const location = useLocation();

  /* identifying auth page */
  let isHeader = true;
  const noHeaderPages = ['/sign-up', '/sign-in'];
  if (noHeaderPages.includes(location.pathname)) {
    isHeader = false;
  }

  /* identifying 404 page */
  let isNotFoundPage = false;
  const validPages = ['/', '/sign-up', '/sign-in', '/forgot-password'];
  if (!validPages.includes(location.pathname)) {
    isNotFoundPage = true;
  }

  return (
    <>
      {isHeader && <Navbar />}
      <div className={`app-content-wrap flex flex-1 ${isNotFoundPage ? 'not-found-page' : ''}`}>
        <Outlet />
      </div>
    </>
  );
};

export default PageLayout;
