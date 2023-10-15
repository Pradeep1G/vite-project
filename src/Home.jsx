import { useNavigate } from "react-router-dom";
import Loginnavbar from "./shared/Loginnavbar";
import Footer from "./shared/Footer";

export default function Home() {
  const navigate = useNavigate();

  const GoLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  }

  return (
    <>
      <Loginnavbar />

      <div className="loginbg s:p-20 py-10">
        <div className='border p-6 bg-white bg-opacity-80 backdrop-filter rounded-lg shadow-lg font-semibold py-4'>
          <p>If you are logging in for the first time:</p>
          <li>Try any your mail as a password and login.</li>
          <li>You will receive an OTP to your mail. Enter and submit. Kindly check your spam mails.</li>
          <li>Enter a new password for future login and submit.</li>
          <li>Select Team or Single.</li>
          <li>Select a guide who has vacancies.</li>
          <li>Enter project details.</li>
          <li>If you are doing the project alone, enter your details and submit.</li>
          <li>If not, enter team member 1 details first.</li>
          <li>Enter the second person's details, click on verify.</li>
          <li>OTP is sent to the second team member's mail and should be entered and submitted.</li>
          <br></br><br></br>
          <p>NOTE:</p>
          <li>It will be rejected if the second member's mail ID is already registered.</li>
          <li>While you click on submit, if anyone registers in any device with the same team member's mail, the request is rejected.</li>
          <br></br>
          <p>If you had already logged in before:</p>
          <li>Use the password that you set up in your first login.</li>
          <li>You are redirected to your dashboard.</li>
          <li>If the second member of a team wants to access the dashboard, login with the first member's mail ID and password.</li>
          <br></br>
          <div className='flex justify-center'>
            <button onClick={GoLogin} className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg">Student Login</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
