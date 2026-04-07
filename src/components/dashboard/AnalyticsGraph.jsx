import React from 'react';
import { motion } from 'framer-motion';

const AnalyticsGraph = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const values = [45, 62, 85, 50, 92, 38, 70]; // Activity level percentage
  const maxValue = 100;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex items-end justify-between gap-3 min-h-[200px]">
        {values.map((v, i) => (
          <div key={days[i]} className="flex-1 flex flex-col items-center group relative h-full justify-end">
            {/* Bar Background (Track) */}
            <div className="absolute inset-x-0 bottom-8 top-0 bg-slate-100 dark:bg-slate-800/40 rounded-2xl -z-10" />
            
            {/* Active Bar */}
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${(v / maxValue) * 100}%` }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
              className={`w-full rounded-2xl transition-all duration-300 relative group-hover:brightness-110 shadow-lg
                ${i === values.length - 1 ? 'premium-gradient shadow-blue-500/20' : 'bg-slate-300 dark:bg-slate-700'}`}
              style={{ marginBottom: '32px' }}
            >
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2.5 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 pointer-events-none whitespace-nowrap z-20 font-bold shadow-xl border border-slate-700">
                {v}% Intensity
              </div>
              
              {/* Glossy Overlay on Bar */}
              <div className="absolute inset-0 bg-linear-to-b from-white/20 to-transparent rounded-2xl" />
            </motion.div>

            {/* Day Label */}
            <span className="absolute bottom-0 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
              {days[i]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase">Weekly Avg</span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">72%</h4>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase">Streak</span>
            <h4 className="text-lg font-bold text-blue-500 leading-tight">12 Days</h4>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">Performance</span>
          <h4 className="text-lg font-bold text-emerald-500 leading-tight">+18.2%</h4>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsGraph;
