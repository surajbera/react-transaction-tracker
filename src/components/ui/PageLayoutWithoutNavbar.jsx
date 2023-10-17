import { Outlet } from 'react-router-dom';

const PageLayoutWithoutNavbar = () => {
  return (
    <div className='app-content-wrap flex flex-1'>
      <Outlet />
    </div>
  );
};
export default PageLayoutWithoutNavbar;
