import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import sist_logo_login from "./assets/sist_logo_login.png";
import log_out from "./assets/svgs/log_out.svg";
import LoadingScreen from "./shared/Loader";
import Alert from "./shared/Alert";
import { TfiHelpAlt } from "react-icons/tfi";
import lock from "./assets/svgs/lock.svg";

const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const teamId = localStorage.getItem("teamId");

  const [guideComments, setGuideComments] = useState([]);
//  const [Teamid,setTeamid]=useState();

  // Function to handle input changes for guide comments

  // const serverPath1 = "http://127.0.0.1:5000"
   const serverPath1 = "https://gpaserver2.onrender.com";
  const [isLoading, setisLoading] = useState(false);
  const [alert, setAlert]  = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [alertType, setAlertType] = useState();

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
    "section":null,
    "p2name":null,
    "p2regNo":null,
    "p2phoneNo":null,
     "p2section":null,
     "editProjectDetails":null,
    "selectedGuide":null,
    "selectedGuideMailId":null , 
    "teamId":null
    
  }]
  );
  const [studentImg1,setstudentimg1]=useState("https://drive.google.com/uc?id=1XQIbsTt0GuT2PIqXFSmQXYux0Jcb543i")
  const [studentImg2,setstudentimg2]=useState("https://drive.google.com/uc?id=1XQIbsTt0GuT2PIqXFSmQXYux0Jcb543i")

  const [problemStatements, setproblemStatements] = useState([])



  const [projectDetails, setprojectDetails] = useState([{
    "projectTitle":null,
    "projectDesc":null,
    "projectDomain": null
  }]);
  const [isEditable, setIsEditable] = useState(false);
  const [editedProjectDetails, setEditedProjectDetails] = useState({
    projectTitle: projectDetails[0]["projectTitle"],
    projectDomain: projectDetails[0]["projectDomain"],
    projectDesc: projectDetails[0]["projectDesc"],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editProjectDetails, seteditProjectDetails] = useState();
  const toggleEdit = () => {
    // Clear editedProjectDetails when entering edit mode
    if (!isEditable) {
      setEditedProjectDetails({
        projectTitle: "",
        projectDomain: "",
        projectDesc: "",
      });
    }
    setIsEditable(!isEditable);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleUpdateProjectDetails = async () => {
    try {
      if (
        !editedProjectDetails.projectTitle ||
        !editedProjectDetails.projectDomain ||
        !editedProjectDetails.projectDesc
      ) {
        alert('Please fill in all the fields before submitting.');
        return;
      }

      setIsSubmitting(true);

      const updatedData = {
        projectTitle: editedProjectDetails.projectTitle,
        projectDesc: editedProjectDetails.projectDesc,
        projectDomain: editedProjectDetails.projectDomain,
      };

      
      setisLoading(true);
      const response = await axios.post(
        `${serverPath1}/studentLogin/updateProjectDetails/${userEmail}`,
        updatedData
      );
      setisLoading(false)
      // console.warn(response.data);
      

      if(response.data.message==="Success"){
        setAlert(true);
        setAlertMessage("Project Details Updated Successfully!")
        setAlertType("success")
      }else{
        setAlert(true);
        setAlertMessage("Failed to Update Project Details!")
        setAlertType("fail")
      }
      alertDelay();
      

      // setProjectDetails([editedProjectDetails]);
      // setIsEditable(false);

      // Refresh the page after successful submission
      // window.location.reload();
      seteditProjectDetails(false);

    } catch (error) {
      // console.error('Error updating project details:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
      // console.error("Error processing shareable link:", error.message);
      return null;
    }
  }


  function getDirectLinkFromShareableLinkStudent(shareableLink) {
    try {
      const fileIdMatch = shareableLink.match(/\/file\/d\/(.*?)\//);
      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/thumbnail?id=${fileId}`;
      } else {
        throw new Error("Invalid shareable link format");
      }
    } catch (error) {
      // console.error("Error processing shareable link:", error.message);
      return null;
    }
  }
  
  const [guideMailId, setGuideMailId] = useState("");

  // UseEffect to decode JWT token (if applicable)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");
    const teamId = localStorage.getItem("teamid");

    
    if (token) {
      const headers = {
        'Authorization': `${token}`
      };
      const func=async()=>{
        setisLoading(true)
        const response = await axios.get(serverPath1+"/checkAuthentication/"+userEmail, {headers});
        setisLoading(false)
        if (response.data.message=="Authenticated"){
          // console.warn(("hiii"))
        }
        else{
          localStorage.removeItem("token");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("teamId");

          navigate("/login");
        }
      }
      func(); 

      

    }else{
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("teamId");

      navigate("/login");
    }
  }, []);


  // UseEffect to fetch the user's name from the server
  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setisLoading(true)
    const teamId = localStorage.getItem("teamId");

          const response = await axios.post(`${serverPath1}/studentLogin/getStudentData/${teamId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setisLoading(false);
          // console.warn(response.data)
        
          // Assuming the server response contains a property named 'userName'
          setStudentData(response.data.studentData);
          setproblemStatements(response.data.problemStatements)

          // console.warn(guideMailId)
          // console.warn(StudentData);
          seteditProjectDetails(response.data.studentData[0].editProjectDetails);
          setprojectDetails(response.data.projectDetails);
          setProjectStatus(response.data.projectStatus[0]);
          // console.warn(response.data.projectStatus);
          setDocumentation(response.data.documentation);
          setGuideimg(response.data.guideImage);
          setGuideComments(response.data.comments);
          // setTeamid(response.data.teamId);
          // console.warn(guideComments);
          // console.warn(projectStatus);
          setstudentimg1(response.data.studentImage1);
          setstudentimg2(response.data.studentImage2);

        } catch (error) {
          // console.error("Error fetching user details:", error);
        }
      } else {
        // Redirect to login if no token is found
        navigate("/login");
      }
    };

    // Call the fetchUserName function
    fetchUserName();
  }, [alertMessage]);



  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleHelp = () => {
    // Redirect to the help page or perform other help-related actions
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=guideselection.cse@sathyabama.ac.in');

  };
  const studentLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("teamId");
    // Redirect to login page
    navigate("/login");
  };




  const [projectpptFile, setProjectPPTFile] = useState(null);
  const [projectDocFile, setProjectDocFile] = useState(null);
  const [researchPaperFile, setResearchPaperFile] = useState(null);


  const sendPptFile = async() =>{
    const data =  new FormData();
    data.append("ppt", projectpptFile)
    data.append("teamId", StudentData[0]["teamId"])
    if(projectpptFile){
      setisLoading(true)
      const res = await axios.put(serverPath1+"/studentLogin/uploadppt/"+StudentData[0]["teamId"], data);
      setisLoading(false);
      setAlert(true);
      // console.warn(res.data)
      if(res.data.message==="Success"){
        setAlertMessage("PPT Uploaded Successfully!")
        setAlertType("success")
      }else{
        setAlertMessage("Failed to Upload PPT!")
        setAlertType("fail")
      }
      alertDelay();
    }

  } 

  const sendDocFile = async() =>{
    const data =  new FormData();
    data.append("documentation", projectDocFile)
    data.append("teamId", StudentData[0]["teamId"])
    if(projectDocFile){
      setisLoading(true)
      const res = await axios.put(serverPath1+"/studentLogin/uploaddoc/"+StudentData[0]["teamId"], data);
      setisLoading(false);
      setAlert(true);
      // console.warn(res.data)
      if(res.data.message==="Success"){
        setAlertMessage("Document Uploaded Successfully!")
        setAlertType("success")
      }else{
        setAlertMessage("Failed to Upload Document!")
        setAlertType("fail")
      }
      alertDelay();
    }
  } 


  const sendRspaperFile = async() =>{
    const data =  new FormData();
    data.append("researchPaper", researchPaperFile)
    if(researchPaperFile){
      data.append("teamId", StudentData[0]["teamId"])
      setisLoading(true)
      const res = await axios.put(serverPath1+"/studentLogin/uploadrspaper/"+StudentData[0]["teamId"], data);
      setisLoading(false)
      setAlert(true);
      // console.warn(res.data)
      if(res.data.message==="Success"){
        setAlertMessage("Research Paper Uploaded Successfully!")
        setAlertType("success")
      }else{
        setAlertMessage("Failed to Upload Research Paper!")
        setAlertType("fail")
      }
      alertDelay();
    }
  } 

  const alertDelay = () => {
    setTimeout(() => {
      setAlert(false);
      setAlertMessage("");
    }, 3000); // 3000 milliseconds = 3 seconds
  };

 
  return (
    <>
    <div className={`flex items-center justify-center ${alert ? "":"hidden"} `}>
    <Alert type={alertType} message={alertMessage}/>
    </div>
    <div className="">
    
    {isLoading && <LoadingScreen />}
  <nav className="bg-[#9e1c3f] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/">
            <img
              src={sist_logo_login}
              alt="Logo"
              className="h-12 w-auto float-start"
            />
          </a>
        </div>
        <div className="flex items-center relative">
          <div className="mr-4">Welcome, {StudentData[0]["teamId"]}</div>
          <button
            onClick={toggleDropdown}
            className="text-sm font-semibold rounded text-white focus:outline-none"
          >
            &#9660; {/* Down arrow */}
          </button>
          {isDropdownOpen && (
            <div className="absolute top-10 right-0 bg-white text-gray-800 p-2 rounded shadow-md">
            <div className="flex flex-row justify-center space-x-2 items-center hover:bg-gray-200">
              <TfiHelpAlt height={4} width={4}/>
              <button onClick={handleHelp} className="block p-2 ">
                Help
              </button>
              </div>
              <div className="w-full flex items-center justify-center h-2/5 hover:bg-slate-200">
                <a
                  href={`/dashboard/student_Password_change`}
                  className="w-full flex justify-start items-center gap-1 p-2"
                >
                  <img className="h-4 w-4" src={lock} alt="Lock" />
                  Change Password
                </a>
              </div>
              <div className="flex flex-row justify-center items-center hover:bg-gray-200">
              <img className="h-4 w-4" src={log_out} alt="LogOut" />
              <button onClick={studentLogout} className="block p-2 ">
                Logout
              </button>
              </div>
            </div>

          )}
        </div>
      </div>
    </nav>



<div className="flex items-center justify-center">
    <div className="container mx-auto p-4 flex flex-wrap gap-4 w-fit items-center justify-center">
  {/* First Card - Student 1 */}
  <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80">
  <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
    <h1 className="text-2xl font-bold text-center">Student 1</h1>
  </div>
    <img
      src={getDirectLinkFromShareableLinkStudent(studentImg1)}
      alt="Profile"
      className="w-32 h-32 rounded-full mx-auto mb-4"
    />
    <div className="p-4">
    <p className="text-lg font-semibold text-gray-700">Name: {StudentData[0]["name"]}</p>
    <p className="text-lg text-gray-600">Reg No: {StudentData[0]["regNo"]}</p>
    <p className="text-lg text-gray-600 ">Section: {StudentData[0]["section"]}</p>
    </div>
  </div>

  {/* Second Card - Student 2 (if exists) */}
  {StudentData[0]["p2name"] && (
    <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80">
    <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
      <h1 className="text-2xl font-bold text-center">Student 2</h1>
    </div>
      <img
        src={getDirectLinkFromShareableLinkStudent(studentImg2)}
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <div className="p-4">
      <p className="text-lg font-semibold text-gray-700">Name: {StudentData[0]["p2name"]}</p>
      <p className="text-lg text-gray-600">Reg No: {StudentData[0]["p2regNo"]}</p>
      <p className="text-lg text-gray-600">Section: {StudentData[0]["p2section"]}</p>
      </div>
      {/* Add other details for the second student here */}
    </div>
  )}

  {/* Third Card - Guide */}
  <div className="group">

<div className=" h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

    <div className="inset-0"> 


 <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80">
  <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
    <h1 className="text-2xl font-bold text-center">Guide Details</h1>
  </div>
  <img
    src={getDirectLinkFromShareableLink(guideImg)}
    alt="Profile"
    className="w-32 h-32 rounded-full mx-auto mb-4"
  />
  <div className="p-4">
    <p className="text-lg text-gray-600 text-center">Name: {StudentData[0]["selectedGuide"]}</p>
    <p className="text-lg text-gray-600 text-center">Email: {StudentData[0]["selectedGuideMailId"]}</p>
    <a className="underline mt-2 text-sm text-blue-600 ">View Problem Statements</a>
  </div>
</div>
</div>

<div className="absolute inset-0 rounded-xl bg-white [transform:rotateY(180deg)] [backface-visibility:hidden]">





                            



                <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80 ">
                    <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
                        <h1 className="text-2xl font-bold text-center">Problem Statements</h1>
                    </div>
                    <div className="px-4 overflow-y-scroll max-h-64">
                    <div
                    className=" min-h-12 h-auto md:px-8 my-4 w-full ">
                    {problemStatements.length>0 ?
                        (problemStatements.map((item, index) =>{
                            return(
                            <p className="p-2 font-semibold capitalize">{parseInt(index)+1} . {item}</p>
                            )
                        }))
                        :
                        (
                          <p className="p-2 text-3xl capitalize font-bold">No Problem Statements To Show!</p>
                        )
                    }

                    </div>


                    </div>
                    </div>






                </div>

            </div>

        </div>


</div>
</div>

<div className="mx-4 bg-white rounded-xl shadow-xl mb-4 overflow-hidden">
        <h1 className="bg-[#9e1c3f] text-white p-4 rounded-t-xl mb-4 font-semibold">Project Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mx-2">
          {/* Title */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Title:</label>
            <input
              type="text"
              name="projectTitle"
              value={isEditable ? editedProjectDetails.projectTitle : projectDetails[0]['projectTitle']}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              style={{ backgroundColor: '#f0f0f0', color: '#333' }}
              readOnly={!isEditable}
            />
          </div>

          {/* Domain */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Domain:</label>
            <input
              type="text"
              name="projectDomain"
              value={isEditable ? editedProjectDetails.projectDomain : projectDetails[0]['projectDomain']}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              style={{ backgroundColor: '#f0f0f0', color: '#333' }}
              readOnly={!isEditable}
            />
          </div>
        </div>

        {/* Description */}
        <div className="py-4 mx-2">
          <label className="block text-lg font-semibold text-gray-700">Description:</label>
          <textarea
            name="projectDesc"
            value={isEditable ? editedProjectDetails.projectDesc : projectDetails[0]['projectDesc']}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 h-36"
            style={{ backgroundColor: '#f0f0f0', color: '#333' }}
            readOnly={!isEditable}
          />
        </div>
        <br></br>

        {editProjectDetails ? (
          <div className="flex justify-center space-x-4 mb-4">
            <button onClick={toggleEdit} className="bg-blue-500 text-white px-4  py-3 rounded focus:outline-none">
              {isEditable ? 'Cancel' : 'Edit'}
            </button>
            {isEditable && !isSubmitting && (
              <button onClick={handleUpdateProjectDetails} className="bg-blue-500 text-white p-2 rounded focus:outline-none">
                Submit
              </button>
            )}
          </div>
        ) : (
          <p></p>
        )}
      </div>


{/* <div>
      {StudentData[0].editProjectDetails ? (
        <div className="mx-4 bg-white rounded-xl shadow-xl mb-4 overflow-hidden">
          <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded focus:outline-none">
            Submit
          </button>
        </div>
      ) : (
        <button onClick={handleEditClick} className="bg-blue-500 text-white p-2 rounded focus:outline-none">
          Edit Project Details
        </button>
      )}
    </div> */}

<div className="mx-4 bg-white rounded-xl shadow-xl mb-4 overflow-hidden">
  <h1 className="bg-[#9e1c3f] text-white p-4 rounded-t-xl mb-4 font-semibold">Project Status</h1>
  
  <h1 className="text-3xl font-bold text-gray-800 mb-4 my-2 mx-3">Guide  Approval status</h1>

 <div className="flex flex-col md:flex-row md:items-start md:gap-4 mx-3">
    {/* Guide Approval */}
    <button
      onClick={() => toggleStatus("guideApproval")}
      className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${projectStatus.guideApproval ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
      Guide Approval
    </button>

    {/* Documentation */}
    <button
      onClick={() => toggleStatus("documentation")}
      className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${projectStatus.documentation ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
      Documentation
    </button>

    {/* PPT */}
    <button
      onClick={() => toggleStatus("ppt")}
      className={`text-lg font-bold p-2 rounded ${projectStatus.ppt ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
      PPT
    </button>
  </div>
  <div>
  <h1 className="text-3xl font-bold text-gray-800 mb-4 my-2 mx-3">Research paper status</h1>
  <div className="flex flex-col md:flex-row md:items-start md:gap-4 mx-3 my-3">
    {/* Approval */}
    <button
      onClick={() => toggleStatus("researchPaper")}
      className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${projectStatus.researchPaper.approval ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
      Approval
    </button>

    {/* Communicated */}
    <button
      onClick={() => toggleStatus("researchPaper")}
      className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${projectStatus.researchPaper.communicated ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
      Communicated
    </button>

    {/* Accepted */}
    <button
      onClick={() => toggleStatus("researchPaper")}
      className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${projectStatus.researchPaper.accepted ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
      Accepted
    </button>

    {/* Payment */}
    <button
      onClick={() => toggleStatus("researchPaper")}
      className={`text-lg font-bold p-2 rounded mb-2 md:mb-0 ${projectStatus.researchPaper.payment ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
    >
      Payment
    </button>
  </div>
  </div>
</div>





<div className="mx-4 bg-white rounded-xl shadow-xl mb-4 overflow-hidden">
      <h1 className="bg-[#9e1c3f] text-white p-4 rounded-t-xl mb-4 font-semibold">Project Submissions</h1>
      <div className="flex flex-col gap-4 m-4 md:flex-row md:items-center">
        <div className="mb-4 md:flex md:items-center flex-grow">
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-2"><b>PPT document</b></h4>
            <div className="flex space-x-4 items-center">
            {documentation[0]["ppt"] === null || documentation[0]["ppt"] === "" ?( <input
                type="file"
                accept=".ppt, .pptx"
                onChange={(e) => {setProjectPPTFile(e.target.files[0])}}
                className="w-full p-2 border rounded focus:outline-none focus:border-red-500 bg-[#9e1c3f] text-white"
              />):(<p></p>)}
            </div>
            <br></br>
            {documentation[0]["ppt"] === null || documentation[0]["ppt"] === "" ? (
              <button
          onClick={sendPptFile}
          className="p-3 mb-2 mx-2 bg-[#977e3d] text-white rounded transition duration-300 w-full md:w-auto"
        >
          Upload
        </button>
              ) : 
              <button
              onClick={() => window.open(documentation[0]["ppt"], '_blank')}
              className="p-3 mb-2 mx-2 bg-[#C08261] text-white rounded transition duration-300 w-full md:w-auto"
            >
              Open PPT
            </button>
           }
        {/* <p>{documentation.documentation}</p> */}
          </div>
        </div>
        <div className="mb-4 md:flex md:items-center flex-grow">
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-2"><b>Project document</b></h4>
            <div className="flex space-x-4 items-center">
            {documentation[0]["documentation"]=== null ||  documentation[0]["documentation"] === ""? (<input
                type="file"
                accept=".doc, .docx, .pdf"
                onChange={(e) => {setProjectDocFile(e.target.files[0])}}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 bg-[#9e1c3f] text-white"
              />):(<p></p>)}
            </div>
            <br></br>
            {documentation[0]["documentation"]=== null ||  documentation[0]["documentation"] === ""? (
            <button
            onClick={sendDocFile}
          className="p-3 mb-2 mx-2 bg-[#977e3d] text-white rounded transition duration-300 w-full md:w-auto"
        >
          Upload
        </button>
              ) : 
              <button
              onClick={() => window.open(documentation[0]["documentation"], '_blank')}
              className="p-3 mb-2 mx-2 bg-[#C08261] text-white rounded transition duration-300 w-full md:w-auto"
            >
              Open Document
            </button>
           }
          </div>
        </div>
        <div className="mb-4 md:flex md:items-center flex-grow">
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-2"><b>Research paper document 
              </b></h4>
              {/* {documentation[0]["researchPaper"]} */}
            <div className="flex space-x-4 items-center">
            {documentation[0]["researchPaper"] === null || documentation[0]["researchPaper"] === ""? (<input
                type="file"
                accept=".pdf"
                onChange={(e) => {setResearchPaperFile(e.target.files[0])}}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 bg-[#9e1c3f] text-white"
              />):(<p></p>)}
            </div>
            <br></br>
            {documentation[0]["researchPaper"] === null || documentation[0]["researchPaper"] === ""? (
            <button
           onClick={sendRspaperFile}
          className="p-3 mb-2 mx-2 bg-[#977e3d] text-white rounded transition duration-300 w-full md:w-auto"
        >
         Upload
        </button>
              ) : 
              <button
              onClick={() => window.open(documentation[0]["researchPaper"], '_blank')}
              className="p-3 mb-2 mx-2 bg-[#C08261] text-white rounded transition duration-300 w-full md:w-auto"
            >
              Open Research Paper
            </button>
            
           }
          </div>
        </div>
      </div>
      <div className="flex justify-center">
       
      </div>
    </div>



    <div className="mx-4 bg-white rounded-xl shadow-xl mb-4 ">
      <h1 className="bg-[#9e1c3f] text-white p-4 rounded-t-xl mb-4 font-semibold">Guide Comments</h1>
      <div className="overflow-auto m-2 max-h-60"> {/* Adjust max height as needed */}
        {guideComments[0] ? (
          guideComments.map((comment, index) => {
            const date = Object.keys(comment)[0];
            const text = comment[date];
            return (
              <div className="bg-gray-200 p-3 rounded mb-2" key={index}>
                <p className="text-sm text-gray-600">Date: {date}</p>
                <p className="text-base text-gray-800">Comment: {text}</p>
              </div>
            );
          })
        ) : (
          <p className="p-4 flex justify-center">No comments yet</p>
        )}
      </div>
    </div>



      </div>
      </>
  
  );
}


export default Dashboard;
