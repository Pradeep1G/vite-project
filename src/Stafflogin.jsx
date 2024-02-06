import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Loginnavbar from './shared/LoginNavBar';
import Footer from './shared/Footer';

function LoadingScreen() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(1px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        flexDirection: "column"
      }}
    >
      <div
        style={{
          width: "100px",
          height: "100px",
          border: "15px solid #D8D9DA",
          borderTopColor: "grey",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <b>Please Wait</b>
    </div>
  );
}

const StaffLogin = () => {
  const serverPath1 = "https://gpaserver2.onrender.com";

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [receivedOTP, setReceivedOTP] = useState(0);
  const [userOTP, setUserOTP] = useState(0);
  const [usertoken, setUsertoken] = useState("");
  const [openNewPasswordContainer, setOpenNewPasswordContainer] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openLogin, setOpenLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token_for_first_time');
    if (location.pathname === '/staff-login' && token) {
      localStorage.removeItem('token_for_first_time');
      localStorage.removeItem('token');
      console.log('Token removed from local storage');
    }
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (location.pathname === '/staff-login' && token) {
      navigate('/staff-dashboard');
    }
  }, [location]);

  const handleFirstLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!verifyOTP) {
      try {
        const response = await axios.get(
          `${serverPath1}/api/check/${formData.email}/${formData.password}`
        );

        if (response.data.first_time === "true" && response.data.is_account_available === "true") {
          setIsLoading(false);
          if (response.data.Is_Email_sent === "true") {
            setOpenLogin(false);
            setVerifyOTP(true);
            setReceivedOTP(response.data.OTP);
            setUsertoken(response.data.token);
            const token = response.data.token_for_first_time;
            localStorage.setItem('token_for_first_time', token);
          } else {
            console.warn("Email not sent");
          }
        } else if (response.data.first_time === "true" && response.data.is_account_available === "false") {
          setIsLoading(false);
          alert("Enter a valid user account");
        } else {
          setIsLoading(false);
          alert("Cannot be processed");
        }
      } catch (error) {
        setIsLoading(false);
        console.warn(error);
      }
    }
  };

  const checkOTP = (e) => {
    e.preventDefault();

    if (userOTP === parseInt(receivedOTP)) {
      console.warn("Correct OTP entered");
      setVerifyOTP(false);
      setOpenNewPasswordContainer(true);
    } else {
      alert("You have entered the wrong OTP");
      console.warn("Wrong OTP");
    }
  };

  const continueRegister = async (e) => {
    e.preventDefault();

    if (newPassword === newConfirmPassword) {
      try {
        const response = await axios.post(`${serverPath1}/api/update-password`, {
          email: formData.email,
          newPassword: newPassword,
        });

        if (response.data.success) {
          alert("Password updated successfully. You can now log in.");
          localStorage.removeItem('token_for_first_time');
          navigate('/staff-login');
        } else {
          alert("Failed to update password. Please try again.");
        }
      } catch (error) {
        console.warn(error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert("Both passwords are not the same");
    }
  };

  return (
    <>
      <Loginnavbar />
      {isLoading && <LoadingScreen />}
      <div className='loginbg px-10 xs:px-10'>
        <div className='lg:w-1/4 md:w-2/4 s:w-2/4 xs:w-3/4 border p-4 bg-white bg-opacity-40 backdrop-filter p-6 rounded-lg shadow-lg'>
          <div className={openLogin ? 'block' : 'hidden'}>
            <div className={openLogin ? ' flex justify-center' : 'hidden'}>
              <h1 className='p-4 font-semibold text-2xl'>STAFF LOGIN</h1>
            </div>
            <div className='justify-center'>
              <form onSubmit={handleFirstLogin}>
                <input
                  className='border-2 border-solid border-black rounded-lg px-2 h-12 my-4 w-full'
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  required
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                  className='border-2 border-solid border-black rounded-lg h-12 px-2 my-4 w-full'
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  required
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <div className=' flex justify-center'>
                  <button
                    className={verifyOTP ? 'hidden p-3' : 'bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg'}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className={verifyOTP ? 'visible' : 'hidden'}>
            <div className={true ? ' flex justify-center' : 'hidden'}>
              <h1 className='p-4 font-semibold text-2xl'>Enter OTP sent to your Email</h1>
            </div>
            <div className='justify-center'>
              <form onSubmit={checkOTP}>
                <input
                  className='border-2 border-solid border-black rounded-lg px-2 h-12 my-4 w-full'
                  type="number"
                  placeholder="Enter OTP"
                  required
                  onChange={(e) => setUserOTP(parseInt(e.target.value))}
                />
                <div className=' flex justify-center'>
                  <button
                    className={verifyOTP ? 'bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg' : 'hidden'}
                    type="submit"
                  >
                    Submit OTP
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className={openNewPasswordContainer ? 'visible' : 'hidden'}>
            <div className={true ? ' flex justify-center' : 'hidden'}>
              <h1 className='p-4 font-semibold text-2xl'>Create New Password</h1>
            </div>
            <div className='justify-center'>
              <form onSubmit={continueRegister}>
                <input
                  className='border-2 border-solid border-black rounded-lg px-2 h-12 my-4 w-full'
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  className='border-2 border-solid border-black rounded-lg h-12 px-2 my-4 w-full'
                  type="password"
                  placeholder="Confirm Password"
                  value={newConfirmPassword}
                  required
                  onChange={(e) => setNewConfirmPassword(e.target.value)}
                />
                <div className=' flex justify-center'>
                  <button
                    className='bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg'
                    type="submit"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StaffLogin;
