
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Upload, CheckCircle, AlertCircle, Bell } from 'lucide-react';

export const Settings: React.FC = () => {
  const { user, submitKYC } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'kyc' | 'security'>('profile');
  
  // KYC State
  const [docType, setDocType] = useState('National ID');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleKYCSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    setIsSubmitting(true);
    await submitKYC(docType, file);
    setIsSubmitting(false);
    setFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Account Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="bg-white shadow rounded-lg border border-slate-200 overflow-hidden h-fit">
            <nav className="space-y-1">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'profile' ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                    <User className="mr-3 h-5 w-5 text-slate-400" />
                    Profile Information
                </button>
                <button
                    onClick={() => setActiveTab('kyc')}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'kyc' ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                    <Shield className="mr-3 h-5 w-5 text-slate-400" />
                    KYC Verification
                    {user?.kycStatus === 'VERIFIED' && <CheckCircle className="ml-auto h-4 w-4 text-green-500" />}
                </button>
                 <button
                    onClick={() => setActiveTab('security')}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'security' ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                    <Bell className="mr-3 h-5 w-5 text-slate-400" />
                    Notifications & Security
                </button>
            </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-2">
            {activeTab === 'profile' && (
                <div className="bg-white shadow rounded-lg border border-slate-200 p-6">
                    <h2 className="text-lg font-medium text-slate-900 mb-4">Profile Information</h2>
                    <div className="flex items-center space-x-4 mb-6">
                        <img src={user?.avatarUrl} alt="" className="h-20 w-20 rounded-full bg-slate-200" />
                        <div>
                            <p className="text-sm font-medium text-slate-900">Profile Picture</p>
                            <p className="text-xs text-slate-500">Generated automatically.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Full Name</label>
                            <input type="text" disabled value={user?.name} className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 bg-slate-50 text-slate-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Email</label>
                            <input type="email" disabled value={user?.email} className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 bg-slate-50 text-slate-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                            <input type="text" disabled value={user?.phoneNumber} className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 bg-slate-50 text-slate-500 sm:text-sm" />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'kyc' && (
                <div className="bg-white shadow rounded-lg border border-slate-200 p-6">
                    <h2 className="text-lg font-medium text-slate-900 mb-4">Identity Verification (KYC)</h2>
                    
                    {user?.kycStatus === 'VERIFIED' ? (
                        <div className="rounded-md bg-green-50 p-4 flex">
                            <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                            <div>
                                <h3 className="text-sm font-medium text-green-800">Verified</h3>
                                <p className="text-sm text-green-700 mt-1">Your identity has been confirmed. Limits lifted.</p>
                            </div>
                        </div>
                    ) : user?.kycStatus === 'PENDING' ? (
                         <div className="rounded-md bg-yellow-50 p-4 flex">
                            <AlertCircle className="h-5 w-5 text-yellow-400 mr-3" />
                            <div>
                                <h3 className="text-sm font-medium text-yellow-800">Under Review</h3>
                                <p className="text-sm text-yellow-700 mt-1">Your documents are being reviewed by our team.</p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="text-sm text-slate-500 mb-6">
                                Please upload a valid government-issued ID to verify your identity. verification is required for withdrawals over ₦50,000.
                            </p>
                            <form onSubmit={handleKYCSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Document Type</label>
                                    <select 
                                        value={docType}
                                        onChange={(e) => setDocType(e.target.value)}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-slate-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                                    >
                                        <option>National ID Card (NIN)</option>
                                        <option>International Passport</option>
                                        <option>Driver's License</option>
                                        <option>Voter's Card</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Upload Document Image</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <Upload className="mx-auto h-12 w-12 text-slate-400" />
                                            <div className="flex text-sm text-slate-600">
                                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                                                    <span>{file ? file.name : 'Upload a file'}</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !file}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}

             {activeTab === 'security' && (
                <div className="bg-white shadow rounded-lg border border-slate-200 p-6">
                    <h2 className="text-lg font-medium text-slate-900 mb-4">Notifications</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-900">Email Notifications</p>
                                <p className="text-xs text-slate-500">Get emails for task approvals and withdrawals.</p>
                            </div>
                            <button type="button" className="bg-primary-600 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500" role="switch" aria-checked="true">
                                <span aria-hidden="true" className="translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                             <div>
                                <p className="text-sm font-medium text-slate-900">In-App Alerts</p>
                                <p className="text-xs text-slate-500">Show badge on bell icon.</p>
                            </div>
                            <button type="button" className="bg-primary-600 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500" role="switch" aria-checked="true">
                                <span aria-hidden="true" className="translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
