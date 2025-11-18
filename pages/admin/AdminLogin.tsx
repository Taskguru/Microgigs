
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Shield, Lock, AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate server-side security check
    setTimeout(() => {
      // Hardcoded credentials for demonstration
      // In production, this would be a secure API call
      if (email.toLowerCase() === 'admin@microgigs.com' && password === 'admin123') {
        login(UserRole.ADMIN, {
            id: 'admin-root',
            name: 'System Administrator',
            email: 'admin@microgigs.com',
            username: 'sysadmin',
            avatarUrl: 'https://ui-avatars.com/api/?name=System+Admin&background=0f172a&color=fff',
            kycStatus: 'VERIFIED'
        });
        navigate('/dashboard/admin');
      } else {
        setError('Access Denied: Invalid administrative credentials.');
        setIsLoading(false);
        setPassword(''); // Clear password on failure
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900 opacity-50"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-900/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full space-y-8 bg-slate-800/50 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-slate-700 z-10">
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 bg-gradient-to-b from-slate-700 to-slate-800 rounded-full flex items-center justify-center mb-6 border border-slate-600 shadow-lg ring-4 ring-slate-800">
             <Shield className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
            Restricted Access
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            MicroGigs Administration Portal
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
              <div className="bg-red-900/30 border border-red-800/50 text-red-200 px-4 py-3 rounded-lg flex items-start text-sm animate-pulse">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
              </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Admin Identity</label>
              <div className="relative">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoFocus
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-600 placeholder-slate-500 text-white bg-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm transition-all"
                  placeholder="admin@microgigs.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Security Key</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-600 placeholder-slate-500 text-white bg-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent sm:text-sm transition-all pr-10"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Please contact the IT Security Team at security@microgigs.com to reset your admin credentials.'); }} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                  Forgot Security Key?
                </a>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-red-300 group-hover:text-red-200 transition-colors" aria-hidden="true" />
              </span>
              {isLoading ? 'Authenticating...' : 'Authenticate Session'}
            </button>
          </div>
          
          <div className="text-center pt-4 border-t border-slate-700">
             <button 
                type="button" 
                onClick={() => navigate('/')} 
                className="inline-flex items-center text-xs text-slate-500 hover:text-slate-300 transition-colors"
             >
                <ArrowLeft className="h-3 w-3 mr-1" /> Return to Platform
             </button>
          </div>
        </form>
      </div>
      <div className="absolute bottom-4 text-slate-600 text-xs">
          Authorized Personnel Only &bull; IP Logged
      </div>
    </div>
  );
};
