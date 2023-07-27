import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';import Dashboard from './Dashboard';
import ErrorBoundary from './ErrorBoundary';
import Login from './Login';
import SelectTeam from './SelectTeam';
import SingleRegister from './SingleRegister';
import DuoRegisterForm from './DuoRegisterForm';
import SingleRegisterForm from './SingleRegisterForm';
import Success from './Success';
import Home from './Home';

// import Login from './Login';
// import Footer from './shared/Footer'
function App() {

  return (
    <div>
    <Router>
    <Routes>

          <Route path="/" element={<Home />} ></Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>

          <Route path="/login/selectteam" element={<SelectTeam />}></Route>

          <Route path="/login/selectteam/1" element={<SingleRegister />}></Route>
          <Route path="/login/selectteam/2" element={<SingleRegister />}></Route>
          
          <Route path='/login/selectteam/1/:id' element={<SingleRegisterForm />}></Route>
          <Route path='/login/selectteam/2/:id' element={<DuoRegisterForm />}></Route>

          <Route path='/login/selectteam/1/:id/success' element={<Success />}></Route>
          <Route path='/login/selectteam/2/:id/success' element={<Success />}></Route>



    </Routes>
    </Router>
    </div>
  )
}

export default App
