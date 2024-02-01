import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import jwtDecode from 'jwt-decode';

export default function Dashboard() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  // Simulate user data
  const studentDetails = {
    profilePicture: "https://th.bing.com/th/id/OIP.MYwdjrgFU0JwL6ahVIdgZwHaH_?w=186&h=201&c=7&r=0&o=5&pid=1.7",
    studentName: "Bogesh",
    studentMail: userEmail || "bogesh@gmail.com", // Display entered email or a default value
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
    // Decode JWT token and perform necessary actions
    // Example: Check if the user is authenticated
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      // Perform actions based on the decoded token
    } else {
      // Redirect to login if no token is found
      navigate("/login");
    }
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

  // Render your layout component
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-[#9e1c3f] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold">Your Logo</div>
          <div className="flex items-center">
            <div className="mr-4">Welcome, {studentDetails.studentName}</div>
            <button
              onClick={studentLogout}
              className="text-lg font-bold p-2 rounded bg-blue-500 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-screen-xl mx-auto mt-8 mb-8">
        {/* Student Details Card */}
        <div className="bg-white p-8 rounded shadow-md">
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

        {/* Guide Details Card */}
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Guide details</h1>
          <img
            src={guideDetails.profile}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <p className="text-lg text-gray-600">Name: {guideDetails.name}</p>
          <p className="text-lg text-gray-600">Email: {guideDetails.mail}</p>
        </div>

        {/* Projects Card */}
        <div className="bg-white p-8 rounded shadow-md col-span-2 mt-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Project Status</h1>
          <div className="flex justify-between mb-4">
            {/* Guide Approval Button */}
            <button
              onClick={() => toggleStatus("guideApproval")}
              className={`text-lg font-bold p-2 rounded ${projectStatus.guideApproval ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            >
              Guide Approval
            </button>

            {/* Research Paper Button */}
            <button
              onClick={() => toggleStatus("researchPaper")}
              className={`text-lg font-bold p-2 rounded ${projectStatus.researchPaper ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            >
              Research Paper
            </button>

            {/* Documentation Button */}
            <button
              onClick={() => toggleStatus("documentation")}
              className={`text-lg font-bold p-2 rounded ${projectStatus.documentation ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
            >
              Documentation
            </button>
          </div>
        </div>

        {/* Comments Section Card */}
        <div className="bg-white p-8 rounded shadow-md col-span-2 mt-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Comments</h1>
          {/* Add your comments section here */}
        </div>
      </div>
    </div>
  );
}
