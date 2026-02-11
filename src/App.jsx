import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Page/Home/Home'
import LandingPage from './Page/Landing/LandingPage'
import SignUpPage from './Page/Landing/SignUp/SignUpPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  )
}

export default App
