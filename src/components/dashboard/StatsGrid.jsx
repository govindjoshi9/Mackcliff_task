import React from 'react';
import { Zap, Trophy, Target, Globe, ArrowUpRight } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, detail, delay }) => (
  <GlassCard delay={delay} className="group overflow-hidden relative border-none!">
    <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-[5rem] opacity-10 transition-transform group-hover:scale-110 ${color.replace('bg-', 'bg-')}`} />
    
    <div className="flex items-center gap-5 mb-6">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform group-hover:rotate-6 ${color}`}>
        <Icon className="text-white" size={28} />
      </div>
      <div>
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">{title}</span>
        <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{value}</h3>
      </div>
    </div>
    
    <div className="flex items-center justify-between mt-auto">
      <span className="text-sm text-slate-600 dark:text-slate-400 font-semibold">{detail}</span>
      <ArrowUpRight size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </GlassCard>
);

const StatsGrid = () => {
  const stats = [
    { 
      title: 'Daily Points', 
      value: '250', 
      icon: Zap, 
      color: 'bg-amber-500', 
      detail: '+50 points for login' 
    },
    { 
      title: 'Global Rank', 
      value: '#2,451', 
      icon: Globe, 
      color: 'bg-blue-600', 
      detail: 'Top 5% of students' 
    },
    { 
      title: 'Active Skills', 
      value: '12', 
      icon: Target, 
      color: 'bg-emerald-500', 
      detail: '3 mastered this month' 
    },
    { 
      title: 'Badges Earned', 
      value: '7', 
      icon: Trophy, 
      color: 'bg-indigo-600', 
      detail: 'Consistency master' 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, idx) => (
        <StatCard key={stat.title} {...stat} delay={idx * 0.1} />
      ))}
    </div>
  );
};

export default StatsGrid;
