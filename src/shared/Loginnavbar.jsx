import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi'; // Assuming you want to use the Feather icon pack

import sistlogologin from '../assets/sistlogologin.png';

const Loginnavbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-[#9e1c3f] p-10 py-5">
        <div className="flex items-center">
          <a href="/">
            <img
              src={sistlogologin}
              alt="Logo"
              className="object-scale-down h-35 w-80 px-3 pt-3"
            />
          </a>
        </div>
        <div className={`lg:flex items-center space-x-10 text-white ${showMenu ? 'hidden' : 'hidden'}`}>
          <a className="" href="/login">Student Login</a>
          <a className="" href="/stafflogin">Staff Login</a>
          <a className="" href="/">About</a>
        </div>
        <div className="lg:hidden flex items-center">
          <button
            onClick={handleMenuToggle}
            className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#9e1c3f] focus:ring-white"
          >
            <FiMenu size={36} />
          </button>
        </div>
      </nav>
      {showMenu && (
        <div className="lg:hidden flex flex-col items-center bg-[#9e1c3f] text-white">
          <a className="py-3" href="/login">Student Login</a>
          <a className="py-3" href="/stafflogin">Staff Login</a>
          <a className="py-3" href="/">About</a>
        </div>
      )}
    </>
  );
};

export default Loginnavbar;
