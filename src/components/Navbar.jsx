import { LogOut, BookOpen, GraduationCap, Sun, Moon, Bell, Search, User } from 'lucide-react';
import useThemeStore from '../store/useThemeStore';
import useAuthStore from '../store/useAuthStore';
import { useLocation } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);
    const { isDarkMode, toggleDarkMode } = useThemeStore();
    const location = useLocation();

    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-30 w-full border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-4">
                        {/* Mobile/Toggle Logo (only for top nav) */}
                        <div className="lg:hidden flex items-center">
                            <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">E-Learn</span>
                        </div>
                        
                        {/* Search Bar */}
                        <div className="hidden md:flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-3 py-1.5 rounded-xl gap-2 min-w-[300px] transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/50">
                            <Search size={18} className="text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search courses, modules, or skills..." 
                                className="bg-transparent border-none text-sm text-gray-900 dark:text-white focus:ring-0 placeholder-gray-400 w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Notifications */}
                        <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 relative transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                        </button>

                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <div className="h-8 w-[1px] bg-gray-100 dark:border-gray-800 mx-1"></div>

                        {/* User Profile Summary */}
                        <div className="flex items-center gap-3 pl-2">
                             <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-bold text-gray-900 dark:text-white leading-none capitalize">{user?.username || 'Student'}</span>
                                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mt-1">Pro Member</span>
                             </div>
                             <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-2 border-white dark:border-gray-700 overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'student'}`} alt="avatar" />
                             </div>
                             <button
                                onClick={logout}
                                className="p-2 rounded-xl text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                                title="Sign Out"
                             >
                                <LogOut size={20} />
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
