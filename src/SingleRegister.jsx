import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";

import axios from "axios";

import DisplayGuide from "./DisplayGuide";
import LoginNavBar from "./LoginNavBar";
import Footer from "./shared/Footer";

import LoadingScreen from "./shared/Loader";

export default function SingleRegister() {
  // const serverPath1 = "http://127.0.0.1:5000"
  const serverPath1 = "https://gpaserver2.onrender.com";

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGuides, setFilteredGuides] = useState([]);

  const [guideDict, setGuideDict] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(serverPath1 + "/guide_list");
      setGuideDict(response.data);
    } catch (err) {
      console.warn(err);
    }
    setIsLoading(false);
  };

  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token = localStorage.getItem("token_for_first_time");

  //     if (token) {
  //       const decodedToken = jwtDecode(token);
  //       const expirationTime = decodedToken.exp * 1000;

  //       if (expirationTime < Date.now()) {
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("GuideName");
  //         localStorage.removeItem("GuideMailId");
  //         localStorage.removeItem("userMailId");
  //         localStorage.removeItem("newPassword");
  //         navigate("/login");
  //       }
  //     } else {
  //       navigate("/login");
  //     }
  //   };

  //   checkToken();
  //   getData();
  // }, [navigate]);


  useEffect(() => {
    const token = localStorage.getItem("token_for_first_time");
    const userEmail = localStorage.getItem("userEmail");
    
    if (token) {
      const headers = {
        'Authorization': `${token}`
      };
      const func=async()=>{
        const response = await axios.get(serverPath1+"/checkAuthentication/"+userEmail, {headers});
        if (response.data.message=="Authenticated"){
          // console.warn(("hiii"))
        }
        else{
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          navigate("/login");
        }
      }
      func(); 
      getData();
    }else{
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      navigate("/login");
    }
  }, []);



  useEffect(() => {
    // Filter guides based on the search query
    const filteredGuides = guideDict.filter((guide) =>
      guide["NAME"].toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGuides(filteredGuides);
  }, [searchQuery, guideDict]);

  let guideSerialNumber = 1;

  return (
    <>
    {isLoading && <LoadingScreen />}
      <LoginNavBar />
      {/* {console.warn("dict" + guideDict)} */}
      

      {/* <h1>Single Registration Form</h1> */}

      <div className="bg-[#9e1c3f] flex items-center justify-between mt-5 mb-5">
        <div className="flex flex-row items-center justify-center">
          <h1 className="p-4 text-white leading-loose  font-semibold text-2xl items-center"></h1>
        </div>

        <div className="flex flex-row items-center justify-center">
          <h1 className="p-4 text-white leading-loose  font-semibold lg:text-2xl md:text-2xl items-center text-sm">
            Select Your Guide
          </h1>
        </div>
        <div className="flex flex-row items-center">
          <input
            type="text"
            placeholder="Search guide..."
            className="border-2 border-solid border-black rounded-lg px-2 h-12 my-4 mr-10 lg:w-fit md:w-fit w-40"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="lg:flex md:flex md:flex-row lg:flex-row justify-between border-2 m-0 hidden sm:block">
        <div className="lg:w-1/12 sm:w-1/10 flex justify-center p-5 border-x-2 font-semibold lg:text-lg sm:text-sm">
          <p>Sr. No.</p>
        </div>
        <div className="lg:w-3/12 sm:w-6/10 flex justify-center p-5 border-x-2 font-semibold">
          <p>Supervisor's Name</p>
        </div>
        <div className="lg:w-5/12 md:flex justify-center  p-5 border-x-2 font-semibold hidden sm:block">
          <p>Specialization</p>
        </div>
        <div className="lg:w-2/12 flex sm:w-1/10 justify-center p-5 border-x-2 font-semibold">
          <p>Guides Vacancy</p>
        </div>
        <div className="lg:w-2/12 sm:w-2/10 flex justify-center p-5 border-x-2 font-semibold">
          <p>Select</p>
        </div>
      </div>


      {filteredGuides.map((item) => {
        return (
          <DisplayGuide
            key={item["id"]}
            serialNumber={guideSerialNumber++}
            empId={item["EMPID"]}
            name={item["NAME"]}
            img={item["IMAGE"]}
            vacancies={item["VACANCIES"]}
            designation={item["DESIGNATION"]}
            dm1={item["DOMAIN1"]}
            dm2={item["DOMAIN2"]}
            dm3={item["DOMAIN3"]}
            mailId={item["UniversityEMAILID"]}
            im="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3m_AEpNzWsxMYF_W3DiheGuLfRH9hTb4SA&usqp=CAU"
          />
        );

      })}

      <Footer />
    </>
  );
}
