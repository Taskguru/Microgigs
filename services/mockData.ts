
import { Task, TaskStatus, User, UserRole, Transaction, Submission, SubmissionStatus, AdminConfig, Deposit, WithdrawalRequest, Dispute, Category, AdminStats, Notification, KYCRequest } from '../types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Worker',
  email: 'alex@microgigs.com',
  role: UserRole.WORKER,
  balance: 4500.50,
  avatarUrl: 'https://picsum.photos/200/200',
  username: 'alex_worker',
  phoneNumber: '08012345678',
  status: 'ACTIVE',
  joinedAt: '2023-01-15',
  kycStatus: 'NONE',
  referralCount: 3
};

export const MOCK_ALL_USERS: User[] = [
  MOCK_USER,
  {
    id: 'a1',
    name: 'Big Brand Co',
    email: 'brand@microgigs.com',
    role: UserRole.ADVERTISER,
    balance: 125000,
    avatarUrl: 'https://ui-avatars.com/api/?name=Big+Brand',
    username: 'big_brand',
    phoneNumber: '08099999999',
    status: 'ACTIVE',
    joinedAt: '2023-02-20',
    kycStatus: 'VERIFIED',
    referralCount: 0
  },
  {
    id: 'u2',
    name: 'Sarah Connor',
    email: 'sarah@microgigs.com',
    role: UserRole.WORKER,
    balance: 1200,
    avatarUrl: 'https://ui-avatars.com/api/?name=Sarah+Connor',
    username: 's_connor',
    phoneNumber: '08011112222',
    status: 'PENDING_VERIFICATION',
    joinedAt: '2023-10-10',
    kycStatus: 'PENDING',
    referralCount: 0
  },
  {
    id: 'u3',
    name: 'Spam Bot',
    email: 'bot@spam.com',
    role: UserRole.WORKER,
    balance: 0,
    avatarUrl: 'https://ui-avatars.com/api/?name=Spam+Bot',
    username: 'spambot99',
    phoneNumber: '08000000000',
    status: 'BANNED',
    joinedAt: '2023-10-25',
    kycStatus: 'REJECTED',
    referralCount: 0
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    advertiserId: 'a1',
    title: 'Follow our Instagram Page',
    description: 'Go to the link, follow the account, and like the last 3 posts.',
    category: 'Social Media',
    platform: 'Instagram',
    reward: 50,
    totalSlots: 1000,
    filledSlots: 450,
    status: TaskStatus.ACTIVE,
    requirements: ['Screenshot of following', 'Username used'],
    createdAt: new Date().toISOString(),
    proofType: 'SCREENSHOT',
    expiryDate: '2023-12-31'
  },
  {
    id: 't2',
    advertiserId: 'a2',
    title: 'Test new Mobile App Signup',
    description: 'Download our app, sign up, and verify email.',
    category: 'App Testing',
    platform: 'Android',
    reward: 350,
    totalSlots: 100,
    filledSlots: 88,
    status: TaskStatus.ACTIVE,
    requirements: ['Screenshot of welcome email', 'Email address used'],
    createdAt: new Date().toISOString(),
    proofType: 'SCREENSHOT',
    expiryDate: '2023-11-30'
  },
  {
    id: 't3',
    advertiserId: 'a1',
    title: 'Watch YouTube Video (3 mins)',
    description: 'Watch the full video and comment related to the content.',
    category: 'Video Marketing',
    platform: 'YouTube',
    reward: 80,
    totalSlots: 500,
    filledSlots: 120,
    status: TaskStatus.ACTIVE,
    requirements: ['Screenshot of watch time', 'Screenshot of comment'],
    createdAt: new Date().toISOString(),
    proofType: 'SCREENSHOT',
    expiryDate: '2023-12-15'
  },
  {
    id: 't4',
    advertiserId: 'a3',
    title: 'Write a Review on Trustpilot',
    description: 'Give us an honest 5-star review regarding our customer service.',
    category: 'Writing',
    platform: 'Trustpilot',
    reward: 500,
    totalSlots: 50,
    filledSlots: 48,
    status: TaskStatus.ACTIVE,
    requirements: ['Screenshot of published review'],
    createdAt: new Date().toISOString(),
    proofType: 'SCREENSHOT',
    expiryDate: '2023-11-20'
  },
  {
    id: 't5',
    advertiserId: 'a1',
    title: 'Pending Task: App Download',
    description: 'Download this app and rate it 5 stars.',
    category: 'App Testing',
    platform: 'iOS',
    reward: 200,
    totalSlots: 50,
    filledSlots: 0,
    status: TaskStatus.PENDING,
    requirements: ['Screenshot of rating'],
    createdAt: new Date().toISOString(),
    proofType: 'SCREENSHOT',
    expiryDate: '2023-12-25'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx1', amount: 50, type: 'EARNING', status: 'SUCCESS', date: '2023-10-25', description: 'Task: Instagram Follow' },
  { id: 'tx2', amount: 350, type: 'EARNING', status: 'SUCCESS', date: '2023-10-24', description: 'Task: App Signup' },
  { id: 'tx3', amount: -1000, type: 'WITHDRAWAL', status: 'SUCCESS', date: '2023-10-20', description: 'Withdrawal to Bank' },
  { id: 'tx4', amount: 50000, type: 'DEPOSIT', status: 'SUCCESS', date: '2023-10-18', description: 'Advertiser Deposit' },
];

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 's1',
    taskId: 't1',
    workerId: 'u1',
    proofText: 'Followed as @alex_dev',
    status: SubmissionStatus.APPROVED,
    submittedAt: '2023-10-25',
  },
  {
    id: 's2',
    taskId: 't2',
    workerId: 'u1',
    proofText: 'Signed up with email test@test.com',
    status: SubmissionStatus.PENDING,
    submittedAt: '2023-10-26',
  }
];

export const MOCK_ADMIN_CONFIG: AdminConfig = {
  minWithdrawalLimit: 1000,
  referralBonusAmount: 500,
  minTaskPrice: 20,
  paymentGatewayPublicKey: 'pk_test_xxxxxxxxxxxxxxxxxxxx',
  paymentGatewaySecretKey: 'sk_test_xxxxxxxxxxxxxxxxxxxx',
  paymentGatewayEnabled: true,
};

export const MOCK_DEPOSITS: Deposit[] = [
  { id: 'd1', advertiserName: 'TechSolutions Ltd', amount: 50000, date: '2023-10-26', status: 'PENDING', reference: 'REF-88723', proofUrl: 'https://picsum.photos/id/20/300/400' },
  { id: 'd2', advertiserName: 'Jane Doe', amount: 5000, date: '2023-10-25', status: 'APPROVED', reference: 'REF-12993' },
  { id: 'd3', advertiserName: 'Viral Marketing Co', amount: 120000, date: '2023-10-24', status: 'PENDING', reference: 'REF-99281', proofUrl: 'https://picsum.photos/id/42/300/400' },
  { id: 'd4', advertiserName: 'John Smith', amount: 2500, date: '2023-10-22', status: 'REJECTED', reference: 'REF-11002' },
];

export const MOCK_WITHDRAWALS: WithdrawalRequest[] = [
  { 
    id: 'w1', 
    userId: 'u1', 
    userName: 'Alex Worker', 
    amount: 2500, 
    method: 'BANK_TRANSFER', 
    details: 'GTBank - 0123456789 - Alex W.', 
    status: 'PENDING', 
    date: '2023-10-27' 
  },
  { 
    id: 'w2', 
    userId: 'u2', 
    userName: 'Sarah Connor', 
    amount: 1000, 
    method: 'MOBILE_MONEY', 
    details: 'OPay - 08011112222', 
    status: 'APPROVED', 
    date: '2023-10-26' 
  }
];

export const MOCK_DISPUTES: Dispute[] = [
  {
    id: 'dp1',
    taskId: 't1',
    workerId: 'u1',
    advertiserId: 'a1',
    reason: 'Worker claims task was done but advertiser rejected it without reason.',
    status: 'OPEN',
    createdAt: '2023-10-28'
  },
  {
    id: 'dp2',
    taskId: 't3',
    workerId: 'u2',
    advertiserId: 'a1',
    reason: 'Advertiser says screenshot is fake.',
    status: 'RESOLVED_ADVERTISER',
    createdAt: '2023-10-20'
  }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Social Media', minPrice: 20 },
  { id: 'c2', name: 'App Testing', minPrice: 100 },
  { id: 'c3', name: 'Video Marketing', minPrice: 50 },
  { id: 'c4', name: 'Writing', minPrice: 200 },
  { id: 'c5', name: 'Surveys', minPrice: 150 },
];

export const MOCK_ADMIN_STATS: AdminStats = {
  totalUsers: 5420,
  activeTasks: 345,
  totalDeposits: 15000000,
  totalWithdrawals: 8500000,
  dailyEarnings: 45000
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    userId: 'u1',
    title: 'Task Approved',
    message: 'Your submission for "Follow Instagram Page" was approved. +₦50',
    type: 'SUCCESS',
    read: false,
    createdAt: '2023-10-27T10:00:00Z'
  },
  {
    id: 'n2',
    userId: 'u1',
    title: 'Welcome to MicroGigs',
    message: 'Complete your profile to start earning more.',
    type: 'INFO',
    read: true,
    createdAt: '2023-10-20T09:00:00Z'
  }
];

export const MOCK_KYC_REQUESTS: KYCRequest[] = [
  {
    id: 'k1',
    userId: 'u2',
    userName: 'Sarah Connor',
    documentType: 'National ID',
    documentUrl: 'https://picsum.photos/id/100/400/300',
    status: 'PENDING',
    submittedAt: '2023-10-27T14:00:00Z'
  }
];