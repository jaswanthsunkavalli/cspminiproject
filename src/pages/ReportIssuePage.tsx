import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AlertTriangle, Upload, CheckCircle2, Image as ImageIcon, MapPin, Tag } from 'lucide-react';

export const ReportIssuePage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Educational Accessibility',
    subcategory: 'Rainy-season travel difficulty',
    description: '',
    location: '',
    priority: 'Medium',
    images: [] as string[],
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const subcategories: Record<string, string[]> = {
    'Educational Accessibility': [
      'School transportation',
      'Rainy-season travel difficulty',
      'Classroom infrastructure',
      'School accessibility',
      'Other education concerns',
    ],
    'Environmental Cleanliness': [
      'Missing drainage',
      'Blocked drainage',
      'Irregular drain cleaning',
      'Stagnant water',
      'Mosquito problems',
      'Waste disposal',
      'General cleanliness',
    ],
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCat = e.target.value;
    setFormData((prev) => ({
      ...prev,
      category: newCat,
      subcategory: subcategories[newCat][0],
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.title || !formData.description || !formData.location) {
      setError('Please complete all mandatory complaint fields.');
      return;
    }

    setSubmitting(true);

    try {
      let imageUrls = [...formData.images];

      // Handle image upload if a file was selected
      if (imageFile) {
        setUploading(true);
        const uploadData = new FormData();
        uploadData.append('image', imageFile);

        try {
          const uploadRes = await api.post('/upload', uploadData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          if (uploadRes.data.imageUrl) {
            imageUrls.push(uploadRes.data.imageUrl);
          }
        } catch (uploadErr) {
          console.warn('Image upload failed, submitting complaint without image upload:', uploadErr);
        } finally {
          setUploading(false);
        }
      }

      const payload = {
        ...formData,
        images: imageUrls,
      };

      const res = await api.post('/complaints', payload);

      setSuccess(`Complaint submitted successfully! Unique Reference ID: ${res.data.complaintId}`);

      setTimeout(() => {
        navigate(`/complaints/${res.data.complaint._id || res.data.complaintId}`);
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to submit complaint.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <AlertTriangle className="w-4 h-4" />
          <span>Kuntamukkala Action Framework</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Report a Village Community Issue
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Digital complaint registration for educational access, drainage maintenance, stagnant water, and environmental cleanliness.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-600 text-xs font-semibold">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Complaint Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Sub-station Road Muddy School Route in Rains"
            required
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category & Subcategory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Educational Accessibility">Educational Accessibility</option>
              <option value="Environmental Cleanliness">Environmental Cleanliness</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Subcategory <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.subcategory}
              onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              {subcategories[formData.category].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location & Priority */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Village Area / Street / Landmark <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Sub-station Road, near Primary School"
              required
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Priority Level
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority (Urgent)</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Detailed Problem Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the issue clearly (e.g. school travel difficulties during monsoon, stagnant water depth, drain blockage location, duration of problem)..."
            required
            className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          ></textarea>
        </div>

        {/* Photo Upload */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Upload Photograph (Optional)
          </label>
          
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center space-y-3 hover:border-emerald-500 transition-colors">
            {imagePreview ? (
              <div className="space-y-2">
                <img
                  src={imagePreview}
                  alt="Complaint Preview"
                  className="max-h-48 mx-auto rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="text-xs text-red-600 font-semibold hover:underline"
                >
                  Remove Photograph
                </button>
              </div>
            ) : (
              <label className="cursor-pointer space-y-2 block">
                <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Click to select an image from your device
                </p>
                <p className="text-[11px] text-slate-400">JPG, PNG, WebP up to 5MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Submit CTA */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || uploading}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {submitting ? 'Submitting to MongoDB...' : 'Submit Complaint'}
          </button>
        </div>
      </form>
    </div>
  );
};
