
export enum UserRole {
  WORKER = 'WORKER',
  ADVERTISER = 'ADVERTISER',
  ADMIN = 'ADMIN'
}

export enum TaskStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  PAUSED = 'PAUSED'
}

export enum SubmissionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export type UserStatus = 'ACTIVE' | 'BANNED' | 'PENDING_VERIFICATION';
export type KYCStatus = 'NONE' | 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  balance: number;
  avatarUrl: string;
  username: string;
  phoneNumber: string;
  status?: UserStatus;
  joinedAt?: string;
  kycStatus?: KYCStatus;
  referralCount?: number;
}

export interface Task {
  id: string;
  advertiserId: string;
  title: string;
  description: string;
  category: string;
  platform: string;
  reward: number;
  totalSlots: number;
  filledSlots: number;
  status: TaskStatus;
  requirements: string[];
  createdAt: string;
  expiryDate?: string;
  proofType?: 'SCREENSHOT' | 'TEXT' | 'LINK';
}

export interface Submission {
  id: string;
  taskId: string;
  workerId: string;
  proofText: string;
  proofImage?: string; // base64 or url
  status: SubmissionStatus;
  submittedAt: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'EARNING' | 'SPEND' | 'ADJUSTMENT';
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  date: string;
  description: string;
}

export interface AdminConfig {
  minWithdrawalLimit: number;
  referralBonusAmount: number;
  minTaskPrice: number;
  paymentGatewayPublicKey: string;
  paymentGatewaySecretKey: string;
  paymentGatewayEnabled: boolean;
}

export interface Deposit {
  id: string;
  advertiserName: string;
  amount: number;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reference: string;
  proofUrl?: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  method: 'BANK_TRANSFER' | 'MOBILE_MONEY' | 'PAYSTACK_TRANSFER';
  details: string; // Account Number, Bank Name, etc.
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  date: string;
}

export interface Dispute {
  id: string;
  taskId: string;
  workerId: string;
  advertiserId: string;
  reason: string;
  status: 'OPEN' | 'RESOLVED_WORKER' | 'RESOLVED_ADVERTISER';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  minPrice: number; // Minimum price allowed for this category
}

export interface AdminStats {
  totalUsers: number;
  activeTasks: number;
  totalDeposits: number;
  totalWithdrawals: number;
  dailyEarnings: number; // Platform fees
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
  createdAt: string;
}

export interface KYCRequest {
  id: string;
  userId: string;
  userName: string;
  documentType: string;
  documentUrl: string;
  status: KYCStatus;
  submittedAt: string;
}