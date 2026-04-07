import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

const SkillsRadar = () => {
  const skills = [
    { name: 'Web Development', level: 'Intermediate', progress: 65 },
    { name: 'Python Programming', level: 'Beginner', progress: 30 },
    { name: 'UI/UX Design', level: 'Advanced', progress: 85 },
    { name: 'Data Structures', level: 'Intermediate', progress: 50 },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Award className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Active Skills</h3>
            <p className="text-sm text-gray-500 font-medium">Your learning footprint</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                {skill.name}
              </span>
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{skill.level}</span>
            </div>
            <div className="h-2 bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-1000" 
                style={{ width: `${skill.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
        <button className="w-full py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          View Detailed Skill Report
        </button>
      </div>
    </div>
  );
};

export default SkillsRadar;
