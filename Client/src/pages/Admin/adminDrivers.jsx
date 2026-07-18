// Client/src/pages/Admin/adminDrivers.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, CheckCircle, XCircle, Clock, Search, Eye,
  ChevronDown, ChevronUp, User, Car, FileText, 
  Shield, AlertTriangle, Trash2, Phone, Mail, MapPin
} from 'lucide-react';
import api from '../../util/axios';
import Swal from 'sweetalert2';
import { useTheme } from '../../context/ThemeContext';

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-400' },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-800', dot: 'bg-green-400' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', dot: 'bg-red-400' },
  suspended: { label: 'Suspended', color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-400' },
};

const AdminDrivers = () => {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchDrivers();
    fetchStats();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await api.get('/drivers/all');
      setDrivers(res.data.data || []);
    } catch (err) {
      console.error('Error fetching drivers:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get('/drivers/stats');
      setStats(res.data.data || { total: 0, pending: 0, approved: 0, rejected: 0 });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleApprove = async (id, name) => {
    const result = await Swal.fire({
      title: 'Approve Driver?',
      text: `Approve ${name}'s application to become a SakayNE driver?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#009639',
      confirmButtonText: 'Yes, Approve',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await api.put(`/drivers/${id}/approve`);
        Swal.fire('Approved!', 'Driver application has been approved.', 'success');
        fetchDrivers();
        fetchStats();
      } catch (err) {
        Swal.fire('Error', err.response?.data?.message || 'Failed to approve.', 'error');
      }
    }
  };

  const handleReject = async (id, name) => {
    const { value: notes } = await Swal.fire({
      title: 'Reject Application',
      text: `Reject ${name}'s driver application?`,
      input: 'textarea',
      inputLabel: 'Reason for rejection (optional)',
      inputPlaceholder: 'Enter reason...',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Reject',
      cancelButtonText: 'Cancel'
    });

    if (notes !== undefined) {
      try {
        await api.put(`/drivers/${id}/reject`, { notes });
        Swal.fire('Rejected', 'Driver application has been rejected.', 'info');
        fetchDrivers();
        fetchStats();
      } catch (err) {
        Swal.fire('Error', err.response?.data?.message || 'Failed to reject.', 'error');
      }
    }
  };

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: 'Delete Application?',
      text: `Delete ${name}'s driver application? This cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/drivers/${id}`);
        Swal.fire('Deleted!', 'Application deleted.', 'success');
        fetchDrivers();
        fetchStats();
      } catch (err) {
        Swal.fire('Error', 'Failed to delete.', 'error');
      }
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter
  const filtered = drivers.filter(d => {
    const matchStatus = filter === 'all' || d.status === filter;
    const matchSearch = !search || 
      d.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      d.email?.toLowerCase().includes(search.toLowerCase()) ||
      d.plateNumber?.toLowerCase().includes(search.toLowerCase()) ||
      d.phone?.includes(search);
    return matchStatus && matchSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grab-green"></div>
      </div>
    );
  }

  return (
    <div className="px-2 sm:px-0">
      {/* Header */}
      <h1 className={`text-xl sm:text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Driver Applications
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard title="Total" value={stats.total} icon={Users} color="blue" isDark={isDark} />
        <StatCard title="Pending" value={stats.pending} icon={Clock} color="yellow" isDark={isDark} />
        <StatCard title="Approved" value={stats.approved} icon={CheckCircle} color="green" isDark={isDark} />
        <StatCard title="Rejected" value={stats.rejected} icon={XCircle} color="red" isDark={isDark} />
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'approved', 'rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all capitalize ${
                filter === f
                  ? 'bg-grab-green text-white'
                  : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {f}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search drivers..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-grab-green ${
              isDark ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-200 text-gray-900'
            }`}
          />
        </div>
      </div>

      {/* Driver Cards */}
      {filtered.length === 0 ? (
        <div className={`text-center py-16 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No driver applications found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(driver => {
            const st = statusConfig[driver.status] || statusConfig.pending;
            const isExpanded = expandedId === driver._id;

            return (
              <Card key={driver._id} className={`border-0 shadow-lg overflow-hidden transition-all ${
                isDark ? 'bg-gray-800' : ''
              } ${driver.status === 'pending' ? 'ring-2 ring-yellow-400/20' : ''}`}>
                {/* Compact Header */}
                <div
                  onClick={() => toggleExpand(driver._id)}
                  className="p-4 sm:p-6 cursor-pointer hover:bg-black/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${
                        driver.status === 'approved' ? 'bg-grab-green' :
                        driver.status === 'rejected' ? 'bg-red-500' :
                        driver.status === 'suspended' ? 'bg-gray-500' :
                        'bg-yellow-500'
                      }`}>
                        {driver.fullName?.charAt(0) || '?'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className={`font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {driver.fullName}
                        </h3>
                        <p className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {driver.email} {driver.phone ? `• ${driver.phone}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${st.color}`}>
                        <span className={`inline-block w-2 h-2 rounded-full ${st.dot} mr-1.5`}></span>
                        {st.label}
                      </span>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-4 mt-3 text-xs">
                    <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                      <Car className="w-3 h-3 inline mr-1" />
                      {driver.vehicleMake} {driver.vehicleModel} ({driver.plateNumber})
                    </span>
                    <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                      <FileText className="w-3 h-3 inline mr-1" />
                      License: {driver.licenseNumber}
                    </span>
                    <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                      Applied: {new Date(driver.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className={`px-4 sm:px-6 pb-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      {/* Personal */}
                      <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className="text-xs font-bold text-grab-green mb-2 flex items-center gap-1">
                          <User className="w-3 h-3" /> Personal
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><span className="text-xs text-gray-400">Birthdate:</span> {driver.birthdate ? new Date(driver.birthdate).toLocaleDateString() : '—'}</p>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><span className="text-xs text-gray-400">Address:</span> {driver.address || '—'}</p>
                        </div>
                      </div>

                      {/* Vehicle */}
                      <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className="text-xs font-bold text-grab-green mb-2 flex items-center gap-1">
                          <Car className="w-3 h-3" /> Vehicle
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><span className="text-xs text-gray-400">Type:</span> {driver.vehicleType}</p>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><span className="text-xs text-gray-400">Make/Model:</span> {driver.vehicleMake} {driver.vehicleModel}</p>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><span className="text-xs text-gray-400">Year/Color:</span> {driver.vehicleYear} • {driver.vehicleColor}</p>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><span className="text-xs text-gray-400">Plate:</span> {driver.plateNumber}</p>
                        </div>
                      </div>

                      {/* License & Docs */}
                      <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h4 className="text-xs font-bold text-grab-green mb-2 flex items-center gap-1">
                          <FileText className="w-3 h-3" /> License & Docs
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><span className="text-xs text-gray-400">License:</span> {driver.licenseNumber}</p>
                          <p className={isDark ? 'text-gray-300' : 'text-gray-700'}><span className="text-xs text-gray-400">Expiry:</span> {driver.licenseExpiry ? new Date(driver.licenseExpiry).toLocaleDateString() : '—'}</p>
                          {driver.licenseImageUrl && (
                            <a href={driver.licenseImageUrl} target="_blank" rel="noopener noreferrer"
                              className="text-grab-green text-xs hover:underline flex items-center gap-1">
                              <Eye className="w-3 h-3" /> View License
                            </a>
                          )}
                          {driver.vehiclePhotoUrl && (
                            <a href={driver.vehiclePhotoUrl} target="_blank" rel="noopener noreferrer"
                              className="text-grab-green text-xs hover:underline flex items-center gap-1">
                              <Eye className="w-3 h-3" /> View Vehicle
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Review Notes */}
                    {driver.reviewNotes && (
                      <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <span className="text-xs font-bold text-gray-400">Review Notes:</span>
                        <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{driver.reviewNotes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {driver.status === 'pending' && (
                        <>
                          <Button onClick={() => handleApprove(driver._id, driver.fullName)}
                            className="bg-grab-green hover:bg-grab-dark text-white gap-2">
                            <CheckCircle className="w-4 h-4" /> Approve
                          </Button>
                          <Button onClick={() => handleReject(driver._id, driver.fullName)}
                            className="bg-red-500 hover:bg-red-600 text-white gap-2">
                            <XCircle className="w-4 h-4" /> Reject
                          </Button>
                        </>
                      )}
                      <Button onClick={() => handleDelete(driver._id, driver.fullName)}
                        variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-2">
                        <Trash2 className="w-4 h-4" /> Delete
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Stat Card
const StatCard = ({ title, value, icon: Icon, color, isDark }) => {
  const colors = {
    blue: { bg: 'bg-blue-500', light: isDark ? 'bg-blue-900/30' : 'bg-blue-50' },
    yellow: { bg: 'bg-yellow-500', light: isDark ? 'bg-yellow-900/30' : 'bg-yellow-50' },
    green: { bg: 'bg-grab-green', light: isDark ? 'bg-green-900/30' : 'bg-green-50' },
    red: { bg: 'bg-red-500', light: isDark ? 'bg-red-900/30' : 'bg-red-50' },
  };
  const c = colors[color] || colors.blue;

  return (
    <Card className={`border-0 shadow-lg ${isDark ? 'bg-gray-800' : ''}`}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
            <p className={`text-2xl sm:text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
          </div>
          <div className={`w-12 h-12 rounded-xl ${c.light} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${c.bg.replace('bg-', 'text-')}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDrivers;
