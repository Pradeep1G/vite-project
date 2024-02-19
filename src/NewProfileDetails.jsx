import { useState } from "react";

import tick_mark from "./assets/svgs/tick_mark.svg";
import cross_mark from "./assets/svgs/cross_mark.png";
import link from "./assets/svgs/link.svg";

import hum_berger from "./assets/svgs/hum_berger.svg";

import home from "./assets/svgs/home.svg";
import log_out from "./assets/svgs/log_out.svg";

import back_arrow from "./assets/svgs/back_arrow.svg";

export const NewProfileDetails = () => {
  const [open, setOpen] = useState(false);

  const [projectDetails, setProjectDetails] = useState({
    team: true,
    projectId: "CSE-25-0000",
    projectTitle: "Guide selection portal",
    projectDomain: "Web technology",
    studentOneImg:
      "https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-vector-illustration-graphic-design-135443492.jpg",
    studentOneRegNo: "41000001",
    studentOneSection: "A1",
    studentOneName: "Student one name",
    studentTwoImg:
      "https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-vector-illustration-graphic-design-135443492.jpg",
    studentTwoRegNo: "41000002",
    studentTwoSection: "B1",
    studentTwoName: "Student two name",
  });

  const [projectMarks, setProjectMarks] = useState({
    studentOneMarks: "",
    studentTwoMarks: "",
  });

  const [links, setLinks] = useState({
    documentation: "#",
    ppt: "#",
    researchPaper: "#",
  });

  const [documentation, setDocumentation] = useState("notYetValidated");
  const [ppt, setPpt] = useState("notYetValidated");
  const [researchPaper, setResearchPaper] = useState("notYetValidated");
  const [guideApproval, setGuideApproval] = useState("notYetValidated");

  const [isChecked, setIsChecked] = useState({
    communicated: false,
    accepted: false,
    paymentDone: false,
  });

  const [comments, setComments] = useState({
    prevComments: "previous comments here",
    addComments: "",
  });

  const handleAddComments = (eve) => {
    (prev) =>
      setComments({
        ...prev,
        [eve.target.name]: eve.target.value,
      });
    console.log(comments.addComments);
    // console.log(eve.target.value);
    // console.log(eve.target.name, eve.target.value);
  };

  const handleProjectMarks = (eve) => {
    (prev) =>
      setProjectMarks({
        ...prev,
        [eve.target.name]: [eve.target.value],
      });
    // console.log(eve.target.name, eve.target.value);
  };

  const handleFinalSubmit = () => {};

  return (
    <>
      <header className="h-fit bg-[#831238] flex items-center justify-between px-16">
        <div className="flex justify-center items-center sm:max-md:justify-self-start ">
          <a href="#">
            <img
              className="h-12 my-3 float-start"
              src="https://erp.sathyabama.ac.in/assets/images/sathyabama_header-logo-A++.jpg"
              alt="logo"
            />
          </a>
        </div>

        <div
          className="relative flex items-center space-x-2 cursor-pointer"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <img
            className="h-auto w-9 rounded-full"
            src="https://sathyabama-erp-s3.s3.ap-south-1.amazonaws.com/admission/profile/606036-1706720845384-ErpUpload.png"
            alt="Faculty"
          />
          <div className="hidden md:flex md:items-center md:justify-center relative">
            <h3 className="text-white">SHIVA KUMAR VANAMALA</h3>
            &nbsp;&nbsp;&nbsp;
            <span
              className="rounded-full flex items-center justify-center"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <svg
                className="h-5 w-5 text-gray-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {open && (
              <div className="hidden absolute md:top-[3rem] md:right-[2px] h-[9rem] w-[10rem] bg-white text-black shadow-2xl  md:flex md:flex-col md:justify-center md:items-center md:gap-[3px] z-50">
                <div className=" w-full text-[0.8rem] text-[#6C757D] font-semibold h-1/5 bg-slate-100">
                  &nbsp;&nbsp;&nbsp; Welcome!
                </div>
                <div className="w-full flex items-center justify-center h-2/5 bg-slate-100 text-[#6C757D]  hover:bg-slate-200">
                  <a
                    href="#"
                    className="w-full flex justify-start items-center gap-1 pl-2"
                  >
                    <img className="h-4 w-4" src={home} alt="Home" />
                    Home
                  </a>
                </div>
                <div className="w-full flex justify-center items-center h-2/5 bg-slate-100 text-[#6C757D] hover:bg-slate-200">
                  <a
                    href="/"
                    className=" w-full flex justify-start items-center gap-1 pl-2"
                  >
                    <img className="h-4 w-4" src={log_out} alt="LogOut" />
                    Log Out
                  </a>
                </div>
              </div>
            )}
          </div>
          {/* HumBerger icon for sm to md*/}
          <div className="h-5 w-5 md:hidden relative">
            <img src={hum_berger} alt="HumBerger" />
          </div>
          {open && (
            <div className="absolute top-[3.75rem] right-[-20px] h-[9rem] w-[10rem] md:hidden bg-white text-black shadow-2xl  flex flex-col justify-center items-center gap-[3px] z-50 ">
              <div className=" w-full text-[0.8rem] text-[#6C757D] font-semibold h-1/5 bg-slate-100">
                &nbsp;&nbsp;&nbsp; Welcome!
              </div>
              <div className="w-full flex items-center justify-center h-2/5 bg-slate-100 text-[#6C757D]  hover:bg-slate-200">
                <a
                  href="#"
                  className="w-full flex justify-start items-center gap-1 pl-2"
                >
                  <img className="h-4 w-4" src={home} alt="Home" />
                  Home
                </a>
              </div>
              <div className="w-full flex justify-center items-center h-2/5 bg-slate-100 text-[#6C757D] hover:bg-slate-200">
                <a
                  href="/"
                  className=" w-full flex justify-start items-center gap-1 pl-2"
                >
                  <img className="h-4 w-4" src={log_out} alt="LogOut" />
                  Log Out
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
      <main
        className="w-[96%] md:w-[90%] mx-auto h-fit flex flex-col md:flex-row justify-center items-center my-4"
        onClick={() => setOpen(false)}
      >
        <div className="hidden md:fixed md:w-fit md:h-full md:left-1 md:top-[5rem] md:flex md:items-center md:justify-center md:cursor-pointer">
          <a href="/" className="w-fit h-fit">
            <img
              className="bg-slate-200 m-4 p-2 w-10 rounded-full hover:bg-slate-300 hover:shadow-md"
              src={back_arrow}
              alt="⬅️"
              title="Go back"
            ></img>
          </a>
        </div>
        <section className="w-fit h-fit flex flex-col md:flex-row justify-center items-center">
          <article className="w-fit h-fit flex flex-col justify-center items-center gap-2">
            <form className="w-fit h-fit flex flex-col justify-center items-center rounded bg-[#f4eeee] ">
              <div className="w-[95vw] md:w-[35vw] h-[20vh] flex flex-col justify-center items-center">
                <span className="w-full flex justify-center items-center text-xl font-medium">
                  {projectDetails.projectId}
                </span>
                <br />
                <span className="w-full flex justify-center items-center capitalize text-xl font-semibold">
                  {projectDetails.projectTitle}
                </span>
                <br />
                <span className="w-full flex justify-center items-center capitalize text-xl font-[400]">
                  {projectDetails.projectDomain}
                </span>
              </div>
              <div className="w-full h-[50vh] flex justify-center items-center gap-2 border-y-2 border-y-white">
                <div
                  className={`${
                    projectDetails.team ? "w-1/2" : "w-full"
                  }${" "}${"h-full flex flex-col justify-center items-center border-r-2 border-r-white"}`}
                >
                  <img
                    src={projectDetails.studentOneImg}
                    alt="Student1"
                    className="w-[10rem] rounded-full border border-black p-1"
                  />
                  <br />
                  <div className="w-full h-[20vh] flex flex-col items-center justify-center">
                    <span className="w-full m-auto text-center break-before-all text-xl font-medium">
                      {projectDetails.studentOneRegNo}
                    </span>
                    <span className="w-full m-auto text-center break-before-all text-xl font-medium">
                      {projectDetails.studentOneSection}
                    </span>
                    <span className="w-full m-auto text-center break-before-all text-xl font-bold capitalize">
                      {projectDetails.studentOneName}
                    </span>
                  </div>
                </div>
                {projectDetails.team && (
                  <div
                    className={`${
                      projectDetails.team ? "w-1/2" : "w-full"
                    }${" "}${"h-full flex flex-col justify-center items-center"}`}
                  >
                    <img
                      src={projectDetails.studentTwoImg}
                      alt="Student1"
                      className="w-[10rem] rounded-full border border-black p-1"
                    />
                    <br />
                    <div className="w-full h-[20vh] flex flex-col items-center justify-center">
                      <span className="w-full m-auto text-center break-before-all text-xl font-medium">
                        {projectDetails.studentTwoRegNo}
                      </span>
                      <span className="w-full m-auto text-center break-before-all text-xl font-medium">
                        {projectDetails.studentTwoSection}
                      </span>
                      <span className="w-full m-auto text-center break-before-all text-xl font-bold capitalize">
                        {projectDetails.studentTwoName}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full h-fit mt-2 flex justify-center items-center">
                <a
                  href="/staff_dashboard/profile_details/team_profile"
                  className="w-[90%] h-[2.5rem] mb-3 flex items-center justify-center bg-[#d06a0f] rounded-md font-semibold text-white hover:scale-[1.01] active:scale-[0.99] hover:shadow-[0px_0px_10px_gray] "
                >
                  Team Profile
                </a>
              </div>
            </form>
            <form className="w-fit h-fit flex flex-col justify-center items-center rounded-md gap-2 mt-2">
              <div className="w-[95vw] md:w-[35vw] h-[4rem] text-xl font-medium text-white flex justify-center items-center bg-[#890632d7] ">
                Project Marks
              </div>
              <div className="w-full h-[25vh] flex justify-center items-center gap-1">
                <div
                  className={`${
                    projectDetails.team ? "w-1/2" : "w-full"
                  }${" "}${"h-full flex flex-col justify-center items-center bg-[#e2e8f0] "}`}
                >
                  <div className="w-full h-1/2 flex justify-center items-center break-before-all text-lg font-semibold ">
                    {projectDetails.studentOneRegNo}
                  </div>
                  <div className="mb-5 w-full h-1/2 flex flex-col justify-center items-center break-before-all">
                    <div>
                      <label htmlFor="studentOneMarks" className="font-normal">
                        Enter Marks : &nbsp;
                      </label>
                      <input
                        className="text-center"
                        placeholder="Marks"
                        type="number"
                        id="studentOneMarks"
                        name="studentOneMarks"
                        defaultValue={projectMarks.studentOneMarks}
                        onChange={(eve) => handleProjectMarks(eve)}
                        required
                        style={{
                          WebkitAppearance: "none" /* for Safari */,
                          MozAppearance: "textfield" /* for Firefox */,
                          appearance: "none" /* for other modern browsers */,
                        }}
                        min="0"
                        max="15"
                        maxLength="2"
                      />
                    </div>
                    <span className="font-normal "> &#40;Out of 15&#41;</span>
                  </div>
                </div>
                {projectDetails.team && (
                  <div
                    className={`${
                      projectDetails.team ? "w-1/2" : "w-full"
                    }${" "}${"h-full flex flex-col justify-center items-center bg-[#e2e8f0] "}`}
                  >
                    <div className="w-full h-1/2 flex justify-center items-center break-before-all text-lg font-semibold ">
                      {projectDetails.studentTwoRegNo}
                    </div>
                    <div className="mb-5 w-full h-1/2 flex flex-col justify-center items-center break-before-all">
                      <div>
                        <label
                          htmlFor="studentTwoMarks"
                          className="font-normal"
                        >
                          Enter Marks : &nbsp;
                        </label>
                        <input
                          className="text-center"
                          placeholder="Marks"
                          type="number"
                          id="studentTwoMarks"
                          name="studentTwoMarks"
                          defaultValue={projectMarks.studentTwoMarks}
                          onChange={(eve) => handleProjectMarks(eve)}
                          required
                          style={{
                            WebkitAppearance: "none" /* for Safari */,
                            MozAppearance: "textfield" /* for Firefox */,
                            appearance: "none" /* for other modern browsers */,
                          }}
                          min="0"
                          max="15"
                          maxLength="2"
                        />
                      </div>
                      <span className="font-normal"> &#40;Out of 15&#41;</span>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </article>
        </section>
        <section className="w-fit h-fit flex flex-col  justify-center items-center">
          <article className="w-[96vw] md:w-[55vw] flex flex-col md:flex-row justify-center items-center gap-1 ">
            <form className="flex flex-col justify-center items-center mt-4 ">
              <div className="w-[95vw] md:w-[17.5vw] h-[5rem] text-xl font-medium text-white flex justify-center items-center bg-[#890632d7] mb-1">
                Project Status
              </div>
              <div className=" w-[95vw] md:w-[17.5vw] h-fit bg-slate-200 flex flex-col justify-evenly items-center border-b-2 border-b-white">
                <div className="text-[#831238] w-[95vw] md:w-[17.5vw] h-[5rem] text-xl flex items-center justify-center font-medium gap-2">
                  <a
                    href={links.documentation}
                    className="flex items-center gap-1"
                    title="Open Drive link"
                  >
                    <h3 className="hover:text-blue-800 hover:underline cursor-pointer">
                      Documentation
                    </h3>
                    <img src={link} alt="link" className="h-3 w-3" />
                  </a>
                  {documentation === true && (
                    <img src={tick_mark} className="h-6 w-6" />
                  )}
                  {documentation === false && (
                    <img src={cross_mark} className="h-6 w-6" />
                  )}
                </div>
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setDocumentation(true)}
                    className="bg-green-500 w-24 h-10 rounded-3xl text-white font-medium hover:shadow-[0px_0px_10px_gray] hover:scale-105"
                    style={{
                      boxShadow:
                        documentation === true
                          ? "0 0 10px rgba(0, 0, 0, 0.8)"
                          : "none",
                      backgroundColor: documentation === false ? "gray" : "",
                    }}
                  >
                    {documentation === true ? "Approved" : "Approve"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDocumentation(false)}
                    className="bg-red-500 w-24 h-10 rounded-3xl text-white font-medium hover:shadow-[0px_0px_10px_gray] hover:scale-105"
                    style={{
                      boxShadow:
                        documentation === false
                          ? "0 0 10px rgba(0, 0, 0, 0.8)"
                          : "none",
                      backgroundColor: documentation === true ? "gray" : "",
                    }}
                  >
                    {documentation === false ? "Rejected" : "Reject"}
                  </button>
                </div>
              </div>
              <div className=" w-[95vw] md:w-[17.5vw] h-fit bg-slate-200 flex flex-col justify-evenly items-center">
                <div className="text-[#831238]  w-[95vw] md:w-[17.5vw] h-[5rem] text-xl flex items-center justify-center font-medium gap-2">
                  <a
                    href={links.ppt}
                    className="flex items-center gap-1"
                    title="Open Drive link"
                  >
                    <h3 className="hover:text-blue-800 hover:underline cursor-pointer">
                      PPT
                    </h3>
                    <img src={link} alt="link" className="h-3 w-3" />
                  </a>
                  {ppt === true && <img src={tick_mark} className="h-6 w-6" />}
                  {ppt === false && (
                    <img src={cross_mark} className="h-6 w-6" />
                  )}
                </div>
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setPpt(true)}
                    className="bg-green-500 w-24 h-10 rounded-3xl text-white font-medium hover:shadow-[0px_0px_10px_gray] hover:scale-105"
                    style={{
                      boxShadow:
                        ppt === true ? "0 0 10px rgba(0, 0, 0, 0.8)" : "none",
                      backgroundColor: ppt === false ? "gray" : "",
                    }}
                  >
                    {ppt === true ? "Approved" : "Approve"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPpt(false)}
                    className="bg-red-500 w-24 h-10 rounded-3xl text-white font-medium hover:shadow-[0px_0px_10px_gray] hover:scale-105"
                    style={{
                      boxShadow:
                        ppt === false ? "0 0 10px rgba(0, 0, 0, 0.8)" : "none",
                      backgroundColor: ppt === true ? "gray" : "",
                    }}
                  >
                    {ppt === false ? "Rejected" : "Reject"}
                  </button>
                </div>
              </div>
            </form>
            <form className="flex flex-col justify-center items-center mt-4 ">
              <div className="w-[95vw] md:w-[17.5vw] h-[5rem] text-xl font-medium text-white flex justify-center items-center bg-[#890632d7] mb-1 ">
                Research
              </div>
              <div className=" w-[95vw] md:w-[17.5vw] h-fit bg-slate-200 flex flex-col justify-evenly items-center">
                <div className="text-[#831238]  w-[95vw] md:w-[17.5vw] h-[5rem] text-xl flex items-center justify-center font-medium gap-2">
                  <a
                    href={links.researchPaper}
                    className="flex items-center gap-1"
                    title="Open Drive link"
                  >
                    <h3 className="hover:text-blue-800 hover:underline cursor-pointer">
                      Research Paper
                    </h3>
                    <img src={link} alt="link" className="h-3 w-3" />
                  </a>
                  {researchPaper === true && (
                    <img src={tick_mark} className="h-6 w-6" />
                  )}
                  {researchPaper === false && (
                    <img src={cross_mark} className="h-6 w-6" />
                  )}
                </div>
                <ul className="flex flex-col gap-4 mb-8">
                  <li className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked={isChecked.communicated}
                      id="communicated"
                      name="communicated"
                      className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                    <label
                      htmlFor="communicated"
                      className="cursor-pointer font-medium"
                      onClick={(prev) =>
                        setIsChecked({
                          ...prev,
                          communicated: !prev.communicated,
                        })
                      }
                    >
                      Communicated
                    </label>
                  </li>
                  <li className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked={isChecked.accepted}
                      id="accepted"
                      name="accepted"
                      className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                    <label
                      htmlFor="accepted"
                      className="cursor-pointer font-medium"
                      onClick={(prev) =>
                        setIsChecked({
                          ...prev,
                          accepted: !prev.accepted,
                        })
                      }
                    >
                      Accepted
                    </label>
                  </li>
                  <li className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked={isChecked.paymentDone}
                      id="paymentDone"
                      name="paymentDone"
                      className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                    <label
                      htmlFor="paymentDone"
                      className="cursor-pointer font-medium"
                      onClick={(prev) =>
                        setIsChecked({
                          ...prev,
                          paymentDone: !prev.paymentDone,
                        })
                      }
                    >
                      Payment Done
                    </label>
                  </li>
                </ul>
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setResearchPaper(true)}
                    className="bg-green-500 w-24 h-10 rounded-3xl text-white font-medium hover:shadow-[0px_0px_10px_gray] hover:scale-105"
                    style={{
                      boxShadow:
                        researchPaper === true
                          ? "0 0 10px rgba(0, 0, 0, 0.8)"
                          : "none",
                      backgroundColor: researchPaper === false ? "gray" : "",
                    }}
                  >
                    {researchPaper === true ? "Approved" : "Approve"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setResearchPaper(false)}
                    className="bg-red-500 w-24 h-10 rounded-3xl text-white font-medium hover:shadow-[0px_0px_10px_gray] hover:scale-105"
                    style={{
                      boxShadow:
                        researchPaper === false
                          ? "0 0 10px rgba(0, 0, 0, 0.8)"
                          : "none",
                      backgroundColor: researchPaper === true ? "gray" : "",
                    }}
                  >
                    {researchPaper === false ? "Rejected" : "Reject"}
                  </button>
                </div>
              </div>
            </form>
            <form className="flex flex-col justify-center items-center mt-4 bg-slate-200 ">
              <div className="w-[95vw] md:w-[17.5vw] h-[5.25rem] text-xl font-medium text-white flex justify-center items-center bg-[#890632d7] mb-0 border-b-4 border-b-white ">
                Approval
              </div>
              <div className="w-full md:h-[36.5vh] flex flex-col justify-evenly items-center ">
                <div className="text-[#831238]  w-[95vw] md:w-[17.5vw] h-[5rem] text-xl flex items-center justify-center font-medium gap-2">
                  <h3>Guide Approval</h3>
                  {guideApproval === true && (
                    <img src={tick_mark} className="h-6 w-6" />
                  )}
                  {guideApproval === false && (
                    <img src={cross_mark} className="h-6 w-6" />
                  )}
                </div>
                <div className="flex gap-4 my-4">
                  <button
                    type="button"
                    onClick={() => setGuideApproval(true)}
                    className="bg-green-500 w-24 h-10 rounded-3xl text-white font-medium hover:shadow-[0px_0px_10px_gray] hover:scale-105"
                    style={{
                      boxShadow:
                        guideApproval === true
                          ? "0 0 10px rgba(0, 0, 0, 0.8)"
                          : "none",
                      backgroundColor: guideApproval === false ? "gray" : "",
                    }}
                  >
                    {guideApproval === true ? "Approved" : "Approve"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setGuideApproval(false)}
                    className="bg-red-500 w-24 h-10 rounded-3xl text-white font-medium hover:shadow-[0px_0px_10px_gray] hover:scale-105"
                    style={{
                      boxShadow:
                        guideApproval === false
                          ? "0 0 10px rgba(0, 0, 0, 0.8)"
                          : "none",
                      backgroundColor: guideApproval === true ? "gray" : "",
                    }}
                  >
                    {guideApproval === false ? "Rejected" : "Reject"}
                  </button>
                </div>
              </div>
              {/* <div className="md:hidden w-full flex items-center justify-center mb-3 ">
                <a
                  href="#addComments"
                  className="bg-orange-500 w-[8rem] h-10 rounded-3xl text-white font-medium flex justify-center items-center hover:shadow-[0px_0px_10px_gray] hover:scale-105 transition-transform"
                >
                  Comments&nbsp;
                  <span className="text-2xl font-bold">&darr;</span>
                </a>
              </div> */}
            </form>
          </article>
          <article className="w-[96vw] md:w-[55vw] flex flex-col justify-center items-center mt-4 ">
            <div className="w-full md:w-[96%] h-[4rem] text-xl font-medium text-white flex justify-center items-center bg-[#890632d7] ">
              Comments
            </div>
            <form className="flex flex-col justify-center items-center mt-2 bg-[#e2e8f0] w-full md:w-[96%] ">
              <label
                htmlFor="prevComments"
                className=" w-full h-[4rem] text-xl font-medium flex justify-start items-center text-[#831238] pl-2 "
              >
                Previous comments
              </label>
              <textarea
                className="w-[99%] h-[7.85rem] rounded-lg p-2 mb-1 text-lg border-2 border-gray-400 outline-none whitespace-pre-wrap"
                id="prevComments"
                name="prevComments"
                placeholder="Previous Comments"
                readOnly
                defaultValue={comments.prevComments}
                style={{ resize: "none" }}
              ></textarea>
            </form>
            <form className="flex flex-col justify-center items-center mt-0 border-t-4 border-t-white bg-[#e2e8f0] w-full md:w-[96%] ">
              <label
                htmlFor="addComments"
                className=" w-full h-[4rem] text-xl font-medium flex justify-start items-center text-[#831238] pl-2 "
              >
                Add comments
              </label>
              <textarea
                className="w-[99%] h-[7.85rem] rounded-lg p-2 mb-1 text-lg border-2 border-gray-400 outline-none focus:border-1 focus:border-black  whitespace-pre-wrap"
                id="addComments"
                name="addComments"
                placeholder="Add Comments here"
                defaultValue={comments.addComments}
                onChange={(eve) => handleAddComments(eve)}
                style={{ resize: "none" }}
              ></textarea>
            </form>
          </article>
        </section>
      </main>
      <section
        className="w-[96%] md:w-[90%] mx-auto h-fit flex flex-col md:flex-row justify-center items-center my-4"
        onClick={() => setOpen(false)}
      >
        <button
          className="bg-blue-600 w-24 h-10 rounded-3xl text-white font-medium mb-1 hover:shadow-[0px_0px_10px_gray] hover:scale-105"
          onClick={handleFinalSubmit}
        >
          Submit
        </button>
      </section>
      <footer className="w-[99vw] h-8 bg-slate-100 text-black text-center ">
        &copy; {new Date().getFullYear()} Sathyabama University. All rights
        reserved.
      </footer>
    </>
  );
};
