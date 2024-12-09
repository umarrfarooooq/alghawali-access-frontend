import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import {VerifyStaffToken} from "./components/Auth/VerifyToken"
import roles from './components/roles/roles';
import InvitedSignup from './components/Auth/Invited-Signup';
const OurMaids = lazy(() => import('./Pages/OurMaids'));
const Staff = lazy(() => import('./Pages/Staff'));
const MaidDetails = lazy(() => import('./Pages/MaidDetails'));
const Home = lazy(() => import('./Pages/Home'));
const Login = lazy(() => import('./components/Auth/Login'));
const Accounts = lazy(() => import('./Pages/Accounts'));
const StaffAccount = lazy(() => import('./Pages/Staff-Account-Page'));
const StaffAccountHistory = lazy(() => import('./Pages/Staff-Account-Page-History'));
const Visa = lazy(() => import('./Pages/Visa'));
const Medical = lazy(() => import('./Pages/Medical'));
const AgentRequests = lazy(() => import('./Pages/AgentRequests'));
const CustomRequirements = lazy(() => import('./Pages/CustomRequirements'));
const AgentRequestDetailsPage = lazy(() => import('./Pages/AgentRequestDetails'));
const NewHome = lazy(() => import('./components/HomePage/New-Home'));
import Loader from './components/UI/Loader';
const accountsAllowed = false;

function App() {
  const { valid, roles: userRoles } = VerifyStaffToken();

  return (
    <Router>
      <Suspense fallback={<div><Loader /></div>}>
        <Routes>
          <Route path="/" element={valid ? <Home /> : <Navigate to="/login" />} />
          <Route path="/new-home" element={valid ? <NewHome /> : <Navigate to="/login" />} />
          <Route path="/maids" element={valid && userRoles.includes(roles.ShowOurMaid) || userRoles.includes(roles.CanAddMaid) ? <OurMaids /> : <Navigate to="/" />} />
          <Route path="/agent-requests" element={valid && userRoles.includes(roles.ShowOurMaid) || userRoles.includes(roles.CanAddMaid) ? <AgentRequests /> : <Navigate to="/" />} />
          <Route path="/accounts" element={valid && accountsAllowed && userRoles.includes(roles.canAccessOnAccounts) ? <Accounts /> : <Navigate to="/" />} />
          <Route path="/my-account" element={valid && accountsAllowed && userRoles.includes(roles.canAccessOnAccounts) ? <StaffAccount /> : <Navigate to="/" />} />
          <Route path="/my-account-history/:staffId" element={valid && accountsAllowed && userRoles.includes(roles.canAccessOnAccounts) ? <StaffAccountHistory /> : <Navigate to="/" />} />
          <Route path="/staff" element={valid && userRoles.includes(roles.ShowAccessOnAddStaff) ? <Staff /> : <Navigate to="/" />} />
          <Route path="/details/:maidID" element={valid && userRoles.includes(roles.ShowOurMaid) || userRoles.includes(roles.CanAddMaid) ? <MaidDetails /> : <Navigate to="/" />} />
          <Route path="/maid-request-detais/:maidID" element={valid && userRoles.includes(roles.ShowOurMaid) || userRoles.includes(roles.CanAddMaid) ? <AgentRequestDetailsPage /> : <Navigate to="/" />} />
          <Route path="/visa" element={valid ? <Visa /> : <Navigate to="/" />} />
          <Route path="/medical" element={valid ? <Medical /> : <Navigate to="/" />} />
          <Route path="/custom-requirements" element={valid ? <CustomRequirements /> : <Navigate to="/" />} />
          <Route path="/login" element={!valid ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup/:invitedToken" element={<InvitedSignup />} />
          <Route path="/loader" element={<Loader />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
