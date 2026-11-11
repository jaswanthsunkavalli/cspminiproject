import React from 'react';
import { MapPin, Users, Building2, GraduationCap, Wheat, FileText, CheckCircle2 } from 'lucide-react';

export const VillageProfilePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl border border-emerald-800/40">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>Gram Panchayat Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Kuntamukkala Village Demographics & Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Administrative and historical census profile of Kuntamukkala Gram Panchayat, G. Konduru Mandal, NTR District, Andhra Pradesh.
          </p>
        </div>
      </div>

      {/* Administrative Info Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Gram Panchayat</p>
          <p className="text-sm font-extrabold text-slate-900 dark:text-white">Kuntamukkala</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Mandal</p>
          <p className="text-sm font-extrabold text-slate-900 dark:text-white">G. Konduru</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase">District</p>
          <p className="text-sm font-extrabold text-slate-900 dark:text-white">NTR District</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase">State</p>
          <p className="text-sm font-extrabold text-slate-900 dark:text-white">Andhra Pradesh</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Postal PIN Code</p>
          <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">521230</p>
        </div>
      </div>

      {/* Census 2011 Cards (Clearly labelled as Census 2011) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <span>Official Census 2011 Demographics</span>
          </h2>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            Historical Government Census 2011
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Population</p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">3,616</p>
            <p className="text-[10px] text-slate-500">Census 2011 Record</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Households</p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">847</p>
            <p className="text-[10px] text-slate-500">Inhabited dwellings</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase">Male Population</p>
            <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">1,587</p>
            <p className="text-[10px] text-slate-500">Census 2011 Record</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase">Female Population</p>
            <p className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 tabular-nums">2,029</p>
            <p className="text-[10px] text-slate-500">Census 2011 Record</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <p className="text-xs font-bold text-emerald-600 uppercase">Literacy Rate</p>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">68.77%</p>
            <p className="text-[10px] text-slate-500">Overall literacy</p>
          </div>
        </div>
      </div>

      {/* Livelihood & Governance Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold">
            <Wheat className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Agriculture & Livelihood</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Agriculture is the primary livelihood in Kuntamukkala Village, supported by agricultural farming, crop cultivation, dairy farming, and small micro-enterprises.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Gram Panchayat Governance</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Kuntamukkala functions as an independent self-governing Gram Panchayat within G. Konduru Mandal. The Panchayat oversees street lighting, water supply, and local civic works.
          </p>
        </div>
      </div>
    </div>
  );
};
