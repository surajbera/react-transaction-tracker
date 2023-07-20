import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from './pages'
import { Login } from './pages'
import { Signup } from './pages'

import { Navbar } from './components'

import './App.css'

function App() {
  return (
    <div id='root-inner'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
