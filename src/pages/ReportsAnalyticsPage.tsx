import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { BarChart3, Download, Printer, Filter, Calendar, CheckCircle2, FileSpreadsheet } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const ReportsAnalyticsPage: React.FC = () => {
  const [reportsData, setReportsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const fetchReports = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (category) params.append('category', category);
      if (status) params.append('status', status);

      const res = await api.get(`/admin/reports?${params.toString()}`);
      setReportsData(res.data);
    } catch (err) {
      console.error('Failed to load reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    fetchReports();
  };

  const handleExportCSV = () => {
    if (!reportsData || !reportsData.complaints) return;
    const complaints = reportsData.complaints;

    const headers = ['Complaint ID', 'Title', 'Category', 'Subcategory', 'Priority', 'Status', 'Location', 'Date Created', 'Remarks'];
    const csvRows = [
      headers.join(','),
      ...complaints.map((c: any) =>
        [
          `"${c.complaintId || ''}"`,
          `"${(c.title || '').replace(/"/g, '""')}"`,
          `"${c.category || ''}"`,
          `"${c.subcategory || ''}"`,
          `"${c.priority || ''}"`,
          `"${c.status || ''}"`,
          `"${(c.location || '').replace(/"/g, '""')}"`,
          `"${new Date(c.createdAt).toLocaleDateString()}"`,
          `"${(c.remarks || '').replace(/"/g, '""')}"`,
        ].join(',')
      ),
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Kuntamukkala_Complaints_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading || !reportsData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-slate-500">
        Generating complaint analytics & report metrics...
      </div>
    );
  }

  const summary = reportsData.summary || {};
  const complaints = reportsData.complaints || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <BarChart3 className="w-4 h-4" />
            <span>Gram Panchayat Reporting & Analytics</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Complaints Resolution Report
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Export official reports for Mandal Parishad and Gram Panchayat review.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* Printable Title Block */}
      <div className="hidden print:block space-y-1 mb-6">
        <h1 className="text-xl font-bold">Kuntamukkala Gram Panchayat - Official Complaint Resolution Report</h1>
        <p className="text-xs text-slate-600">Generated on {new Date().toLocaleDateString()} · G. Konduru Mandal, NTR District</p>
      </div>

      {/* Filter Form */}
      <form onSubmit={handleApplyFilters} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 print:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              <option value="">All Categories</option>
              <option value="Educational Accessibility">Educational Accessibility</option>
              <option value="Environmental Cleanliness">Environmental Cleanliness</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs"
          >
            Apply Filters
          </button>
        </div>
      </form>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase">Filtered Complaints</p>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">{summary.totalCount}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-xs font-semibold text-emerald-600 uppercase">Resolved Count</p>
          <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">{summary.resolvedCount}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-xs font-semibold text-blue-600 uppercase">In Progress</p>
          <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">{summary.inProgressCount}</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-xs font-semibold text-amber-600 uppercase">Resolution Rate</p>
          <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">{summary.resolutionPercentage}%</p>
        </div>
      </div>

      {/* Detailed Complaints Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Complaints Record Audit</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-[10px] text-slate-500 border-b">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {complaints.map((c: any) => (
                <tr key={c._id}>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600">{c.complaintId}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{c.title}</td>
                  <td className="px-4 py-3 text-slate-500">{c.category}</td>
                  <td className="px-4 py-3 font-bold">{c.priority}</td>
                  <td className="px-4 py-3 capitalize font-bold">{c.status}</td>
                  <td className="px-4 py-3 text-slate-500">{c.location}</td>
                  <td className="px-4 py-3 text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
