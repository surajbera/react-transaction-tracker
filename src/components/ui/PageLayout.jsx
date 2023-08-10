import { Outlet } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const PageLayout = () => {
  return (
    <>
      <Navbar />
      <div className={`app-content-wrap flex flex-1`}>
        <Outlet />
      </div>
    </>
  );
};

export default PageLayout;
