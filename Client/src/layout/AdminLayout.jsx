// Client/src/layout/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import Swal from 'sweetalert2';
import ThemeToggle from '../components/ThemeToggle';

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#FF4B4B',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      await logout();
      window.location.href = '/login';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* === DESKTOP LAYOUT (md: 768px and up) === */}
      <div className="hidden md:block">
        {/* Fixed Sidebar - already glassmorphism, works in both modes */}
        <div className="fixed inset-y-0 left-0 z-40">
          <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        </div>

        {/* Main Content */}
        <div className={`transition-all duration-200 ease-in-out ${isSidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
          {/* Desktop Top Bar */}
          <div className={`backdrop-blur-sm border-b sticky top-0 z-10 transition-colors duration-200 ${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`} title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
                  {isSidebarCollapsed ? <ChevronRight size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} /> : <ChevronLeft size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />}
                </button>
                <div>
                  <h2 className={`text-xl font-bold transition-colors ${isDark ? 'text-white' : 'text-gray-800'}`}>Admin Dashboard</h2>
                  <p className={`text-sm transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Welcome back, {user?.fullName}</p>
                </div>
              </div>
              <button onClick={handleLogout} className={`flex items-center gap-2 text-sm transition-colors ${isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`}>
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
              <ThemeToggle />
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>

      {/* === MOBILE LAYOUT (below md: 768px) === */}
      <div className="md:hidden">
        {/* Backdrop overlay */}
        {isMobileOpen && (
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setIsMobileOpen(false)} />
        )}

        {/* Sidebar slides in from left */}
        <div className={`fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Sidebar isCollapsed={false} isMobile={true} isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
        </div>

        {/* Mobile Top Bar */}
        <div className={`backdrop-blur-sm border-b sticky top-0 z-30 transition-colors duration-200 ${isDark ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200'}`}>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsMobileOpen(true)} className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                <Menu size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-grab-green rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <h2 className={`text-lg font-bold transition-colors ${isDark ? 'text-white' : 'text-gray-800'}`}>SakayNE</h2>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button onClick={handleLogout} className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:text-red-400 hover:bg-gray-800' : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'}`}>
                <LogOut size={20} />
              </button>
            </div>
          </div>
          <p className={`text-xs mt-1 px-4 pb-2 ml-10 transition-colors ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Welcome, {user?.fullName}</p>
        </div>

        {/* Mobile Page Content */}
        <div className="px-4 py-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
