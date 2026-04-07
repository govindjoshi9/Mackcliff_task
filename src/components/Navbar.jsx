import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { LogOut, BookOpen, GraduationCap, Sun, Moon } from 'lucide-react';
import useThemeStore from '../store/useThemeStore';

const Navbar = () => {
    const logout = useAuthStore((state) => state.logout);
    const { isDarkMode, toggleDarkMode } = useThemeStore();
    const location = useLocation();

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            <span className="ml-2 mt-1 text-xl font-bold text-gray-900 dark:text-white">E-Learn</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                                    location.pathname === '/' || location.pathname === '/dashboard'
                                        ? 'border-blue-500 text-gray-900 dark:text-white'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/courses"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                                    location.pathname === '/courses'
                                        ? 'border-blue-500 text-gray-900 dark:text-white'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                }`}
                            >
                                Browse Courses
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:items-center">
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
