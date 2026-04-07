import React from 'react';

const AnalyticsGraph = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const values = [4, 6, 8, 5, 9, 3, 7]; // Hours spent learning
  const maxValue = Math.max(...values);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Learning Activity</h3>
          <p className="text-sm text-gray-500 font-medium">Time spent learning this week</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400 font-bold">Today</span>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between h-48 gap-2 mb-4">
        {values.map((v, i) => (
          <div key={days[i]} className="flex-1 flex flex-col items-center group relative">
            <div 
              className={`w-full rounded-t-lg transition-all duration-300 relative group-hover:opacity-80
                ${i === values.length - 1 ? 'bg-blue-600' : 'bg-blue-100 dark:bg-gray-800'}`}
              style={{ height: `${(v / maxValue) * 100}%` }}
            >
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 font-bold">
                {v} hrs
              </div>
            </div>
            <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mt-3 truncate w-full text-center">
              {days[i]}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800 pt-5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-bold tracking-wider uppercase">Average Daily</span>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">6.2 Hours</h4>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-xs text-gray-400 dark:text-gray-500 font-bold tracking-wider uppercase">Efficiency</span>
          <h4 className="text-lg font-bold text-emerald-500 mt-0.5">+15.4%</h4>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsGraph;
