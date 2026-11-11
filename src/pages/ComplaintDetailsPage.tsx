import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  User,
  ShieldCheck,
  Calendar,
  MapPin,
  ArrowLeft,
  Send,
  Sparkles,
} from 'lucide-react';

export const ComplaintDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isVolunteer, isAdmin } = useAuth();

  const [complaint, setComplaint] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Admin update form state
  const [status, setStatus] = useState<'Pending' | 'In Progress' | 'Resolved'>('Pending');
  const [remarks, setRemarks] = useState('');
  const [responsibleDepartment, setResponsibleDepartment] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);

  const fetchComplaint = async () => {
    try {
      const res = await api.get(`/complaints/${id}`);
      const data = res.data.complaint;
      setComplaint(data);
      if (data) {
        setStatus(data.status);
        setRemarks(data.remarks || '');
        setResponsibleDepartment(data.responsibleDepartment || '');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch complaint details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateSuccess(null);
    try {
      await api.patch(`/complaints/${complaint._id}/status`, {
        status,
        remarks,
        responsibleDepartment,
      });

      setUpdateSuccess(`Status updated to "${status}" and resident notified.`);
      await fetchComplaint();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update status.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-xs text-slate-500">
        Loading complaint record from database...
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-sm font-semibold text-red-600">{error || 'Complaint record not found.'}</p>
        <Link to="/my-complaints" className="text-xs text-emerald-600 hover:underline">
          ← Back to Complaints Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Back button & Header */}
      <div className="space-y-4">
        <Link
          to="/my-complaints"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Complaints</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                {complaint.complaintId}
              </span>
              <span aria-hidden="true">·</span>
              <span>{complaint.category}</span>
              <span aria-hidden="true">·</span>
              <span>{complaint.subcategory}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {complaint.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                complaint.priority === 'High'
                  ? 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              {complaint.priority} Priority
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                complaint.status === 'Resolved'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : complaint.status === 'In Progress'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              Status: {complaint.status}
            </span>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Details & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Details Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</h3>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                {complaint.description}
              </p>
            </div>

            {/* Photo display */}
            {complaint.images && complaint.images.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Attached Photograph</h3>
                <img
                  src={complaint.images[0]}
                  alt="Submitted complaint detail"
                  className="w-full max-h-72 object-cover rounded-2xl border border-slate-200 dark:border-slate-800"
                />
              </div>
            )}

            {/* Meta Table */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-400 font-semibold">Location / Street</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">📍 {complaint.location}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Responsible Department</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{complaint.responsibleDepartment}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Date Filed</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  {new Date(complaint.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold">Last Updated</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  {new Date(complaint.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Status Timeline History */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span>Status Resolution History Timeline</span>
            </h3>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800 pl-8 pt-2">
              {complaint.statusHistory && complaint.statusHistory.length > 0 ? (
                complaint.statusHistory.map((item: any, idx: number) => (
                  <div key={idx} className="relative space-y-1">
                    <div
                      className={`absolute -left-8 top-0.5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white dark:border-slate-900 ${
                        item.status === 'Resolved'
                          ? 'bg-emerald-600'
                          : item.status === 'In Progress'
                          ? 'bg-blue-600'
                          : 'bg-amber-500'
                      }`}
                    >
                      ✓
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-slate-900 dark:text-white capitalize">
                        {item.status}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-400">
                        {new Date(item.updatedAt).toLocaleString()}
                      </span>
                    </div>
                    {item.remarks && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 mt-1">
                        {item.remarks}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">No status history recorded yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Admin Action Box / Reporter Info */}
        <div className="space-y-6">
          
          {/* Admin Status Update Form */}
          {isVolunteer ? (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Panchayat Official Action Panel
                </h3>
              </div>

              {updateSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  {updateSuccess}
                </div>
              )}

              <form onSubmit={handleStatusUpdate} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Update Resolution Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Responsible Department
                  </label>
                  <input
                    type="text"
                    value={responsibleDepartment}
                    onChange={(e) => setResponsibleDepartment(e.target.value)}
                    placeholder="e.g. Gram Panchayat Sanitation Squad"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Official Remarks / Inspection Notes
                  </label>
                  <textarea
                    rows={3}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter action taken, work order issued, or completion summary..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{updating ? 'Saving Status...' : 'Save & Notify Resident'}</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs space-y-3">
              <p className="font-bold text-slate-800 dark:text-slate-200">Resident Tracking Info</p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                As a resident, you can track official Panchayat updates and remarks. Official status resolution changes are managed by Gram Panchayat admins and field volunteers.
              </p>
            </div>
          )}

          {/* Reporter details */}
          {complaint.reporter && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <p className="font-bold text-slate-900 dark:text-white">Reported By</p>
              <p className="font-semibold text-emerald-600 dark:text-emerald-400">{complaint.reporter.name}</p>
              <p className="text-slate-500">{complaint.reporter.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
