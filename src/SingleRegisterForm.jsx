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






export default function SingleRegisterForm() {

  // const serverPath1 = "http://127.0.0.1:5000"
  const serverPath1 = "https://gpaserver2.onrender.com"


    const navigate = useNavigate()
    const currentPath = location.pathname;

  const [projTitle, setprojTitle] = useState("");
  const [projDomain, setprojDomain] = useState("");
  const [projDesc, setprojDesc] = useState("");

  const [userName, setuserName] = useState("");
  const [userRegNo, setuserRegNo] = useState("");
  const [userEmail, setuserEmail] = useState(
    localStorage.getItem("userMailId")
  );
  const [userPhone, setuserPhone] = useState("");

  const [guideName, setguideName] = useState(localStorage.getItem("GuideName"));
  const [guideMailId, setguideMailId] = useState(
    localStorage.getItem("GuideMailId")
  );


  const [getvacancies, setgetvacancies] = useState("")
  const [isnotRegisterd, setisnotRegisterd]  = useState("")



  const [isLoading, setIsLoading] = useState(false);




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
    checkRegistered();
  }, [userEmail,guideMailId,getvacancies]);
  

  const getData = async () => {
    try {
      const response = await axios.get(serverPath1+'/checkVacancies/'+guideMailId);
      setgetvacancies(response.data);
    //   console.warn(getvacancies)
    } catch (err) {
      console.warn(err);
    }
  };


  const checkRegistered = async () => {
    try{
      const response = await axios.get(serverPath1+"/api/check/"+userEmail)
      console.warn(response.data)
      setisnotRegisterd(response.data.first_time)

    }catch (err){
      console.warn(err)
    }
  }



  


  const Submit = async (e) => {
    e.preventDefault();
  
    setIsLoading(true);
  
    if (parseInt(getvacancies['vacancies']) > 0 && isnotRegisterd) {
      const data4 = {
        email: userEmail,
        password: localStorage.getItem('newpassword')
      };
  
      try {
        const response = await axios.put(serverPath1 + "/add_registered_data", data4);
        console.log(response.data);
        if (response.data['error'] === 'Email already registered') {
          setisnotRegisterd(false);
          alert("Account already Registered");
        } else if (response.data['message'] === 'User registered successfully') {
  

          



            const data = {
                collection_name: userRegNo, // Replace 'my_collection' with the desired collection name
                data: {
                  team: false,
                  name: userName,
                  regNo: userRegNo,
                  phoneNo: userPhone,
                  mailId: userEmail,
                  projectTitle: projTitle,
                  projectDesc: projDesc,
                  projectDomain: projDomain,
                  selectedGuide: guideName,
                  selectedGuideMailId: guideMailId
                },
              };
          
              // Send the data to the Flask route using Axios
              axios.post(serverPath1+'/create_collection', data, {
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
                    collection_name: 'users', // Replace 'my_collection' with the desired collection name
                    filter_data: { email: userEmail }, // Replace with the filter to identify the data you want to update
                    updated_data: {
                      password: localStorage.getItem('newpassword'),
                      firstTime: false,
                      regNo: userRegNo
                    },
                  };
              
                  // Send the data to the Flask update route using Axios
                  axios.put(serverPath1+'/update_data', data2, {
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
                      collection_name: 'facultylist', // Replace 'my_collection' with the desired collection name
                      filter_data: { "University EMAIL ID": guideMailId }, // Replace with the filter to identify the data you want to update
                      updated_data: {
                        "TOTAL BATCHES": parseInt(getvacancies['vacancies'])-1
                      },
                    };
                
                    // Send the data to the Flask update route using Axios
                    axios.put(serverPath1+'/update_vacancies_data', data3, {
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
                navigate(currentPath + "/success");
              }
            } catch (error) {
              console.warn(error, "Account Already Registered");
              setisnotRegisterd(false);
              alert("Account already Registered");
            }
          } else if (!isnotRegisterd) {
            alert("Account is already registered");
          } else {
            alert("No Vacancy Select Another Staff");
          }
        
          setIsLoading(false);
        };





  return (
    <>

    <Loginnavbar />


      {isLoading &&  <LoadingScreen />}

      


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
          <p className="lg:text-2xl text-xl font-bold pb-4">Student Details</p>
        </div>


        <div className="lg:flex justify-evenly lg:space-y-0 space-y-2">

        <div className="lg:w-full lg:mx-12">
          <div>
          <label>Full Name</label>
          <input
            className="border-2 h-12 px-4 w-full bg-gray-200 mb-4"
            type="text"
            placeholder="Name"
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
            className="border-2 h-12 px-4 w-full bg-gray-200 mb-6"
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







        










      </div>






        <div className="ProjectInformation border-2 ">
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
          <br></br>

          {/* <label>Project Domain</label>
          <input
            className="border-2 "
            type="text"
            placeholder=""
            value={projDomain}
            required
            onChange={(e) => setprojDomain(e.target.value)}
          /> */}
          <br></br>

          {/* <label>Project Description</label>
          <input
            className="border-2"
            type="text"
            placeholder=""
            value={projDesc}
            required
            onChange={(e) => setprojDesc(e.target.value)}
          /> */}
        </div>

        <div className="TeamInfo border-2 ">
          <h1>Your Profile</h1>

          {/* <label>Full Name</label>
          <input
            className="border-2"
            type="text"
            placeholder=""
            value={userName}
            required
            onChange={(e) => setuserName(e.target.value)}
          /> */}
          <br></br>

          {/* <label>Register Number</label>
          <input
            className="border-2 "
            type="number"
            placeholder=""
            value={userRegNo}
            required
            onChange={(e) => setuserRegNo(e.target.value)}
          /> */}
          <br></br>

          {/* <label>Email</label>
          <input className="border-2" type="text" value={userEmail} readOnly /> */}
          <br></br>

          {/* <label>Phone Number</label>
          <input
            className="border-2"
            type="tel"
            placeholder=""
            value={userPhone}
            required
            onChange={(e) => setuserPhone(e.target.value)}
          /> */}
        </div>

        <div className="Guide Details">
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
          />
        </div>
        <button type="submit" className="h-10 p-2 bg-red-600 text-black">
        {isLoading ? "Loading..." : "SUBMIT"}
        </button>
      </form>
      

      <Footer />
    </>
  );
}
