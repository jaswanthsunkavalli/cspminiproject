import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, Eye, EyeOff, LogIn, UserPlus, Shield, User, HeartHandshake } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const location = useLocation();
  const isRegister = location.pathname === '/register';
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegister) {
        if (!formData.name || !formData.email || !formData.password) {
          setError('Please fill in all mandatory fields.');
          setLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters long.');
          setLoading(false);
          return;
        }

        const user = await register(formData);
        navigate(user.role === 'admin' ? '/admin' : '/dashboard');
      } else {
        if (!formData.email || !formData.password) {
          setError('Please enter both email and password.');
          setLoading(false);
          return;
        }

        const user = await login(formData.email, formData.password);
        navigate(user.role === 'admin' || user.role === 'volunteer' ? '/admin' : '/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (email: string, pass: string) => {
    setFormData((prev) => ({
      ...prev,
      email,
      password: pass,
    }));
    setError(null);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {isRegister ? 'Register Resident Account' : 'Sign in to Kuntamukkala Connect'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isRegister
              ? 'Public registration creates Resident accounts for Kuntamukkala Village.'
              : 'Enter your credentials to access your dashboard and submit complaints.'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Varma"
                  required={isRegister}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. resident@kuntamukkala.gov.in"
                required
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9848012345"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required={isRegister}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : isRegister ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Register Resident Account</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Bar */}
          {!isRegister && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Quick Demo Credentials (One-Click Fill)
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoAccount('resident@kuntamukkala.gov.in', 'resident123')}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 flex flex-col items-center gap-1 font-medium"
                >
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Resident</span>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('volunteer@kuntamukkala.gov.in', 'volunteer123')}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 flex flex-col items-center gap-1 font-medium"
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-blue-600" />
                  <span>Volunteer</span>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('admin@kuntamukkala.gov.in', 'admin123')}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 flex flex-col items-center gap-1 font-medium"
                >
                  <Shield className="w-3.5 h-3.5 text-purple-600" />
                  <span>Admin</span>
                </button>
              </div>
            </div>
          )}

          {/* Switch link */}
          <div className="text-center text-xs text-slate-500">
            {isRegister ? (
              <p>
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-emerald-600 hover:underline">
                  Sign in here
                </Link>
              </p>
            ) : (
              <p>
                Don't have a resident account?{' '}
                <Link to="/register" className="font-bold text-emerald-600 hover:underline">
                  Register here
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
