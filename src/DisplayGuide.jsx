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
      <div className="flex space-x-2 border-2 m-2">
        <h1>{props.name}</h1>
        {/* <img src={props.img+""} height={100} width={100}></img>
                <p>No of Vacancies = {props.vacancies}</p>
                <p>Designation : {props.designation}</p>
                <li>
                    <ul>{props.dm1}</ul>
                    <ul>{props.dm2}</ul>
                    <ul>{props.dm3}</ul>
                </li>
                <p>Mail ID : {props.mailid}</p> */}
        <p>{props.empid}</p>
        <button key={props.empid} onClick={() => handleButtonClick(props.empid, props.name, props.mailid, props.vacancies, props.empid)}>
          SELECT
        </button>
      </div>
    </>
  );
}
