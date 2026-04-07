import React from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const Leaderboard = () => {
  const students = [
    { id: 1, name: 'Alex Johnson', points: '12,450', country: 'USA', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', trend: 'up' },
    { id: 2, name: 'Maria Garcia', points: '11,820', country: 'Spain', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', trend: 'down' },
    { id: 3, name: 'Yuki Tanaka', points: '11,200', country: 'Japan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki', trend: 'up' },
    { id: 4, name: 'Liam Wilson', points: '10,950', country: 'UK', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam', trend: 'neutral' },
    { id: 5, name: 'Chen Wei', points: '10,540', country: 'China', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chen', trend: 'up' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <Trophy className="text-amber-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Global Ranking</h3>
            <p className="text-sm text-gray-500 font-medium">Top performing students</p>
          </div>
        </div>
        <button className="text-sm text-blue-600 dark:text-blue-400 font-bold hover:underline">View All</button>
      </div>

      <div className="space-y-4">
        {students.map((student, index) => (
          <div key={student.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
            <div className="flex items-center gap-4">
              <span className={`text-sm font-bold w-6 ${index < 3 ? 'text-amber-500' : 'text-gray-400'}`}>
                {index + 1}
              </span>
              <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{student.name}</span>
                <span className="text-[11px] text-gray-500 font-bold tracking-wide uppercase">{student.country}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col text-right">
                <span className="text-sm font-bold text-gray-900 dark:text-white">{student.points}</span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase">Points</span>
              </div>
              <div className="w-8 flex items-center justify-center">
                {student.trend === 'up' && <TrendingUp size={16} className="text-emerald-500" />}
                {student.trend === 'down' && <TrendingDown size={16} className="text-rose-500" />}
                {student.trend === 'neutral' && <Minus size={16} className="text-gray-400" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
