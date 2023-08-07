
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import DisplayGuide from "./DisplayGuide";
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




export default function SingleRegister() {


  // const serverPath1 = "http://127.0.0.1:5000"
  const serverPath1 = "https://gpaserver2.onrender.com"


  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGuides, setFilteredGuides] = useState([]);

  const [guideDict, setGuideDict] = useState([]);


  const [isLoading, setIsLoading] = useState(false);



  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();

  const getData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(serverPath1+'/guidelist');
      setGuideDict(response.data);
    } catch (err) {
      console.warn(err);
    }
    setIsLoading(false)
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
          localStorage.removeItem("userMailId")
          localStorage.removeItem('newpassword')
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    checkToken();
    getData();
  }, [navigate]);




  useEffect(() => {
    // Filter guides based on the search query
    const filteredGuides = guideDict.filter((guide) =>
      guide["NAME"].toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGuides(filteredGuides);
  }, [searchQuery, guideDict]);





  return (
    <>
    <Loginnavbar />
      {/* {console.warn("dict" + guideDict)} */}
      {isLoading &&  <LoadingScreen />}


      {/* <h1>Single Registration Form</h1> */}



      <div className="bg-[#9e1c3f] flex items-center justify-between mt-5 mb-5">




      <div className="flex flex-row items-center justify-center">

<h1 className='p-4 text-white leading-loose  font-semibold text-2xl items-center'></h1>
</div>





      <div className="flex flex-row items-center justify-center">

      <h1 className='p-4 text-white leading-loose  font-semibold text-2xl items-center'>Select Your Guide</h1>
      </div>
      <div className="flex flex-row items-center">

      <input
        type="text"
        placeholder="Search guide..."
        className="border-2 border-solid border-black rounded-lg px-2 h-12 my-4 mr-10 w-fit"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      </div>

      </div>



      {filteredGuides.map((item)=>{
        return <DisplayGuide key={item['id']} empid={item['EMPID']} name={item['NAME']} img = {item["IMAGE"]} vacancies={item['VACANCIES']} designation={item['DESIGNATION']} dm1={item["DOMAIN1"]} dm2={item["DOMAIN2"]} dm3={item["DOMAIN3"]} mailid={item["UniversityEMAILID"]} im="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3m_AEpNzWsxMYF_W3DiheGuLfRH9hTb4SA&usqp=CAU"/>
      })}


      <Footer />
    </>
  );
}
