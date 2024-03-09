import React, { useState } from 'react';
import axios from 'axios';
import LoadingScreen from "./shared/Loader";
import Alert from "./shared/Alert";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import back_arrow from "./assets/svgs/back_arrow.svg";


const Teambyguide = () => {
  // Retrieve the email from local storage
//   const serverPath1 = "http://127.0.0.1:5000"
//  const serverPath1 = "https://gpaserver2.onrender.com";
const serverPath1 = "https://guideselectionserver.onrender.com";

const navigate = useNavigate();

  const userEmail = localStorage.getItem("guideMailId");
  const [isTeam, setIsTeam] = useState(false);
  const [isTeam2, setIsTeam2] = useState(false);

  const [registrationNumber, setRegistrationNumber] = useState('');
  const [partnerRegNumber, setPartnerRegNumber] = useState('');
  const [password, setPassword] = useState('');


  const [registrationNumber2, setRegistrationNumber2] = useState('');
  const [partnerRegNumber2, setPartnerRegNumber2] = useState('');
  const [password2, setPassword2] = useState('');


  const [isLoading, setisLoading] = useState(false);
    const [alert, setAlert]  = useState(false);
    const [alertMessage, setAlertMessage] = useState();
    const [alertType, setAlertType] = useState();

    const [teamcount, setteamCount] = useState();






    useEffect(() => {
        const token = localStorage.getItem("token");
        const userEmail = localStorage.getItem("guideMailId");
        
        if (token) {
          const headers = {
            'Authorization': `${token}`
          };
          const func=async()=>{
            setisLoading(true);
            const response = await axios.get(serverPath1+"/checkAuthentication/"+userEmail, {headers});
            setisLoading(false);
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




          const fetchMaxTeams = async() => {
            const res = await axios.post(serverPath1+"/staffLogin/staffDashboard/fetchMaxTeams/"+userEmail)
            // console.warn(res.data)
            setteamCount(res.data.maxTeams)
          }

          fetchMaxTeams();


        }else{
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          navigate("/staff_login");
        }
    
      }, []);



















  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      team: isTeam || isTeam2,
      regNo: registrationNumber || registrationNumber2,
      password:password || password2,
      ...(isTeam  && { p2regNo: partnerRegNumber }),
      ...(isTeam2  && { p2regNo: partnerRegNumber2 }),

    };
    console.warn(data);

    try {
        setisLoading(true);
      const response = await axios.post(`${serverPath1}/staffLogin/staffDashboard/selectStudent/${userEmail}`, data);
      setisLoading(false);
      setIsTeam(false);
      setRegistrationNumber('');
      setPartnerRegNumber('');
      setPassword('');
      
    //console.warn("ghvhgvghv")
      console.warn(response.data)
      setAlert(true);
        if(response.data.message=="Success"){
            setAlertMessage("Submitted Successfully!")
            setteamCount(teamcount-1);
            setAlertType("success")
        }
        else{
            setAlertMessage("Failed to Submit!")
            setAlertType("fail")
        }
        alertDelay();
    } catch (error) {
      console.error('Error submitting form:', error);
     
    }
  };


  const alertDelay = () => {
    setTimeout(() => {
    //   setError3("");
      setAlert(false)
    }, 5000); // 3000 milliseconds = 3 seconds
  };

  if (teamcount==0){
    return(
        <>  
        <div className='flex items-center justify-center '>
            <div className="flex items-center justify-center  fixed top-4 w-fit bg-[#FEFBF6] rounded-md shadow-lg z-50">
                <div className="flex flex-row items-center justify-center px-10 py-4 text-red-700 text-lg font-semibold space-x-5">
                You have Selected Maximum Number Of Teams!
                </div>
            </div>
            </div>
        </>
    )
  }
else if(teamcount==1){
  return (
    <>
        {isLoading && <LoadingScreen/>}
            <div className={`flex items-center justify-center ${alert ? "":"hidden"} `}>
    <Alert type={alertType} message={alertMessage}/>
    </div>
    <div className="hidden md:fixed md:w-fit md:h-full md:left-1 md:top-[5rem] md:flex md:items-center md:justify-center md:cursor-pointer">
          <a href="/staff_dashboard/" className="w-fit h-fit">
            <img
              className="bg-slate-200 m-4 p-2 w-10 rounded-full hover:bg-slate-300 hover:shadow-md"
              src={back_arrow}
              alt="⬅️"
              title="Go back"
            ></img>
          </a>
        </div>
    <div className="container mx-auto p-8 border rounded-lg">
    <div className="flex flex-col items-center justify-center pt-10">
    <p className=' text-2xl font-bold'>Select Your Teams</p>

    <div className='pb-2'>
<ul>
<li className='font-semibold'>Instructions : </li>
    {/* <li>1. Faculties have the privilege to select the 1 or 2 teams under your guidance.</li> */}
    <li>1.  Faculties are allowed to select  1 or 2 teams.</li>

    {/* <li>2. Simply input the registered numbers of the team members, along with a password for their login access.</li> */}
    <li>2. Enter register no and your own password for registration. check the team box for additional  register members. </li>
    
    {/* <li>3. If you're registering a team with multiple members, check the appropriate box to reveal additional fields for entering additional student details.</li> */}
    <li>3. After registration student details will be displayed in the dashboard.</li>
   
    {/* <li>4. Once registered, the team members' information will be seamlessly integrated into your dashboard.</li> */}
</ul>
</div>

    <p className='text-red-500 text-lg font-semibold'>Please click on the checkbox if you intend to have two members in your team.</p>

    <div className="py-5 px-20 border-2 border-black w-fit">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <p  className='font-bold text-xl pb-2'>Team 1 Details</p>
        <label className="mb-4">
          If Team:
          <input
            type="checkbox"
            checked={isTeam}
            onChange={() => setIsTeam(!isTeam)}
            className="ml-2"
          />
        </label>

        <label className="mb-4">
        Person 1 Register Number:
          <input
            type="text"
            name="registrationNumber"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            className="ml-2 p-2 border rounded"
            autoComplete="off"
          />
        </label>

        {isTeam && (
            
          <label className="mb-4 ">
            Person 2 Register Number:
            <input
              type="number"
              name="partnerRegNumber"
              value={partnerRegNumber}
              onChange={(e) => setPartnerRegNumber(e.target.value)}
              className="ml-2 p-2 border rounded "
              autoComplete="off"
            />
          </label>
          
        )}

        <label className="mb-4">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="ml-2 p-2 border rounded"
            autoComplete="off"
          />
        </label>

        
        <button type="submit" className="bg-red-900 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
    </div>

    </div>
    </>
  );
}else{
    return (
        <>
            {isLoading && <LoadingScreen/>}
                <div className={`flex items-center justify-center ${alert ? "":"hidden"} `}>
        <Alert type={alertType} message={alertMessage}/>
        </div>
        <div className="hidden md:fixed md:w-fit md:h-full md:left-1 md:top-[5rem] md:flex md:items-center md:justify-center md:cursor-pointer">
          <a href="/staff_dashboard/" className="w-fit h-fit">
            <img
              className="bg-slate-200 m-4 p-2 w-10 rounded-full hover:bg-slate-300 hover:shadow-md"
              src={back_arrow}
              alt="⬅️"
              title="Go back"
            ></img>
          </a>
        </div>
        <div className="container mx-auto pt-2 px-8 rounded-lg">
        <div className="flex flex-col items-center justify-center pt-10">
        <p className=' text-2xl font-bold'>Select Your Teams</p>

<div className='pb-2'>
<ul>
<li className='font-semibold'>Instructions : </li>
    {/* <li>1. Faculties have the privilege to select the 1 or 2 teams under your guidance.</li> */}
    <li>1.  Faculties are allowed to select  1 or 2 teams.</li>

    {/* <li>2. Simply input the registered numbers of the team members, along with a password for their login access.</li> */}
    <li>2. Enter register no and your own password for registration. check the team box for additional  register members. </li>
    
    {/* <li>3. If you're registering a team with multiple members, check the appropriate box to reveal additional fields for entering additional student details.</li> */}
    <li>3. After registration student details will be displayed in the dashboard.</li>
   
    {/* <li>4. Once registered, the team members' information will be seamlessly integrated into your dashboard.</li> */}
</ul>
</div>

        <p className='text-red-500 text-lg font-semibold'>Please click on the checkbox if you intend to have two members in your team.</p>

        <div className="py-5 p px-20 border-2 border-black w-fit">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">

      <p  className='font-bold text-xl pb-2'>Team 1 Details</p>

            <label className="mb-4">
              If Team:
              <input
                type="checkbox"
                checked={isTeam}
                onChange={() => setIsTeam(!isTeam)}
                className="ml-2"
              />
            </label>
    
            <label className="mb-4">
            Person 1 Register Number:
              <input
                type="text"
                name="registrationNumber"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="ml-2 p-2 border rounded"
                autoComplete="off"
              />
            </label>
    
            {isTeam && (
                
              <label className="mb-4 ">
                Person 2 Register Number:
                <input
                  type="number"
                  name="partnerRegNumber"
                  value={partnerRegNumber}
                  onChange={(e) => setPartnerRegNumber(e.target.value)}
                  className="ml-2 p-2 border rounded "
                  autoComplete="off"
                />
              </label>
              
            )}
    
            <label className="mb-4">
              Password:
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ml-2 p-2 border rounded"
                autoComplete="off"
              />
            </label>
    
            
            <button type="submit" className="bg-red-900 text-white p-2 rounded">
              Submit
            </button>
          </form>
        </div>
        </div>
    
        </div>

        <div className="container mx-auto p-8  rounded-lg">
        <div className="flex flex-row items-center justify-center pt-10">
        <div className="py-5 px-20 border-2 border-black w-fit">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <p  className='font-bold text-xl pb-2'>Team 2 Details</p>

            <label className="mb-4">
              If Team:
              <input
                type="checkbox"
                checked={isTeam2}
                onChange={() => setIsTeam2(!isTeam2)}
                className="ml-2"
              />
            </label>
    
            <label className="mb-4">
            Person 1 Register Number:
              <input
                type="text"
                name="registrationNumber2"
                value={registrationNumber2}
                onChange={(e) => setRegistrationNumber2(e.target.value)}
                className="ml-2 p-2 border rounded"
                autoComplete="off"
              />
            </label>
    
            {isTeam2 && (
                
              <label className="mb-4 ">
                Person 2 Register Number:
                <input
                  type="number"
                  name="partnerRegNumber2"
                  value={partnerRegNumber2}
                  onChange={(e) => setPartnerRegNumber2(e.target.value)}
                  className="ml-2 p-2 border rounded "
                  autoComplete="off"
                />
              </label>
              
            )}
    
            <label className="mb-4">
              Password:
              <input
                type="password"
                name="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="ml-2 p-2 border rounded"
                autoComplete="off"
              />
            </label>
    
            
            <button type="submit" className="bg-red-900 text-white p-2 rounded">
              Submit
            </button>
          </form>
        </div>
        </div>
    
        </div>
        </>
      );
}
}

export default Teambyguide;

