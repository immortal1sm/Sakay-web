// Client/src/layout/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Megaphone, 
  MessageSquare, 
  Users,
  Car,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isCollapsed, onToggle, isMobile = false, isOpen = false, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Announcements', path: '/admin/announcement', icon: Megaphone },
    { name: 'Feedbacks', path: '/admin/feedbacks', icon: MessageSquare },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Drivers', path: '/admin/drivers', icon: Car }
  ];

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLinkClick = () => {
    if (isMobile && onClose) onClose();
  };

  return (
    <div
      className={`h-full flex flex-col shadow-2xl backdrop-blur-xl border-r transition-all duration-200 ${
        isCollapsed ? 'w-20' : 'w-72'
      } ${
        isMobile
          ? 'bg-gray-900/95 border-gray-700/50 text-white'
          : 'backdrop-saturate-150 bg-gray-900/80 border-gray-700/30 text-white'
      }`}
    >
      {/* Mobile close button - glassmorphism styled */}
      {isMobile && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={18} className="text-gray-300" />
          </button>
        </div>
      )}

      {/* Logo Section */}
      <div className={`flex items-center p-5 border-b border-white/10 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-grab-green rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-grab-green/20">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-white">SakayNE</h1>
              <p className="text-xs text-white/50">Admin Panel</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 bg-grab-green rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-grab-green/20">
            <span className="text-white font-bold text-xl">S</span>
          </div>
        )}
      </div>

      {/* User Info - only when expanded */}
      {!isCollapsed && (
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-grab-green to-green-600 flex items-center justify-center text-white font-bold flex-shrink-0 text-sm shadow-md shadow-grab-green/20">
              {user?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-white truncate">{user?.fullName || 'Admin'}</p>
              <p className="text-xs text-white/50 truncate">{user?.email || 'admin@sakay.com'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className={`flex-1 py-4 ${isCollapsed ? '' : 'overflow-y-auto'}`}>
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.path} className="relative">
                <Link
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-150 group ${
                    active 
                      ? 'bg-grab-green/20 text-white shadow-sm shadow-grab-green/10' 
                      : 'text-white/60 hover:bg-white/10 hover:text-white/90'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? item.name : ''}
                >
                  {/* Active indicator bar - left edge glow */}
                  {active && !isCollapsed && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-grab-green rounded-r shadow-sm shadow-grab-green" />
                  )}
                  
                  {/* Icon */}
                  <Icon 
                    size={19} 
                    className={`flex-shrink-0 transition-colors ${
                      active ? 'text-grab-green' : 'text-white/40 group-hover:text-white/80'
                    }`} 
                  />
                  
                  {/* Label - glassmorphism style: lighter weight font, more breathing room */}
                  {!isCollapsed && (
                    <span className="font-medium text-sm tracking-wide truncate">{item.name}</span>
                  )}

                  {/* Hover tooltip when collapsed with glass effect */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-gray-900/90 backdrop-blur-sm text-white text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl border border-white/10">
                      {item.name}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse/Expand toggle at bottom - desktop only, glass style */}
      {onToggle && !isMobile && (
        <div className="border-t border-white/10 p-3">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
            {!isCollapsed && <span className="text-xs tracking-wide">Collapse</span>}
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
