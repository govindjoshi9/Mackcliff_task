import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Award,
  BarChart3,
  Trophy,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Browse Courses', icon: BookOpen, path: '/courses' },
    { name: 'My Skills', icon: Award, path: '/skills' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Global Ranking', icon: Trophy, path: '/ranking' },
  ];

  return (
    <aside className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Mackcliff</span>
          </div>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-blue-600 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
              ${isActive 
                ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  size={22} 
                  className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 group-hover:text-gray-600'} 
                />
                {!isCollapsed && <span className="text-sm">{item.name}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
        <NavLink 
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
        >
          <Settings size={18} />
          {!isCollapsed && <span className="text-sm">Settings</span>}
        </NavLink>
        <NavLink 
          to="/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
        >
          <HelpCircle size={18} />
          {!isCollapsed && <span className="text-sm">Help Center</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
