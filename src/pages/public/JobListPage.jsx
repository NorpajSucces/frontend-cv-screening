import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Briefcase, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchPublicJobs } from '../../store/slices/jobSlice'; // IMPORT DARI REDUX
import { cn } from '../../utils/cn';

export const JobListPage = () => {
  const dispatch = useDispatch();
  // Ambil state dari brankas Redux
  const { jobs, loading, error } = useSelector((state) => state.job);

  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Memicu pengambilan data dari backend saat halaman dimuat
  useEffect(() => {
    dispatch(fetchPublicJobs());
  }, [dispatch]);

  // Derive unique locations dari data backend
  const locations = useMemo(() => {
    // Pastikan jobs berbentuk array sebelum di-map
    if (!Array.isArray(jobs)) return ['All']; 
    const locs = Array.from(new Set(jobs.map(j => j.location).filter(Boolean)));
    return ['All', ...locs];
  }, [jobs]);

  // Derive unique employmentType dari data backend
  const types = useMemo(() => {
     if (!Array.isArray(jobs)) return ['All'];
     const t = Array.from(new Set(jobs.map(j => j.employmentType).filter(Boolean)));
     return ['All', ...t];
  }, [jobs]);

  // Filter jobs di sisi frontend
  const filteredJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return [];
    return jobs.filter(job => {
      const matchesSearch =
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.description?.toLowerCase().includes(search.toLowerCase());
      const matchesLocation = locationFilter === 'All' || job.location === locationFilter;
      const matchesType = typeFilter === 'All' || job.employmentType === typeFilter;
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [search, locationFilter, typeFilter, jobs]);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black mb-6 uppercase tracking-widest border border-blue-100"
        >
          <Briefcase size={14} />
          Career Opportunities
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-6xl font-black tracking-tighter mb-6 uppercase leading-none"
        >
          Find Your <span className="text-primary italic">Dream Role</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-lg"
        >
          Explore career opportunities at SmartRecruiter IT Solutions. We're looking for talented individuals to join our growing team.
        </motion.p>
      </div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto mb-20 space-y-6"
      >
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          <input
            type="text"
            placeholder="Search positions or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-16 pr-6 py-6 rounded-[2rem] border-2 border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-xl shadow-slate-200/50 text-lg font-medium"
          />
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Location:</span>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Tampilan Error */}
      {error && (
         <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-50 text-red-600 rounded-2xl text-center font-bold">
            {error}
         </div>
      )}

      {/* Tampilan Loading */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      ) : (
        <>
          {/* Job Count */}
          <div className="max-w-7xl mx-auto mb-8">
            <p className="text-slate-400 text-sm font-bold">
              Showing <span className="text-primary">{filteredJobs.length}</span> positions
            </p>
          </div>

          {/* Job Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, i) => (
                  <motion.div
                    key={job._id} // Pastikan menggunakan _id dari MongoDB
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                        <Briefcase size={28} />
                      </div>
                      <span className={cn(
                        "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                        job.employmentType === 'Full-time' && "bg-blue-50 text-blue-600",
                        job.employmentType === 'Part-time' && "bg-purple-50 text-purple-600",
                        job.employmentType === 'Internship' && "bg-green-50 text-green-600",
                      )}>
                        {job.employmentType}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-primary transition-colors leading-tight">
                      {job.title}
                    </h3>

                    <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed flex-grow">
                      {job.aboutPosition || job.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-6 pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                        <MapPin size={16} className="text-primary/60" />
                        {job.location}
                      </div>
                    </div>

                    <Link
                      to={`/jobs/${job._id}`}
                      className="w-full py-4 rounded-2xl bg-blue-50 text-primary font-black flex items-center justify-center gap-2 group/btn hover:bg-primary hover:text-white transition-all shadow-sm mt-auto uppercase text-sm"
                    >
                      View Details
                      <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center"
                >
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                    <Search size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">No jobs found</h3>
                  <p className="text-slate-500">Try using different keywords or change your filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};