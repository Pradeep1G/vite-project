import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const [userName, setUserName] = useState("");

  // Simulate user data
  const studentDetails = {
    profilePicture: "https://th.bing.com/th/id/OIP.MYwdjrgFU0JwL6ahVIdgZwHaH_?w=186&h=201&c=7&r=0&o=5&pid=1.7",
    studentName: "Bogesh",
    studentMail: userEmail || "bogesh@gmail.com",
  };

  const guideDetails = {
    profile: "https://th.bing.com/th/id/OIP.MYwdjrgFU0JwL6ahVIdgZwHaH_?w=186&h=201&c=7&r=0&o=5&pid=1.7",
    name: "albert",
    mail: "albert@gmail.com",
  };

  const initialProjectStatus = {
    guideApproval: false,
    researchPaper: false,
    documentation: false,
  };

  const [projectStatus, setProjectStatus] = useState(initialProjectStatus);

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
          const response = await axios.get(`${serverPath1}/api/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Assuming the server response contains a property named 'userName'
          setUserName(response.data.userName);
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
  }, [navigate]);

  // Function to toggle the project status
  const toggleStatus = (status) => {
    setProjectStatus({
      ...projectStatus,
      [status]: !projectStatus[status],
    });
  };

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
            <div className="mr-4">Welcome, {userName}</div>
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
            src={studentDetails.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <p className="text-lg font-semibold text-gray-700">Student Information:</p>
          <p className="text-lg text-gray-600">Name: {studentDetails.studentName}</p>
          <p className="text-lg text-gray-600">Email: {studentDetails.studentMail}</p>
    </div>

    <div className="bg-white p-4 rounded shadow-md mb-4">
      {/* Content for the second column */}
<h1 className="text-3xl font-bold text-gray-800 mb-4">Guide details</h1>
          <img
            src={guideDetails.profile}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <p className="text-lg text-gray-600">Name: {guideDetails.name}</p>
          <p className="text-lg text-gray-600">Email: {guideDetails.mail}</p>
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
      onClick={() => toggleStatus("researchPaper")}
      className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${projectStatus.researchPaper ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
      Research Paper
    </button>
    <button
      onClick={() => toggleStatus("documentation")}
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
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Comments</h1>
          {/* Add your comments section here */}
        </div>
      </div>
  
  );
}

export default Dashboard;
