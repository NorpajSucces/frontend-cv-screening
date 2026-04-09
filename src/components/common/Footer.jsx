import React from 'react';
import { Cpu, ShieldCheck } from 'lucide-react'; 
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-24 pb-12 px-6 overflow-hidden relative">
      {/* Efek Glow Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Kolom Kiri: Company Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-8 group cursor-pointer w-max">
              <div className="w-14 h-14 bg-primary rounded-[1.25rem] flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:scale-105 transition-all">
                <Cpu size={32} />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-3xl leading-none text-white tracking-tighter">SmartRecruiter</span>
                <span className="text-[11px] font-bold text-primary uppercase tracking-[0.4em] mt-1">IT Solutions</span>
              </div>
            </div>

            <p className="text-slate-400 mb-8 leading-relaxed max-w-md text-lg font-medium">
              Indonesia's leading AI-powered recruitment platform. We redefine how top talent meets dream companies through smart technology.
            </p>
          </div>

          {/* Kolom Kanan: Links */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 pt-4">
            {[
              {
                title: 'Candidates',
                links: ['Job Search', 'CV Verification', 'Career Analysis', 'Interview Tips'],
              },
              {
                title: 'Companies',
                links: ['Post a Job', 'HRIS Dashboard', 'Talent Search', 'Enterprise Solutions'],
              },
              {
                title: 'Support',
                links: ['Help Center', 'Contact Us', 'Data Security', 'Privacy Policy'],
              },
            ].map((col, ci) => (
              <div key={ci}>
                <h4 className="font-black text-white text-xs uppercase tracking-[0.2em] mb-8 opacity-60 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary/50" />
                  {col.title}
                </h4>
                <ul className="space-y-4 text-sm font-semibold text-slate-400">
                  {col.links.map((link, li) => (
                    <li key={li}>
                      <a href="#" className="hover:text-primary hover:translate-x-2 transition-transform flex items-center gap-2 group inline-block">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsors Section - MODIFIKASI UKURAN DAN TRANSPARANSI */}
        <div className="py-12 border-y border-slate-800/50 mb-12 bg-slate-900/20 rounded-3xl">
          <h4 className="font-black text-white text-[10px] uppercase tracking-[0.3em] mb-8 text-center opacity-40">
            Trusted by Our Partners & Sponsors
          </h4>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center px-6">
            {[
              { name: 'Elice', src: '/elice.png' },
              { name: 'BPTIK', src: '/bpptik.jfif' },
              { name: 'ASEAN', src: '/asean.png' },
              { name: 'Komdigi', src: '/komdigi.png' },
            ].map((sponsor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative"
              >
                {/* Efek Glow halus di belakang gambar saat hover */}
                <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* MODIFIKASI: Perbesar ukuran (h-12 md:h-16) dan hilangkan background putih (mix-blend-lighten) */}
                <img
                  src={sponsor.src}
                  alt={sponsor.name}
                  className="h-12 md:h-16 w-auto relative z-10 transition-transform duration-500 ease-out hover:scale-110 mix-blend-lighten"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
          <div className="text-[11px] font-bold text-slate-500 tracking-widest flex items-center gap-2">
            © {new Date().getFullYear()} <span className="text-white">SmartRecruiter IT.</span> All rights reserved.
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 bg-emerald-950/30 px-5 py-2.5 rounded-2xl border border-emerald-900/30 shadow-inner"
          >
            <ShieldCheck size={16} className="text-emerald-500" />
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Enterprise Grade Security</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};