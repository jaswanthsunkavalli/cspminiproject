import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Plus, Trash2, Edit3, ShieldCheck, CheckCircle2, Calendar } from 'lucide-react';

export const CommunityAwarenessPage: React.FC = () => {
  const { isAdmin } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State for Admin CRUD
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Educational Accessibility',
    description: '',
    content: '',
  });
  const [saving, setSaving] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/awareness');
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error('Failed to load awareness posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Educational Accessibility',
      description: '',
      content: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (post: any) => {
    setEditingId(post._id);
    setFormData({
      title: post.title,
      category: post.category,
      description: post.description,
      content: post.content,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this awareness post?')) return;
    try {
      await api.delete(`/awareness/${id}`);
      await fetchPosts();
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await api.patch(`/awareness/${editingId}`, formData);
      } else {
        await api.post('/awareness', formData);
      }
      setModalOpen(false);
      await fetchPosts();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to save post.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <BookOpen className="w-4 h-4" />
            <span>Kuntamukkala Community Guidance</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Village Community Awareness Articles
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Educational guidelines for school travel safety, anti-mosquito measures, drain clearance, and waste segregation.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 shrink-0 self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Article</span>
          </button>
        )}
      </div>

      {/* Grid of Articles */}
      {loading ? (
        <div className="p-12 text-center text-xs text-slate-500">Loading awareness posts...</div>
      ) : posts.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
          No awareness articles published yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px]">
                    {post.category}
                  </span>
                  <span className="text-slate-400">
                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {post.description}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
                  {post.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span className="truncate max-w-[150px]">✍️ {post.authorName || 'Gram Panchayat Cell'}</span>
                
                {isAdmin && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(post)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Edit article"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Admin Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {editingId ? 'Edit Awareness Post' : 'Publish New Awareness Post'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Rainy Season School Travel Safety Guidelines"
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Educational Accessibility">Educational Accessibility</option>
                  <option value="Environmental Cleanliness">Environmental Cleanliness</option>
                  <option value="Public Health & Vector Control">Public Health & Vector Control</option>
                  <option value="Community Participation">Community Participation</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Short Subtitle / Summary</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief 1-line overview"
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Guidance Content</label>
                <textarea
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Detailed guidelines and community instructions..."
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                ></textarea>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  {saving ? 'Publishing...' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
