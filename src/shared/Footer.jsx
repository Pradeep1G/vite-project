import React from 'react';
import foorlogo from "../assets/sistlogologin.png"
import Email from "../assets/email.png"
import Linkedin from "../assets/linkedin.png"
import Insta from "../assets/instagram.png"
const Footer = () => {
  return (
    <footer className="bg-red-900 text-gray-200">
      <div className="container mx-auto py-4 px-8 flex items-center justify-between">
        <div className="flex items-center">
          <img src={foorlogo} alt="University Logo" className="object-scale-down h-40 w-80 mr-2" />
         
        </div>
        <div >
          <div>
            <p className="text-lg font-semibold pb-3.5">Visit us at:</p>
          </div>
       <div className='flex py-1'>
       <img src={Email} alt="" /> &nbsp;
        <p> Mail</p>
       </div>
       <div className='flex py-1'>
       <img src={Linkedin} alt="" /> &nbsp;
        <p> Linkedin</p>
       </div><div className='flex py-1'>
       <img src={Insta} alt="" /> &nbsp;
        <p> Instagram</p>
       </div>
       </div>
      </div>
      <hr className="mx-20" />
      <div className="container mx-auto py-2 px-8 text-center text-sm">
        &copy; {new Date().getFullYear()} Sathyabama University. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
