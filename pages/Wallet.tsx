
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_TRANSACTIONS } from '../services/mockData';
import { Transaction, UserRole } from '../types';
import { ArrowUpRight, ArrowDownLeft, CreditCard, History, Building, Smartphone, X, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WalletPage: React.FC = () => {
  const { user, updateBalance } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  
  // Deposit Modal State
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState(5000);

  // Withdrawal Modal State
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(1000);
  const [withdrawMethod, setWithdrawMethod] = useState('BANK_TRANSFER');
  const [withdrawDetails, setWithdrawDetails] = useState('');
  const [withdrawMessage, setWithdrawMessage] = useState('');

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Paystack Success
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      amount: depositAmount,
      type: 'DEPOSIT',
      status: 'SUCCESS',
      date: new Date().toISOString().split('T')[0],
      description: 'Wallet Deposit via Paystack'
    };
    
    updateBalance(depositAmount);
    setTransactions([newTx, ...transactions]);
    setIsDepositOpen(false);
    alert(`Successfully deposited ₦${depositAmount.toLocaleString()}`);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawMessage('');

    if (withdrawAmount < 1000) {
      setWithdrawMessage('Minimum withdrawal is ₦1,000');
      return;
    }
    if (user && withdrawAmount > user.balance) {
      setWithdrawMessage('Insufficient funds.');
      return;
    }

    // KYC Check for large withdrawals
    if (withdrawAmount > 50000 && user?.kycStatus !== 'VERIFIED') {
        setWithdrawMessage('Withdrawals over ₦50,000 require KYC verification.');
        return;
    }

    // In a real app, this would create a PENDING record and lock funds.
    // Here we deduct immediately for UI demo purposes, or mark as Pending Withdrawal.
    updateBalance(-withdrawAmount);

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      amount: -withdrawAmount,
      type: 'WITHDRAWAL',
      status: 'PENDING', // Admin needs to approve
      date: new Date().toISOString().split('T')[0],
      description: `Withdrawal to ${withdrawMethod === 'BANK_TRANSFER' ? 'Bank' : 'Mobile Money'}`
    };

    setTransactions([newTx, ...transactions]);
    setIsWithdrawOpen(false);
    alert('Withdrawal request submitted successfully! Pending admin approval.');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {/* Balance Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg border border-slate-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-500 rounded-md p-3">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">Current Balance</dt>
                  <dd>
                    <div className="text-2xl font-bold text-slate-900">₦{user?.balance.toLocaleString()}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 px-5 py-3">
            <div className="text-sm text-slate-500">
               {user?.role === UserRole.WORKER ? 'Available for withdrawal' : 'Available for campaigns'}
            </div>
          </div>
        </div>

        {/* Deposit Button Card (Advertisers Mostly) */}
        <div 
          onClick={() => setIsDepositOpen(true)}
          className="bg-white overflow-hidden shadow rounded-lg flex flex-col justify-center items-center p-5 cursor-pointer hover:border-primary-500 border border-transparent transition-all group"
        >
           <div className="p-3 rounded-full bg-green-100 group-hover:bg-green-200 mb-3 transition-colors">
             <ArrowDownLeft className="h-6 w-6 text-green-600" />
           </div>
           <span className="font-bold text-slate-900">Deposit Funds</span>
           <span className="text-xs text-slate-500 text-center mt-1">Via Paystack / Card</span>
        </div>

        {/* Withdraw Button Card (Workers mostly, but Advertisers can withdraw refunds) */}
        <div 
          onClick={() => setIsWithdrawOpen(true)}
          className="bg-white overflow-hidden shadow rounded-lg flex flex-col justify-center items-center p-5 cursor-pointer hover:border-red-500 border border-transparent transition-all group"
        >
           <div className="p-3 rounded-full bg-red-100 group-hover:bg-red-200 mb-3 transition-colors">
             <ArrowUpRight className="h-6 w-6 text-red-600" />
           </div>
           <span className="font-bold text-slate-900">Withdraw Funds</span>
           <span className="text-xs text-slate-500 text-center mt-1">To Bank / Mobile Money</span>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white shadow rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-slate-200 bg-slate-50">
            <h3 className="text-lg leading-6 font-medium text-slate-900 flex items-center">
                <History className="w-5 h-5 mr-2 text-slate-500" />
                Transaction History
            </h3>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-slate-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {transactions.map((tx) => (
                      <tr key={tx.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{tx.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{tx.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                tx.type === 'WITHDRAWAL' ? 'bg-red-100 text-red-800' : 
                                tx.type === 'DEPOSIT' ? 'bg-green-100 text-green-800' :
                                'bg-blue-100 text-blue-800'
                            }`}>
                                {tx.type}
                            </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-bold ${
                            tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {tx.amount > 0 ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                              tx.status === 'SUCCESS' ? 'text-green-700 bg-green-50' :
                              tx.status === 'PENDING' ? 'text-yellow-700 bg-yellow-50' :
                              'text-red-700 bg-red-50'
                          }`}>
                              {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {isDepositOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" onClick={() => setIsDepositOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ArrowDownLeft className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-slate-900" id="modal-title">
                      Fund Your Wallet
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-slate-500">
                        Enter amount to deposit via Paystack.
                      </p>
                      <form onSubmit={handleDeposit} className="mt-4">
                          <label className="block text-sm font-medium text-slate-700">Amount (₦)</label>
                          <input
                            type="number"
                            min="500"
                            required
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(Number(e.target.value))}
                            className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          />
                          <div className="mt-5 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Pay Now
                            </button>
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setIsDepositOpen(false)}
                            >
                                Cancel
                            </button>
                          </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Modal */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" onClick={() => setIsWithdrawOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ArrowUpRight className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-slate-900" id="modal-title">
                      Request Withdrawal
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-slate-500 mb-4">
                        Withdrawals are processed within 24-48 hours.
                      </p>
                      
                      {withdrawMessage && (
                          <div className="mb-4 p-2 bg-red-50 text-red-700 text-xs rounded border border-red-200 flex items-start">
                              <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                              <div>
                                {withdrawMessage}
                                {withdrawMessage.includes('KYC') && (
                                    <Link to="/settings" className="block underline mt-1">Go to Settings</Link>
                                )}
                              </div>
                          </div>
                      )}

                      <form onSubmit={handleWithdraw} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700">Amount (₦)</label>
                            <input
                                type="number"
                                min="1000"
                                required
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            />
                            <p className="text-xs text-slate-400 mt-1">Available: ₦{user?.balance.toLocaleString()}</p>
                          </div>

                          <div>
                              <label className="block text-sm font-medium text-slate-700">Method</label>
                              <div className="mt-1 grid grid-cols-2 gap-2">
                                  <div 
                                    onClick={() => setWithdrawMethod('BANK_TRANSFER')}
                                    className={`border rounded-md p-3 cursor-pointer flex items-center justify-center ${withdrawMethod === 'BANK_TRANSFER' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-slate-300 hover:bg-slate-50'}`}
                                  >
                                      <Building className="h-5 w-5 mr-2"/> Bank
                                  </div>
                                  <div 
                                    onClick={() => setWithdrawMethod('MOBILE_MONEY')}
                                    className={`border rounded-md p-3 cursor-pointer flex items-center justify-center ${withdrawMethod === 'MOBILE_MONEY' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-slate-300 hover:bg-slate-50'}`}
                                  >
                                      <Smartphone className="h-5 w-5 mr-2"/> Mobile
                                  </div>
                              </div>
                          </div>

                          <div>
                              <label className="block text-sm font-medium text-slate-700">
                                  {withdrawMethod === 'BANK_TRANSFER' ? 'Bank Account Details' : 'Mobile Number & Name'}
                              </label>
                              <textarea
                                required
                                rows={3}
                                value={withdrawDetails}
                                onChange={(e) => setWithdrawDetails(e.target.value)}
                                placeholder={withdrawMethod === 'BANK_TRANSFER' ? 'Bank Name, Account Number, Account Name' : 'Provider (e.g. OPay), Phone Number, Name'}
                                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                              />
                          </div>

                          <div className="mt-5 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-800 text-base font-medium text-white hover:bg-slate-900 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Submit Request
                            </button>
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setIsWithdrawOpen(false)}
                            >
                                Cancel
                            </button>
                          </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
