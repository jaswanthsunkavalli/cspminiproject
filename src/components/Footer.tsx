import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, GraduationCap, MapPin, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand & Village Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                Kuntamukkala <span className="text-emerald-400">Connect</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smart Village Community Management System for digitizing problem reporting, education accessibility, drainage maintenance, and vector control in Kuntamukkala Village.
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-1.5 font-medium text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Kuntamukkala GP, G. Konduru Mandal, NTR District, AP - 521230</span>
              </p>
            </div>
          </div>

          {/* Col 2: Action Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Action Modules</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/education-accessibility" className="hover:text-emerald-400 transition-colors">
                  Educational Accessibility & School Transit
                </Link>
              </li>
              <li>
                <Link to="/drainage-environmental" className="hover:text-emerald-400 transition-colors">
                  Drainage & Environmental Cleanliness
                </Link>
              </li>
              <li>
                <Link to="/community-survey" className="hover:text-emerald-400 transition-colors">
                  22-Question Household CSP Survey
                </Link>
              </li>
              <li>
                <Link to="/report-issue" className="hover:text-emerald-400 transition-colors">
                  Submit Resident Complaint
                </Link>
              </li>
              <li>
                <Link to="/awareness" className="hover:text-emerald-400 transition-colors">
                  Community Awareness Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Village Information */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Village Information</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/village-profile" className="hover:text-emerald-400 transition-colors">
                  Gram Panchayat Demographics (Census 2011)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  Community Service Project (CSP) Framework
                </Link>
              </li>
              <li>
                <Link to="/my-complaints" className="hover:text-emerald-400 transition-colors">
                  Track Complaint Status (KNT-2026)
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-emerald-400 transition-colors">
                  Public Analytics & Resolution Export
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Academic Attribution */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Academic Framework</h4>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
                <GraduationCap className="w-4 h-4" />
                <span>LBRCE Mini-Project</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Lakireddy Bali Reddy College of Engineering (Autonomous)
              </p>
              <p className="text-[11px] text-slate-400">
                Department of Computer Science & Engineering
              </p>
              <p className="text-[10px] text-slate-400 border-t border-slate-700 pt-1 mt-1">
                Project Guide: Mr. N. Srikanth, Sr. Asst. Professor
              </p>
              <p className="text-[10px] text-slate-400">
                CSP Period: 30 April 2026 – 12 June 2026
              </p>
            </div>
          </div>
        </div>

        {/* Hairline Divider */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Kuntamukkala Gram Panchayat & LBRCE CSE. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/about" className="hover:text-white transition-colors">About Project</Link>
            <span>·</span>
            <Link to="/village-profile" className="hover:text-white transition-colors">Village Census</Link>
            <span>·</span>
            <span className="flex items-center gap-1 text-slate-400">
              Built with <Heart className="w-3 h-3 text-red-500 fill-current" /> for Kuntamukkala
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
