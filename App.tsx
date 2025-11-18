
import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { TaskFeed } from './pages/worker/TaskFeed';
import { CreateTask } from './pages/advertiser/CreateTask';
import { WalletPage } from './pages/Wallet';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLogin } from './pages/admin/AdminLogin';
import { DashboardHome } from './pages/DashboardHome';
import { Settings } from './pages/Settings';

// Layout for public pages (Home, Login)
const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Outlet />
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
            <p className="text-center text-base text-slate-400">&copy; 2023 MicroGigs Nigeria. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Layout for dashboard pages (Worker, Advertiser, Admin)
const DashboardLayout: React.FC = () => {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
                <Sidebar />
                <main className="flex-1 py-6 md:px-6 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Dedicated Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* The index page now intelligently renders based on role */}
            <Route index element={<DashboardHome />} />
            
            {/* Specific sub-routes */}
            <Route path="jobs" element={<TaskFeed />} />
            <Route path="create-task" element={<CreateTask />} />
            <Route path="wallet" element={<WalletPage />} />
            
            {/* Placeholders / Shared Routes */}
            <Route path="submissions" element={<div className="p-4">Submission Management / History Placeholder</div>} />
            <Route path="profile" element={<Settings />} />
            
            {/* Admin */}
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="users" element={<div className="p-4">Admin User Management Placeholder</div>} />
          </Route>

          {/* Separate route for settings that still uses dashboard layout if accessed directly */}
           <Route path="/settings" element={<DashboardLayout />}>
               <Route index element={<Settings />} />
           </Route>

        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
