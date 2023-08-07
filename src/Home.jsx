
import { useNavigate } from "react-router-dom";
import Loginnavbar from "./shared/Loginnavbar";
import Footer from "./shared/Footer";


export default function Home(){

    const navigate = useNavigate()

    const GoLogin=(e)=>{
        e.preventDefault()
        navigate('/login')
    }

    return(
        <>
            <Loginnavbar />

            <div className="loginbg s:p-20">
    <div className=' border p-4 bg-white bg-opacity-80 backdrop-filter p-6 rounded-lg shadow-lg'>
            

            <p>If you are logging in for first time :</p><br></br>
            <li>Try any your mail as password and login.</li>
            <li>You will recieve otp to your mail. Enter and submit. Kindly check in your spam mails.</li>
            <li>Enter new password for future login and submit.</li>
            <li>Select Team or Single.</li>
            <li>Select a guide who have vacancies.</li>
            <li>Enter project Details.</li>
            <li>If you are doing project alone, Enter your details and submit.</li>
            <li>If not, Enter team member 1 details first.</li>
            <li>Enter second person details, click on verify.</li>
            <li>Otp is sent the second team member mail should be entered and submit.</li>
            <br></br><br></br>
            <p>NOTE:</p><br></br>
            <li>It will reject if the second member mailid is already registered.</li>
            <li>while you click on submit, if any register in any device with the any team member mail is noticed, then the request is rejected.</li>
            <br></br>
            <p>If you had already logged in before:</p><br></br>
            <li>Use the password that you setup in your first login.</li>
            <li>You are redirected to your dashboard.</li>
            <li>If second member of a team want to access the dashboard, login with the first member mailid and password.</li>
            <br></br>

          <div className=' flex justify-center'>


            <button onClick={GoLogin} className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg">Student Login</button>
            </div>
        
            </div>
            </div>


        <Footer />
        
        </>
    )
}
