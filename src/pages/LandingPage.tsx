import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  GraduationCap,
  Droplets,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  ClipboardList,
  MapPin,
  Users,
  Activity,
  Award,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalComplaints: 5,
    resolvedComplaints: 1,
    inProgressComplaints: 2,
    totalSurveys: 2,
  });

  useEffect(() => {
    const fetchPublicStats = async () => {
      try {
        const res = await api.get('/complaints');
        const complaints = res.data.complaints || [];
        const resolved = complaints.filter((c: any) => c.status === 'Resolved').length;
        const inProgress = complaints.filter((c: any) => c.status === 'In Progress').length;
        setStats((prev) => ({
          ...prev,
          totalComplaints: complaints.length || 5,
          resolvedComplaints: resolved,
          inProgressComplaints: inProgress,
        }));
      } catch (err) {
        // Fallback to default initial counts
      }
    };
    fetchPublicStats();
  }, []);

  const challenges = [
    {
      title: 'Educational Accessibility',
      description: 'Children face difficulties travelling ~1 km to school over unpaved routes, especially during monsoon rains.',
      icon: GraduationCap,
      category: 'Education Action',
    },
    {
      title: 'Limited Classroom Facilities',
      description: 'Insufficient classroom space and seating capacity requiring upgrade of village primary school infrastructure.',
      icon: Building2,
      category: 'School Infrastructure',
    },
    {
      title: 'Drainage System Maintenance',
      description: 'Lack of covered concrete side drains and irregular desilting causing street drain overflows after heavy downpours.',
      icon: Droplets,
      category: 'Environmental Cleanliness',
    },
    {
      title: 'Stagnant Water & Mosquito Menace',
      description: 'Water pooling in low-lying open plots creating mosquito breeding sites and vector-borne illness risks.',
      icon: AlertTriangle,
      category: 'Public Health',
    },
    {
      title: 'Environmental Waste Cleanliness',
      description: 'Improper household waste disposal and missing covered community bins needing systematic garbage collection.',
      icon: ShieldCheck,
      category: 'Sanitation Action',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-6">
            
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Smart Village Community Management System</span>
              <span aria-hidden="true">·</span>
              <span>G. Konduru Mandal</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Building a Smarter, Cleaner <span className="text-emerald-400">Kuntamukkala</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Digitizing problem reporting, education accessibility, drainage maintenance, and vector control action for Kuntamukkala Village, NTR District, Andhra Pradesh.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/report-issue"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all"
              >
                <span>Report an Issue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/village-profile"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Explore Village Profile</span>
              </Link>
            </div>

            {/* Subtext info */}
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-4">
              <span>Lakireddy Bali Reddy College of Engineering (LBRCE)</span>
              <span aria-hidden="true">·</span>
              <span>CSE Community Service Project</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Complaints</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {stats.totalComplaints}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Reported by residents</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Resolved Issues</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {stats.resolvedComplaints}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Action taken by Panchayat</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">In Progress</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
              {stats.inProgressComplaints}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Field inspection active</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Household Surveys</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
              {stats.totalSurveys}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">22-Question CSP Responses</p>
          </div>
        </div>
      </section>

      {/* Village Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Village Context</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            About Kuntamukkala Gram Panchayat
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Located in G. Konduru Mandal, NTR District, Andhra Pradesh. An independent agricultural village community committed to digital action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Population & Census 2011</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Population of 3,616 across 847 households. Literacy rate of 68.77% with strong community engagement.
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Census 2011 Official Record</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Educational Focus</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Focusing on safe ~1 km monsoon transit routes and classroom infrastructure upgrades for primary students.
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Link to="/education-accessibility" className="text-emerald-600 font-semibold hover:underline">View Educational Action →</Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Clean Surroundings</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Addressing open drain overflow, stagnant rainwater pools, vector mosquito control, and waste segregation.
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Link to="/drainage-environmental" className="text-teal-600 font-semibold hover:underline">View Drainage Action →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Major Community Challenges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">CSP Study Findings</p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              5 Major Community Challenges Identified
            </h2>
          </div>
          <Link
            to="/report-issue"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Report a new challenge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((ch, idx) => (
            <div
              key={ch.title}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{ch.category}</span>
                <span className="font-mono text-slate-400">0{idx + 1}</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <ch.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{ch.title}</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {ch.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How the Application Works */}
      <section className="bg-slate-100 dark:bg-slate-900/60 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">System Workflow</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              How Kuntamukkala Connect Works
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              A transparent, 4-step digital workflow connecting residents, field volunteers, and Gram Panchayat administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs">1</div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Submit Complaint</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Residents submit issue with title, category, description, photo upload, and street location. Unique ID assigned (`KNT-2026-XXXX`).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs">2</div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Volunteer Inspection</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Field volunteers verify the report on ground, collect household survey inputs, and submit site notes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs">3</div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Panchayat Action</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Admin updates complaint status (`Pending` → `In Progress` → `Resolved`), assigns department, and records remarks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs">4</div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Transparent Tracking</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Residents track progress in real-time with full status history audit timeline and notification alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-800/40 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <h3 className="text-2xl font-extrabold tracking-tight">
              Ready to Contribute to Village Improvement?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Register as a Kuntamukkala resident, report community issues, or complete the 22-question household survey today.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/community-survey"
              className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition-colors"
            >
              Take Household Survey
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
            >
              Register Resident Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
