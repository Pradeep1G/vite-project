import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from './shared/Footer';
import LoginNavBar from './LoginNavBar';
import jwtDecode from 'jwt-decode';

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

  const serverPath1 = "http://127.0.0.1:5000"
  // const serverPath1 = "https://gpaserver2.onrender.com";

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
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");
    
    if (token) {
      const headers = {
        'Authorization': `${token}`
      };
      const func=async()=>{
        const response = await axios.get(serverPath1+"/checkAuthentication/"+userEmail, {headers});
        if (response.data.message=="Authenticated"){
          // navigate("/dashboard");
        }
        else{
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          navigate("/staff_login");
        }
      }
      func(); 
    }
  }, [location]);



  const handleStaffLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
      try {
        const response = await axios.get(
          `${serverPath1}/staffLogin/check/${formData.email}/${formData.password}`
        );

        if (response.data.is_account_available === "true") {
          setIsLoading(false);
          if (response.data.Is_Password_Correct === "true") {
            const token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('guideMailId', formData.email);
            navigate("/staff_dashboard")
          } else {
            alert("Password is not correct");
          }
        } else {
          alert("Enter a valid user account");
        }
      } catch (error) {
        setIsLoading(false);
        console.warn(error);
      }
    }

  return (
    <>
      <LoginNavBar />
      {isLoading && <LoadingScreen />}
      <div className='login_bg px-10 xs:px-10'>
        <div className='lg:w-1/4 md:w-2/4 s:w-2/4 xs:w-3/4 border p-4 bg-white bg-opacity-40 backdrop-filter rounded-lg shadow-lg'>
          <div className={openLogin ? 'block' : 'hidden'}>
            <div className={openLogin ? ' flex justify-center' : 'hidden'}>
              <h1 className='p-4 font-semibold text-2xl'>STAFF LOGIN</h1>
            </div>
            <div className='justify-center'>
              <form onSubmit={handleStaffLogin}>
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
                    className={'bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg'}
                    type="submit"
                  >
                    Submit
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
