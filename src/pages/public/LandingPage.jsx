import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Zap, ShieldCheck, Cpu, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export const LandingPage = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-1/4 z-0" />

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-16 items-center relative z-10">
          {/* Image Left */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: 'spring', bounce: 0.3 }}
            className="relative order-2 md:order-1"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200"
                alt="Recruitment and Resume"
                className="w-full h-full object-cover aspect-[4/5]"
                referrerPolicy="no-referrer"
              />
            </div>

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-20 border border-slate-100 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Status</div>
                  <div className="text-sm font-black text-slate-900">CV Verified</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl z-20 border border-slate-100 hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                  <Zap size={24} />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900">AI Match Score</div>
                  <div className="h-2 w-32 bg-slate-100 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '92%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-blue-600"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Text Right */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: 'spring', bounce: 0.3 }}
            className="order-1 md:order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black mb-8 border border-blue-100 uppercase tracking-wider"
            >
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              #1 Recruitment Platform in Indonesia
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-slate-900 mb-8">
              Find Your <br />
              <span className="text-primary italic">Dream Career</span>
            </h1>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-lg font-medium">
              SmartRecruiter connects the best talent with leading companies. Powered by AI technology for a smarter and fairer recruitment process.
            </p>

            <div className="flex flex-wrap gap-6 mb-16">
              <Link
                to="/jobs"
                className="px-10 py-5 bg-primary text-white rounded-2xl font-black shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-3 group"
              >
                View Vacancies
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-12 pt-10 border-t-2 border-slate-100">
              {[
                { value: '500+', label: 'Active Vacancies' },
                { value: '10K+', label: 'Registered Applicants' },
                { value: '85%', label: 'Placement Rate' },
              ].map((stat, i) => (
                <div key={i}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-4xl font-black text-slate-900"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-primary font-black text-xs uppercase tracking-widest mb-4">About Us</div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-8">
              A Smarter Recruitment Platform
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              SmartRecruiter is an AI-based recruitment platform designed to simplify the job search and candidate selection process. We believe everyone deserves an equal opportunity and a fair process.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              With the latest machine learning technology, we help companies find the best talent and help job seekers showcase their best potential.
            </p>
            <ul className="space-y-4">
              {[
                'Data & AI based selection process',
                'Constructive CV feedback',
                'Direct connection with company HR',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-semibold">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-primary flex items-center justify-center">
                    <CheckCircle2 size={16} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-slate-100 rounded-[2.5rem] p-8"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200"
                alt="Team meeting"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-primary font-black text-xs uppercase tracking-widest mb-4">Advantages</div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-6">Why Join SmartRecruiter?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We are here with modern recruitment solutions that make it easy for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Fast Process', desc: 'Applications are processed in hours, not weeks. We value your time.', icon: Zap, color: 'bg-yellow-50 text-yellow-600' },
              { title: 'Transparent', desc: 'Your application status can always be monitored. No hidden details.', icon: ShieldCheck, color: 'bg-green-50 text-green-600' },
              { title: 'AI-Powered', desc: 'Our AI technology matches your CV with the right position accurately.', icon: Cpu, color: 'bg-purple-50 text-purple-600' },
              { title: 'Personal Feedback', desc: 'Get in-depth feedback about your CV to keep growing.', icon: MessageSquare, color: 'bg-blue-50 text-blue-600' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-6', item.color)}>
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-primary p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-600/40">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 uppercase">
              Ready for the <br />Next Step?
            </h2>
            <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto">
              Don't miss the chance to join the best IT team. Find the role that matches your passion today.
            </p>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-primary rounded-2xl font-black shadow-xl hover:scale-105 transition-transform"
            >
              View Vacancies
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
};