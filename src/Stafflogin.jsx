import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Loginnavbar from './shared/Loginnavbar';
import Footer from './shared/Footer';

const Stafflogin = () => {
  const navigate = useNavigate(); 

  const handleLogin = () => {
    navigate('/StaffDashboard');
  };

  return (
    <div>
      <Loginnavbar />
      <div className="loginbg px-10 xs:px-10">
        <div className="lg:w-1/4 md:w-2/4 s:w-2/4 xs:w-3/4 border p-4 bg-white bg-opacity-40 backdrop-filter p-6 rounded-lg shadow-lg">
          <h1 className="p-4 font-semibold text-2xl">STAFF LOGIN</h1>
          <div className="justify-center">
            <form>
              <input
                className="border-2 border-solid border-black rounded-lg px-2 h-12 my-4 w-full"
                type="email"
                placeholder="Email"
                required
              />
              <input
                className="border-2 border-solid border-black rounded-lg h-12 px-2 my-4 w-full"
                type="password"
                placeholder="Password"
                required
              />
              <div className="flex justify-center">
                <button
                  className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg"
                  type="button" 
                  onClick={handleLogin} 
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Stafflogin;
