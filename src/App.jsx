import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from './pages'
import { Login } from './pages'
import { Signup } from './pages'
import { NotFound } from './pages'

import { Loader } from './components'
import { PageLayout } from './components'

import { useAuthContext } from './hooks'

import './App.css'

function App() {
  const { isAuthReady } = useAuthContext()

  return (
    <div className='root-inner'>
      {!isAuthReady && <Loader />}
      {isAuthReady && (
        <Router>
          <Routes>
            <Route element={<PageLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      )}
    </div>
  )
}

export default App
