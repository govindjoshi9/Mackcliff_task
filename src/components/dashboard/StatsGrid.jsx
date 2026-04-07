import React from 'react';
import { Zap, Trophy, Target, Globe } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, detail }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="text-white" size={24} />
      </div>
      <div className="text-right">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</span>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
      </div>
    </div>
    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{detail}</div>
  </div>
);

const StatsGrid = () => {
  const stats = [
    { 
      title: 'Daily Points', 
      value: '250', 
      icon: Zap, 
      color: 'bg-amber-500', 
      detail: '+50 points for today\'s login' 
    },
    { 
      title: 'Global Rank', 
      value: '#2,451', 
      icon: Globe, 
      color: 'bg-blue-600', 
      detail: 'Top 5% of students worldwide' 
    },
    { 
      title: 'Active Skills', 
      value: '12', 
      icon: Target, 
      color: 'bg-emerald-500', 
      detail: '3 skills mastered this month' 
    },
    { 
      title: 'Badges', 
      value: '7', 
      icon: Trophy, 
      color: 'bg-indigo-600', 
      detail: 'Consistency master badge earned' 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;
