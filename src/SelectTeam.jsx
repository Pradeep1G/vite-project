import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import jwtDecode from "jwt-decode";

import LoginNavBar from "./shared/LoginNavBar";
import Footer from "./shared/Footer";

export default function SelectTeam() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token from local storage or state management
    const token = localStorage.getItem("token_for_first_time");

    if (token) {
      console.warn("token found");
      console.warn(token);
      // Decode the token to access its expiration time
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds

      // Check if the token has expired
      if (expirationTime < Date.now()) {
        // Token has expired, redirect to the login page
        console.warn("token expired");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      console.warn("token not found");
      // No token found, redirect to the login page
      navigate("/login");
    }
  }, [navigate]);

  if (localStorage.getItem("token_for_first_time") != null) {
    return (
      <>
        <LoginNavBar />
        <div className="login_bg">
          <div className="lg:w-1/4 md:w-2/4 s:w-2/4 xs:w-3/4 border bg-white bg-opacity-70 backdrop-filter p-6 rounded-lg shadow-lg flex flex-col items-center">
            {console.warn(currentPath)}
            <p className="p-4 font-semibold text-2xl">No of Team Members</p>
            <div className="flex flex-row space-x-10 px-10">
              <a href={currentPath + "/1"}>
                <button className="bg-red-900 text-white rounded-lg p-7 m-4 border-2 text-lg">
                  1
                </button>
              </a>
              <a href={currentPath + "/2"}>
                <button className="bg-red-900 text-white rounded-lg p-7 m-4 border-2 text-lg">
                  2
                </button>
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  } else {
    navigate("/login");
  }
}
