import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MOCK_SUBMISSIONS } from '../../services/mockData';
import { 
  DollarSign, 
  Copy, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  ListTodo, 
  User, 
  Settings,
  Briefcase,
  ChevronRight
} from 'lucide-react';

export const WorkerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const referralLink = `https://microgigs.com/register?ref=${user?.username}`;

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ActionCard = ({ title, description, icon: Icon, colorClass, link }: any) => (
    <Link to={link} className="group relative bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-primary-200 transition-all duration-200 flex flex-col items-start">
      <div className={`p-3 rounded-lg ${colorClass} mb-4 group-hover:scale-110 transition-transform duration-200`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">{title}</h3>
      <p className="text-sm text-slate-500 mt-1 mb-4">{description}</p>
      <div className="mt-auto flex items-center text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0">
        Go now <ChevronRight className="h-4 w-4 ml-1" />
      </div>
    </Link>
  );

  return (
    <div className="space-y-8 pb-10">
      {/* Header & Wallet Summary */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-10 text-white shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Total Balance</p>
                <h1 className="text-4xl sm:text-5xl font-bold flex items-center">
                    ₦{user?.balance.toLocaleString()}
                </h1>
                <p className="text-slate-300 mt-2">Welcome back, <span className="font-semibold text-white">{user?.name}</span></p>
            </div>
            <div className="flex gap-3">
                <Link to="/dashboard/wallet" className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-lg font-medium transition-colors">
                    <ArrowUpRight className="h-4 w-4 mr-2" /> Withdraw
                </Link>
            </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-slate-900">{MOCK_SUBMISSIONS.filter(s => s.status === 'APPROVED').length}</span>
            <span className="text-xs text-slate-500 uppercase mt-1 font-medium">Tasks Done</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-yellow-600">{MOCK_SUBMISSIONS.filter(s => s.status === 'PENDING').length}</span>
            <span className="text-xs text-slate-500 uppercase mt-1 font-medium">Pending</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-slate-900">{user?.referralCount || 0}</span>
            <span className="text-xs text-slate-500 uppercase mt-1 font-medium">Referrals</span>
        </div>
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <span className={`text-sm font-bold px-2 py-1 rounded-full ${user?.kycStatus === 'VERIFIED' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                {user?.kycStatus || 'NONE'}
            </span>
            <span className="text-xs text-slate-500 uppercase mt-1 font-medium">KYC Status</span>
        </div>
      </div>

      {/* Main Actions Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ActionCard 
                title="Find New Tasks" 
                description="Browse available micro-jobs and start earning immediately."
                icon={ListTodo}
                colorClass="bg-blue-100 text-blue-600"
                link="/dashboard/jobs"
            />
            <ActionCard 
                title="My Submissions" 
                description="Track status of your work and view earnings history."
                icon={Briefcase}
                colorClass="bg-purple-100 text-purple-600"
                link="/dashboard/submissions"
            />
            <ActionCard 
                title="Account Settings" 
                description="Update profile, change password, and manage notifications."
                icon={Settings}
                colorClass="bg-slate-100 text-slate-600"
                link="/settings"
            />
        </div>
      </div>

      {/* Referral Card */}
      <div className="bg-gradient-to-r from-primary-50 to-white p-6 rounded-xl border border-primary-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <h3 className="text-lg font-bold text-primary-900 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-primary-600" />
                    Refer & Earn
                </h3>
                <p className="text-primary-700 text-sm mt-1 max-w-xl">
                    Invite friends to MicroGigs. You earn a bonus for every active user you refer.
                </p>
            </div>
            <div className="flex items-center bg-white rounded-lg border border-primary-200 p-1 pr-2 w-full md:w-auto shadow-sm">
                 <code className="text-xs sm:text-sm text-slate-600 px-3 py-2 font-mono bg-slate-50 rounded">
                    {referralLink}
                 </code>
                 <button 
                    onClick={copyReferral}
                    className="ml-2 p-2 text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                    title="Copy Link"
                 >
                    {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                 </button>
            </div>
        </div>
      </div>

    </div>
  );
};