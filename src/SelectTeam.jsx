import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function SelectTeam(){

    const location = useLocation();
    const currentPath = location.pathname;

const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the token from local storage or state management
        const token = localStorage.getItem('token_for_first_time');
    
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


if(localStorage.getItem('token_for_first_time')!=null)
    {
    return(
        <>
            <div>{console.warn(currentPath)}
                <a href={currentPath+"/1"}><button className="h-2 w-2 p-2 m-2 border-2">1</button></a>
                <a href={currentPath+"/2"}><button className="h-2 w-2 p-2 m-2 border-2">2</button></a>
            </div>
        </>
    );
    }
    else
    {
        navigate('/login')
    }
}