
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut, User as UserIcon, Wallet, Bell, CheckCircle, Info, AlertTriangle, AlertCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, notifications, markNotificationRead } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch(type) {
        case 'SUCCESS': return <CheckCircle className="h-4 w-4 text-green-500" />;
        case 'WARNING': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
        case 'ERROR': return <AlertCircle className="h-4 w-4 text-red-500" />;
        default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-600 tracking-tight">MicroGigs</span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-slate-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">Log in</Link>
                <Link to="/register" className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">Sign Up</Link>
              </>
            ) : (
              <>
                <div className="flex items-center mr-2 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                   <Wallet className="h-4 w-4 text-primary-600 mr-2" />
                   <span className="text-sm font-semibold text-slate-700">₦{user?.balance.toLocaleString()}</span>
                </div>

                {/* Notification Bell */}
                <div className="relative ml-2">
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-1 rounded-full text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        <span className="sr-only">View notifications</span>
                        <Bell className="h-6 w-6" />
                        {unreadCount > 0 && (
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                        )}
                    </button>

                    {showNotifications && (
                        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                             <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                                 <span className="text-sm font-bold text-slate-700">Notifications</span>
                                 <span className="text-xs text-slate-500">{unreadCount} unread</span>
                             </div>
                             <div className="max-h-64 overflow-y-auto">
                                 {notifications.length === 0 ? (
                                     <div className="px-4 py-4 text-sm text-slate-500 text-center">No notifications</div>
                                 ) : (
                                     notifications.map(notif => (
                                         <div 
                                            key={notif.id} 
                                            className={`px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 ${!notif.read ? 'bg-blue-50/50' : ''}`}
                                            onClick={() => markNotificationRead(notif.id)}
                                         >
                                             <div className="flex items-start">
                                                 <div className="flex-shrink-0 mt-0.5 mr-3">
                                                     {getNotificationIcon(notif.type)}
                                                 </div>
                                                 <div>
                                                     <p className={`text-sm font-medium ${!notif.read ? 'text-slate-900' : 'text-slate-600'}`}>{notif.title}</p>
                                                     <p className="text-xs text-slate-500 mt-0.5">{notif.message}</p>
                                                     <p className="text-xs text-slate-400 mt-1">{new Date(notif.createdAt).toLocaleDateString()}</p>
                                                 </div>
                                             </div>
                                         </div>
                                     ))
                                 )}
                             </div>
                        </div>
                    )}
                </div>

                <Link to="/dashboard" className="text-slate-600 hover:text-primary-600 text-sm font-medium ml-2">Dashboard</Link>
                <button onClick={handleLogout} className="flex items-center text-slate-500 hover:text-red-600 ml-4">
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none">
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200">
          <div className="pt-2 pb-3 space-y-1">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50">Log in</Link>
                <Link to="/register" className="block px-3 py-2 text-base font-medium text-primary-600 hover:bg-slate-50">Sign Up</Link>
              </>
            ) : (
              <>
                <div className="px-3 py-2 text-base font-medium text-slate-800">
                   Balance: ₦{user?.balance.toLocaleString()}
                </div>
                <Link to="/dashboard" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50">Dashboard</Link>
                <Link to="/settings" className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50">Settings</Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-base font-medium text-red-500 hover:bg-slate-50">Log out</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
