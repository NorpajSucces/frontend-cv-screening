import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ArrowLeft, CheckCircle2, Loader2, FileText, AlertCircle } from 'lucide-react';
import axiosInstance from '../../services/axiosInstance';
import { fetchJobById } from '../../store/slices/jobSlice';
import { cn } from '../../utils/cn';

export const ApplyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Ambil data job dari Redux store
  const { selectedJob: job, loading: jobLoading } = useSelector((state) => state.job);

  // Selalu fetch data job saat halaman ini dibuka untuk memastikan data selalu fresh,
  // terlepas dari kondisi Redux store sebelumnya.
  useEffect(() => {
    dispatch(fetchJobById(id));
  }, [dispatch, id]);


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const cvFile = watch('cv');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Buat FormData untuk mengirim file PDF
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('cv', data.cv[0]); // File object dari input type="file"

      // Kirim ke backend: POST /api/jobs/:id/apply
      // Gunakan axiosInstance langsung — Content-Type akan di-set otomatis ke multipart/form-data
      await axiosInstance.post(`/jobs/${id}/apply`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setIsSuccess(true);

      // Redirect ke halaman jobs setelah 2.5 detik
      setTimeout(() => {
        navigate('/jobs');
      }, 2500);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Failed to submit application. Please try again.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tampilkan loading spinner saat data job sedang di-fetch
  if (jobLoading || !job) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-[60vh] flex justify-center items-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto">
      <Link
        to={`/jobs/${id}`}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 font-medium"
      >
        <ArrowLeft size={18} />
        Back to Job Detail
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase">Apply For Position</h1>
        <div className="text-primary font-bold text-xl uppercase">{job.title}</div>
        <div className="text-slate-500 text-sm mt-1 uppercase">
          {job.location} • {job.employmentType}
        </div>
      </div>

      {/* Error Banner */}
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-600">
          <AlertCircle size={20} className="shrink-0" />
          <p className="text-sm font-medium">{submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Full Name — field name "name" sesuai dengan backend */}
        <div className="relative">
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Full name is required' })}
            placeholder=" "
            className={cn(
              'peer w-full px-4 py-4 rounded-2xl border bg-white focus:outline-none focus:ring-2 transition-all pt-6',
              errors.name
                ? 'border-red-500 focus:ring-red-100'
                : 'border-slate-200 focus:ring-primary/10 focus:border-primary'
            )}
          />
          <label
            htmlFor="name"
            className="absolute left-4 top-2 text-xs font-bold text-slate-400 uppercase tracking-wider transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
          >
            Full Name
          </label>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
            })}
            placeholder=" "
            className={cn(
              'peer w-full px-4 py-4 rounded-2xl border bg-white focus:outline-none focus:ring-2 transition-all pt-6',
              errors.email
                ? 'border-red-500 focus:ring-red-100'
                : 'border-slate-200 focus:ring-primary/10 focus:border-primary'
            )}
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-2 text-xs font-bold text-slate-400 uppercase tracking-wider transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
          >
            Email
          </label>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="relative">
          <input
            type="tel"
            id="phone"
            {...register('phone', { required: 'Phone number is required' })}
            placeholder=" "
            className={cn(
              'peer w-full px-4 py-4 rounded-2xl border bg-white focus:outline-none focus:ring-2 transition-all pt-6',
              errors.phone
                ? 'border-red-500 focus:ring-red-100'
                : 'border-slate-200 focus:ring-primary/10 focus:border-primary'
            )}
          />
          <label
            htmlFor="phone"
            className="absolute left-4 top-2 text-xs font-bold text-slate-400 uppercase tracking-wider transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
          >
            Phone Number
          </label>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone.message}</p>
          )}
        </div>

        {/* CV Upload */}
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
            Upload CV (PDF, Max 5MB)
          </label>
          <div
            className={cn(
              'relative border-2 border-dashed rounded-3xl p-10 text-center transition-all',
              errors.cv ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-primary hover:bg-primary/5'
            )}
          >
            <input
              type="file"
              accept=".pdf"
              {...register('cv', {
                required: 'CV is required',
                validate: {
                  lessThan5MB: (files) =>
                    !files[0] || files[0].size < 5000000 || 'Maximum file size is 5MB',
                  isPDF: (files) =>
                    !files[0] || files[0].type === 'application/pdf' || 'File must be a PDF',
                },
              })}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center gap-4 pointer-events-none">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                {cvFile?.[0] ? <FileText size={32} className="text-primary" /> : <Upload size={32} />}
              </div>
              <div>
                <p className="font-bold text-slate-700">
                  {cvFile?.[0] ? cvFile[0].name : 'Click or drag file here'}
                </p>
                <p className="text-xs text-slate-400 mt-1 uppercase">PDF only, max 5MB</p>
              </div>
            </div>
          </div>
          {errors.cv && (
            <p className="text-red-500 text-xs mt-2 font-medium">{errors.cv.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </form>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-12 rounded-[3rem] max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-2xl font-black tracking-tighter mb-2 uppercase">Application Sent!</h2>
              <p className="text-slate-500 mb-8">
                Your application has been received. Our AI is now reviewing your CV. We will contact you soon.
              </p>
              <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5 }}
                  className="h-full bg-primary"
                />
              </div>
              <p className="text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-widest">
                Redirecting to job list...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
