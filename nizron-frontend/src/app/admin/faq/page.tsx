'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { FAQ } from '@/types/product';
import { 
  MessageCircleQuestion, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Layers,
  AlertCircle,
  X,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQAdmin() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  // Fetch FAQs
  const { data: response, isLoading } = useQuery<{ success: boolean; data: FAQ[] }>({
    queryKey: ['admin-faq'],
    queryFn: () => apiClient.get('/faq'),
  });

  const faqs = response?.data || [];

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/faq/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-faq'] });
    },
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: (newFaq: Partial<FAQ>) => apiClient.post('/faq', newFaq),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-faq'] });
      resetModal();
    },
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FAQ> }) => 
      apiClient.patch(`/faq/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-faq'] });
      resetModal();
    },
  });

  const resetModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setNewCategory('');
    setNewQuestion('');
    setNewAnswer('');
  };

  const handleOpenEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setNewCategory(faq.category);
    setNewQuestion(faq.questionTitle);
    setNewAnswer(faq.answer);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!newCategory || !newQuestion || !newAnswer) return;
    const payload = {
      category: newCategory,
      questionTitle: newQuestion,
      answer: newAnswer,
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const filteredFaqs = faqs.filter(f => 
    f.questionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFaqs = faqs.length;
  const uniqueCategories = new Set(faqs.map(f => f.category)).size;

  return (
    <div className="space-y-8 max-w-[1240px] mx-auto pb-20">
      {/* Top Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-header font-bold text-white tracking-tight">FAQ Directives</h1>
          <p className="text-slate-500 text-sm font-medium">Manage the global knowledge base and answer directory</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center hover:shadow-primary/40 active:scale-95 transition-all text-sm"
        >
          <Plus className="w-5 h-5 mr-1" /> Add Directive
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
            <MessageCircleQuestion className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Answers</p>
            <p className="text-2xl font-bold text-white">{totalFaqs}</p>
          </div>
        </div>
        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Topic Categories</p>
            <p className="text-2xl font-bold text-white">{uniqueCategories}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white/5 border border-white/5 rounded-[2rem] p-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search knowledge base by question, answer, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 outline-none text-white text-sm focus:border-primary/50 transition-all font-medium"
          />
        </div>
      </div>

      {/* CRUD Table */}
      <div className="bg-white/5 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              <th className="px-8 py-5 w-[15%]">Category</th>
              <th className="px-8 py-5 w-[25%]">Directive Question</th>
              <th className="px-8 py-5 w-[45%]">Official Answer</th>
              <th className="px-8 py-5 w-[15%] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
               [1, 2, 3, 4, 5].map((i) => (
                 <tr key={i} className="animate-pulse">
                   <td colSpan={4} className="px-8 py-6">
                     <div className="h-6 bg-white/5 w-full rounded" />
                   </td>
                 </tr>
               ))
            ) : filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5 align-top pt-6">
                    <span className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 text-slate-400 rounded-full text-[10px] font-bold tracking-wider">
                      {faq.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 align-top pt-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-2">{faq.questionTitle}</span>
                      <span className="text-[10px] font-mono text-slate-600 uppercase mt-1">Ref: {faq.id.slice(0, 8)}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 align-top pt-6">
                    <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-3">
                      {faq.answer}
                    </p>
                  </td>
                  <td className="px-8 py-5 text-right align-top pt-6">
                    <div className="flex items-center justify-end space-x-2">
                       <button onClick={() => handleOpenEdit(faq)} className="p-2 bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white rounded-lg transition-all active:scale-95 group/btn">
                         <Edit2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                       </button>
                       <button 
                         onClick={() => deleteMutation.mutate(faq.id)}
                         className="p-2 bg-white/5 hover:bg-red-500/10 border border-white/5 text-slate-400 hover:text-red-400 rounded-lg transition-all active:scale-95 group/btn"
                       >
                         <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-8 py-20 text-center">
                   <div className="space-y-3 opacity-40">
                      <AlertCircle className="w-12 h-12 mx-auto" />
                      <p className="text-sm font-bold uppercase tracking-widest">No directives found</p>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-[700px] bg-[#0f0f0f] border border-white/10 rounded-[2.5rem] relative z-10 p-10 shadow-2xl overflow-hidden my-auto"
            >
              <div className="absolute top-0 right-0 p-12 bg-primary/20 blur-[100px] pointer-events-none" />
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                   <h2 className="text-2xl font-bold text-white font-header">
                     {editingId ? 'Edit Knowledge Directive' : 'New Knowledge Directive'}
                   </h2>
                   <p className="text-slate-500 text-sm">
                     {editingId ? 'Modify stored procedural intelligence' : 'Add a new official answer to the public database.'}
                   </p>
                </div>
                <button onClick={resetModal} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              <div className="space-y-6 relative z-10">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Subject / Category</label>
                    <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 outline-none text-white text-sm focus:border-primary/50 transition-all font-medium" placeholder="E.g. Technical Support, Billing, Deployments" />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">The Inquiry (Question)</label>
                    <input type="text" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 outline-none text-white text-sm focus:border-primary/50 transition-all font-medium" placeholder="E.g. How does the failover clustering work during outages?" />
                 </div>

                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Official Answer</label>
                   <textarea rows={6} value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} className="w-full bg-white/5 border border-white/5 rounded-xl p-4 outline-none text-white text-sm focus:border-primary/50 transition-all font-medium resize-none leading-relaxed" placeholder="Provide a detailed, professional response to the inquiry above..." />
                 </div>

                 <div className="pt-8 border-t border-white/5 flex gap-4">
                   <button onClick={resetModal} className="px-6 h-13 bg-white/5 text-slate-400 font-bold rounded-2xl text-sm hover:text-white hover:bg-white/10 transition-all">Discard Edit</button>
                   <button 
                     onClick={handleSubmit}
                     disabled={createMutation.isPending || updateMutation.isPending || !newCategory || !newQuestion || !newAnswer}
                     className="flex-1 h-13 bg-primary text-white font-bold rounded-2xl text-sm shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                     {createMutation.isPending || updateMutation.isPending ? 'Processing...' : (editingId ? 'Update Directive' : 'Publish Directive to Live DB')} <ChevronRight className="w-4 h-4 ml-2" />
                   </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
