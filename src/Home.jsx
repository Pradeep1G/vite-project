import { useNavigate } from "react-router-dom";
import LoginNavBar from "./LoginNavBar";
import Footer from "./shared/Footer";

export default function Home() {
  const navigate = useNavigate();

  const GoLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <LoginNavBar />

      <div className="login_bg s:p-20 py-4">
        <div className=" border p-6 bg-white bg-opacity-80 backdrop-filter rounded-lg shadow-lg font-semibold">
        <br></br>
          <p className="font-semibold text-center text-2xl p-0">Registration Process for Students</p>
          <br></br>
          <li>Register with the mail id which is given to placement cell and password is your register number.</li>
          <li>
            You will recieve OTP to your mail. Enter and submit. Kindly check in
            your spam mails and inbox.
          </li>
          <li>Enter new password, confirm password and then submit.</li>
          <li>Select Team or Single.</li>
          <li>Select a guide who have vacancies.</li>
          <li>Enter project Details.</li>
          <li>
            If you are doing project alone, Enter your details and submit.
          </li>
          <li>If not, Enter team member 1 details first.</li>
          <li>Enter second person mail id which is given to placement cell and click on verify.</li>
          <li>  You are not allowed to change your register number.</li>
          <li>
          An OTP will be sent to the second team member's email, which should then be entered and submitted.
          </li>
          <br></br>
          <p>NOTE:</p>
          {/* <br></br> */}
          <li>
          Registration will not be processed if the second member's email is already registered.
          </li>
          <li>
          When you click on submit, if a registration with the current team member's email is detected on any device, both registrations are terminated. You have to restart the process again.
          </li>
          <br></br>
          <p  className="font-semibold text-center text-2xl p-0">Login Process for Students</p>
          <br></br>
          <li>Use the password that you setup in your registration process.</li>
          <li>You are redirected to your dashboard.</li>
          <li>
            If second member of a team want to access the dashboard, login with
            the first member mailid and password or with team id and password.
          </li>
          <br></br>

          <div className=" flex justify-center">
            {/* <button
              onClick={GoLogin}
              className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg"
            >
              Student Login
            </button> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
