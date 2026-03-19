'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { TeamMember } from '@/types/team';
import {
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Briefcase,
  AlertCircle,
  X,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TeamAdmin() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // State for Create Team Member Modal
  const [newSkills, setNewSkills] = useState<string[]>(['']);

  // Fetch Team Members
  const { data: response, isLoading } = useQuery<{ success: boolean; data: TeamMember[] }>({
    queryKey: ['admin-team'],
    queryFn: () => apiClient.get('/teams'),
  });

  const team = response?.data || [];

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/teams/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-team'] });
    },
  });

  const filteredTeam = team.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalMembers = team.length;
  // Unique skillsets total count (approximation based on flat array size)
  const totalSkills = team.reduce((acc, m) => acc + m.skillSet.length, 0);

  const handleAddSkill = () => setNewSkills([...newSkills, '']);
  const handleRemoveSkill = (idx: number) => setNewSkills(newSkills.filter((_, i) => i !== idx));

  return (
    <div className="space-y-8 max-w-[1240px] mx-auto pb-20">
      {/* Top Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-header font-bold text-white tracking-tight">Team Management</h1>
          <p className="text-slate-500 text-sm font-medium">Coordinate the personnel directory and expertise assignments</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center hover:shadow-primary/40 active:scale-95 transition-all text-sm"
        >
          <Plus className="w-5 h-5 mr-1" /> Onboard Member
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Roster</p>
            <p className="text-2xl font-bold text-white">{totalMembers}</p>
          </div>
        </div>
        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Competencies</p>
            <p className="text-2xl font-bold text-white">{totalSkills}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white/5 border border-white/5 rounded-[2rem] p-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search roster by name or designation..."
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
              <th className="px-8 py-5">Personnel Profile</th>
              <th className="px-8 py-5">Designation (Role)</th>
              <th className="px-8 py-5">Technical Proficiencies</th>
              <th className="px-8 py-5 text-right">Administrative Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              [1, 2, 3, 4].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={4} className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/5 rounded-lg" />
                      <div className="h-4 bg-white/5 w-40 rounded" />
                    </div>
                  </td>
                </tr>
              ))
            ) : filteredTeam.length > 0 ? (
              filteredTeam.map((member) => (
                <tr key={member.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-4">
                      {member.image ? (
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 overflow-hidden shadow-md">
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 font-bold shadow-md">
                          {member.name.charAt(0)}
                        </div>
                      )}

                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">{member.name}</span>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">UID: {member.id.slice(0, 8)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="inline-flex items-center px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs font-bold tracking-wider">
                      {member.designation}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-wrap gap-2 max-w-[300px]">
                      {member.skillSet.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300 rounded-md truncate max-w-[100px]">
                          {skill}
                        </span>
                      ))}
                      {member.skillSet.length > 3 && (
                        <span className="px-2 py-1 bg-transparent border border-white/10 text-[10px] font-bold text-slate-500 rounded-md">
                          +{member.skillSet.length - 3} skills
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white rounded-lg transition-all active:scale-95 group/btn">
                        <Edit2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(member.id)}
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
                    <p className="text-sm font-bold uppercase tracking-widest">No personnel records found</p>
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
              className="w-full max-w-[650px] bg-[#0f0f0f] border border-white/10 rounded-[2.5rem] relative z-10 p-10 shadow-2xl overflow-hidden my-auto"
            >
              <div className="absolute top-0 right-0 p-12 bg-primary/20 blur-[100px] pointer-events-none" />
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                  <h2 className="text-2xl font-bold text-white font-header">Onboard Engineer</h2>
                  <p className="text-slate-500 text-sm">Add a new professional to the Nizron directory</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Full Name</label>
                    <input type="text" className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 outline-none text-white text-sm focus:border-primary/50 transition-all font-medium" placeholder="E.g. Sarah Jenkins" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Designation</label>
                    <input type="text" className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 outline-none text-white text-sm focus:border-primary/50 transition-all font-medium" placeholder="E.g. Lead React Architect" />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2 flex items-center">
                    Avatar URL <ImageIcon className="w-3 h-3 ml-1" />
                  </label>
                  <input type="text" className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 outline-none text-white text-sm focus:border-primary/50 transition-all font-medium" placeholder="https://cdn.nizron.com/avatars/sarah.jpg" />
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between pl-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Technical Competencies</label>
                    <button
                      onClick={handleAddSkill}
                      className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest flex items-center"
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Skill
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                    {newSkills.map((s, idx) => (
                      <div key={idx} className="relative group">
                        <input
                          type="text"
                          className="w-full h-10 bg-white/5 border border-white/5 rounded-xl px-4 pr-10 outline-none text-white text-xs focus:border-primary/50 transition-all"
                          placeholder={`Competency #${idx + 1}`}
                        />
                        {newSkills.length > 1 && (
                          <button
                            onClick={() => handleRemoveSkill(idx)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex gap-4">
                  <button onClick={() => setIsModalOpen(false)} className="px-6 h-13 bg-white/5 text-slate-400 font-bold rounded-2xl text-sm hover:text-white hover:bg-white/10 transition-all">Cancel Routine</button>
                  <button className="flex-1 h-13 bg-primary text-white font-bold rounded-2xl text-sm shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all flex items-center justify-center">
                    Authorize Onboarding <ChevronRight className="w-4 h-4 ml-2" />
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
