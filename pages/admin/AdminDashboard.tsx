
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  DollarSign, 
  CreditCard, 
  Save, 
  CheckCircle, 
  XCircle, 
  Briefcase,
  Users,
  Search,
  Eye,
  EyeOff,
  ExternalLink,
  BarChart2,
  ShieldAlert,
  Trash2,
  PauseCircle,
  Plus,
  FileText,
  Shield,
  ArrowUpRight,
  PlayCircle
} from 'lucide-react';
import { 
  MOCK_ADMIN_CONFIG, 
  MOCK_DEPOSITS, 
  MOCK_WITHDRAWALS, 
  MOCK_ALL_USERS, 
  MOCK_TASKS, 
  MOCK_TRANSACTIONS, 
  MOCK_DISPUTES,
  MOCK_CATEGORIES,
  MOCK_ADMIN_STATS,
  MOCK_KYC_REQUESTS
} from '../../services/mockData';
import { Deposit, WithdrawalRequest, User, Task, Dispute, Category, UserStatus, Transaction, TaskStatus, KYCRequest } from '../../types';

type AdminTab = 'dashboard' | 'users' | 'tasks' | 'finance' | 'disputes' | 'kyc' | 'settings';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  
  // Data States
  const [config, setConfig] = useState(MOCK_ADMIN_CONFIG);
  const [users, setUsers] = useState<User[]>(MOCK_ALL_USERS);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [deposits, setDeposits] = useState<Deposit[]>(MOCK_DEPOSITS);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(MOCK_WITHDRAWALS);
  const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [disputes, setDisputes] = useState<Dispute[]>(MOCK_DISPUTES);
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [kycRequests, setKycRequests] = useState<KYCRequest[]>(MOCK_KYC_REQUESTS);
  
  // UI States
  const [saveMessage, setSaveMessage] = useState('');
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryPrice, setNewCategoryPrice] = useState(0);
  
  // --- Action Handlers ---

  const handleConfigChange = (key: keyof typeof config, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveMessage('Configuration saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleUserStatusChange = (userId: string, status: UserStatus) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status } : u));
  };

  const handleTaskAction = (taskId: string, action: 'APPROVE' | 'REJECT' | 'PAUSE' | 'ACTIVATE' | 'DELETE') => {
    if (action === 'DELETE') {
        setTasks(tasks.filter(t => t.id !== taskId));
    } else if (action === 'APPROVE' || action === 'ACTIVATE') {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, status: TaskStatus.ACTIVE } : t));
    } else if (action === 'REJECT') {
         setTasks(tasks.map(t => t.id === taskId ? { ...t, status: TaskStatus.REJECTED } : t));
    } else if (action === 'PAUSE') {
         setTasks(tasks.map(t => t.id === taskId ? { ...t, status: TaskStatus.PAUSED } : t));
    }
  };

  const handleDepositAction = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setDeposits(prev => prev.map(d => d.id === id ? { ...d, status } : d));
  };

  const handleWithdrawalAction = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setWithdrawals(prev => prev.map(w => w.id === id ? { ...w, status } : w));
  };

  const handleDisputeResolve = (id: string, result: 'RESOLVED_WORKER' | 'RESOLVED_ADVERTISER') => {
    setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: result } : d));
  };

  const handleKYCAction = (id: string, status: 'VERIFIED' | 'REJECTED') => {
    setKycRequests(prev => prev.map(k => k.id === id ? { ...k, status } : k));
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName && newCategoryPrice > 0) {
      setCategories([...categories, { id: `c${Date.now()}`, name: newCategoryName, minPrice: newCategoryPrice }]);
      setNewCategoryName('');
      setNewCategoryPrice(0);
    }
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  // Filtered Lists
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const QuickStatCard = ({ label, value, icon: Icon, color, onClick }: any) => (
      <div onClick={onClick} className="bg-white overflow-hidden shadow rounded-lg border border-slate-200 p-5 cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center">
              <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
                  <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                  <dl>
                      <dt className="text-sm font-medium text-slate-500 truncate">{label}</dt>
                      <dd className="text-2xl font-bold text-slate-900">{value}</dd>
                  </dl>
              </div>
          </div>
      </div>
  );

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Control Panel</h1>
            <p className="text-sm text-slate-500">Overview and management of the MicroGigs platform.</p>
        </div>
      </div>

      {/* Navigation Tabs - Modernized */}
      <div className="bg-white shadow-sm rounded-lg border border-slate-200 p-1 mb-6 inline-flex flex-wrap gap-1">
           {[
             { id: 'dashboard', label: 'Overview', icon: BarChart2 },
             { id: 'users', label: 'Users', icon: Users },
             { id: 'kyc', label: 'KYC', icon: Shield },
             { id: 'tasks', label: 'Tasks', icon: FileText },
             { id: 'finance', label: 'Finance', icon: DollarSign },
             { id: 'disputes', label: 'Disputes', icon: ShieldAlert },
             { id: 'settings', label: 'Settings', icon: SettingsIcon },
           ].map((tab) => (
             <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === tab.id 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
             >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
             </button>
           ))}
      </div>

      {/* ================= DASHBOARD OVERVIEW ================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <QuickStatCard 
                    label="Total Users" 
                    value={MOCK_ADMIN_STATS.totalUsers.toLocaleString()} 
                    icon={Users} 
                    color="bg-blue-500" 
                    onClick={() => setActiveTab('users')}
                />
                <QuickStatCard 
                    label="Daily Revenue" 
                    value={`₦${MOCK_ADMIN_STATS.dailyEarnings.toLocaleString()}`} 
                    icon={DollarSign} 
                    color="bg-green-500" 
                    onClick={() => setActiveTab('finance')}
                />
                <QuickStatCard 
                    label="Pending Withdrawals" 
                    value={withdrawals.filter(w => w.status === 'PENDING').length} 
                    icon={Briefcase} 
                    color="bg-yellow-500" 
                    onClick={() => setActiveTab('finance')}
                />
                <QuickStatCard 
                    label="Pending Tasks" 
                    value={tasks.filter(t => t.status === TaskStatus.PENDING).length} 
                    icon={FileText} 
                    color="bg-purple-500" 
                    onClick={() => setActiveTab('tasks')}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded-lg border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Pending Actions</h3>
                    <ul className="space-y-4">
                        <li 
                            onClick={() => setActiveTab('kyc')}
                            className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
                        >
                            <div className="flex items-center">
                                <Shield className="h-5 w-5 text-red-600 mr-3" />
                                <span className="font-medium text-red-900">{kycRequests.filter(k => k.status === 'PENDING').length} KYC Requests Pending</span>
                            </div>
                            <ArrowUpRight className="h-4 w-4 text-red-600" />
                        </li>
                        <li 
                            onClick={() => setActiveTab('finance')}
                            className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                        >
                            <div className="flex items-center">
                                <DollarSign className="h-5 w-5 text-blue-600 mr-3" />
                                <span className="font-medium text-blue-900">{deposits.filter(d => d.status === 'PENDING').length} Deposits to Approve</span>
                            </div>
                            <ArrowUpRight className="h-4 w-4 text-blue-600" />
                        </li>
                         <li 
                            onClick={() => setActiveTab('disputes')}
                            className="flex items-center justify-between p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
                        >
                            <div className="flex items-center">
                                <ShieldAlert className="h-5 w-5 text-orange-600 mr-3" />
                                <span className="font-medium text-orange-900">{disputes.filter(d => d.status === 'OPEN').length} Open Disputes</span>
                            </div>
                            <ArrowUpRight className="h-4 w-4 text-orange-600" />
                        </li>
                    </ul>
                </div>

                <div className="bg-white shadow rounded-lg border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">System Health</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm font-medium mb-1">
                                <span>Server Load</span>
                                <span className="text-green-600">12%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                            </div>
                        </div>
                         <div>
                            <div className="flex justify-between text-sm font-medium mb-1">
                                <span>Database Capacity</span>
                                <span className="text-blue-600">45%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                         <div>
                            <div className="flex justify-between text-sm font-medium mb-1">
                                <span>Payment Gateway Status</span>
                                <span className="text-green-600">Operational</span>
                            </div>
                             <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* ================= KYC REQUESTS ================= */}
      {activeTab === 'kyc' && (
          <div className="bg-white shadow rounded-lg border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900">KYC Verification Requests</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Document</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Submitted</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {kycRequests.map(req => (
                            <tr key={req.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-slate-900">{req.userName}</div>
                                    <div className="text-xs text-slate-500">ID: {req.userId}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-900">{req.documentType}</div>
                                    <a href={req.documentUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-600 hover:text-primary-800 flex items-center mt-1">
                                        View Document <ExternalLink className="ml-1 h-3 w-3" />
                                    </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                    {new Date(req.submittedAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        req.status === 'VERIFIED' ? 'bg-green-100 text-green-800' :
                                        req.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {req.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    {req.status === 'PENDING' && (
                                        <>
                                            <button 
                                                onClick={() => handleKYCAction(req.id, 'VERIFIED')}
                                                className="text-green-600 hover:text-green-900 bg-green-50 px-2 py-1 rounded"
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                onClick={() => handleKYCAction(req.id, 'REJECTED')}
                                                className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                         {kycRequests.length === 0 && (
                             <tr><td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">No pending requests</td></tr>
                         )}
                    </tbody>
                </table>
            </div>
          </div>
      )}

      {/* ================= USERS MANAGEMENT ================= */}
      {activeTab === 'users' && (
        <div className="bg-white shadow rounded-lg border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900">User Database</h3>
                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400" />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Balance</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img className="h-8 w-8 rounded-full" src={user.avatarUrl} alt="" />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-slate-900">{user.name}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                                    ₦{user.balance.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                        user.status === 'BANNED' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    {user.status === 'ACTIVE' && (
                                        <button 
                                            onClick={() => handleUserStatusChange(user.id, 'BANNED')}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Ban
                                        </button>
                                    )}
                                    {user.status === 'BANNED' && (
                                        <button 
                                            onClick={() => handleUserStatusChange(user.id, 'ACTIVE')}
                                            className="text-green-600 hover:text-green-900"
                                        >
                                            Unban
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}

      {/* ================= TASK MANAGEMENT ================= */}
      {activeTab === 'tasks' && (
         <div className="bg-white shadow rounded-lg border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">Task Manager</h3>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                    {tasks.filter(t => t.status === TaskStatus.PENDING).length} Pending Approval
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Task Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Advertiser ID</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {tasks.map(task => (
                            <tr key={task.id}>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-slate-900">{task.title}</div>
                                    <div className="text-xs text-slate-500 truncate w-48" title={task.description}>{task.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                    {task.category} <br/>
                                    <span className="text-xs bg-slate-100 px-1 rounded">{task.platform}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                    {task.advertiserId}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        task.status === TaskStatus.ACTIVE ? 'bg-green-100 text-green-800' :
                                        task.status === TaskStatus.PENDING ? 'bg-purple-100 text-purple-800' :
                                        task.status === TaskStatus.REJECTED ? 'bg-red-100 text-red-800' :
                                        task.status === TaskStatus.PAUSED ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-slate-100 text-slate-800'
                                    }`}>
                                        {task.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    {task.status === TaskStatus.PENDING && (
                                        <>
                                            <button 
                                                onClick={() => handleTaskAction(task.id, 'APPROVE')}
                                                className="text-green-600 hover:text-green-900 bg-green-50 px-2 py-1 rounded" title="Approve"
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                onClick={() => handleTaskAction(task.id, 'REJECT')}
                                                className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded" title="Reject"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}

                                    {task.status === TaskStatus.ACTIVE && (
                                        <button 
                                            onClick={() => handleTaskAction(task.id, 'PAUSE')}
                                            className="text-yellow-600 hover:text-yellow-900" title="Pause Task"
                                        >
                                            <PauseCircle className="w-5 h-5" />
                                        </button>
                                    )}

                                    {task.status === TaskStatus.PAUSED && (
                                         <button 
                                            onClick={() => handleTaskAction(task.id, 'ACTIVATE')}
                                            className="text-green-600 hover:text-green-900" title="Resume Task"
                                        >
                                            <PlayCircle className="w-5 h-5" />
                                        </button>
                                    )}

                                    <button 
                                        onClick={() => handleTaskAction(task.id, 'DELETE')}
                                        className="text-slate-400 hover:text-red-600 ml-2" title="Delete Task"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
         </div>
      )}

      {/* ================= DISPUTES ================= */}
      {activeTab === 'disputes' && (
        <div className="bg-white shadow rounded-lg border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h3 className="text-lg font-bold text-slate-900">Dispute Resolution Center</h3>
            </div>
            <ul className="divide-y divide-slate-200">
                {disputes.map(dispute => (
                    <li key={dispute.id} className="p-6 hover:bg-slate-50">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center space-x-2">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        dispute.status === 'OPEN' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {dispute.status}
                                    </span>
                                    <span className="text-sm text-slate-500">{dispute.createdAt}</span>
                                </div>
                                <p className="mt-2 text-sm text-slate-900 font-medium">Reason: "{dispute.reason}"</p>
                                <p className="text-xs text-slate-500 mt-1">
                                    Task ID: {dispute.taskId} • Worker: {dispute.workerId} • Advertiser: {dispute.advertiserId}
                                </p>
                            </div>
                            {dispute.status === 'OPEN' && (
                                <div className="flex flex-col space-y-2">
                                    <button
                                        onClick={() => handleDisputeResolve(dispute.id, 'RESOLVED_WORKER')}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                                    >
                                        Refund Worker
                                    </button>
                                    <button
                                        onClick={() => handleDisputeResolve(dispute.id, 'RESOLVED_ADVERTISER')}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none"
                                    >
                                        Refund Advertiser
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
      )}

      {/* ================= FINANCE (Withdrawals, Deposits, Logs) ================= */}
      {activeTab === 'finance' && (
        <div className="space-y-8">
             {/* Withdrawal Requests */}
            <div className="bg-white shadow rounded-lg border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center">
                        <Briefcase className="w-5 h-5 mr-2 text-primary-600" />
                        Worker Withdrawals
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {withdrawals.filter(w => w.status === 'PENDING').length} Pending
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Details</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {withdrawals.map((w) => (
                                <tr key={w.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{w.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                        {w.userName}
                                        <span className="block text-xs text-slate-400">{w.userId}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        <p className="font-medium">{w.method.replace('_', ' ')}</p>
                                        <p className="text-xs truncate w-48" title={w.details}>{w.details}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-slate-900">
                                        ₦{w.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            w.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                            w.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {w.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        {w.status === 'PENDING' && (
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => handleWithdrawalAction(w.id, 'APPROVED')}
                                                    className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 p-1 rounded-md transition-colors"
                                                    title="Approve"
                                                >
                                                    <CheckCircle className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleWithdrawalAction(w.id, 'REJECTED')}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-1 rounded-md transition-colors"
                                                    title="Reject"
                                                >
                                                    <XCircle className="h-5 w-5" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Advertiser Deposits */}
            <div className="bg-white shadow rounded-lg border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center">
                        <Briefcase className="w-5 h-5 mr-2 text-primary-600" />
                        Advertiser Deposits
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {deposits.filter(d => d.status === 'PENDING').length} Pending
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Advertiser</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reference</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Proof</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {deposits.map((deposit) => (
                                <tr key={deposit.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{deposit.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{deposit.advertiserName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono text-xs">{deposit.reference}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {deposit.proofUrl ? (
                                            <a href={deposit.proofUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 flex items-center text-xs">
                                                View Image <ExternalLink className="h-3 w-3 ml-1" />
                                            </a>
                                        ) : (
                                            <span className="text-slate-400 text-xs">N/A</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-bold">₦{deposit.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            deposit.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                            deposit.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {deposit.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        {deposit.status === 'PENDING' && (
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => handleDepositAction(deposit.id, 'APPROVED')}
                                                    className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 p-1 rounded-md transition-colors"
                                                    title="Approve"
                                                >
                                                    <CheckCircle className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDepositAction(deposit.id, 'REJECTED')}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-1 rounded-md transition-colors"
                                                    title="Reject"
                                                >
                                                    <XCircle className="h-5 w-5" />
                                                </button>
                                            </div>
                                        )}
                                        {deposit.status !== 'PENDING' && (
                                            <span className="text-slate-400 text-xs">No actions</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payment Logs */}
            <div className="bg-white shadow rounded-lg border border-slate-200">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                    <h3 className="text-lg font-bold text-slate-900">All Payment Logs</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50 sticky top-0">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Desc</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {transactions.map(tx => (
                                <tr key={tx.id}>
                                    <td className="px-6 py-3 text-sm text-slate-500">{tx.date}</td>
                                    <td className="px-6 py-3 text-sm text-slate-900">{tx.description}</td>
                                    <td className="px-6 py-3 text-sm text-slate-500">{tx.type}</td>
                                    <td className={`px-6 py-3 text-sm text-right font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        ₦{Math.abs(tx.amount).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      )}

      {/* ================= SETTINGS ================= */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Management */}
            <div className="bg-white shadow rounded-lg border border-slate-200">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                    <h3 className="text-lg font-bold text-slate-900">Task Category Pricing</h3>
                </div>
                <div className="p-6">
                    <p className="text-xs text-slate-500 mb-4">Control pricing ranges by setting minimum prices for specific categories.</p>
                    <form onSubmit={handleAddCategory} className="flex space-x-2 mb-6">
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            className="flex-1 border-slate-300 rounded-md shadow-sm sm:text-sm border p-2"
                        />
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={newCategoryPrice || ''}
                            onChange={(e) => setNewCategoryPrice(Number(e.target.value))}
                            className="w-24 border-slate-300 rounded-md shadow-sm sm:text-sm border p-2"
                        />
                        <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-900">
                            <Plus className="w-4 h-4" />
                        </button>
                    </form>
                    <ul className="divide-y divide-slate-100">
                        {categories.map(cat => (
                            <li key={cat.id} className="py-2 flex justify-between items-center">
                                <span className="text-sm text-slate-900">{cat.name} <span className="text-xs text-slate-500 ml-2">(Min: ₦{cat.minPrice})</span></span>
                                <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-400 hover:text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

          {/* Platform Configuration */}
          <div className="bg-white shadow rounded-lg border border-slate-200 h-fit">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-primary-600" />
                Platform Economics
              </h3>
            </div>
            <div className="px-6 py-5 space-y-4">
                 <div>
                  <label className="block text-sm font-medium text-slate-700">Minimum Withdrawal Limit (₦)</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      value={config.minWithdrawalLimit}
                      onChange={(e) => handleConfigChange('minWithdrawalLimit', Number(e.target.value))}
                      className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-3 pr-12 sm:text-sm border-slate-300 rounded-md py-2"
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Workers cannot withdraw less than this amount.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Referral Bonus (₦)</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      value={config.referralBonusAmount}
                      onChange={(e) => handleConfigChange('referralBonusAmount', Number(e.target.value))}
                      className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-3 pr-12 sm:text-sm border-slate-300 rounded-md py-2"
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Amount credited to user when a referral completes verification.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Global Minimum Task Price (₦)</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      value={config.minTaskPrice}
                      onChange={(e) => handleConfigChange('minTaskPrice', Number(e.target.value))}
                      className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-3 pr-12 sm:text-sm border-slate-300 rounded-md py-2"
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Advertisers cannot set a price lower than this per worker.</p>
                </div>
            </div>
          </div>

          {/* Payment Gateway Settings */}
          <div className="bg-white shadow rounded-lg border border-slate-200 h-fit col-span-1 lg:col-span-2">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-primary-600" />
                Payment Gateway (Paystack)
              </h3>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Enable Payments</span>
                <button
                  onClick={() => handleConfigChange('paymentGatewayEnabled', !config.paymentGatewayEnabled)}
                  className={`${
                    config.paymentGatewayEnabled ? 'bg-primary-600' : 'bg-slate-200'
                  } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                >
                  <span
                    className={`${
                      config.paymentGatewayEnabled ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Public API Key</label>
                <input
                  type="text"
                  value={config.paymentGatewayPublicKey}
                  onChange={(e) => handleConfigChange('paymentGatewayPublicKey', e.target.value)}
                  className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md py-2 px-3"
                  placeholder="pk_test_..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Secret API Key</label>
                <div className="relative mt-1">
                    <input
                    type={showSecretKey ? "text" : "password"}
                    value={config.paymentGatewaySecretKey}
                    onChange={(e) => handleConfigChange('paymentGatewaySecretKey', e.target.value)}
                    className="focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md py-2 px-3 pr-10"
                    placeholder="sk_test_..."
                    />
                    <button 
                        type="button"
                        onClick={() => setShowSecretKey(!showSecretKey)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                        {showSecretKey ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                    </button>
                </div>
                <p className="mt-1 text-xs text-slate-500">Used for server-side verification.</p>
              </div>
              
               <div className="pt-4">
                  <button
                    onClick={handleSaveSettings}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-800 hover:bg-slate-900 focus:outline-none"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Update Gateway
                  </button>
                  {saveMessage && (
                      <p className="mt-2 text-sm text-green-600 text-center font-medium">{saveMessage}</p>
                  )}
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};