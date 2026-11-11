import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, FileText, ArrowUpRight, AlertCircle, Calendar, MapPin } from 'lucide-react';

export const MyComplaintsPage: React.FC = () => {
  const { isVolunteer } = useAuth();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        // If volunteer/admin, fetch all complaints via /complaints, else fetch /complaints/my
        const endpoint = isVolunteer ? '/complaints' : '/complaints/my';
        const res = await api.get(endpoint);
        setComplaints(res.data.complaints || []);
      } catch (err) {
        console.error('Failed to fetch complaints:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [isVolunteer]);

  // Client side filtering
  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.complaintId?.toLowerCase().includes(search.toLowerCase()) ||
      c.location?.toLowerCase().includes(search.toLowerCase());

    const matchesCat = category === 'All' || c.category === category;
    const matchesStatus = status === 'All' || c.status === status;
    const matchesPriority = priority === 'All' || c.priority === priority;

    return matchesSearch && matchesCat && matchesStatus && matchesPriority;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {isVolunteer ? 'All Village Complaints Directory' : 'My Submitted Complaints'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isVolunteer
              ? 'View and manage all community issue reports submitted across Kuntamukkala Village.'
              : 'Track status history and Panchayat resolution updates for your filed reports.'}
          </p>
        </div>
        <Link
          to="/report-issue"
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm inline-flex items-center gap-1.5 self-start"
        >
          <span>+ Report New Issue</span>
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, ID, landmark..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Categories</option>
              <option value="Educational Accessibility">Educational Accessibility</option>
              <option value="Environmental Cleanliness">Environmental Cleanliness</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Complaints Grid / Table */}
      {loading ? (
        <div className="p-12 text-center text-xs text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          Loading complaints from database...
        </div>
      ) : filteredComplaints.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No complaints matching your filters.</p>
          <p className="text-xs text-slate-500">Try adjusting your search keywords or filter dropdowns.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredComplaints.map((complaint) => (
            <div
              key={complaint._id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* ID & Badges */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {complaint.complaintId}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                        complaint.priority === 'High'
                          ? 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
                          : complaint.priority === 'Medium'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {complaint.priority} Priority
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                        complaint.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : complaint.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                  {complaint.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {complaint.description}
                </p>

                {/* Photo thumbnail if present */}
                {complaint.images && complaint.images.length > 0 && (
                  <div className="pt-1">
                    <img
                      src={complaint.images[0]}
                      alt="Complaint snapshot"
                      className="h-28 w-full object-cover rounded-xl border border-slate-200 dark:border-slate-800"
                    />
                  </div>
                )}
              </div>

              {/* Card Footer Meta */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2 truncate">
                  <span>📍 {complaint.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                </div>

                <Link
                  to={`/complaints/${complaint._id}`}
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Track Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
