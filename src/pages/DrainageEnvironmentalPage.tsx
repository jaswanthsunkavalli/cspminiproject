import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Droplets, AlertTriangle, ShieldCheck, CheckCircle2, PlusCircle, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const DrainageEnvironmentalPage: React.FC = () => {
  const [environmentalComplaints, setEnvironmentalComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnvData = async () => {
      try {
        const res = await api.get('/complaints?category=Environmental Cleanliness');
        setEnvironmentalComplaints(res.data.complaints || []);
      } catch (err) {
        console.error('Failed to load environmental complaints:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnvData();
  }, []);

  // Aggregations for charts
  const subcategoryCounts: Record<string, number> = {};
  environmentalComplaints.forEach((c) => {
    const sub = c.subcategory || 'General';
    subcategoryCounts[sub] = (subcategoryCounts[sub] || 0) + 1;
  });

  const chartData = Object.entries(subcategoryCounts).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl border border-teal-800/40">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold">
            <Droplets className="w-3.5 h-3.5" />
            <span>Kuntamukkala Special Environmental Action</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Drainage & Environmental Cleanliness Action
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Eliminating open drain blockages, stagnant rainwater pools, mosquito breeding vectors, and irregular garbage dumping in Kuntamukkala.
          </p>
        </div>

        <Link
          to="/report-issue"
          className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-all shrink-0 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report Drainage Issue</span>
        </Link>
      </div>

      {/* Main Grid: Chart & Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart Column (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-teal-600" />
              <span>Environmental Complaints by Subcategory</span>
            </h3>
            <span className="text-xs text-slate-400">Actual MongoDB Records</span>
          </div>

          {chartData.length > 0 ? (
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0d9488" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">No environmental complaints logged yet.</div>
          )}
        </div>

        {/* Highlights Side Column */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-teal-600">
              1. Drain Clearance & Desilting
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Desilting open street drains in BC Colony and Panchayat Office Center prior to heavy monsoon rains.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-amber-600">
              2. Vector & Mosquito Spraying
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Anti-larval oil treatment in stagnant rainwater pools to prevent viral fever outbreaks.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-emerald-600">
              3. Covered Dustbin Placement
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Deploying covered green/blue bins near Cheruvu Bund to prevent open dumping and stray animal clutter.
            </p>
          </div>
        </div>
      </div>

      {/* Environmental Complaints List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Environmental Cleanliness Complaints ({environmentalComplaints.length})
          </h2>
          <span className="text-xs text-slate-500">Live Database Records</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">Loading environmental complaints...</div>
        ) : environmentalComplaints.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
            No environmental complaints logged yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {environmentalComplaints.map((c) => (
              <div
                key={c._id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{c.complaintId}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[11px] font-semibold">{c.status}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{c.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">{c.description}</p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span>📍 {c.location}</span>
                  <Link to={`/complaints/${c._id}`} className="font-bold text-teal-600 hover:underline">Track →</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
