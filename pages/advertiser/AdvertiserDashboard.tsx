import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_TASKS } from '../../services/mockData';
import { useAuth } from '../../context/AuthContext';
import { 
    BarChart3, 
    Users, 
    CheckSquare, 
    PlusCircle, 
    ArrowDownLeft, 
    RefreshCw, 
    Wallet, 
    ChevronRight,
    Megaphone
} from 'lucide-react';

export const AdvertiserDashboard: React.FC = () => {
  const { user, switchRole } = useAuth();
  const myTasks = MOCK_TASKS.filter(t => t.advertiserId === 'a1'); // Mock ID filter

  const DashboardButton = ({ title, subtitle, icon: Icon, colorClass, link, onClick }: any) => {
      const content = (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
                <div className={`p-3 rounded-full mr-4 ${colorClass}`}>
                    <Icon className="h-6 w-6" />
                </div>
                <div className="text-left">
                    <h3 className="text-base font-bold text-slate-900">{title}</h3>
                    <p className="text-xs text-slate-500">{subtitle}</p>
                </div>
            </div>
            <div className="bg-slate-50 p-2 rounded-full group-hover:bg-white transition-colors">
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600" />
            </div>
        </div>
      );

      if (link) {
          return (
            <Link to={link} className="group bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary-300 transition-all duration-200 flex">
                {content}
            </Link>
          );
      }
      
      return (
        <button onClick={onClick} className="group bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary-300 transition-all duration-200 flex w-full">
            {content}
        </button>
      );
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center">
            <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mr-4">
                <Megaphone className="h-6 w-6" />
            </div>
            <div>
                <h1 className="text-xl font-bold text-slate-900">Advertiser Dashboard</h1>
                <p className="text-sm text-slate-500">Manage your campaigns and worker submissions.</p>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
             <div className="flex items-center bg-slate-100 rounded-lg px-4 py-2">
                <Wallet className="h-4 w-4 text-slate-500 mr-2" />
                <span className="font-bold text-slate-900">₦{user?.balance.toLocaleString()}</span>
             </div>
             <button 
                onClick={switchRole}
                className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none transition-colors"
            >
                <RefreshCw className="mr-2 h-4 w-4 text-slate-500" />
                Worker View
            </button>
        </div>
      </div>

      {/* Command Center */}
      <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Command Center</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardButton 
                title="Post New Campaign" 
                subtitle="Create tasks for workers" 
                icon={PlusCircle} 
                colorClass="bg-primary-100 text-primary-600"
                link="/dashboard/create-task"
            />
            <DashboardButton 
                title="Fund Wallet" 
                subtitle="Add funds via Paystack" 
                icon={ArrowDownLeft} 
                colorClass="bg-green-100 text-green-600"
                link="/dashboard/wallet"
            />
            <DashboardButton 
                title="Review Submissions" 
                subtitle="Approve or reject proofs" 
                icon={Users} 
                colorClass="bg-orange-100 text-orange-600"
                link="/dashboard/submissions"
            />
          </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total Spend</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">₦125k</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Active Tasks</p>
            <p className="mt-2 text-2xl font-bold text-primary-600">{myTasks.filter(t => t.status === 'ACTIVE').length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Completions</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">1,234</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Conversion Rate</p>
            <p className="mt-2 text-2xl font-bold text-green-600">94%</p>
        </div>
      </div>

      {/* Campaign List */}
      <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-slate-900">Recent Campaigns</h3>
            <Link to="/dashboard/create-task" className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</Link>
        </div>
        <ul className="divide-y divide-slate-100">
          {myTasks.slice(0, 5).map((task) => (
            <li key={task.id} className="hover:bg-slate-50 transition-colors">
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center min-w-0">
                    <div className={`h-2 w-2 rounded-full mr-3 ${task.status === 'ACTIVE' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                    <div>
                        <p className="text-sm font-medium text-slate-900 truncate">{task.title}</p>
                        <p className="text-xs text-slate-500">{task.filledSlots} / {task.totalSlots} slots filled</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 mr-4">
                        ₦{task.reward} / task
                    </span>
                    <Link to="/dashboard/submissions" className="text-slate-400 hover:text-primary-600">
                        <ChevronRight className="h-5 w-5" />
                    </Link>
                </div>
              </div>
            </li>
          ))}
           {myTasks.length === 0 && (
              <li className="px-6 py-10 text-center text-slate-500 text-sm">
                  You haven't posted any campaigns yet.
                  <br />
                  <Link to="/dashboard/create-task" className="text-primary-600 font-medium mt-2 inline-block">Start your first campaign</Link>
              </li>
          )}
        </ul>
      </div>
    </div>
  );
};