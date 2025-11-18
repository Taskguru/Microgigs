
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Notification, KYCStatus } from '../types';
import { MOCK_USER, MOCK_NOTIFICATIONS } from '../services/mockData';

interface AuthContextType {
  user: User | null;
  notifications: Notification[];
  isAuthenticated: boolean;
  login: (role: UserRole, overrides?: Partial<User>) => void;
  register: (name: string, email: string, role: UserRole, username: string, phoneNumber: string) => void;
  logout: () => void;
  updateBalance: (amount: number) => void;
  switchRole: () => void;
  markNotificationRead: (id: string) => void;
  submitKYC: (docType: string, file: File) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Simulate session persistence
  useEffect(() => {
    const storedUser = localStorage.getItem('microgigs_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // Load mock notifications for demo
      setNotifications(MOCK_NOTIFICATIONS);
    }
  }, []);

  const login = (role: UserRole, overrides?: Partial<User>) => {
    const newUser = { ...MOCK_USER, role, ...overrides };
    setUser(newUser);
    setNotifications(MOCK_NOTIFICATIONS);
    localStorage.setItem('microgigs_user', JSON.stringify(newUser));
  };

  const register = (name: string, email: string, role: UserRole, username: string, phoneNumber: string) => {
    const uniqueId = phoneNumber.length >= 6 ? phoneNumber.slice(-6) : Math.random().toString().slice(2, 8);
    
    const newUser: User = {
      id: uniqueId,
      name,
      email,
      role,
      username,
      phoneNumber,
      balance: 0,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      status: 'ACTIVE',
      joinedAt: new Date().toISOString().split('T')[0],
      kycStatus: 'NONE',
      referralCount: 0
    };
    
    setUser(newUser);
    setNotifications([]);
    localStorage.setItem('microgigs_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setNotifications([]);
    localStorage.removeItem('microgigs_user');
  };

  const updateBalance = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, balance: user.balance + amount };
      setUser(updatedUser);
      localStorage.setItem('microgigs_user', JSON.stringify(updatedUser));
    }
  };

  const switchRole = () => {
    if (user) {
      const newRole = user.role === UserRole.WORKER ? UserRole.ADVERTISER : UserRole.WORKER;
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      localStorage.setItem('microgigs_user', JSON.stringify(updatedUser));
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const submitKYC = async (docType: string, file: File) => {
    // Simulate API Call
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            if (user) {
                const updatedUser = { ...user, kycStatus: 'PENDING' as KYCStatus };
                setUser(updatedUser);
                localStorage.setItem('microgigs_user', JSON.stringify(updatedUser));
                
                // Add notification
                const newNotif: Notification = {
                    id: `n${Date.now()}`,
                    userId: user.id,
                    title: 'KYC Submitted',
                    message: 'Your identity verification documents have been received and are under review.',
                    type: 'INFO',
                    read: false,
                    createdAt: new Date().toISOString()
                };
                setNotifications(prev => [newNotif, ...prev]);
            }
            resolve();
        }, 1500);
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateBalance, switchRole, notifications, markNotificationRead, submitKYC }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
