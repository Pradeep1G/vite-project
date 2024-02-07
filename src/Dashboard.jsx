import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const [guideComments, setGuideComments] = useState('hi guide comments');

  // Function to handle input changes for guide comments

  // const serverPath1 = "http://127.0.0.1:5000"
  const serverPath1 = "https://gpaserver2.onrender.com";

  // Simulate user data
  const studentDetails = {
    studentMail: userEmail || "bogesh@gmail.com",
  };
  
  const [projectStatus, setProjectStatus] = useState({
    "documentation": false,
    "ppt": false,
    "guideApproval": false,
    "researchPaper": {
      "approval": false,
      "communicated": false,
      "accepted": false,
      "payment": false
    }
  });

  const [StudentData, setStudentData] = useState(
   [{ "name":null,
    "team":null,
    "regNo":null,
    "phoneNo":null,
    // "section":null,
    "p2name":null,
    "p2regNo":null,
    "p2phoneNo":null,
    // "p2section":null,
    "selectedGuide":null,
    "selectedGuideMailId":null , 
    
  }]
  );
  const [studentImg,setstudentimg]=useState("https://drive.google.com/uc?id=1XQIbsTt0GuT2PIqXFSmQXYux0Jcb543i")




  const [projectDetails, setprojectDetails] = useState([{
    "projectTitle":null,
    "projectDesc":null,
    "projectDomain": null
  }]);
  const [documentation, setDocumentation] = useState([{
    "researchPaper": null,
    "documentation": null,
    "ppt": null
  }]);
  const [guideImg,setGuideimg]=useState("https://drive.google.com/uc?id=1XQIbsTt0GuT2PIqXFSmQXYux0Jcb543i")



  function getDirectLinkFromShareableLink(shareableLink) {
    try {
      const fileIdMatch = shareableLink.match(/\/uc\?id=(.*?)(&|$)/);
      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/thumbnail?id=${fileId}`;
      } else {
        throw new Error("Invalid shareable link format");
      }
    } catch (error) {
      console.error("Error processing shareable link:", error.message);
      return null;
    }
  }

  // UseEffect to decode JWT token (if applicable)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      // Perform actions based on the decoded token
    } else {
      // Redirect to login if no token is found
      navigate("/login");
    }
  }, [navigate]);

  // UseEffect to fetch the user's name from the server
  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.post(`${serverPath1}/studentLogin/getStudentData/${userEmail}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.warn(response.data)
        
          // Assuming the server response contains a property named 'userName'
          setStudentData(response.data.studentData);
          setprojectDetails(response.data.projectDetails);
          setProjectStatus(response.data.projectStatus[0]);
          console.warn(response.data.projectStatus);
          setDocumentation(response.data.documentation);
          setGuideimg(response.data.guideImage);
          console.warn(projectStatus);
          // setstudentimg(response.data.studentImage);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      } else {
        // Redirect to login if no token is found
        navigate("/login");
      }
    };

    // Call the fetchUserName function
    fetchUserName();
  }, []);

  

  // Function to handle logout
  const studentLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  const handleDocumentUpload = (e) => {
    const documentFile = e.target.files[0];
    console.log("Document Uploaded:", documentFile.name);
  };

  const handleResearchPaperUpload = (e) => {
    const researchPaperFile = e.target.files[0];
    console.log("Research Paper Uploaded:", researchPaperFile.name);
  };

  return (
    <div className="">
      <nav className="bg-[#9e1c3f] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold">Your Logo</div>
          <div className="flex items-center">
            <div className="mr-4">Welcome, {StudentData[0]["name"]}</div>
            <button
              onClick={studentLogout}
              className="text-lg font-bold p-2 rounded bg-blue-500 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-screen-xl">
    <div className="bg-white p-4 rounded shadow-md mb-4">
      {/* Content for the first column */}
<h1 className="text-3xl font-bold text-gray-800 mb-4">Student details</h1>
          <img
            src={getDirectLinkFromShareableLink(studentImg)}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <p className="text-lg font-semibold text-gray-700">Student Information:</p>
          
          <p className="text-lg text-gray-600">Name: {StudentData[0]["name"]}</p>
          <p className="text-lg text-gray-600">Reg No: {StudentData[0]["regNo"]}</p>
          <p className="text-lg text-gray-600">Section :</p>
    </div>
    {StudentData[0]["p2name"] && (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Student details</h1>
      <img
            src={getDirectLinkFromShareableLink(studentImg)}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
           <p className="text-lg font-semibold text-gray-700">Student Information:</p>
      <p className="text-lg text-gray-600">Name: {StudentData[0]["p2name"]}</p>
      <p className="text-lg text-gray-600">Reg No: {StudentData[0]["p2regNo"]}</p>
      <p className="text-lg text-gray-600">Section :</p>
      {/* Add other details for the second student here */}
    </div>
  )}

    <div className="bg-white p-4 rounded shadow-md mb-4">
      {/* Content for the second column */}
<h1 className="text-3xl font-bold text-gray-800 mb-4">Guide details</h1>
          <img
            src={getDirectLinkFromShareableLink(guideImg)}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <p className="text-lg text-gray-600">Name: {StudentData[0]["selectedGuide"]}</p>
          <p className="text-lg text-gray-600">Email: {StudentData[0]["selectedGuideMailId"]}</p>
    </div>
  </div>
  <div className="bg-white p-4 rounded shadow-md mb-4">
  <h1 className="text-3xl font-bold text-gray-800 mb-4">Project details</h1>
  <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Title */}
    <div>
      <label className="block text-lg font-semibold text-gray-700">Title:</label>
      <input
        type="text"
        name="projectTitle"
        value={projectDetails[0]["projectTitle"]}
        className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
        style={{ backgroundColor: '#f0f0f0', color: '#333' }} 
      />
    </div>

    {/* Domain */}
    <div>
      <label className="block text-lg font-semibold text-gray-700">Domain:</label>
      <input
        type="text"
        name="projectDomain"
        value={projectDetails[0]["projectDomain"]}
        style={{ backgroundColor: '#f0f0f0', color: '#333' }} 
        className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
      />
    </div>
  </div>

  {/* Description */}
  <div className="mb-4">
    <label className="block text-lg font-semibold text-gray-700">Description:</label>
    <textarea
      name="projectDescription"
      value={projectDetails[0]["projectDesc"]}
      className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
      style={{ backgroundColor: '#f0f0f0', color: '#333' }} 
    />
  </div>
</div>


  <div className="bg-white p-4 rounded shadow-md  mb-4  md:flex-wrap md:justify-between">
  <h1 className="text-3xl font-bold text-gray-800 mb-4">Project Status</h1>
  <div className="flex flex-col md:flex-row md:justify-between">
    <button
      onClick={() => toggleStatus("guideApproval")}
      className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${projectStatus.guideApproval ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
      Guide Approval
    </button>
    <button
  className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${projectStatus.documentation ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
>
  Documentation
</button>

    <button
      onClick={() => toggleStatus("ppt")}
      className={`text-lg font-bold p-2 rounded ${projectStatus.ppt ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
      PPT
    </button>
  </div>
  <br></br>
  <h1 className="text-3xl font-bold text-gray-800 mb-4">Research Paper Status</h1>
  <div className="flex flex-col md:flex-row md:justify-between">
    <button
      onClick={() => toggleStatus("researchPaper")}
      className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${projectStatus.researchPaper.approval ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
     Approval
    </button>
    <button
      onClick={() => toggleStatus("researchPaper")}
      className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${projectStatus.researchPaper.communicated ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
      Communicated
    </button>
    <button
      onClick={() => toggleStatus("researchPaper")}
      className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${projectStatus.researchPaper.accepted ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
     Accepted
    </button>
    <button
      onClick={() => toggleStatus("researchPaper")}
      className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${projectStatus.researchPaper.payment ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
      Payment
    </button>
    </div>
    <br></br>
    
    
</div>

        <div className="bg-white p-4 rounded shadow-md col-span-2 mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Project Status</h1>
          <div className="flex flex-col gap-4">
            <h4><b>Project document</b></h4>
            <label className="flex flex-col items-center bg-[#9e1c3f] text-white p-4 rounded cursor-pointer">
              <span>Upload Document</span>
              <input type="file" className="hidden" onChange={(e) => handleDocumentUpload(e)} />
            </label>

            <h4><b>Research paper document</b></h4>
            <label className="flex flex-col items-center bg-[#9e1c3f] text-white p-4 rounded cursor-pointer">
              <span>Upload Research Paper</span>
              <input type="file" className="hidden" onChange={(e) => handleResearchPaperUpload(e)} />
            </label>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-md col-span-2">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Comments </h1>
      <div>
  <h2 className="text-xl font-semibold text-gray-800 mt-4">Guide Comments:</h2>
  <textarea
    id="guideComments"
    name="guideComments"
    value={guideComments}
    // onChange={handleGuideCommentsChange}
    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 mt-2"  // Added margin-top and adjusted styling
    rows="4"
    style={{ backgroundColor: '#f0f0f0', color: '#333' }}  // Set background color and text color
    // placeholder="Enter comments from the guide..."
  />
</div>

     
    </div>
      </div>
  
  );
}


export default Dashboard;