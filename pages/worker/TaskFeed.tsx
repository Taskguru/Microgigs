
import React, { useState } from 'react';
import { MOCK_TASKS } from '../../services/mockData';
import { Task, TaskStatus } from '../../types';
import { Filter, Search, Upload, AlertTriangle, Sparkles } from 'lucide-react';

export const TaskFeed: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofText, setProofText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{success: boolean, message: string, warning?: string} | null>(null);

  const categories = ['All', 'Social Media', 'App Testing', 'Video Marketing', 'Writing'];

  const filteredTasks = MOCK_TASKS.filter(task => {
    const matchesCategory = filterCategory === 'All' || task.category === filterCategory;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const isActive = task.status === TaskStatus.ACTIVE;
    return matchesCategory && matchesSearch && isActive;
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setSubmissionResult(null);
    setProofFile(null);
    setProofText('');
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!selectedTask) return;
    
    setIsSubmitting(true);
    setSubmissionResult(null);

    // 1. Duplicate IP Check (Simulated)
    // In a real app, the backend checks req.ip against the database for this taskId.
    const hasDuplicateIP = Math.random() < 0.05; // 5% chance of simulated IP fraud
    if (hasDuplicateIP) {
        setIsSubmitting(false);
        setSubmissionResult({ 
            success: false, 
            message: 'Duplicate IP detected. You have already attempted this task or another account on your network has.' 
        });
        return;
    }

    // 2. Basic File Check (AI Removed)
    if (selectedTask.proofType === 'SCREENSHOT' && !proofFile) {
        setIsSubmitting(false);
        setSubmissionResult({
            success: false,
            message: 'Please upload a screenshot proof.'
        });
        return;
    }
    
    // Success Simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionResult({ 
          success: true, 
          message: 'Proof submitted successfully! Earning pending approval.'
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2 overflow-x-auto max-w-full pb-2 sm:pb-0">
          <Filter className="h-5 w-5 text-slate-400 hidden sm:block" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                filterCategory === cat 
                  ? 'bg-primary-100 text-primary-800' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col">
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {task.category}
                </span>
                <span className="text-lg font-bold text-primary-600">₦{task.reward}</span>
              </div>
              <h3 className="mt-3 text-lg font-medium text-slate-900 line-clamp-2">{task.title}</h3>
              <div className="mt-2 flex items-center text-sm text-slate-500">
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs mr-2">{task.platform}</span>
                <span>{task.filledSlots}/{task.totalSlots} Done</span>
              </div>
            </div>
            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 rounded-b-lg">
              <button 
                onClick={() => handleTaskClick(task)}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                View Task
              </button>
            </div>
          </div>
        ))}
        {filteredTasks.length === 0 && (
            <div className="col-span-full text-center py-10 text-slate-500">
                No active tasks found matching your criteria.
            </div>
        )}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" onClick={closeModal}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-slate-900" id="modal-title">
                      {selectedTask.title}
                    </h3>
                    <div className="mt-2">
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              System detects IP. Do not use VPN or multiple accounts.
                            </p>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-medium text-slate-900 mt-4">Instructions:</h4>
                      <p className="text-sm text-slate-600 mt-1 whitespace-pre-wrap">{selectedTask.description}</p>
                      
                      <h4 className="font-medium text-slate-900 mt-4">Requirements:</h4>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {selectedTask.requirements.map((req, idx) => (
                            <li key={idx} className="text-sm text-slate-600">{req}</li>
                        ))}
                      </ul>

                      {submissionResult ? (
                          <div className={`mt-6 p-4 rounded-md ${submissionResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                              <div className="flex items-start">
                                {submissionResult.success ? <Sparkles className="h-5 w-5 mr-2"/> : <AlertTriangle className="h-5 w-5 mr-2"/>}
                                <div>
                                    <p className="font-bold">{submissionResult.success ? 'Success!' : 'Submission Failed'}</p>
                                    <p>{submissionResult.message}</p>
                                    {submissionResult.warning && (
                                        <p className="text-xs mt-2 font-semibold text-yellow-600">{submissionResult.warning}</p>
                                    )}
                                </div>
                              </div>
                              {submissionResult.success && <button onClick={closeModal} className="mt-2 underline text-sm">Close</button>}
                          </div>
                      ) : (
                        <form className="mt-6" onSubmit={handleSubmitProof}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700">Proof Text / Links (Optional)</label>
                                <textarea
                                    rows={3}
                                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    placeholder="Enter URL, username, or other text proof..."
                                    value={proofText}
                                    onChange={(e) => setProofText(e.target.value)}
                                />
                            </div>
                            
                            {selectedTask.proofType === 'SCREENSHOT' && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-slate-700">Screenshot Upload</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            <Upload className="mx-auto h-12 w-12 text-slate-400" />
                                            <div className="flex text-sm text-slate-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                                                <span>{proofFile ? proofFile.name : 'Upload Screenshot'}</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                            </label>
                                            </div>
                                            <p className="text-xs text-slate-500">Upload clear proof</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-5 sm:flex sm:flex-row-reverse">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Verifying...' : 'Submit Proof'}
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                      )}
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