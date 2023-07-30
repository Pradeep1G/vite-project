
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import DisplayGuide from "./DisplayGuide";


export default function SingleRegister() {


  // const serverPath1 = "http://127.0.0.1:5000"
  const serverPath1 = "https://gpaserver2.onrender.com"


  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGuides, setFilteredGuides] = useState([]);

  const [guideDict, setGuideDict] = useState([]);

  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await axios.get(serverPath1+'/guidelist');
      setGuideDict(response.data);
    } catch (err) {
      console.warn(err);
    }
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
      {console.warn("dict" + guideDict)}

      <h1>Single Registration Form</h1>



      <input
        type="text"
        placeholder="Search guide..."
        className="border-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />



      {filteredGuides.map((item)=>{
        return <DisplayGuide key={item['id']} empid={item['EMPID']} name={item['NAME']} img = {item["IMAGE"]} vacancies={item['VACANCIES']} designation={item['DESIGNATION']} dm1={item["DOMAIN1"]} dm2={item["DOMAIN2"]} dm3={item["DOMAIN3"]} mailid={item["UniversityEMAILID"]} im="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb3m_AEpNzWsxMYF_W3DiheGuLfRH9hTb4SA&usqp=CAU"/>
      })}
    </>
  );
}
