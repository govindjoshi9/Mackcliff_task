import React, { memo } from 'react';
import { Zap, Trophy, Target, Globe, ArrowUpRight } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { motion } from 'framer-motion';

const StatCard = memo(({ title, value, icon: Icon, color, detail, delay }) => (
  <GlassCard delay={delay} className="group overflow-hidden relative border-none! h-full p-5!">
    {/* Animated background glow */}
    <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-20 blur-3xl transition-all group-hover:scale-150 ${color}`} />
    
    <div className="flex items-center gap-4 mb-4 relative z-10">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110 ${color}`}>
        <Icon className="text-white neon-glow" size={20} />
      </div>
      <div>
        <span className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] block mb-0.5 italic">{title}</span>
        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</h3>
      </div>
    </div>
    
    <div className="flex items-center justify-between mt-auto relative z-10">
      <span className="text-[10px] text-slate-600 dark:text-slate-400 font-bold italic opacity-80">{detail}</span>
      <div className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
        <ArrowUpRight size={12} className="text-blue-500" />
      </div>
    </div>
  </GlassCard>
));

const StatsGrid = ({ delay = 0 }) => {
  const stats = [
    { 
      title: 'Daily Points', 
      value: '250', 
      icon: Zap, 
      color: 'bg-amber-500', 
      detail: 'Streak: 12 Days' 
    },
    { 
      title: 'Global Rank', 
      value: '#2,451', 
      icon: Globe, 
      color: 'bg-blue-600', 
      detail: 'Top 5% Student' 
    },
    { 
      title: 'Active Skills', 
      value: '12', 
      icon: Target, 
      color: 'bg-emerald-500', 
      detail: '3 Mastered' 
    },
    { 
      title: 'Badges', 
      value: '7', 
      icon: Trophy, 
      color: 'bg-indigo-600', 
      detail: 'Rare: 2' 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
      {stats.map((stat, idx) => (
        <StatCard key={stat.title} {...stat} delay={delay + (idx * 0.1)} />
      ))}
    </div>
  );
};

export default memo(StatsGrid);
