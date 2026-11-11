import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { GraduationCap, AlertTriangle, Building2, CheckCircle2, ArrowRight, BookOpen, PlusCircle } from 'lucide-react';

export const EducationAccessibilityPage: React.FC = () => {
  const [educationComplaints, setEducationComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEduData = async () => {
      try {
        const res = await api.get('/complaints?category=Educational Accessibility');
        setEducationComplaints(res.data.complaints || []);
      } catch (err) {
        console.error('Failed to load education complaints:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEduData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl border border-blue-800/40">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Kuntamukkala Special Action Module</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Educational Accessibility & Infrastructure
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Addressing children's ~1 km travel challenges during rainy season downpours, muddy unpaved routes, and classroom space capacity.
          </p>
        </div>

        <Link
          to="/report-issue"
          className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-blue-500/20 transition-all shrink-0 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report School Concern</span>
        </Link>
      </div>

      {/* Key Focus Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Monsoon Travel Difficulty (~1 km)</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Students travelling to Mandal Parishad Primary School face slippery mud paths on Sub-station Road during heavy rains.
          </p>
          <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
            Action: Gravel road surfacing requested
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Classroom Capacity & Furniture</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Residents expressed concerns regarding combined multi-grade seating and need for additional benches and room partitions.
          </p>
          <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            Action: Submitted representation to MEO
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Suggested Community Solutions</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Organizing shared Gram Panchayat auto pooling during high monsoon months and rainwater drainage along school boundary wall.
          </p>
          <div className="text-[11px] font-semibold text-purple-600 dark:text-purple-400">
            Action: Community auto-pool proposal
          </div>
        </div>
      </div>

      {/* Live Educational Complaints Directory */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Educational Accessibility Complaints ({educationComplaints.length})
          </h2>
          <span className="text-xs text-slate-500">Filtered from MongoDB database</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">Loading educational issues...</div>
        ) : educationComplaints.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
            No education complaints reported yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationComplaints.map((c) => (
              <div
                key={c._id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{c.complaintId}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold">{c.status}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{c.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">{c.description}</p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span>📍 {c.location}</span>
                  <Link to={`/complaints/${c._id}`} className="font-bold text-blue-600 hover:underline">Track →</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
