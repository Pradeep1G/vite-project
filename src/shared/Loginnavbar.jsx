import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import sistlogologin from '../assets/sistlogologin.png';

const Loginnavbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="flex items-center justify-between bg-[#9e1c3f] py-2 px-4">
      <div className="flex items-center">
        <a href="/">
          <img
            src={sistlogologin}
            alt="Logo"
            className="object-scale-down h-20 w-60 pl-4 py-0" 
          />
        </a>
      </div>
      <div className={`lg:flex items-center space-x-4 text-white ${showMenu ? 'hidden' : ''}`}>
        <a href="/login">Student Login</a>
        <a href="/stafflogin">Staff Login</a>
        <a href="/">Guide lines</a>
      </div>
      <div className="lg:hidden flex items-center">
        <button
          onClick={handleMenuToggle}
          className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#9e1c3f] focus:ring-white"
        >
          <FiMenu size={24} />
        </button>
      </div>
      <div className={`lg:hidden flex flex-col items-center bg-[#9e1c3f] text-white ${showMenu ? '' : 'hidden'}`}>
        <a className="font-semibold" href="/login">Student Login</a>
        <a className="font-semibold" href="/stafflogin">Staff Login</a>
        <a className="font-semibold" href="/">Guide Lines</a>
      </div>
    </nav>
  );
};

export default Loginnavbar;
