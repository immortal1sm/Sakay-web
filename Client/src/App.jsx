// Client/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './layout/TopBar';
import Home from './pages/Users/Home';
import Feature from './pages/Users/Feature';
import Download from './pages/Users/Download';
import About from './pages/Users/About';
import Contact from './pages/Users/Contact';
import Feedback from './pages/Users/Feedback'; 
import Login from './auth/login';
import SignUp from './auth/signup';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import DriverRegister from './pages/Users/DriverRegister';

// Admin imports - MATCHING YOUR FILE NAMES EXACTLY
import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/Admin/adminDashboard';
import Announcement from './pages/Admin/adminAnnouncement';
import Feedbacks from './pages/Admin/adminFeedbacks';
import Users from './pages/Admin/adminUsers';
import AdminDrivers from './pages/Admin/adminDrivers';

// Protected Route for regular users
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grab-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Admin Route - Only accessible by admin users
const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grab-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    sessionStorage.setItem('redirectAfterLogin', '/admin');
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/features" element={<Feature />} />
      <Route path="/download" element={<Download />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      
      {/* Protected Routes - Requires Login */}
      <Route path="/feedback" element={
        <ProtectedRoute>
          <Feedback />
        </ProtectedRoute>
      } />
      
      {/* Public Routes */}
      <Route path="/driver/register" element={<DriverRegister />} />
      
      {/* Admin Routes - Requires Admin Access */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="announcement" element={<Announcement />} />  
        <Route path="feedbacks" element={<Feedbacks />} />
        <Route path="users" element={<Users />} />
        <Route path="drivers" element={<AdminDrivers />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <TopBar />
          <div className="pt-20">
            <AppRoutes />
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;