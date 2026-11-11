import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  PlusCircle,
  FileCheck2,
  GraduationCap,
  Droplets,
  ClipboardList,
  BookOpen,
  ShieldAlert,
  BarChart3,
  MapPin,
  Info,
  Settings,
  UserCheck,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, isVolunteer, isAdmin } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['resident', 'volunteer', 'admin'] },
    { name: 'Report an Issue', href: '/report-issue', icon: PlusCircle, roles: ['resident', 'volunteer', 'admin'] },
    { name: 'My Complaints', href: '/my-complaints', icon: FileCheck2, roles: ['resident', 'volunteer', 'admin'] },
    { name: 'Educational Access', href: '/education-accessibility', icon: GraduationCap, roles: ['resident', 'volunteer', 'admin'] },
    { name: 'Drainage & Cleanliness', href: '/drainage-environmental', icon: Droplets, roles: ['resident', 'volunteer', 'admin'] },
    { name: 'Community Survey', href: '/community-survey', icon: ClipboardList, roles: ['resident', 'volunteer', 'admin'] },
    { name: 'Awareness Posts', href: '/awareness', icon: BookOpen, roles: ['resident', 'volunteer', 'admin'] },
  ];

  const adminNavigation = [
    { name: 'Admin Console', href: '/admin', icon: ShieldAlert, roles: ['volunteer', 'admin'] },
    { name: 'Reports & Export', href: '/reports', icon: BarChart3, roles: ['volunteer', 'admin'] },
  ];

  const infoNavigation = [
    { name: 'Village Profile', href: '/village-profile', icon: MapPin },
    { name: 'About CSP Project', href: '/about', icon: Info },
    { name: 'Account Settings', href: '/profile', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between overflow-y-auto`}
      >
        <div className="px-3 py-4 space-y-6">
          
          {/* User badge */}
          {user && (
            <div className="px-3 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 shadow-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <UserCheck className="w-3 h-3 text-emerald-500" />
                  <span className="capitalize font-medium">{user.role}</span>
                </div>
              </div>
            </div>
          )}

          {/* Main Navigation */}
          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Community Portal
            </p>
            <nav className="space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200/60 dark:border-emerald-800/60 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Admin / Volunteer Navigation */}
          {isVolunteer && (
            <div>
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400 mb-2 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                <span>Management</span>
              </p>
              <nav className="space-y-1">
                {adminNavigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200/60 dark:border-blue-800/60 shadow-2xs'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`
                    }
                  >
                    <item.icon className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          )}

          {/* Village Info Navigation */}
          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Village Info & Project
            </p>
            <nav className="space-y-1">
              {infoNavigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-[11px] text-slate-500 dark:text-slate-400">
          <p className="font-semibold text-slate-700 dark:text-slate-300">Kuntamukkala Gram Panchayat</p>
          <p>G. Konduru Mandal, NTR District</p>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">LBRCE CSE Action Framework</p>
        </div>
      </aside>
    </>
  );
};
