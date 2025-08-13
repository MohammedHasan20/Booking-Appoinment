import React, { useContext, useState } from 'react';
import Logo from '../assets/assets_frontend/logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import Profilepic from '../assets/assets_frontend/profile_pic.png'
import dropdown from '../assets/assets_frontend/dropdown_icon.svg'
import { assets } from '../assets/assets_frontend/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'py-1 text-blue-600 font-bold border-b-2 border-blue-600'
      : 'py-1 hover:text-blue-600';

  const navigate = useNavigate();

  const { token, setToken, userData } = useContext(AppContext)

  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img onClick={() => { navigate('/'); scrollTo(0, 0) }} className="w-44 cursor-pointer" src={Logo} alt="Logo" />

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <li>
          <NavLink to="/" className={navLinkClass}>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/doctors" className={navLinkClass}>
            ALL DOCTORS
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={navLinkClass}>
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={navLinkClass}>
            CONTACT
          </NavLink>
        </li>
      </ul>

      <div className='flex items-center'>
        {
          token && userData ? <div className='flex items-center gap-2 cursor-pointer group relative '>
            <img src={userData.image} alt="" className='w-8 h-8 rounded-full object-cover' />
            <img src={dropdown} alt="" className='w-2.5' />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex-col gap-4 p-4 space-y-2 '>
                <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
            : <button onClick={() => {
              navigate('/login')
            }} className="bg-blue-600 text-white px-8 py-3 rounded-full  hover:bg-blue-700 transition hidden md:block">
              Create Account
            </button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
        {/*---------------Mobile menu------------------ */}
        <div className={`${showMenu ? "fixed w-full" : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between  px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5  px-5 text-lg font-medium'>
            <NavLink className={({ isActive }) => `px-4 py-2 rounded inline-block relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'text-blue-600 font-bold after:w-full' : ''}`} onClick={() => setShowMenu(false)} to='/'>Home</NavLink>
            <NavLink className={({ isActive }) => `px-4 py-2 rounded inline-block relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'text-blue-600 font-bold after:w-full' : ''}`} onClick={() => setShowMenu(false)} to='/doctors'>All DOCTORS</NavLink>
            <NavLink className={({ isActive }) => `px-4 py-2 rounded inline-block relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'text-blue-600 font-bold after:w-full' : ''}`} onClick={() => setShowMenu(false)} to='/about'>ABOUT</NavLink>
            <NavLink className={({ isActive }) => `px-4 py-2 rounded inline-block relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'text-blue-600 font-bold after:w-full' : ''}`} onClick={() => setShowMenu(false)} to='/contact'>CONTACT</NavLink>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
