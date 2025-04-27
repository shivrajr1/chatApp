import { Route , Routes } from 'react-router-dom'

import Login from './Login'
import Signup from './Signup'
import Navbar from './Components/Navbar'
import Body from './Body'
import './App.css'

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Signup/>}/>
      <Route path='/*' element={<Body/>}/>
      </Routes>
    </>
  )
}

export default App
