import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Building2,
  Calendar,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const ResidentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [awarenessPosts, setAwarenessPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [complaintsRes, awarenessRes] = await Promise.all([
          api.get('/complaints/my'),
          api.get('/awareness'),
        ]);

        setComplaints(complaintsRes.data.complaints || []);
        setAwarenessPosts(awarenessRes.data.posts || []);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalSubmitted = complaints.length;
  const pendingCount = complaints.filter((c) => c.status === 'Pending').length;
  const inProgressCount = complaints.filter((c) => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved').length;

  const chartData = [
    { name: 'Pending', value: pendingCount, color: '#f59e0b' },
    { name: 'In Progress', value: inProgressCount, color: '#3b82f6' },
    { name: 'Resolved', value: resolvedCount, color: '#10b981' },
  ].filter((d) => d.value > 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl border border-emerald-800/40">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Kuntamukkala Smart Village Resident Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Resident'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Track your submitted complaints, complete community surveys, and read village awareness updates.
          </p>
        </div>

        <Link
          to="/report-issue"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report New Issue</span>
        </Link>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Filed</span>
            <FileText className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            {totalSubmitted}
          </p>
          <p className="text-[11px] text-slate-500">Your logged complaints</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
            {pendingCount}
          </p>
          <p className="text-[11px] text-slate-500">Awaiting inspection</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-blue-600">
            <span className="text-xs font-semibold uppercase tracking-wider">In Progress</span>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
            {inProgressCount}
          </p>
          <p className="text-[11px] text-slate-500">Work actively ongoing</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-xs font-semibold uppercase tracking-wider">Resolved</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
            {resolvedCount}
          </p>
          <p className="text-[11px] text-slate-500">Completed & verified</p>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Complaint Activity (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>Your Submitted Complaints</span>
            </h2>
            <Link to="/my-complaints" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              View All Complaints →
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              Loading complaints from MongoDB...
            </div>
          ) : complaints.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No complaints filed yet.</p>
              <p className="text-xs text-slate-500">
                Notice an issue with school roads, classroom space, or drainage? Report it today!
              </p>
              <Link
                to="/report-issue"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit First Complaint</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {complaints.slice(0, 5).map((complaint) => (
                <div
                  key={complaint._id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                        {complaint.complaintId}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{complaint.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{new Date(complaint.createdAt).toLocaleDateString()}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate">
                      {complaint.title}
                    </h3>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      📍 {complaint.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        complaint.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : complaint.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {complaint.status}
                    </span>

                    <Link
                      to={`/complaints/${complaint._id}`}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      Track
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Status Distribution Chart & Awareness */}
        <div className="space-y-6">
          
          {/* Chart card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Complaint Status Distribution</h3>
            {chartData.length > 0 ? (
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center text-xs text-slate-400 py-8">
                No complaint metrics recorded yet.
              </div>
            )}
          </div>

          {/* Village Awareness Widget */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Village Awareness</span>
              </h3>
              <Link to="/awareness" className="text-xs font-bold text-emerald-600 hover:underline">All Articles</Link>
            </div>

            <div className="space-y-3">
              {awarenessPosts.slice(0, 2).map((post) => (
                <div key={post._id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{post.category}</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{post.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{post.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
