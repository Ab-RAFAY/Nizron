'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { Product } from '@/types/product';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Package, 
  FileText, 
  Eye, 
  AlertCircle,
  FileDown,
  ChevronRight,
  PlusCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ProductsAdmin() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Create/Edit Product Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDocUrl, setNewDocUrl] = useState('');
  const [newFeatures, setNewFeatures] = useState<string[]>(['']);
  
  // Fetch Products
  const { data: response, isLoading } = useQuery<{ success: boolean; data: Product[] }>({
    queryKey: ['admin-products'],
    queryFn: () => apiClient.get('/products'),
  });

  const products = response?.data || [];

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: (newProduct: Partial<Product>) => apiClient.post('/products', newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      resetModal();
    },
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) => 
      apiClient.patch(`/products/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      resetModal();
    },
  });

  const resetModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setNewName('');
    setNewCategory('');
    setNewDescription('');
    setNewDocUrl('');
    setNewFeatures(['']);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingId(product.id);
    setNewName(product.name);
    setNewCategory(product.category || '');
    setNewDescription(product.description);
    setNewDocUrl(product.productUsePdf || '');
    setNewFeatures(product.features.length > 0 ? product.features : ['']);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!newName || !newDescription) return;
    const payload = {
      name: newName,
      category: newCategory.trim(),
      description: newDescription,
      productUsePdf: newDocUrl,
      features: newFeatures.filter(f => f.trim() !== '')
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalProducts = products.length;
  const totalFeatures = products.reduce((acc, p) => acc + p.features.length, 0);

  const handleAddFeature = () => setNewFeatures([...newFeatures, '']);
  const handleRemoveFeature = (idx: number) => setNewFeatures(newFeatures.filter((_, i) => i !== idx));

  return (
    <div className="space-y-8 max-w-[1240px] mx-auto pb-20">
      {/* Top Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-header font-bold text-white tracking-tight">Product Catalog</h1>
          <p className="text-slate-500 text-sm font-medium">Manage your software solutions and platform offerings</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center hover:shadow-primary/40 active:scale-95 transition-all text-sm"
        >
          <Plus className="w-5 h-5 mr-1" /> Register Product
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Products</p>
            <p className="text-2xl font-bold text-white">{totalProducts}</p>
          </div>
        </div>
        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Features</p>
            <p className="text-2xl font-bold text-white">{totalFeatures}</p>
          </div>
        </div>
        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-center space-x-4">
          <div className="p-3 bg-green-500/10 text-green-500 rounded-xl">
            <FileDown className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Digital Docs</p>
            <p className="text-2xl font-bold text-white">Active</p>
          </div>
        </div>
      </div>

      {/* Actions & Filters */}
      <div className="bg-white/5 border border-white/5 rounded-4xl p-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search by name, feature, or platform..."
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
            <tr className="bg-white/5 border-b border-white/5 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              <th className="px-8 py-5">Preview</th>
              <th className="px-8 py-5">Product Details</th>
              <th className="px-8 py-5">Core Features</th>
              <th className="px-8 py-5">Documentation</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
               [1, 2, 3].map((i) => (
                 <tr key={i} className="animate-pulse">
                   <td colSpan={5} className="px-8 py-5 h-20">
                     <div className="h-12 bg-white/5 rounded-xl w-full" />
                   </td>
                 </tr>
               ))
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="w-16 h-12 bg-slate-800 rounded-lg border border-white/10 relative overflow-hidden flex items-center justify-center">
                       {product.images?.[0]?.image ? (
                         <img src={product.images[0].image} alt={product.name} className="object-cover w-full h-full" />
                       ) : (
                         <Package className="w-5 h-5 text-slate-600" />
                       )}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col max-w-xs">
                      <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">{product.name}</span>
                      <span className="text-[10px] text-slate-500 line-clamp-1">{product.description}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {product.features.slice(0, 2).map((f, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-bold text-indigo-400 rounded-full truncate max-w-[80px]">
                          {f}
                        </span>
                      ))}
                      {product.features.length > 2 && (
                        <span className="text-[9px] font-bold text-slate-600">+{product.features.length-2} more</span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    {product.productUsePdf ? (
                      <a 
                        href={product.productUsePdf} 
                        target="_blank"
                        className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg group/doc transition-all"
                      >
                        <FileText className="w-4 h-4 text-slate-400 group-hover/doc:text-red-400" />
                        <span className="text-[10px] font-bold text-slate-300">USER_GUIDE.PDF</span>
                      </a>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-600">NO ATTACHMENT</span>
                    )}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => handleOpenEdit(product)} className="p-2 bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white rounded-lg transition-all active:scale-95">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteMutation.mutate(product.id)}
                        className="p-2 bg-white/5 hover:bg-red-500/10 border border-white/5 text-slate-400 hover:text-red-400 rounded-lg transition-all active:scale-95"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white/5 hover:bg-primary/10 border border-white/5 text-slate-400 hover:text-primary rounded-lg transition-all active:scale-95">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                   <div className="space-y-3 opacity-40">
                      <AlertCircle className="w-12 h-12 mx-auto" />
                      <p className="text-sm font-bold uppercase tracking-widest">No products available in the repository</p>
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
                     {editingId ? 'Edit Product Parameters' : 'New Platform Submission'}
                   </h2>
                   <p className="text-slate-500 text-sm">
                     {editingId ? 'Modify existing product specifications' : 'Register a new software product into the Nizron registry'}
                   </p>
                </div>
                <button onClick={resetModal} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              <div className="space-y-6 relative z-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Product Name</label>
                       <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 outline-none text-white text-sm focus:border-primary/50 transition-all font-medium" placeholder="e.g. Nizron Analytics Core" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Category</label>
                       <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 outline-none text-white text-sm focus:border-primary/50 transition-all font-medium" placeholder="e.g. Technical" />
                    </div>
                 </div>

                 <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Detailed Description</label>
                   <textarea rows={3} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="w-full bg-white/5 border border-white/5 rounded-xl p-4 outline-none text-white text-sm focus:border-primary/50 transition-all font-medium resize-none" placeholder="Provide a high-level summary of the product's value proposition..." />
                 </div>

                 <div className="space-y-4">
                    <div className="flex items-center justify-between pl-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Features & Modules</label>
                      <button 
                        onClick={handleAddFeature}
                        className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest flex items-center"
                      >
                        <Plus className="w-3 h-3 mr-1" /> Add Field
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                       {newFeatures.map((f, idx) => (
                         <div key={idx} className="relative group">
                             <input 
                              type="text" 
                              value={f}
                              onChange={(e) => {
                                const arr = [...newFeatures];
                                arr[idx] = e.target.value;
                                setNewFeatures(arr);
                              }}
                              className="w-full h-11 bg-white/5 border border-white/5 rounded-xl px-4 pr-10 outline-none text-white text-xs focus:border-primary/50 transition-all" 
                              placeholder={`Feature #${idx+1}`}
                            />
                            {newFeatures.length > 1 && (
                              <button 
                                onClick={() => handleRemoveFeature(idx)}
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
                   <button onClick={resetModal} className="flex-1 h-13 bg-white/5 text-slate-400 font-bold rounded-2xl text-sm hover:text-white hover:bg-white/10 transition-all">Cancel</button>
                   <button 
                     onClick={handleSubmit}
                     disabled={createMutation.isPending || updateMutation.isPending || !newName || !newDescription}
                     className="flex-1 h-13 bg-primary text-white font-bold rounded-2xl text-sm shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {createMutation.isPending || updateMutation.isPending ? 'Processing...' : (editingId ? 'Update Registry' : 'Deploy into Registry')} <ChevronRight className="w-4 h-4 ml-2" />
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
