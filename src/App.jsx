import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Page/Home/Home'
import LandingPage from './Page/Landing/LandingPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
