import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import useAuthStore from '../store/useAuthStore';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const mutation = useMutation({
        mutationFn: async (userData) => {
            const response = await api.post('/auth/register', userData);
            return response.data;
        },
        onSuccess: (data) => {
            login(data, data.token);
            navigate('/');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ username, email, password });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-transparent dark:border-gray-800 transition-colors">
                <h2 className="mb-6 text-3xl font-bold text-center text-gray-800 dark:text-white">Create an Account</h2>

                {mutation.isError && (
                    <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                        {mutation.error.response?.data?.message || 'Registration failed. Please try again.'}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="johndoe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className={`w-full px-4 py-2 text-white font-semibold rounded-md transition-colors duration-200 
              ${mutation.isPending
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            }`}
                    >
                        {mutation.isPending ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                        Log in here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
