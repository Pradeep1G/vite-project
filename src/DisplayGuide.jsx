import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function DisplayGuide(props) {

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleButtonClick = (route,name,mailid,vacancies,empid) => {
    if (parseInt(vacancies)>0){
        localStorage.setItem("GuideName",name)
        localStorage.setItem("GuideMailId",mailid)
        localStorage.setItem("GuideId", empid)
        navigate(currentPath+"/"+route);
    }
    else{
        alert("NO VACANCIES")
    }
  };

  return (
    <>





<div className="flex flex-row justify-between border-2">
        <div className="w-1/12 flex justify-center p-5 border-x-2">
          <p>{props.key}</p>
        </div>
        <div className="w-3/12 flex justify-center p-5 border-x-2">

          <div className="flex flex-col items-center space-y-1">
            <img src={props.img+""} height={100} width={100}></img>
            <p>{props.name}</p>
            <p>Designation : {props.designation}</p>
            <p>Mail ID : {props.mailid}</p>
          </div>

        </div>
        <div className="w-5/12 flex p-5 border-x-2 ">
          <div className="pl-5">
          <ul  className="list-disc">
                    <li>{props.dm1}</li>
                    <li>{props.dm2}</li>
                    <li>{props.dm3}</li>
            </ul>
          </div>
        </div>
        <div className="w-2/12 flex flex-col items-center justify-center p-5 border-x-2 font-semibold">
          <p>{props.vacancies}</p>
        </div>
        <div className="w-2/12 flex flex-col items-center justify-center p-5 border-x-2 ">
          
          <button className="bg-red-900 text-white px-6 py-2 rounded-md my-2 text-lg" key={props.empid} onClick={() => handleButtonClick(props.empid, props.name, props.mailid, props.vacancies, props.empid)}>
          SELECT
        </button>

        </div>
      </div>








      {/* <div className="flex space-x-2 border-2 m-2">
        <h1>{props.name}</h1>
        <img src={props.img+""} height={100} width={100}></img>
                <p>No of Vacancies = {props.vacancies}</p>
                
        <button className="h-10 p-2 bg-red-600 text-black" key={props.empid} onClick={() => handleButtonClick(props.empid, props.name, props.mailid, props.vacancies, props.empid)}>
          SELECT
        </button>
      </div> */}
    </>
  );
}
