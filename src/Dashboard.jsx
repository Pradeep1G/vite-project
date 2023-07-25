import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import jwtDecode from 'jwt-decode';

export default function Dashboard(){

    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the token from local storage or state management
        const token = localStorage.getItem('token');
    
        if (token) {
            console.warn("token found")
            console.warn(token)
          // Decode the token to access its expiration time
          const decodedToken = jwtDecode(token);
          const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
    
          // Check if the token has expired
          if (expirationTime < Date.now()) {
            // Token has expired, redirect to the login page
            console.warn("token expired")
            localStorage.removeItem('token');
            navigate('/login');
          }
        } else {
            console.warn("token not found")
          // No token found, redirect to the login page
          navigate('/login');
        }
      }, [navigate]);
    
      // Render your layout component
      return (
        <div>
          {/* Your layout content */}
          <h1>Dashboard</h1>
        </div>
      );



}