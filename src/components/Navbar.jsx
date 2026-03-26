import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { LogOut, BookOpen, GraduationCap } from 'lucide-react';

const Navbar = () => {
    const logout = useAuthStore((state) => state.logout);
    const location = useLocation();

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <GraduationCap className="h-8 w-8 text-blue-600" />
                            <span className="ml-2 mt-1 text-xl font-bold text-gray-900">E-Learn</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                    location.pathname === '/' || location.pathname === '/dashboard'
                                        ? 'border-blue-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/courses"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                    location.pathname === '/courses'
                                        ? 'border-blue-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                Browse Courses
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:items-center">
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
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
