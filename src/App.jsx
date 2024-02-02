import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Dashboard from "./Dashboard";
import Login from "./Login";
import SingleRegister from "./SingleRegister";
import DuoRegisterForm from "./DuoRegisterForm";
import SingleRegisterForm from "./SingleRegisterForm";
import Success from "./Success";
import Home from "./Home";
import SelectTeam from "./SelectTeam";

// import Login from './Login';
// import Footer from './shared/Footer'
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/login/select_team" element={<SelectTeam />} />

          <Route path="/login/select_team/1" element={<SingleRegister />} />
          <Route path="/login/select_team/2" element={<SingleRegister />} />

          <Route
            path="/login/select_team/1/:id"
            element={<SingleRegisterForm />}
          />
          <Route
            path="/login/select_team/2/:id"
            element={<DuoRegisterForm />}
          />

          <Route
            path="/login/select_team/1/:id/success"
            element={<Success />}
          />
          <Route
            path="/login/select_team/2/:id/success"
            element={<Success />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
