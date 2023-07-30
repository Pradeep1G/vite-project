import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";



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



  


  const Submit =async (e)=>{
    e.preventDefault()



    if (parseInt(getvacancies['vacancies'])>0 && isnotRegisterd)
    {
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
        navigate(currentPath+"/success")

        }
        
        else if(!isnotRegisterd)
        {
            alert("Account is already registered")
        } 
        else{
          alert("No Vacancy Select Another Staff")
        }

    

  }






  return (
    <>
      <h1>REGISTRATION FORM</h1>

      <form onSubmit={Submit}>
        <div className="ProjectInformation border-2 ">
          <h1>Project Information</h1>

          <label>Project Title</label>
          <input
            className="border-2"
            type="text"
            placeholder=""
            value={projTitle}
            required
            onChange={(e) => setprojTitle(e.target.value)}
          />
          <br></br>

          <label>Project Domain</label>
          <input
            className="border-2 "
            type="text"
            placeholder=""
            value={projDomain}
            required
            onChange={(e) => setprojDomain(e.target.value)}
          />
          <br></br>

          <label>Project Description</label>
          <input
            className="border-2"
            type="text"
            placeholder=""
            value={projDesc}
            required
            onChange={(e) => setprojDesc(e.target.value)}
          />
        </div>

        <div className="TeamInfo border-2 ">
          <h1>Your Profile</h1>

          <label>Full Name</label>
          <input
            className="border-2"
            type="text"
            placeholder=""
            value={userName}
            required
            onChange={(e) => setuserName(e.target.value)}
          />
          <br></br>

          <label>Register Number</label>
          <input
            className="border-2 "
            type="number"
            placeholder=""
            value={userRegNo}
            required
            onChange={(e) => setuserRegNo(e.target.value)}
          />
          <br></br>

          <label>Email</label>
          <input className="border-2" type="text" value={userEmail} readOnly />
          <br></br>

          <label>Phone Number</label>
          <input
            className="border-2"
            type="tel"
            placeholder=""
            value={userPhone}
            required
            onChange={(e) => setuserPhone(e.target.value)}
          />
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
        <button type="submit" className="h-10 p-2 bg-red-600 text-black">SUBMIT</button>
      </form>
    </>
  );
}
