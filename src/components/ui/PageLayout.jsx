import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../layout/Navbar'

const PageLayout = () => {
  const location = useLocation()
  let isNotFoundPage = false
  const validPages = ['/', '/signup', '/login']

  if (!validPages.includes(location.pathname)) {
    isNotFoundPage = true
  }

  return (
    <>
      <Navbar />
      <div className={`app-content-wrap ${isNotFoundPage ? 'not-found-page' : ''}`}>
        <Outlet />
      </div>
    </>
  )
}

export default PageLayout
