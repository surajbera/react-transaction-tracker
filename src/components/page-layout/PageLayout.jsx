import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import { useConsole } from '../../hooks'

const PageLayout = () => {
  const location = useLocation()
  console.log(location)
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
