import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Building2,
  Sun,
  Moon,
  User as UserIcon,
  LogOut,
  Bell,
  ShieldCheck,
  Menu,
  X,
  FileText,
  AlertTriangle,
  Award,
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, logout, isAdmin, isVolunteer } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { label: 'Explore Village', path: '/village-profile' },
    { label: 'Educational Action', path: '/education-accessibility' },
    { label: 'Drainage & Cleanliness', path: '/drainage-environmental' },
    { label: 'Survey', path: '/community-survey' },
    { label: 'Awareness', path: '/awareness' },
  ];

  const isCurrent = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 sm:gap-8">
          
          {/* Zone 1: Brand title, single line */}
          <div className="flex items-center gap-3 shrink-0">
            {user && (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle navigation drawer"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2.5 group whitespace-nowrap shrink-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight leading-tight">
                  Kuntamukkala <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">Connect</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Zone 2: 4-5 concise nav links (1-2 word labels, single line) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  isCurrent(link.path)
                    ? 'text-emerald-600 dark:text-emerald-400 border-emerald-600 dark:border-emerald-400 font-semibold'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-white hover:border-slate-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Zone 3: 1 primary action & User profile menu */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold flex items-center justify-center text-sm border border-emerald-200 dark:border-emerald-800">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-none truncate max-w-[120px]">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize mt-0.5">
                      {user.role}
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 text-sm"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                      <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">
                        <ShieldCheck className="w-3 h-3" />
                        <span className="capitalize">{user.role} Account</span>
                      </div>
                    </div>

                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>Resident Dashboard</span>
                    </Link>

                    {isVolunteer && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <Link
                      to="/report-issue"
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Report New Issue</span>
                    </Link>

                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <UserIcon className="w-4 h-4 text-slate-500" />
                      <span>Account Settings</span>
                    </Link>

                    <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-left font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
                >
                  Sign In
                </Link>
                <Link
                  to="/report-issue"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0"
                >
                  Report an Issue
                </Link>
              </div>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300"
              aria-label="Toggle mobile menu"
            >
              {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileNavOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileNavOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileNavOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileNavOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold"
                >
                  Register Resident Account
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                onClick={() => setMobileNavOpen(false)}
                className="w-full text-center px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-sm font-medium"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
