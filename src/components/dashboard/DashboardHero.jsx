import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Award } from 'lucide-react';

const DashboardHero = ({ userName = "Student" }) => {
  return (
    <div className="relative overflow-hidden rounded-[3rem] bg-slate-900 min-h-[360px] flex items-center p-8 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/5">
      {/* Background Image with Creative Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center h-[120%] -top-[10%] scale-105"
        style={{ backgroundImage: "url('/assets/dashboard-welcome.jpg')" }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 via-transparent to-transparent opacity-50" />
      </div>

      {/* Floating HUD Chips - The Creative Touch */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 right-12 hidden lg:flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-20"
      >
        <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Zap className="text-white" size={16} />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Active Streak</span>
          <span className="text-sm font-black text-white">12 DAYS</span>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-12 right-1/3 hidden lg:flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-20"
      >
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Award className="text-white" size={16} />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Weekly Goal</span>
          <span className="text-sm font-black text-white">85% COMPLETE</span>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-2xl"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-black uppercase tracking-[0.2em] backdrop-blur-md mb-8 shadow-xl shadow-blue-500/10"
        >
          <Sparkles size={14} />
          Mackcliff Elite
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
          Ignite your <br />
          <span className="premium-text-gradient bg-linear-to-r from-blue-400 to-indigo-300 italic serif">Potential,</span> <span className="text-white/40">{userName}</span>
        </h1>
        
        <p className="text-slate-300 text-lg md:text-xl font-bold max-w-lg mb-10 leading-snug italic opacity-80 decoration-blue-500/50 underline-offset-4">
          The stars are just your next classroom. <br />
          You've surged <span className="text-blue-400">+25%</span> in UI Mastery.
        </p>

        <div className="flex flex-wrap gap-5">
          <button className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-2xl shadow-blue-600/40 active:scale-95 flex items-center gap-3">
            <span>RESUME MISSION</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </button>
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl transition-all border border-white/10 backdrop-blur-xl active:scale-95 tracking-widest text-xs">
            DEBRIEF ANALYTICS
          </button>
        </div>
      </motion.div>

      {/* Atmospheric Effects */}
      <div className="absolute top-0 right-0 w-full h-full bg-linear-to-b from-blue-500/5 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
    </div>
  );
};

export default DashboardHero;
