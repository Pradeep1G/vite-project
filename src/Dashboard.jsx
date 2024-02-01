import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import jwtDecode from 'jwt-decode';

export default function Dashboard(){

    const navigate = useNavigate();

    // Simulate user data
    const studentDetails = {
      profilePicture: "https://th.bing.com/th/id/OIP.MYwdjrgFU0JwL6ahVIdgZwHaH_?w=186&h=201&c=7&r=0&o=5&pid=1.7",
      studentName: "Bogesh",
      studentMail: "bogesh@gmail.com",
    };
    const guideDetails ={
      profile:"https://th.bing.com/th/id/OIP.MYwdjrgFU0JwL6ahVIdgZwHaH_?w=186&h=201&c=7&r=0&o=5&pid=1.7",
      name:"albert",
      mail:"albert@gmail.com",
    };
    const projectStatus ={
      guideApproval:"Completed",
      researchPaper:"In Progress",
      documentation:"Not Started",
    };

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

    // Render your layout component
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mt-8 mb-8">
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
            <p className="text-lg text-gray-600">Guide Approval: {projectStatus.guideApproval}</p>
            <p className="text-lg text-gray-600">Research Paper: {projectStatus.researchPaper}</p>
            <p className="text-lg text-gray-600">Documentation: {projectStatus.documentation}</p>
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
