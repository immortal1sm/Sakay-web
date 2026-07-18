import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HelpCircle, Menu, X, Shield, MessageSquare, LogOut, User, ChevronDown, LayoutDashboard } from 'lucide-react'; 
import HelpModal from '../modals/help.jsx';
import SafetyTipsModal from '../modals/safetyTips.jsx';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import logo from '../assets/logo/logo.png';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isSafetyTipsOpen, setIsSafetyTipsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Download', path: '/download' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Dark mode detection for Swal
  const getSwalDarkMode = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('sakay-theme');
    const effective = storedTheme !== null ? storedTheme : (prefersDark ? 'dark' : 'light');
    return effective === 'dark';
  };

  const getUserInitials = () => {
    if (!user || !user.fullName) return '?';
    const names = user.fullName.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const isUserDark = getSwalDarkMode();
    const result = await Swal.fire({
      title: `<span style="color: ${isUserDark ? '#4ade80' : '#2E7D32'}">Are you sure?</span>`,
      text: 'Do you want to logout from SakayNE?',
      icon: 'question',
      iconColor: '#FF4B4B',
      showCancelButton: true,
      confirmButtonColor: isUserDark ? '#dc2626' : '#FF4B4B',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel',
      background: isUserDark ? '#1f2937' : '#ffffff',
      color: isUserDark ? '#f3f4f6' : '#374151',
      backdrop: `rgba(0,0,0,0.4)`,
      customClass: {
        popup: 'rounded-3xl',
        title: 'text-xl font-black',
        confirmButton: 'rounded-full px-6 py-2 font-bold',
        cancelButton: 'rounded-full px-6 py-2 font-bold'
      }
    });

    if (result.isConfirmed) {
      await logout();
      navigate('/login');
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] border-b backdrop-blur-md transition-colors duration-200 ${
        isDark
          ? 'bg-gray-900/95 border-gray-800'
          : 'bg-white/95 border-gray-100'
        }`}>

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center cursor-pointer">
              <img 
                src={logo} 
                alt="SakayNE Logo" 
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`text-[14px] font-bold transition-colors hover:text-grab-green ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4">
            <div className={`hidden md:flex items-center gap-4 pr-6 border-r ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>

              {/* Admin Panel Link - Only for admins */}
              {isAdmin && (
                <Link 
                  to="/admin"
                  className="flex items-center gap-2 text-[14px] font-bold text-grab-green hover:text-grab-dark transition-colors"
                >
                  <LayoutDashboard size={18} strokeWidth={2.5} />
                  <span>Admin Panel</span>
                </Link>
              )}
              
              <Link 
                to={user ? "/feedback" : "/login"}
                className={`flex items-center gap-2 text-[14px] font-bold transition-colors hover:text-grab-green ${isDark ? 'text-gray-400 hover:text-grab-green' : 'text-gray-500 hover:text-grab-green'}`}
              >
                <MessageSquare size={18} strokeWidth={2.5} />
                <span>Feedback</span>
              </Link>

              <button 
                onClick={() => setIsHelpModalOpen(true)}
                className={`flex items-center gap-2 text-[14px] font-bold transition-colors hover:text-grab-green ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              >
                <HelpCircle size={18} strokeWidth={2.5} />
                <span>Help</span>
              </button>

              <button 
                onClick={() => setIsSafetyTipsOpen(true)}
                className={`flex items-center gap-2 text-[14px] font-bold transition-colors hover:text-grab-green ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              >
                <Shield size={18} strokeWidth={2.5} />
                <span>Safety</span>
              </button>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Avatar with Dropdown */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-grab-green to-green-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {getUserInitials()}
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''} ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className={`absolute right-0 mt-3 w-72 rounded-2xl shadow-xl border overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    {/* User Info Section */}
                    <div className={`px-4 py-4 border-b ${isDark ? 'bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-100'}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-grab-green to-green-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {getUserInitials()}
                        </div>
                        <div className="flex-1">
                          <p className={`font-black text-sm ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                            {user.fullName || 'User'}
                          </p>
                          <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {user.email || 'user@sakay.com'}
                          </p>
                          {/* Show Admin Badge */}
                          {isAdmin && (
                            <span className={`inline-block mt-1 text-xs font-bold text-grab-green ${isDark ? 'bg-green-900/40' : 'bg-green-100'} px-2 py-0.5 rounded-full`}>
                              Admin
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div>
                      {/* Admin Panel Link in Dropdown */}
                      {isAdmin && (
                        <>
                          <Link
                            to="/admin"
                            onClick={() => setIsDropdownOpen(false)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}
                          >
                            <LayoutDashboard size={18} className="text-grab-green" />
                            <span className="font-medium">Admin Panel</span>
                          </Link>
                          <div className={`border-t my-1 ${isDark ? 'border-gray-700' : 'border-gray-100'}`}></div>
                        </>
                      )}
                      
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleLogout();
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isDark ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-red-50'}`}
                      >
                        <LogOut size={18} className={isDark ? 'text-red-400' : 'text-red-500'} />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className={`hidden sm:block bg-grab-green hover:bg-grab-dark text-white text-md font-black rounded-full px-8 h-12 transition-transform active:scale-95 ${isDark ? '' : 'shadow-lg shadow-green-100'}`}
              >
                Login
              </button>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 transition-colors hover:text-grab-green ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          lg:hidden absolute top-20 left-0 right-0 border-b shadow-xl transition-all duration-300 ease-in-out transform
          ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}
          ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        `}>
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className={`text-[16px] font-bold py-2 transition-colors hover:text-grab-green ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className={`border-t pt-4 mt-2 ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              {/* Admin Panel Link in Mobile Menu */}
              {isAdmin && (
                <Link 
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-[16px] font-bold text-grab-green hover:text-grab-dark py-2 transition-colors"
                >
                  <LayoutDashboard size={20} />
                  <span>Admin Panel</span>
                </Link>
              )}
              
              <Link 
                to={user ? "/feedback" : "/login"}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 text-[16px] font-bold py-2 transition-colors hover:text-grab-green ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              >
                <MessageSquare size={20} />
                <span>Feedback</span>
              </Link>
              
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsHelpModalOpen(true);
                }}
                className={`flex items-center gap-3 text-[16px] font-bold py-2 transition-colors hover:text-grab-green w-full ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              >
                <HelpCircle size={20} />
                <span>Help</span>
              </button>
              
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsSafetyTipsOpen(true);
                }}
                className={`flex items-center gap-3 text-[16px] font-bold py-2 transition-colors hover:text-grab-green w-full ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              >
                <Shield size={20} />
                <span>Safety</span>
              </button>
            </div>

            {/* Mobile User Info & Logout */}
            {user && (
              <>
                <div className={`border-t pt-4 mt-2 flex items-center gap-3 ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-grab-green to-green-600 flex items-center justify-center text-white font-bold text-sm">
                    {getUserInitials()}
                  </div>
                  <div className="flex-1">
                    <p className={`font-black text-sm ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                      {user.fullName || 'User'}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {user.email || 'user@sakay.com'}
                    </p>
                    {isAdmin && (
                      <span className={`inline-block mt-1 text-xs font-bold text-grab-green px-2 py-0.5 rounded-full ${isDark ? 'bg-green-900/40' : 'bg-green-100'}`}>
                        Admin
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-black h-14 rounded-2xl mt-2 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Modals */}
      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
      <SafetyTipsModal isOpen={isSafetyTipsOpen} onClose={() => setIsSafetyTipsOpen(false)} />
    </>
  );
};

export default TopBar;
