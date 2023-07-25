/* libraries */
import { Link, useLocation } from 'react-router-dom'

/* hooks */
import { useLogout } from '../../hooks'
import { useAuthContext } from '../../hooks'

/* components */
import FullScreenLoader from '../ui/full-screen-loader/FullScreenLoader'

const Navbar = () => {
  const { logOut, isPending } = useLogout()
  const { authUser } = useAuthContext()
  const { pathname } = useLocation()

  const activeRouteStyles = {}

  const onLogoutHandler = async () => {
    await logOut()
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>TrackIt</Link>
          </li>
          {!authUser && (
            <>
              <li>
                <Link to='login' style={pathname === '/login' ? activeRouteStyles : {}}>
                  Login
                </Link>
              </li>
              <li>
                <Link to='signup' style={pathname === '/signup' ? activeRouteStyles : {}}>
                  Signup
                </Link>
              </li>
            </>
          )}
          {authUser && (
            <li>
              <span onClick={onLogoutHandler}>Logout</span>
            </li>
          )}
        </ul>
      </nav>
      {isPending && <FullScreenLoader />}
    </>
  )
}

export default Navbar
