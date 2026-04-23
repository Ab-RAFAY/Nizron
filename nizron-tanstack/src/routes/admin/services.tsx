import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';
import type { Service } from '../../types';

export const Route = createFileRoute('/admin/services')({ component: ServicesAdmin });
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  LayoutGrid, 
  Layers, 
  TrendingUp, 
  AlertCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ServicesAdmin() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Service form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newServiceCards, setNewServiceCards] = useState<{ title: string; description: string }[]>([{ title: '', description: '' }]);

  // Fetch Services
  const { data: response, isLoading } = useQuery<{ success: boolean; data: Service[] }>({
    queryKey: ['admin-services'],
    queryFn: () => apiClient.get('/services'),
  });

  const services = response?.data || [];

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/services/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
    },
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: (newService: Partial<Service>) => apiClient.post('/services', newService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      resetModal();
    },
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Service> }) => 
      apiClient.patch(`/services/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      resetModal();
    },
  });

  const resetModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setNewTitle('');
    setNewCategory('');
    setNewDescription('');
    setNewServiceCards([{ title: '', description: '' }]);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingId(service.id);
    setNewTitle(service.title);
    setNewCategory(service.category);
    setNewDescription(service.description || '');
    setNewServiceCards(
      service.serviceCards.length > 0 
        ? service.serviceCards.map(c => ({ title: c.title, description: c.description })) 
        : [{ title: '', description: '' }]
    );
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!newTitle || !newCategory) return;
    const payload = {
      title: newTitle.trim(),
      category: newCategory.trim(),
      description: newDescription ? newDescription.trim() : "",
      serviceCards: newServiceCards.filter(c => c.title.trim() !== ''),
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleAddCard = () => setNewServiceCards([...newServiceCards, { title: '', description: '' }]);
  const handleRemoveCard = (idx: number) => setNewServiceCards(newServiceCards.filter((_, i) => i !== idx));

  // Get unique existing categories for suggestion
  const existingCategories = Array.from(new Set(services.map((s: Service) => s.category.trim()))) as string[];

  const filteredServices = services.filter((s: Service) => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalServices = services.length;
  const categories = new Set(services.map((s: Service) => s.category.trim())).size;

  return (
    <div className="space-y-8 max-w-[1240px] mx-auto">
      {/* Top Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-header font-bold text-white tracking-tight">Services Management</h1>
          <p className="text-slate-500 text-sm font-medium">Create, update and manage your service catalog</p>
        </div>
        <button
          onClick={() => { resetModal(); setIsModalOpen(true); }}
          className="px-6 h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center hover:shadow-primary/40 active:scale-95 transition-all text-sm"
        >
          <Plus className="w-5 h-5 mr-1" /> Add New Service
        </button>
      </div>

      {/* High-Density Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Services</p>
            <p className="text-2xl font-bold text-white">{totalServices}</p>
          </div>
        </div>
        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
            <LayoutGrid className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Categories</p>
            <p className="text-2xl font-bold text-white">{categories}</p>
          </div>
        </div>
        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-green-500/10 text-green-500 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Status</p>
            <p className="text-2xl font-bold text-white">Online</p>
          </div>
        </div>
      </div>

      {/* Actions & Filters */}
      <div className="bg-white/5 border border-white/5 rounded-4xl p-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search by title, category, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 outline-none text-white text-sm focus:border-primary/50 transition-all"
          />
        </div>
      </div>

      {/* CRUD Table */}
      <div className="bg-white/5 border border-white/5 rounded-4xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/5 text-slate-500">
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest">Service Title</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest">Category</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest">Description</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest">Tech Stack</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
               [1, 2, 3, 4, 5].map((i) => (
                 <tr key={i} className="animate-pulse">
                   <td colSpan={5} className="px-8 py-5 h-16">
                     <div className="h-4 bg-white/5 rounded w-full" />
                   </td>
                 </tr>
               ))
            ) : filteredServices.length > 0 ? (
              filteredServices.map((service: Service) => (
                <tr key={service.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">{service.title}</span>
                      <span className="text-[10px] font-medium text-slate-600 font-mono">ID: {service.id.slice(0, 8)}...</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-slate-400 tracking-wider">
                      {service.category.trim()}
                    </span>
                  </td>
                  <td className="px-8 py-5 max-w-[200px]">
                    <span className="text-[11px] text-slate-500 line-clamp-2">
                      {service.description || <span className="italic text-slate-700">No description</span>}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex gap-1">
                      {service.technologies.slice(0, 3).map((t: any, idx: number) => (
                        <div key={idx} className="w-6 h-6 bg-slate-800 rounded-md border border-white/5 flex items-center justify-center text-[10px] font-bold text-slate-500">
                          {t.name ? t.name[0].toUpperCase() : 'T'}
                        </div>
                      ))}
                      {service.technologies.length > 3 && (
                        <span className="text-[10px] font-bold text-slate-600 pl-1">+{service.technologies.length-3}</span>
                      )}
                    </div>
                  </td>
                   <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => handleOpenEdit(service)} className="p-2 bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white rounded-lg transition-all active:scale-95">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteMutation.mutate(service.id)}
                        className="p-2 bg-white/5 hover:bg-red-500/10 border border-white/5 text-slateate-400 hover:text-red-400 rounded-lg transition-all active:scale-95"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <a href={`/services`} target="_blank" className="p-2 bg-white/5 hover:bg-primary/10 border border-white/5 text-slate-400 hover:text-primary rounded-lg transition-all active:scale-95">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                   <div className="space-y-3 opacity-40">
                      <AlertCircle className="w-12 h-12 mx-auto" />
                      <p className="text-sm font-bold uppercase tracking-widest">No services found in database</p>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetModal}
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
                    {editingId ? 'Edit Service' : 'Add New Service'}
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    {editingId ? 'Update service details and bullet points' : 'Fill in the details to create a new service entry'}
                  </p>
                </div>
                <button onClick={resetModal} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="space-y-6 relative z-10">
                {/* Title + Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Service Title *</label>
                    <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 outline-none text-white text-sm focus:border-primary/50 transition-all" placeholder="e.g. Web and Mobile Development" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Category *</label>
                    <input 
                      list="svc-categories"
                      type="text" 
                      value={newCategory} 
                      onChange={(e) => setNewCategory(e.target.value)} 
                      className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 outline-none text-white text-sm focus:border-primary/50 transition-all" 
                      placeholder="e.g. Technical" 
                    />
                    <datalist id="svc-categories">
                      {existingCategories.map((cat: string) => <option key={cat} value={cat} />)}
                    </datalist>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Service Description</label>
                  <textarea 
                    rows={3} 
                    value={newDescription} 
                    onChange={(e) => setNewDescription(e.target.value)} 
                    className="w-full bg-white/5 border border-white/5 rounded-xl p-4 outline-none text-white text-sm focus:border-primary/50 transition-all resize-none" 
                    placeholder="Describe what this service offers. e.g. 'We craft responsive, user-friendly websites using React, Next.js, and modern frameworks that drive engagement.'" 
                  />
                </div>

                {/* Service Cards (Bullet Points) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pl-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Bullet Points / Highlights</label>
                    <button onClick={handleAddCard} className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest flex items-center">
                      <Plus className="w-3 h-3 mr-1" /> Add Point
                    </button>
                  </div>
                  <div className="space-y-3">
                    {newServiceCards.map((card, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          <input 
                            type="text" 
                            value={card.title}
                            onChange={(e) => {
                              const arr = [...newServiceCards];
                              arr[idx].title = e.target.value;
                              setNewServiceCards(arr);
                            }}
                            className="h-10 bg-white/5 border border-white/5 rounded-xl px-3 outline-none text-white text-xs focus:border-primary/50 transition-all" 
                            placeholder={`Point title (e.g. React.js)`}
                          />
                          <input 
                            type="text"
                            value={card.description}
                            onChange={(e) => {
                              const arr = [...newServiceCards];
                              arr[idx].description = e.target.value;
                              setNewServiceCards(arr);
                            }}
                            className="h-10 bg-white/5 border border-white/5 rounded-xl px-3 outline-none text-white text-xs focus:border-primary/50 transition-all" 
                            placeholder={`Short description (optional)`}
                          />
                        </div>
                        {newServiceCards.length > 1 && (
                          <button onClick={() => handleRemoveCard(idx)} className="p-2 hover:bg-red-500/10 hover:text-red-400 text-slate-600 rounded-lg transition-colors mt-0.5">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex gap-4">
                  <button onClick={resetModal} className="flex-1 h-12 bg-white/5 text-slate-400 font-bold rounded-xl text-sm hover:text-white transition-colors">Cancel</button>
                  <button 
                    onClick={handleSubmit}
                    disabled={createMutation.isPending || updateMutation.isPending || !newTitle || !newCategory}
                    className="flex-1 h-12 bg-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {createMutation.isPending || updateMutation.isPending ? 'Saving...' : (editingId ? 'Save Changes' : 'Create Service')}
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
