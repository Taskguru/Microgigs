import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { WorkerDashboard } from './worker/WorkerDashboard';
import { AdvertiserDashboard } from './advertiser/AdvertiserDashboard';
import { AdminDashboard } from './admin/AdminDashboard';

export const DashboardHome: React.FC = () => {
  const { user } = useAuth();

  if (user?.role === UserRole.ADMIN) {
    return <AdminDashboard />;
  }

  if (user?.role === UserRole.ADVERTISER) {
    return <AdvertiserDashboard />;
  }

  return <WorkerDashboard />;
};