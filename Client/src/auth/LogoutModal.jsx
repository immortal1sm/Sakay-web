import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LogoutModal = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = async () => {
    await logout();
    onClose();
    navigate('/login');
  };

  return (
    <>
      {/* 1. Backdrop: Nakahiwalay para sigurado */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999998]"
        onClick={onClose}
      />

      {/* 2. Modal Card: Gamit ang top/left 50% para sigurado sa gitna */}
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[340px] z-[999999] px-4"
      >
        <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transform animate-in fade-in zoom-in duration-300">
          
          <div className="text-center space-y-4">
            <h3 className="text-[20px] font-black text-[#2E7D32] leading-tight">
              Sigurado ka bang gusto mong umalis sa <span className="text-green-600">SakayNE</span>?
            </h3>
            
            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.15em]">
              Kailangan mong mag-login ulit para makabiyahe.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-10">
            <button
              onClick={handleLogout}
              className="w-full py-4 bg-[#FF4B4B] hover:bg-red-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-red-100 transition-all active:scale-95"
            >
              Oo, Logout na
            </button>
            
            <button
              onClick={onClose}
              className="w-full py-2 text-gray-400 font-bold text-base hover:text-gray-700 transition-colors"
            >
              Huwag muna
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;