import React, { memo } from 'react';
import { Award, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';

const SkillsRadar = ({ delay = 0 }) => {
  const skills = [
    { name: 'Web Development', level: 'Intermediate', progress: 65, color: 'from-blue-500 to-indigo-600' },
    { name: 'Python Programming', level: 'Beginner', progress: 30, color: 'from-emerald-400 to-teal-500' },
    { name: 'UI/UX Design', level: 'Advanced', progress: 85, color: 'from-fuchsia-500 to-purple-600' },
    { name: 'Data Structures', level: 'Intermediate', progress: 50, color: 'from-amber-400 to-orange-500' },
  ];

  return (
    <GlassCard delay={delay} className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shadow-inner">
            <Award className="text-blue-600 dark:text-blue-400" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Active Skills</h3>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Growth</p>
          </div>
        </div>
        <div className="px-2 py-1 bg-emerald-500/10 rounded-lg flex items-center gap-1">
          <TrendingUp size={12} className="text-emerald-500" />
          <span className="text-[9px] font-bold text-emerald-600 uppercase">+12%</span>
        </div>
      </div>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={skill.name} className="space-y-2 group">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 group-hover:text-blue-500 transition-colors">
                <CheckCircle2 size={14} className="text-blue-500/50 group-hover:text-blue-500 transition-transform group-hover:scale-110" />
                {skill.name}
              </span>
              <span className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">
                {skill.level}
              </span>
            </div>
            
            <div className="relative h-2 bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${skill.progress}%` }}
                transition={{ duration: 1.2, delay: delay + (index * 0.1), ease: "easeOut" }}
                className={`h-full rounded-full bg-linear-to-r ${skill.color} shadow-[0_0_12px_rgba(59,130,246,0.3)] relative`}
              >
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-white/20 to-transparent" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/50">
        <button className="w-full py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-[10px] font-bold text-white uppercase tracking-widest transition-all shadow-lg active:scale-95">
          Detailed Report
        </button>
      </div>
    </GlassCard>
  );
};

export default memo(SkillsRadar);
