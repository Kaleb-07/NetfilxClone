import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Page/Home/Home'
import LandingPage from './Page/Landing/LandingPage'
import SignUpPage from './Page/Landing/SignUp/SignUpPage'
import LoginPage from './Page/Landing/Login/LoginPage'
import ManageProfiles from './Page/Account/ManageProfiles/ManageProfiles'
import AccountPage from './Page/Account/Settings/AccountPage'
import TransferProfile from './Page/Account/Transfer/TransferProfile'
import HelpCenter from './Page/Help/HelpCenter'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/manage-profiles" element={<ManageProfiles />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/transfer-profile" element={<TransferProfile />} />
        <Route path="/help" element={<HelpCenter />} />
      </Routes>
    </>
  )
}

export default App
