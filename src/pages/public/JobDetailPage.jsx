import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  ArrowLeft, MapPin, Building2, Clock, ArrowRight, Share2,
  Bookmark, ShieldCheck, Briefcase, Loader2
} from 'lucide-react';
import { fetchJobById, clearSelectedJob } from '../../store/slices/jobSlice'; // IMPORT DARI REDUX

export const JobDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Mengambil state dari Redux
  const { selectedJob: job, loading, error, jobs } = useSelector((state) => state.job);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchJobById(id));

    // Bersihkan data saat user meninggalkan halaman agar tidak "ngelag" lihat data lama
    return () => {
      dispatch(clearSelectedJob());
    };
  }, [dispatch, id]);

  if (loading) {
     return (
        <div className="min-h-screen flex justify-center items-center bg-white">
           <Loader2 className="animate-spin text-primary" size={64} />
        </div>
     );
  }

  if (error || !job) {
    return (
      <div className="pt-32 pb-20 px-6 text-center min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-black text-slate-900 mb-4">{error || "Job Not Found"}</h2>
        <Link to="/jobs" className="text-primary font-bold hover:underline">
          Back to Job List
        </Link>
      </div>
    );
  }

  // Helper untuk memecah teks description/requirements dari database menjadi list
  const renderList = (text) => {
     if (!text) return null;
     // Pisahkan berdasarkan baris baru
     const items = text.split('\n').filter(item => item.trim() !== '');
     return items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="flex items-start gap-6 p-6 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors group"
        >
          <div className="text-primary font-black text-lg italic opacity-30 group-hover:opacity-100 transition-opacity shrink-0">
            {(i + 1).toString().padStart(2, '0')}
          </div>
          <p className="text-slate-600 font-bold">{item}</p>
        </motion.div>
     ));
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Office background"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors font-black text-xs uppercase tracking-[0.2em]"
            >
              <ArrowLeft size={14} />
              Back to Careers
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest">
                  {job.employmentType}
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase mb-8">
                {job.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 === 1 ? 'text-primary italic block' : 'block'}>
                    {word}
                  </span>
                ))}
              </h1>

              <div className="flex flex-wrap gap-8 text-white/60 font-bold">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  <span className="text-sm uppercase tracking-wider">{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={20} className="text-primary" />
                  <span className="text-sm uppercase tracking-wider">SmartRecruiter HQ</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 lg:justify-end"
            >
              <Link
                to={`/jobs/${job._id}/apply`}
                className="group px-12 py-6 bg-primary text-white rounded-full font-black shadow-2xl shadow-primary/40 hover:bg-blue-700 transition-all flex items-center justify-center gap-4 uppercase tracking-widest text-sm"
              >
                Apply for this role
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left: Details */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* About */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">The Opportunity</h3>
              </div>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">{job.aboutPosition}</p>
            </motion.div>

            {/* Description / Responsibilities */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Description</h3>
              </div>
              <div className="space-y-4">
                 {renderList(job.description)}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Requirements</h3>
              </div>
              <div className="space-y-4">
                 {renderList(job.requirements)}
              </div>
            </motion.div>
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="col-span-2 p-8 rounded-[2.5rem] bg-primary text-white shadow-2xl shadow-primary/20">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Salary Range</div>
                  <div className="text-3xl font-black tracking-tighter">Competitive</div>
                  <div className="mt-4 text-xs font-bold opacity-80">Based on experience and skills</div>
                </div>

                <div className="p-6 rounded-[2rem] bg-slate-900 text-white">
                  <Clock size={20} className="text-primary mb-4" />
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Type</div>
                  <div className="font-black text-sm">{job.employmentType}</div>
                </div>

                <div className="p-6 rounded-[2rem] bg-slate-100 text-slate-900">
                  <ShieldCheck size={20} className="text-primary mb-4" />
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Status</div>
                  <div className="font-black text-sm capitalize">{job.status}</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100"
              >
                <h4 className="font-black text-slate-900 mb-4 uppercase tracking-tight">Ready to apply?</h4>
                <p className="text-sm text-slate-500 font-medium mb-8">
                  Join our team and help us redefine the recruitment industry with cutting-edge AI.
                </p>
                <Link
                  to={`/jobs/${job._id}/apply`}
                  className="w-full py-5 bg-primary text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-primary/20 uppercase text-xs tracking-widest"
                >
                  Start Application
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Jobs */}
      <section className="bg-slate-50 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">More Roles</h3>
              </div>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Other Openings</h2>
            </div>
            <Link
              to="/jobs"
              className="px-8 py-4 rounded-full border-2 border-slate-200 text-slate-900 font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-sm hover:shadow-md"
            >
              View All Opportunities
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {jobs?.filter(j => j._id !== job._id)
              .slice(0, 3)
              .map((otherJob, i) => (
                <motion.div
                  key={otherJob._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="h-full"
                >
                  <Link to={`/jobs/${otherJob._id}`} className="block h-full">
                    <div className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col h-full relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                      
                      <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className="w-12 h-12 bg-blue-50 text-primary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                          <Briefcase size={24} />
                        </div>
                        <span className="px-4 py-1.5 rounded-full bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-100">
                          {otherJob.employmentType}
                        </span>
                      </div>

                      <h4 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-primary transition-colors leading-tight uppercase relative z-10">
                        {otherJob.title}
                      </h4>

                      <div className="flex flex-col gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest mb-2 mt-auto relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 rounded-md bg-slate-50 text-slate-400">
                            <MapPin size={14} />
                          </div>
                          {otherJob.location}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Building2,
  Clock,
  ArrowRight,
  Share2,
  Bookmark,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { JOBS } from '../../constants';

export const JobDetailPage = () => {
  const { id } = useParams();
  const job = JOBS.find(j => j.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!job) {
    return (
      <div className="pt-32 pb-20 px-6 text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-4">Job Not Found</h2>
        <Link to="/jobs" className="text-primary font-bold hover:underline">
          Back to Job List
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Office background"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors font-black text-xs uppercase tracking-[0.2em]"
            >
              <ArrowLeft size={14} />
              Back to Careers
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest">
                  {job.type}
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
                  {job.category}
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase mb-8">
                {job.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 === 1 ? 'text-primary italic block' : 'block'}>
                    {word}
                  </span>
                ))}
              </h1>

              <div className="flex flex-wrap gap-8 text-white/60 font-bold">
                <div className="flex items-center gap-2">
                  <MapPin size={20} className="text-primary" />
                  <span className="text-sm uppercase tracking-wider">{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={20} className="text-primary" />
                  <span className="text-sm uppercase tracking-wider">SmartRecruiter HQ</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 lg:justify-end"
            >
              <Link
                to={`/jobs/${job.id}/apply`}
                className="group px-12 py-6 bg-primary text-white rounded-full font-black shadow-2xl shadow-primary/40 hover:bg-blue-700 transition-all flex items-center justify-center gap-4 uppercase tracking-widest text-sm"
              >
                Apply for this role
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <div className="flex gap-3">
                <button className="p-6 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all">
                  <Share2 size={20} />
                </button>
                <button className="p-6 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all">
                  <Bookmark size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left: Details */}
          <div className="lg:col-span-8 space-y-24">
            {/* About */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">The Opportunity</h3>
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
                Help us build the future of{' '}
                <span className="text-primary italic">recruitment technology</span>.
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">{job.about}</p>
            </motion.div>

            {/* Responsibilities */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Responsibilities</h3>
              </div>
              <div className="space-y-4">
                {job.responsibilities.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-6 p-6 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="text-primary font-black text-lg italic opacity-30 group-hover:opacity-100 transition-opacity shrink-0">
                      {(i + 1).toString().padStart(2, '0')}
                    </div>
                    <p className="text-slate-600 font-bold">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Requirements</h3>
              </div>
              <div className="space-y-4">
                {job.requirements.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-6 p-6 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="text-primary font-black text-lg italic opacity-30 group-hover:opacity-100 transition-opacity shrink-0">
                      {(i + 1).toString().padStart(2, '0')}
                    </div>
                    <p className="text-slate-600 font-bold">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="col-span-2 p-8 rounded-[2.5rem] bg-primary text-white shadow-2xl shadow-primary/20">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Salary Range</div>
                  <div className="text-3xl font-black tracking-tighter">Competitive</div>
                  <div className="mt-4 text-xs font-bold opacity-80">Based on experience and skills</div>
                </div>

                <div className="p-6 rounded-[2rem] bg-slate-900 text-white">
                  <Clock size={20} className="text-primary mb-4" />
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Type</div>
                  <div className="font-black text-sm">{job.type}</div>
                </div>

                <div className="p-6 rounded-[2rem] bg-slate-100 text-slate-900">
                  <ShieldCheck size={20} className="text-primary mb-4" />
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Experience</div>
                  <div className="font-black text-sm">2-5 Years</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2.5rem] bg-blue-50 border border-blue-100"
              >
                <h4 className="font-black text-slate-900 mb-4 uppercase tracking-tight">Ready to apply?</h4>
                <p className="text-sm text-slate-500 font-medium mb-8">
                  Join our team and help us redefine the recruitment industry with cutting-edge AI.
                </p>
                <Link
                  to={`/jobs/${job.id}/apply`}
                  className="w-full py-5 bg-primary text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-primary/20 uppercase text-xs tracking-widest"
                >
                  Start Application
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Jobs */}
      <section className="bg-slate-50 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">More Roles</h3>
              </div>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Other Openings</h2>
            </div>
            <Link
              to="/jobs"
              className="px-8 py-4 rounded-full border-2 border-slate-200 text-slate-900 font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-sm hover:shadow-md"
            >
              View All Opportunities
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {JOBS.filter(j => j.id !== job.id)
              .slice(0, 3)
              .map((otherJob, i) => (
                <motion.div
                  key={otherJob.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="h-full"
                >
                  <Link to={`/jobs/${otherJob.id}`} className="block h-full">
                    <div className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col h-full relative overflow-hidden">
                      {/* Dekorasi blur di sudut atas */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                      
                      <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className="w-12 h-12 bg-blue-50 text-primary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                          <Briefcase size={24} />
                        </div>
                        <span className="px-4 py-1.5 rounded-full bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-100">
                          {otherJob.type}
                        </span>
                      </div>

                      <h4 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-primary transition-colors leading-tight uppercase relative z-10">
                        {otherJob.title}
                      </h4>

                      {/* View Details sudah dihapus, margin bawah diganti mb-2 agar jarak pas */}
                      <div className="flex flex-col gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest mb-2 mt-auto relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 rounded-md bg-slate-50 text-slate-400">
                            <MapPin size={14} />
                          </div>
                          {otherJob.location}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 rounded-md bg-slate-50 text-slate-400">
                            <Building2 size={14} />
                          </div>
                          SmartRecruiter IT
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};