import React from 'react';
import { motion } from 'framer-motion';

const DashboardHero = ({ userName = "Student" }) => {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 min-h-[320px] flex items-center p-8 md:p-12 shadow-2xl">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: "url('/assets/dashboard-welcome.jpg')" }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/40 to-transparent" />
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-2xl"
      >
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-bold backdrop-blur-md mb-6"
        >
          Mackcliff Excellence
        </motion.span>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 leading-tight">
          Welcome back, <span className="premium-text-gradient bg-linear-to-r from-blue-400 to-sky-300 italic">{userName}</span> 👋
        </h1>
        
        <p className="text-slate-300 text-lg md:text-xl font-medium max-w-lg mb-8 leading-relaxed">
          Your path to mastery continues. You've earned <span className="text-blue-400 font-bold">120 XP</span> this week. Keep it up!
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/30 active:scale-95">
            Resume Navigation
          </button>
          <button className="px-8 py-3.5 bg-slate-800/80 hover:bg-slate-700/80 text-white font-bold rounded-2xl transition-all border border-slate-700/50 backdrop-blur-md active:scale-95">
            View Analytics
          </button>
        </div>
      </motion.div>

      {/* Floating Elements for Premium Feel */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
    </div>
  );
};

export default DashboardHero;
