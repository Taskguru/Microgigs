
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, DollarSign, Shield, Users, Zap } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover opacity-20" src="https://images.unsplash.com/photo-1553877616-152807577202?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="People working" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Small Gigs. <span className="text-primary-500">Big Wins.</span>
          </h1>
          <p className="mt-6 text-xl text-slate-300 max-w-3xl">
            MicroGigs is the leading marketplace for micro-tasks in Nigeria and beyond. 
            Advertisers get real engagement, and workers earn real money for simple digital tasks.
          </p>
          <div className="mt-10 flex max-w-md mx-auto sm:flex sm:justify-center gap-4">
            <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-primary-500 hover:bg-primary-400 md:py-4 md:text-lg md:px-10">
              Start Earning
            </Link>
            <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-100 bg-slate-800 hover:bg-slate-700 md:py-4 md:text-lg md:px-10">
              Post a Job
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">How it works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Simple process, instant results
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">1. Select a Task</h3>
                <p className="mt-2 text-base text-slate-500">
                  Browse thousands of active tasks. Choose ones that match your skills - from social media likes to app testing.
                </p>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">2. Submit Proof</h3>
                <p className="mt-2 text-base text-slate-500">
                  Complete the instructions and upload the required screenshot or text proof to verify your work.
                </p>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">3. Get Paid</h3>
                <p className="mt-2 text-base text-slate-500">
                  Once approved by the advertiser, funds are instantly added to your wallet. Withdraw to your bank anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Trust Stats */}
       <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by over 50,000 Nigerians
            </h2>
            <p className="mt-3 text-xl text-primary-200 sm:mt-4">
              We handle millions of Naira in payouts every month securely and reliably.
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-primary-200">Tasks Completed</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">2M+</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-primary-200">Active Users</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">50k+</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-primary-200">Paid Out</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">₦500M+</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
