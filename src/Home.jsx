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
          <p className="font-semibold text-center text-2xl p-0">Registration Process</p>
          <br></br>
          <li>Register with the mail id which is given to placement cell and password is your register number.</li>
          <li>
            You will recieve otp to your mail. Enter and submit. Kindly check in
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
            Otp is sent the second team member mail should be entered and
            submit.
          </li>
          <br></br>
          <p>NOTE:</p>
          {/* <br></br> */}
          <li>
            It will reject if the second member mailid is already registered.
          </li>
          <li>
            While you click on submit, if any register in any device with the
            any team member mail is noticed, then the registration is terminated. Restart again!.
          </li>
          <br></br>
          <p  className="font-semibold text-center text-2xl p-0">Login Process</p>
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
