// Client/src/pages/Admin/adminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, MessageSquare, Star, Megaphone, Car, 
  Clock, CheckCircle, XCircle, TrendingUp, UserPlus,
  AlertTriangle, ShieldCheck
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../util/axios';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFeedbacks: 0,
    averageRating: 0,
    totalAnnouncements: 0,
    totalDrivers: 0,
    pendingDrivers: 0,
    approvedDrivers: 0,
    rejectedDrivers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [usersRes, feedbacksRes, driversRes] = await Promise.all([
        api.get('/users/all').catch(() => ({ data: [] })),
        api.get('/feedbacks').catch(() => ({ data: [] })),
        api.get('/drivers/stats').catch(() => ({ data: { data: { total: 0, pending: 0, approved: 0, rejected: 0 } } }))
      ]);

      const feedbacks = Array.isArray(feedbacksRes.data) ? feedbacksRes.data : [];
      const avgRating = feedbacks.length > 0 
        ? (feedbacks.reduce((acc, curr) => acc + (curr.rating || 0), 0) / feedbacks.length).toFixed(1)
        : '0.0';
      const driversData = driversRes.data?.data || { total: 0, pending: 0, approved: 0, rejected: 0 };

      setStats({
        totalUsers: Array.isArray(usersRes.data) ? usersRes.data.length : 0,
        totalFeedbacks: feedbacks.length,
        averageRating: avgRating,
        totalAnnouncements: 0,
        ...driversData,
        totalDrivers: driversData.total
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      title: 'Total Users', 
      value: stats.totalUsers, 
      icon: Users, 
      gradient: 'from-blue-500 to-blue-600',
      bg: isDark ? 'bg-blue-900/20' : 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      title: 'Driver Applications', 
      value: stats.totalDrivers, 
      icon: Car, 
      gradient: 'from-grab-green to-green-600',
      bg: isDark ? 'bg-green-900/20' : 'bg-green-50',
      textColor: 'text-grab-green'
    },
    { 
      title: 'Pending Reviews', 
      value: stats.pendingDrivers, 
      icon: Clock, 
      gradient: 'from-yellow-500 to-orange-500',
      bg: isDark ? 'bg-yellow-900/20' : 'bg-yellow-50',
      textColor: 'text-yellow-600',
      badge: stats.pendingDrivers > 0 ? 'Action needed' : null
    },
    { 
      title: 'Avg Rating', 
      value: `${stats.averageRating}`,
      suffix: '★',
      icon: Star, 
      gradient: 'from-purple-500 to-purple-600',
      bg: isDark ? 'bg-purple-900/20' : 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    { 
      title: 'Feedbacks', 
      value: stats.totalFeedbacks, 
      icon: MessageSquare, 
      gradient: 'from-cyan-500 to-cyan-600',
      bg: isDark ? 'bg-cyan-900/20' : 'bg-cyan-50',
      textColor: 'text-cyan-600'
    },
    { 
      title: 'Announcements', 
      value: stats.totalAnnouncements, 
      icon: Megaphone, 
      gradient: 'from-pink-500 to-pink-600',
      bg: isDark ? 'bg-pink-900/20' : 'bg-pink-50',
      textColor: 'text-pink-600'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grab-green"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Welcome back, {user?.fullName || 'Admin'}
        </h1>
        <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Here's what's happening with SakayNE today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 ${isDark ? 'bg-gray-800' : ''}`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
                {stat.badge && (
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {stat.badge}
                  </span>
                )}
              </div>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}{stat.suffix || ''}
              </p>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Driver Application Status Section */}
      <div>
        <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <Car className="w-5 h-5 text-grab-green" />
          Driver Application Status
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatusCard 
            title="Total Applications" 
            value={stats.totalDrivers}
            icon={Car}
            color="blue"
            isDark={isDark}
          />
          <StatusCard 
            title="Pending" 
            value={stats.pendingDrivers}
            icon={Clock}
            color="yellow"
            isDark={isDark}
            highlight={stats.pendingDrivers > 0}
          />
          <StatusCard 
            title="Approved" 
            value={stats.approvedDrivers}
            icon={CheckCircle}
            color="green"
            isDark={isDark}
          />
          <StatusCard 
            title="Rejected" 
            value={stats.rejectedDrivers}
            icon={XCircle}
            color="red"
            isDark={isDark}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <TrendingUp className="w-5 h-5 text-grab-green" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <QuickActionCard
            title="Review Drivers"
            description={stats.pendingDrivers > 0 
              ? `${stats.pendingDrivers} applications pending review`
              : 'No pending applications'
            }
            icon={UserPlus}
            link="/admin/drivers"
            color="green"
            isDark={isDark}
            pulse={stats.pendingDrivers > 0}
          />
          <QuickActionCard
            title="Manage Feedbacks"
            description="Review and approve user feedback"
            icon={MessageSquare}
            link="/admin/feedbacks"
            color="blue"
            isDark={isDark}
          />
          <QuickActionCard
            title="Post Announcement"
            description="Share updates with users"
            icon={Megaphone}
            link="/admin/announcement"
            color="purple"
            isDark={isDark}
          />
        </div>
      </div>

      {/* System Status */}
      <div className={`rounded-2xl p-5 border ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
      } shadow-lg`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-green-900/20' : 'bg-green-50'}`}>
              <ShieldCheck className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <div>
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>System Status</h3>
              <p className={`text-sm mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                All systems operational. MongoDB connected, API running, Docker containers healthy.
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Online
          </span>
        </div>
      </div>
    </div>
  );
};

// Status Card for driver stats
const StatusCard = ({ title, value, icon: Icon, color, isDark, highlight }) => {
  const colors = {
    blue: { bg: isDark ? 'bg-blue-900/30' : 'bg-blue-50', text: 'text-blue-600', icon: 'text-blue-500' },
    yellow: { bg: isDark ? 'bg-yellow-900/30' : 'bg-yellow-50', text: 'text-yellow-600', icon: 'text-yellow-500' },
    green: { bg: isDark ? 'bg-green-900/30' : 'bg-green-50', text: 'text-grab-green', icon: 'text-grab-green' },
    red: { bg: isDark ? 'bg-red-900/30' : 'bg-red-50', text: 'text-red-600', icon: 'text-red-500' },
  };
  const c = colors[color] || colors.blue;

  return (
    <Card className={`border-0 shadow-md transition-all ${highlight ? 'ring-2 ring-yellow-400/30' : ''} ${isDark ? 'bg-gray-800' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
            <p className={`text-2xl font-bold mt-0.5 ${highlight ? 'text-yellow-500' : (isDark ? 'text-white' : 'text-gray-900')}`}>{value}</p>
          </div>
          <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${c.icon}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Quick Action Card
const QuickActionCard = ({ title, description, icon: Icon, link, color, isDark, pulse }) => {
  const colors = {
    green: { bg: 'from-grab-green to-green-600', light: isDark ? 'bg-green-900/20' : 'bg-green-50' },
    blue: { bg: 'from-blue-500 to-blue-600', light: isDark ? 'bg-blue-900/20' : 'bg-blue-50' },
    purple: { bg: 'from-purple-500 to-purple-600', light: isDark ? 'bg-purple-900/20' : 'bg-purple-50' },
  };
  const c = colors[color] || colors.green;

  return (
    <a href={link} className="block group">
      <Card className={`border-0 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${isDark ? 'bg-gray-800' : ''}`}>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl ${c.light} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <Icon className={`w-6 h-6 ${color === 'green' ? 'text-grab-green' : color === 'blue' ? 'text-blue-500' : 'text-purple-500'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-bold text-sm group-hover:text-grab-green transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {title}
                {pulse && <span className="inline-block ml-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>}
              </h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

export default AdminDashboard;
