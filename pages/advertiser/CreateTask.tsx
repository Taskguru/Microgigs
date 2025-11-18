
import React, { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { generateOptimizedTaskDescription } from '../../services/geminiService';

export const CreateTask: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Social Media');
  const [reward, setReward] = useState(20);
  const [slots, setSlots] = useState(100);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [message, setMessage] = useState('');

  const totalCost = reward * slots;
  const platformFee = totalCost * 0.10; // 10% fee
  const grandTotal = totalCost + platformFee;

  const handleAIOptimize = async () => {
    if (!title || !description) {
      alert('Please fill in a title and rough description first.');
      return;
    }
    setIsOptimizing(true);
    const optimized = await generateOptimizedTaskDescription(title, description);
    setDescription(optimized);
    setIsOptimizing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    // In a real app, this would create a task with status 'PENDING'
    setMessage('Task created successfully! It has been submitted for admin approval.');
    setTitle('');
    setDescription('');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-4 py-5 border-b border-slate-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-slate-900">Create a New Micro-Task</h3>
          <p className="mt-1 text-sm text-slate-500">Fill in the details to launch your campaign.</p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {message && (
              <div className="mb-4 bg-blue-50 p-4 rounded-md text-blue-800 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {message}
              </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Task Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="e.g., Like and Comment on my Instagram Post"
              />
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                <label className="block text-sm font-medium text-slate-700">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-slate-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                    <option>Social Media</option>
                    <option>App Testing</option>
                    <option>Surveys</option>
                    <option>Writing</option>
                </select>
                </div>
                <div>
                 <label className="block text-sm font-medium text-slate-700">Platform</label>
                 <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-slate-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                    <option>Instagram</option>
                    <option>Twitter / X</option>
                    <option>Facebook</option>
                    <option>YouTube</option>
                    <option>TikTok</option>
                    <option>Android</option>
                    <option>iOS</option>
                </select>
                </div>
            </div>

            <div>
              <div className="flex justify-between">
                <label className="block text-sm font-medium text-slate-700">Instructions for Workers</label>
                <button 
                    type="button"
                    onClick={handleAIOptimize}
                    disabled={isOptimizing}
                    className="text-xs flex items-center text-primary-600 hover:text-primary-500 font-medium disabled:opacity-50"
                >
                    <Sparkles className="h-3 w-3 mr-1" />
                    {isOptimizing ? 'Optimizing...' : 'AI Polish'}
                </button>
              </div>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Step 1: Go to... Step 2: Do this..."
              ></textarea>
              <p className="mt-1 text-xs text-slate-500">Click "AI Polish" to let Gemini make your instructions clearer.</p>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Reward per Worker (₦)</label>
                    <input
                        type="number"
                        min="10"
                        value={reward}
                        onChange={(e) => setReward(Number(e.target.value))}
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Total Workers Needed</label>
                    <input
                        type="number"
                        min="10"
                        value={slots}
                        onChange={(e) => setSlots(Number(e.target.value))}
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-md">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>Subtotal:</span>
                    <span>₦{totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Platform Fee (10%):</span>
                    <span>₦{platformFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 border-t border-slate-200 pt-2">
                    <span>Total to Pay:</span>
                    <span>₦{grandTotal.toLocaleString()}</span>
                </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Create Campaign & Pay
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};