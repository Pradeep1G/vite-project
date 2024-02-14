import React from 'react'
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StaffDashboard = () => {

  const serverPath1 = "http://127.0.0.1:5000"
  // const serverPath1 = "https://gpaserver2.onrender.com";

  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("guideMailId");
    
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
          localStorage.removeItem("guideMailId");
          navigate("/staff_login");
        }
      }
      func(); 
    }
  }, []);

  return (
    <div> <h1>Welcome to the Staff Dashboard</h1>
    {/* <p>You are logged in with email: {email}</p> */}</div>
  )
}

export default StaffDashboard

