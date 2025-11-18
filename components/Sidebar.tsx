import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ListTodo, Wallet, PlusCircle, Settings, Briefcase, Users, Shield, UserCircle, BarChart2 } from 'lucide-react';
import { UserRole } from '../types';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const linkClass = (path: string) => `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors mb-1 ${
    isActive(path) 
      ? 'bg-primary-50 text-primary-700' 
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
  }`;

  return (
    <div className="w-64 bg-white h-[calc(100vh-4rem)] border-r border-slate-200 hidden md:block overflow-y-auto sticky top-16">
      <div className="p-4">
        <div className="mb-6 flex items-center space-x-3 px-2">
          <img src={user?.avatarUrl} alt="Avatar" className="h-10 w-10 rounded-full border border-slate-200" />
          <div>
            <p className="text-sm font-medium text-slate-900 truncate w-32">{user?.name}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wide">{user?.role}</p>
          </div>
        </div>

        <nav>
          {/* Common Dashboard Link (redirects based on role) */}
           <Link to="/dashboard" className={linkClass('/dashboard')}>
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
            </Link>

          {user?.role === UserRole.WORKER && (
            <>
              <div className="px-4 mt-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Task Zone</div>
              <Link to="/dashboard/jobs" className={linkClass('/dashboard/jobs')}>
                <ListTodo className="mr-3 h-5 w-5" />
                Available Tasks
              </Link>
              <Link to="/dashboard/submissions" className={linkClass('/dashboard/submissions')}>
                <Briefcase className="mr-3 h-5 w-5" />
                My Submissions
              </Link>
              
              <div className="px-4 mt-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Profile</div>
              <Link to="/dashboard/profile" className={linkClass('/dashboard/profile')}>
                <UserCircle className="mr-3 h-5 w-5" />
                My Profile
              </Link>
            </>
          )}

          {user?.role === UserRole.ADVERTISER && (
            <>
              <div className="px-4 mt-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Campaigns</div>
              <Link to="/dashboard/create-task" className={linkClass('/dashboard/create-task')}>
                <PlusCircle className="mr-3 h-5 w-5" />
                Create Campaign
              </Link>
              <Link to="/dashboard/submissions" className={linkClass('/dashboard/submissions')}>
                <Users className="mr-3 h-5 w-5" />
                Review Submissions
              </Link>
            </>
          )}

          {user?.role === UserRole.ADMIN && (
            <>
             <div className="px-4 mt-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Administration</div>
              <Link to="/dashboard/admin" className={linkClass('/dashboard/admin')}>
                <Shield className="mr-3 h-5 w-5" />
                Admin Settings
              </Link>
              <Link to="/dashboard/users" className={linkClass('/dashboard/users')}>
                <Users className="mr-3 h-5 w-5" />
                Manage Users
              </Link>
            </>
          )}

          <div className="px-4 mt-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Finance</div>
          <Link to="/dashboard/wallet" className={linkClass('/dashboard/wallet')}>
            <Wallet className="mr-3 h-5 w-5" />
            {user?.role === UserRole.ADVERTISER ? 'Wallet & Deposits' : 'Wallet & Withdraw'}
          </Link>
          
          <div className="px-4 mt-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Account</div>
          <Link to="/settings" className={linkClass('/settings')}>
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
        </nav>
      </div>
    </div>
  );
};