import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from './pages'
import { Login } from './pages'
import { Signup } from './pages'

import { Loader, Navbar } from './components'

import { useAuthContext } from './hooks'

import './App.css'

function App() {
  const { authUser } = useAuthContext()

  return (
    <div id='root-inner'>
      {!authUser && <Loader />}
      {authUser && (
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </Router>
      )}
    </div>
  )
}

export default App
