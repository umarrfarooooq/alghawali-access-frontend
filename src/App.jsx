import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import {VerifyStaffToken} from "./components/Auth/VerifyToken"
import roles from './components/roles/roles';
const OurMaids = lazy(() => import('./Pages/OurMaids'));
const Staff = lazy(() => import('./Pages/Staff'));
const MaidDetails = lazy(() => import('./Pages/MaidDetails'));
const Home = lazy(() => import('./Pages/Home'));
const Login = lazy(() => import('./components/Auth/Login'));


function App() {
  const { valid, roles: userRoles } = VerifyStaffToken();

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={valid ? <Home /> : <Navigate to="/login" />} />
          <Route path="/maids" element={valid && userRoles.includes(roles.ShowOurMaid) || userRoles.includes(roles.CanAddMaid) ? <OurMaids /> : <Navigate to="/" />} />
          <Route path="/staff" element={valid && userRoles.includes(roles.ShowAccessOnAddStaff) ? <Staff /> : <Navigate to="/" />} />
          <Route path="/details/:maidID" element={valid && userRoles.includes(roles.ShowOurMaid) || userRoles.includes(roles.CanAddMaid) ? <MaidDetails /> : <Navigate to="/" />} />
          <Route path="/login" element={!valid ? <Login /> : <Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
