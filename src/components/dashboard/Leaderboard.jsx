import React from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus, Medal } from 'lucide-react';
import GlassCard from '../common/GlassCard';

const Leaderboard = () => {
  const students = [
    { id: 1, name: 'Alex Johnson', points: '12,450', country: 'USA', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', trend: 'up' },
    { id: 2, name: 'Maria Garcia', points: '11,820', country: 'Spain', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', trend: 'down' },
    { id: 3, name: 'Yuki Tanaka', points: '11,200', country: 'Japan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki', trend: 'up' },
    { id: 4, name: 'Liam Wilson', points: '10,950', country: 'UK', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam', trend: 'neutral' },
    { id: 5, name: 'Chen Wei', points: '10,540', country: 'China', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chen', trend: 'up' },
  ];

  return (
    <GlassCard className="flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center shadow-inner">
            <Trophy className="text-amber-500" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Global Ranking</h3>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Leading Explorers</p>
          </div>
        </div>
        <button className="text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg hover:underline transition-all">
          View Full List
        </button>
      </div>

      <div className="space-y-4">
        {students.map((student, index) => (
          <div key={student.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all group cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50 shadow-xs hover:shadow-lg">
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className={`flex items-center justify-center text-[10px] font-extrabold w-5 h-5 rounded-full absolute -top-1.5 -left-1.5 z-10 
                  ${index === 0 ? 'bg-amber-400 text-white shadow-md' : index === 1 ? 'bg-slate-300 text-slate-700' : index === 2 ? 'bg-orange-300 text-orange-900' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600'}`}>
                  {index + 1}
                </span>
                <img src={student.avatar} alt={student.name} className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-0.5 object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{student.name}</span>
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="text-[10px] font-extrabold tracking-wide uppercase">{student.country}</span>
                  {index < 3 && <Medal className={`w-3 h-3 ${index === 0 ? 'text-amber-500' : index === 1 ? 'text-slate-400' : 'text-orange-400'}`} />}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col text-right">
                <span className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">{student.points}</span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-tighter">Points</span>
              </div>
              <div className="w-8 flex items-center justify-center">
                {student.trend === 'up' && <TrendingUp size={16} className="text-emerald-500" />}
                {student.trend === 'down' && <TrendingDown size={16} className="text-rose-500" />}
                {student.trend === 'neutral' && <Minus size={16} className="text-slate-400" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default Leaderboard;
