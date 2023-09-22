import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Loginnavbar from "./shared/Loginnavbar";
import Footer from "./shared/Footer";




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
      <p>Please Wait</p>
    </div>
  );
}






export default function DuoRegisterForm() {

  // const serverPath1 = "http://127.0.0.1:5000"
  const serverPath1 = "https://gpaserver2.onrender.com"


    const navigate = useNavigate()
    const currentPath = location.pathname;

  const [isSecondMailVerified, setisSecondMailVerified] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false);
  const [isotpVerifying, setIsotpVerifying] = useState(false);
  const [verifystatus, setverifystatus] = useState(false);


const [recievedOTP, setrecievedOTP] = useState("")
  const [seconduserotpcontainer,setseconduserotpcontainer] = useState(false)
    const [seconduserotp,setseconduserotp] = useState("")

  const [projTitle, setprojTitle] = useState("");
  const [projDomain, setprojDomain] = useState("");
  const [projDesc, setprojDesc] = useState("");

  const [userName, setuserName] = useState("");
  const [userRegNo, setuserRegNo] = useState("");
  const [userEmail, setuserEmail] = useState(
    localStorage.getItem("userMailId")
  );
  const [userPhone, setuserPhone] = useState("");



  const [seconduserName, setseconduserName] = useState("");
  const [seconduserRegNo, setseconduserRegNo] = useState("");
  const [seconduserEmail, setseconduserEmail] = useState("123@gmail.com");
  const [seconduserPhone, setseconduserPhone] = useState("");

  const [guideName, setguideName] = useState(localStorage.getItem("GuideName"));
  const [guideMailId, setguideMailId] = useState(
    localStorage.getItem("GuideMailId")
  );


  const [getvacancies, setgetvacancies] = useState("")
  const [ispersononenotRegisterd, setispersononenotRegisterd]  = useState("")
  const [ispersontwonotRegisterd, setispersontwonotRegisterd]  = useState("")



  const [isLoading, setIsLoading] = useState(false);



  const [isVerificationSuccess, setisVerificationSuccess] = useState(false)
  const [verificationInitiated, setVerificationInitiated] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);


  const startResendTimer = () => {
    setIsVerifying(true);
    setResendTimer(30); // Set the initial timer value
    const interval = setInterval(() => {
      setResendTimer(prevTimer => prevTimer - 1);
    }, 1000); // Decrease the timer every second
  
    // Stop the timer after 30 seconds
    setTimeout(() => {
      clearInterval(interval);
      setIsVerifying(false); // Enable the verify button
    }, 30000);
  };
  





  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token_for_first_time');

      if (token) {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;

        if (expirationTime < Date.now()) {
          localStorage.removeItem('token');
          localStorage.removeItem('GuideName');
          localStorage.removeItem("GuideMailId")
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };
    checkToken();
  }, [guideMailId,navigate]);

  useEffect(() => {
    // Call getData() when the component mounts or when guideMailId changes
    getData();
    checkpersononeRegistered();
    checkpersontwoRegistered()
  }, [userEmail,seconduserEmail,guideMailId,getvacancies]);
  

  const getData = async () => {
    try {
      const response = await axios.get(serverPath1+'/checkVacancies/'+guideMailId);
      setgetvacancies(response.data);
    //   console.warn(getvacancies)
    } catch (err) {
      console.warn(err);
    }
  };







  const checkSecondMailId = async() => {
    setIsLoading(true)
    if (seconduserEmail && userEmail!=seconduserEmail){
    try{
        setIsVerifying(true);
        setVerificationInitiated(true);

        const response = await axios.get(serverPath1+"/checkSecondMail/"+seconduserEmail);
        console.warn(response.data)
        if (response.data.firstTime){
            startResendTimer();
            setrecievedOTP(response.data.otp)
            setseconduserotpcontainer(true)
            setisSecondMailVerified(true)
        }
        else if(!response.data.firstTime){
          setVerificationInitiated(false)
          setIsLoading(false)
          alert("Account already Registered")
          setIsVerifying(false)
      }
        else if(response.data.data=="mail not found"){
            setVerificationInitiated(false)
            setIsLoading(false)
            alert("Mail not found")
            setIsVerifying(false)
        }
    }catch(err){
        setIsLoading(false)
        console.warn(err)
        setIsVerifying(false)
    } finally {
        setIsVerifying(false)
    }

    setIsLoading(false)


  }else{
    alert("No duplicate entries allowed!")
    setIsLoading(false)

  }
  
}



const checkpersononeRegistered = async () => {
    try{
      const response = await axios.get(serverPath1+"/api/check/"+userEmail)
      console.warn(response.data)
      setispersononenotRegisterd(response.data.first_time)

    }catch (err){
      console.warn("not found")
    }
  }

  const checkpersontwoRegistered = async () => {
    try{
      const response = await axios.get(serverPath1+"/api/check/"+seconduserEmail)
      console.warn(response.data)
      setispersontwonotRegisterd(response.data.first_time)

    }catch (err){
      console.warn(err)
    }
  }





const checkSecondOtp = (e)=>{
    e.preventDefault()
    // if (recievedOTP==seconduserotp)
    // {
    //     setIsVerifying(true)
    //     setverifystatus(true)
    //     setseconduserotpcontainer(false)
    //     setisSecondMailVerified(true)
    // }
    // else{
    //     alert("Wrong otp")
    // }
}



  


  async function Submit(e) {
        e.preventDefault();

      setIsLoading(true)

        if (parseInt(getvacancies['vacancies']) > 0 && isSecondMailVerified && ispersontwonotRegisterd && ispersononenotRegisterd) {




          try {
            const response1 = await axios.put(serverPath1 + "/add_registered_data", {
              email: userEmail,
              password: localStorage.getItem("newpassword"),
            });
            console.warn(response1.data)
            if (response1.data["error"] === "Email already registered") {
              setispersononenotRegisterd(false);
              alert("Account already Registered");
              navigate("/");
              console.warn(ispersononenotRegisterd);
            } else if (
              response1.data["error"] === "An error occurred during registration"
            ) {
              alert("You have done something wrong!");
              navigate("/");
            } else if (
              response1.data["message"] === "User registered successfully"
            ) {


              
              const data5 = {
                email : seconduserEmail,
                password : localStorage.getItem('newpassword')
              }
              axios.put(serverPath1+"/add_registered_data",data5)
              .then((response)=>{
                console.log(response.data)
                if(response.data['error']=='Email already registered'){
                  setispersontwonotRegisterd(false)
                  alert("Second Member Account already Registered")
                  axios.post(serverPath1+"/rollback_registered_data",{email: userEmail})
                  navigate("/")
                  console.warn(isnotRegisterd)
                }
                else if(response.data['error']=='An error occurred during registration'){
                  alert("You have done something wrong!")
                  navigate("/")
                }
                else if(response.data['message']=='User registered successfully'){




            const data = {
                collection_name: userRegNo,
                data: {
                    team: true,
                    p1name: userName,
                    p1regNo: userRegNo,
                    p1phoneNo: userPhone,
                    p1mailId: userEmail,
                    p2name: seconduserName,
                    p2regNo: seconduserRegNo,
                    p2phoneNo: seconduserPhone,
                    p2mailId: seconduserEmail,
                    projectTitle: projTitle,
                    projectDesc: projDesc,
                    projectDomain: projDomain,
                    selectedGuide: guideName,
                    selectedGuideMailId: guideMailId
                },
            };

            // Send the data to the Flask route using Axios
            axios.post(serverPath1 + '/create_collection', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });



            const data2 = {
                collection_name: 'users',
                filter_data: { email: userEmail },
                updated_data: {
                    password: localStorage.getItem('newpassword'),
                    firstTime: false,
                    regNo: userRegNo
                },
            };

            // Send the data to the Flask update route using Axios
            axios.put(serverPath1 + '/update_data', data2, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            


                const data4 = {
                    collection_name: 'users',
                    filter_data: { email: seconduserEmail }
                };
    
                // Send the data to the Flask update route using Axios
                axios.post(serverPath1 + '/delete_user', data4, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

            


            const data3 = {
                collection_name: 'facultylist',
                filter_data: { "University EMAIL ID": guideMailId },
                updated_data: {
                    "TOTAL BATCHES": parseInt(getvacancies['vacancies']) - 1
                },
            };

            // Send the data to the Flask update route using Axios
            axios.put(serverPath1 + '/update_vacancies_data', data3, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });


            // alert("Success")
            setIsLoading(false);
            navigate(currentPath + "/success");

        }else{
          alert("Something done wrong")
        }
      }
      )
            }else{
              alert("something done wrong")
            }
          }
          catch(error){
            console.error(error);
            setIsLoading(false);
          }
        }


        else if (!isSecondMailVerified) {
            alert("verify second member email");
        }else if (!ispersononenotRegisterd){
            alert("Team member 1 has already registered")
        }else if (!ispersontwonotRegisterd){
            alert("Team member 2 has already registered")
        }
        else{
            alert("No Vacancy Select Another Staff");
        }



    }






  return (
    <>

    <Loginnavbar />

    {isLoading && <LoadingScreen/>}
      {/* <h1>REGISTRATION FORM</h1> */}

      <form onSubmit={Submit}>





      <div className="m-4 border-solid border-2 rounded-lg">
        <div className="bg-[#330716] m-4 rounded-lg  flex justify-center items-center font-bold text-white lg:text-4xl text-lg lg:py-36 py-20">
          <p>Confirmation Details</p>
        </div>



        <div className="border-solid border-2 m-4 p-5">

        <div className="flex justify-center lg:space-y-0 space-y-2">
          <p className="lg:text-2xl text-xl font-bold pb-4">Project Information</p>
        </div>


        <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">

        <div className="lg:w-full lg:mx-12">
          <div>
          <label>Project Title</label><br></br>
            <input
              className="border-2 h-12 px-4 w-full bg-gray-200 mb-2"
              type="text"
              placeholder="Title..."
              value={projTitle}
              required
              onChange={(e) => setprojTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="lg:w-full lg:mx-12">
          <div>
          <label>Project Domain</label><br></br>
            <input
              className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
              type="text"
              placeholder="Domain..."
              value={projDomain}
              required
              onChange={(e) => setprojDomain(e.target.value)}
            />
            </div>
          </div>

        </div> 


        <div className="lg:mx-12">
        <label>Project Description</label><br></br>
          <textarea
            className="border-2 p-4 w-full bg-gray-200"
            rows="4"
            type="text"
            placeholder="Describe here..."
            value={projDesc}
            required
            onChange={(e) => setprojDesc(e.target.value)}
          />
        </div>
        </div>




        <div className="border-solid border-2 m-4 p-5">

        <div className="flex justify-center lg:space-y-0 space-y-2">
          <p className="lg:text-2xl text-xl font-bold pb-4">Team Member 1</p>
        </div>


        <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">

        <div className="lg:w-full lg:mx-12">
          <div>
          <label>Full Name</label>
          <input
            className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
            type="text"
            placeholder="name"
            value={userName}
            required
            onChange={(e) => setuserName(e.target.value)}
          />
          </div>
        </div>

        <div className="lg:w-full lg:mx-12">
          <div>
          <label>Register Number</label>
          <input
            className="border-2  h-12 px-4 w-full bg-gray-200 mb-4"
            type="number"
            placeholder="reg no"
            value={userRegNo}
            required
            onChange={(e) => setuserRegNo(e.target.value)}
          />
            </div>
          </div>

        </div> 





        <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">

        <div className="lg:w-full lg:mx-12">
          <div>
          <label>Email</label>
          <input className="border-2 h-12 px-4 w-full bg-gray-200 mb-4" type="text" value={userEmail} readOnly />
          </div>
        </div>

        <div className="lg:w-full lg:mx-12">
          <div>
          <label>Phone Number</label>
          <input
            className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
            type="tel"
            placeholder="phone"
            value={userPhone}
            required
            onChange={(e) => setuserPhone(e.target.value)}
          />
            </div>
          </div>

        </div> 
        
        </div>



        <div className="border-solid border-2 m-4 p-5">

        <div className="flex justify-center lg:space-y-0 space-y-2">
          <p className="lg:text-2xl text-xl font-bold pb-4">Team Member 2</p>
        </div>


        <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">

        <div className="lg:w-full lg:mx-12">
          <div>
          <label>Full Name</label>
          <input
            className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
            type="text"
            placeholder=""
            value={seconduserName}
            required
            onChange={(e) => setseconduserName(e.target.value)}
          />
          </div>
        </div>

        <div className="lg:w-full lg:mx-12">
          <div>
          <label>Register Number</label>
          <input
            className="border-2 h-12 px-4 w-full bg-gray-200 mb-4 "
            type="number"
            placeholder=""
            value={seconduserRegNo}
            required
            onChange={(e) => setseconduserRegNo(e.target.value)}
          />
            </div>
          </div>

        </div> 





        <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">

        <div className="lg:w-full lg:mx-12">
          <div>
          <label>Phone Number</label>
          <input
            className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
            type="tel"
            placeholder=""
            value={seconduserPhone}
            required
            onChange={(e) => setseconduserPhone(e.target.value)}
          />
          </div>
        </div>

        <div className="lg:w-full lg:mx-12">
          <div>
          <label>Email</label>
          {verifystatus ? <input
            className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
            type="email"
            placeholder=""
            value={seconduserEmail}
            required
            readOnly
            onChange={(e) => setseconduserEmail(e.target.value)}
          />:
          <input
            className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
            type="email"
            placeholder=""
            value={seconduserEmail}
            required
            onChange={(e) => setseconduserEmail(e.target.value)}
          />}

          <p className={verifystatus ? "visible text-lg":"hidden"}><b>VERIFIED</b></p>

            </div>
          </div>

           

        </div> 

        <div className="flex justify-around">
        <div className={seconduserotpcontainer ? "visible":"hidden"}> 
        <input
          className="border-2 h-12 px-4 w-min bg-gray-200 m-4"
          type="number"
          placeholder="Enter OTP"
          value={seconduserotp}
          required
          onChange={(e) => {
            setseconduserotp(e.target.value);
            if (recievedOTP==e.target.value)
            {
        setIsVerifying(true)
        setverifystatus(true)
        setseconduserotpcontainer(false)
        setisSecondMailVerified(true)
        setisVerificationSuccess(true)
            }
            }}
        />


        {/* <button className="p-4 bg-red-700 text-white text-lg"
        onClick={checkSecondOtp}
        disabled={isotpVerifying}>
        submit</button> */}
          

        </div>
        </div>
        

        <div className="flex justify-around">
        <div className={isVerificationSuccess ? "hidden":"block"}>
        <button
          className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg"
          onClick={checkSecondMailId}
          disabled={verificationInitiated && (isVerifying || resendTimer > 0)}
        >
          {verificationInitiated
            ? resendTimer > 0
              ? `Resend in ${resendTimer}s`
              : 'Resend'
            : 'Verify'}
        </button>
        </div>
        </div>
          

        </div>





        <div className="border-solid border-2 m-4 p-5">

<div className="flex justify-center lg:space-y-0 space-y-2">
  <p className="lg:text-2xl text-xl font-bold pb-4">Guide Details</p>
</div>


<div className="lg:flex justify-evenly lg:space-y-0 space-y-2">

<div className="lg:w-full lg:mx-12">
  <div>
  <label>Guide Name</label>
          <input className="border-2 h-12 px-4 w-full bg-gray-200 mb-4" type="text" value={guideName} readOnly />
  </div>
</div>

<div className="lg:w-full lg:mx-12">
  <div>
  <label>Guide Email Id</label>
          <input
            className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
            type="text"
            value={guideMailId}
            readOnly
          />
    </div>
  </div>

</div> 



</div>



        
    <div className="flex justify-around pb-5">
    <button type="submit" className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg">
        {isLoading ? "Loading..." : "SUBMIT"}
        </button>
    </div>






      </div>


































        {/* <div className="ProjectInformation border-2 "> */}
          {/* <h1>Project Information</h1> */}

          {/* <label>Project Title</label>
          <input
            className="border-2"
            type="text"
            placeholder=""
            value={projTitle}
            required
            onChange={(e) => setprojTitle(e.target.value)}
          /> */}
          {/* <br></br> */}

          {/* <label>Project Domain</label>
          <input
            className="border-2 "
            type="text"
            placeholder=""
            value={projDomain}
            required
            onChange={(e) => setprojDomain(e.target.value)}
          /> */}
          {/* <br></br> */}

          {/* <label>Project Description</label>
          <input
            className="border-2"
            type="text"
            placeholder=""
            value={projDesc}
            required
            onChange={(e) => setprojDesc(e.target.value)}
          /> */}
        {/* </div> */}

        {/* <div className="TeamInfo border-2 "> */}
          {/* <h1>Team Member 1</h1> */}

          {/* <label>Full Name</label>
          <input
            className="border-2"
            type="text"
            placeholder=""
            value={userName}
            required
            onChange={(e) => setuserName(e.target.value)}
          /> */}
          {/* <br></br> */}

          {/* <label>Register Number</label>
          <input
            className="border-2 "
            type="number"
            placeholder=""
            value={userRegNo}
            required
            onChange={(e) => setuserRegNo(e.target.value)}
          /> */}
          {/* <br></br> */}

          {/* <label>Email</label>
          <input className="border-2" type="text" value={userEmail} readOnly />
          <br></br> */}

          {/* <label>Phone Number</label>
          <input
            className="border-2"
            type="tel"
            placeholder=""
            value={userPhone}
            required
            onChange={(e) => setuserPhone(e.target.value)}
          /> */}
        {/* </div> */}




        

        {/* <div className="TeamInfo border-2 "> */}
          {/* <h1>Team Member 2</h1> */}

          {/* <label>Full Name</label>
          <input
            className="border-2"
            type="text"
            placeholder=""
            value={seconduserName}
            required
            onChange={(e) => setseconduserName(e.target.value)}
          /> */}
          {/* <br></br> */}

          {/* <label>Register Number</label>
          <input
            className="border-2 "
            type="number"
            placeholder=""
            value={seconduserRegNo}
            required
            onChange={(e) => setseconduserRegNo(e.target.value)}
          /> */}
          {/* <br></br> */}

          {/* <label>Phone Number</label>
          <input
            className="border-2"
            type="tel"
            placeholder=""
            value={seconduserPhone}
            required
            onChange={(e) => setseconduserPhone(e.target.value)}
          /> */}
          {/* <br></br> */}

          {/* <label>Email</label>
          <input
            className="border-2"
            type="email"
            placeholder=""
            value={seconduserEmail}
            required
            onChange={(e) => setseconduserEmail(e.target.value)}
          />  */}
          {/* <button className="p-4 bg-red-700 text-white text-lg"
           onClick={checkSecondMailId}
           disabled={isVerifying}>
           verify</button> */}
          {/* <br></br> */}
          {/* <p className={verifystatus ? "visible":"hidden"}><b>verified</b></p> */}


          {/* <div className={seconduserotpcontainer ? "visible":"hidden"}>


          <input
            className="border-2"
            type="number"
            placeholder="Enter OTP"
            value={seconduserotp}
            required
            onChange={(e) => setseconduserotp(e.target.value)}
          />
          <button className="p-4 bg-red-700 text-white text-lg"
           onClick={checkSecondOtp}
           disabled={isotpVerifying}>
           submit</button>
            

          </div>     */}

          
        {/* </div> */}

    








        {/* <div className="Guide Details">
          <h1>Guide Details</h1>
          <label>Guide Name</label>
          <input className="border-2" type="text" value={guideName} readOnly />
          <br></br>

          <label>Guide Email Id</label>
          <input
            className="border-2"
            type="text"
            value={guideMailId}
            readOnly
          /> */}
        {/* </div> */}
        {/* <button type="submit"  className="h-10 p-2 bg-red-600 text-black">SUBMIT</button> */}
      </form>


      <Footer />

    </>
  );
}
