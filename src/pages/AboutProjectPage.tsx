import React from 'react';
import { GraduationCap, Award, BookOpen, Layers, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

export const AboutProjectPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white space-y-4 shadow-xl border border-emerald-800/40">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Community Service Project (CSP) Academic Documentation</span>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Community Access & Clean Surroundings Action Framework
          </h1>
          <p className="text-xs sm:text-sm text-emerald-400 font-semibold">
            Kuntamukkala Village, G. Konduru Mandal, NTR District, AP
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 text-xs space-y-1 text-slate-200">
          <p className="font-bold text-white">Original CSP Title:</p>
          <p className="italic">"Assessment of Community Facilities and Environmental Conditions in Kuntamukkala Village"</p>
        </div>
      </div>

      {/* Academic Attribution Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="space-y-2">
          <p className="font-bold text-slate-400 uppercase text-[10px]">Educational Institution</p>
          <p className="font-extrabold text-slate-900 dark:text-white text-base">
            Lakireddy Bali Reddy College of Engineering (Autonomous)
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            Department of Computer Science and Engineering (CSE)
          </p>
          <p className="text-slate-500">Mylavaram, NTR District, Andhra Pradesh</p>
        </div>

        <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
          <p className="font-bold text-slate-400 uppercase text-[10px]">Project Guidance & Period</p>
          <p className="font-bold text-slate-800 dark:text-slate-200">
            Project Guide: <span className="text-emerald-600 dark:text-emerald-400">Mr. N. Srikanth</span>, Sr. Assistant Professor
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            CSP Execution Period: <span className="font-semibold text-slate-900 dark:text-white">30 April 2026 to 12 June 2026</span>
          </p>
          <p className="text-slate-500">Course: B.Tech Computer Science & Engineering CSP Mini-Project</p>
        </div>
      </div>

      {/* Project Overview Details */}
      <div className="space-y-6">
        
        {/* Background & Problem Statement */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>Project Background & Problem Statement</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            During the Community Service Project conducted in Kuntamukkala Village, field surveys revealed critical community challenges including children travelling ~1 km to school over unpaved muddy roads during monsoon downpours, classroom infrastructure constraints, open drainage overflow, stagnant water pooling causing mosquito breeding, and irregular waste disposal.
          </p>
        </div>

        {/* Objectives */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Key Project Objectives</span>
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
            <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
              • Digitize issue reporting and track resolution transparently across village streets.
            </li>
            <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
              • Conduct 22-question multi-section household surveys for Gram Panchayat decision-making.
            </li>
            <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
              • Expedite gravel road surfacing for school routes and classroom upgrades.
            </li>
            <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
              • Direct sanitation teams to clear choked drains and eliminate stagnant mosquito breeding sites.
            </li>
          </ul>
        </div>

        {/* Technology Architecture */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-600" />
            <span>Full-Stack Architecture</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <p className="font-bold text-emerald-600">Frontend</p>
              <p className="text-slate-600 dark:text-slate-400 mt-1">React 19, Vite, Tailwind CSS v4, Recharts</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <p className="font-bold text-blue-600">Backend</p>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Node.js, Express.js REST APIs, Multer</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <p className="font-bold text-purple-600">Database</p>
              <p className="text-slate-600 dark:text-slate-400 mt-1">MongoDB, Mongoose Schemas & Aggregations</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
              <p className="font-bold text-amber-600">Security</p>
              <p className="text-slate-600 dark:text-slate-400 mt-1">JWT Tokens, bcrypt password hashing, RBAC</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
