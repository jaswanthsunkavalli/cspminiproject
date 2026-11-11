import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  ShieldAlert,
  Users,
  FileText,
  Clock,
  CheckCircle2,
  TrendingUp,
  Award,
  Search,
  UserCheck,
  Edit3,
  Download,
  Activity,
  AlertTriangle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const AdminDashboardPage: React.FC = () => {
  const { isAdmin } = useAuth();

  const [stats, setStats] = useState<any>(null);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Table tabs
  const [activeTab, setActiveTab] = useState<'complaints' | 'users' | 'activity'>('complaints');
  const [search, setSearch] = useState('');

  // Status update modal state
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [updateStatusVal, setUpdateStatusVal] = useState('In Progress');
  const [updateRemarksVal, setUpdateRemarksVal] = useState('');
  const [updateDeptVal, setUpdateDeptVal] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchAdminData = async () => {
    try {
      const [statsRes, complaintsRes] = await Promise.all([
        api.get('/admin/dashboard'),
        api.get('/complaints'),
      ]);

      setStats(statsRes.data);
      setComplaints(complaintsRes.data.complaints || []);

      if (isAdmin) {
        const usersRes = await api.get('/admin/users');
        setUsersList(usersRes.data.users || []);
      }
    } catch (err) {
      console.error('Failed to load admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [isAdmin]);

  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      await api.patch(`/admin/users/${userId}/role`, { role: newRole });
      await fetchAdminData();
    } catch (err) {
      alert('Failed to update user role');
    }
  };

  const handleQuickStatusSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    setUpdating(true);
    try {
      await api.patch(`/complaints/${selectedComplaint._id}/status`, {
        status: updateStatusVal,
        remarks: updateRemarksVal,
        responsibleDepartment: updateDeptVal,
      });
      setSelectedComplaint(null);
      await fetchAdminData();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to update complaint');
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-slate-500">
        Loading Gram Panchayat Admin Console from MongoDB...
      </div>
    );
  }

  const s = stats.stats || {};
  const charts = stats.charts || {};

  const categoryChartData = (charts.byCategory || []).map((c: any) => ({
    name: c.category,
    count: c.count,
  }));

  const priorityChartData = (charts.byPriority || []).map((p: any) => ({
    name: p.priority,
    count: p.count,
  }));

  const statusChartData = [
    { name: 'Pending', count: s.pendingComplaints || 0, color: '#f59e0b' },
    { name: 'In Progress', count: s.inProgressComplaints || 0, color: '#3b82f6' },
    { name: 'Resolved', count: s.resolvedComplaints || 0, color: '#10b981' },
  ];

  const filteredComplaints = complaints.filter((c) =>
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.complaintId?.toLowerCase().includes(search.toLowerCase()) ||
    c.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl border border-purple-800/40">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Kuntamukkala Gram Panchayat Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Gram Panchayat Master Control Panel
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time complaint triage, role-based user management, department assignment, and resolution metrics.
          </p>
        </div>

        <Link
          to="/reports"
          className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all shrink-0 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export Complaint Reports</span>
        </Link>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Total Users</p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">{s.totalUsers}</p>
          <p className="text-[10px] text-slate-400">{s.residentsCount} Residents</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Total Filed</p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">{s.totalComplaints}</p>
          <p className="text-[10px] text-slate-400">All village areas</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-[11px] font-semibold text-amber-600 uppercase">Pending</p>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">{s.pendingComplaints}</p>
          <p className="text-[10px] text-slate-400">Requires review</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-[11px] font-semibold text-blue-600 uppercase">In Progress</p>
          <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">{s.inProgressComplaints}</p>
          <p className="text-[10px] text-slate-400">Field action active</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-[11px] font-semibold text-emerald-600 uppercase">Resolved</p>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">{s.resolvedComplaints}</p>
          <p className="text-[10px] text-slate-400">{s.resolutionRate}% Rate</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-[11px] font-semibold text-purple-600 uppercase">CSP Surveys</p>
          <p className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 tabular-nums">{s.totalSurveys}</p>
          <p className="text-[10px] text-slate-400">Submitted</p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Category breakdown chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Complaints by Category</h3>
          <div className="h-48 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority breakdown chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Complaints by Priority</h3>
          <div className="h-48 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityChartData}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#e11d48" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Status Resolution Rate</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusChartData} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={35} outerRadius={65}>
                  {statusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabs & Master Table Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        {/* Tab Headers */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('complaints')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'complaints'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Complaints Management ({complaints.length})
            </button>

            {isAdmin && (
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'users'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                User Accounts ({usersList.length})
              </button>
            )}

            <button
              onClick={() => setActiveTab('activity')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'activity'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Audit Activity Log
            </button>
          </div>

          {/* Table Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search table..."
              className="pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden"
            />
          </div>
        </div>

        {/* Tab 1: Complaints Table */}
        {activeTab === 'complaints' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3">Reference ID</th>
                  <th className="px-4 py-3">Title & Category</th>
                  <th className="px-4 py-3">Reporter</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredComplaints.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                      {c.complaintId}
                    </td>
                    <td className="px-4 py-3.5 max-w-xs">
                      <p className="font-bold text-slate-900 dark:text-white truncate">{c.title}</p>
                      <p className="text-[11px] text-slate-400 truncate">{c.category} · {c.subcategory}</p>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{c.reporter?.name || 'Resident'}</p>
                      <p className="text-[10px] text-slate-400">{c.reporter?.email || ''}</p>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        c.priority === 'High' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {c.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        c.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' : c.status === 'In Progress' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-500">
                      {c.responsibleDepartment || 'Panchayat'}
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedComplaint(c);
                          setUpdateStatusVal(c.status);
                          setUpdateRemarksVal(c.remarks || '');
                          setUpdateDeptVal(c.responsibleDepartment || '');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold hover:bg-emerald-100 text-[11px]"
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: User Accounts Table (Admin only) */}
        {activeTab === 'users' && isAdmin && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase font-bold text-[10px]">
                <tr>
                  <th className="px-4 py-3">Full Name</th>
                  <th className="px-4 py-3">Email Address</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3 text-right">Change Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {usersList.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">{u.name}</td>
                    <td className="px-4 py-3.5 text-slate-500">{u.email}</td>
                    <td className="px-4 py-3.5 text-slate-500">{u.phone || 'N/A'}</td>
                    <td className="px-4 py-3.5 capitalize font-bold text-emerald-600">{u.role}</td>
                    <td className="px-4 py-3.5 text-right">
                      <select
                        value={u.role}
                        onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                        className="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-[11px]"
                      >
                        <option value="resident">Resident</option>
                        <option value="volunteer">Volunteer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Activity Audit Log */}
        {activeTab === 'activity' && (
          <div className="space-y-3">
            {(stats.recentActivity || []).map((act: any) => (
              <div key={act._id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900 dark:text-white">
                    {act.userName} ({act.userRole}) · <span className="text-emerald-600">{act.action}</span>
                  </p>
                  <p className="text-[11px] text-slate-500">{act.newValue}</p>
                </div>
                <span className="text-[10px] text-slate-400 whitespace-nowrap">
                  {new Date(act.timestamp || act.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Status Update Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Update Status: {selectedComplaint.complaintId}
            </h3>

            <form onSubmit={handleQuickStatusSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Status</label>
                <select
                  value={updateStatusVal}
                  onChange={(e) => setUpdateStatusVal(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Department</label>
                <input
                  type="text"
                  value={updateDeptVal}
                  onChange={(e) => setUpdateDeptVal(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Remarks</label>
                <textarea
                  rows={3}
                  value={updateRemarksVal}
                  onChange={(e) => setUpdateRemarksVal(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedComplaint(null)}
                  className="px-4 py-2 rounded-xl border text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  {updating ? 'Saving...' : 'Save & Notify Resident'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
