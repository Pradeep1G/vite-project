import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Dashboard from './Dashboard';
// import ErrorBoundary from './ErrorBoundary';
import Login from './Login';
import SelectTeam from './SelectTeam';
import SingleRegister from './SingleRegister';
import DuoRegisterForm from './DuoRegisterForm';
import SingleRegisterForm from './SingleRegisterForm';
import Success from './Success';
import Home from './Home';
import StaffLogin from "./Stafflogin";
import StaffDashboard from './StaffDashboard';
import { NewProfileDetails } from './NewProfileDetails';
import { TeamProfile } from './TeamProfile';
import ChangePassword from './ChangePassword';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/staff_login" element={<StaffLogin />} />
          <Route path="/staff_dashboard" element={<StaffDashboard />} />

          <Route path="/staff_dashboard/profile_details" element={<NewProfileDetails />} />
          <Route path="/staff_dashboard/profile_details/team_profile" element={<TeamProfile />} />
          <Route path="/staff_dashboard/change_password" element={<ChangePassword />} />




          <Route path="/login/select_team" element={<SelectTeam />} />
          <Route path="/login/select_team/1" element={<SingleRegister />} />
          <Route path="/login/select_team/2" element={<SingleRegister />} />
          <Route path='/login/select_team/1/:id' element={<SingleRegisterForm />} />
          <Route path='/login/select_team/2/:id' element={<DuoRegisterForm />} />
          <Route path='/login/select_team/1/:id/success' element={<Success />} />
          <Route path='/login/select_team/2/:id/success' element={<Success />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;