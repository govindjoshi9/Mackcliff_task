import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const queryClient = useQueryClient();

    // Fetch user enrollments
    const { data: enrollments, isLoading, isError, error } = useQuery({
        queryKey: ['enrollments'],
        queryFn: async () => {
            const response = await api.get('/enrollments');
            return response.data;
        },
    });

    // Update Progress Mutation
    const updateProgressMutation = useMutation({
        mutationFn: async ({ enrollmentId, newProgress }) => {
            const response = await api.put(`/enrollments/${enrollmentId}/progress`, { progress: newProgress });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['enrollments']);
        },
        onError: (error) => {
            alert(error.response?.data?.message || 'Failed to update progress');
        }
    });

    const handleUpdateProgress = (enrollmentId, currentProgress) => {
        // Simple mock of learning progress: adds 10% each time the user clicks "Continue Learning"
        const newProgress = Math.min(currentProgress + 10, 100);
        updateProgressMutation.mutate({ enrollmentId, newProgress });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center text-red-600">
                    <p>Error loading dashboard data: {error.message}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Learning Dashboard</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Track your progress and continue where you left off</p>
                    </div>
                </div>

                {/* Enrolled Courses Grid */}
                {enrollments?.length === 0 ? (
                    <div className="text-center p-12 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 shadow-sm transition-colors">
                        <div className="mx-auto h-24 w-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">No courses enrolled yet</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Get started by exploring our course catalog and enroll in a topic that interests you.</p>
                        <Link 
                            to="/courses" 
                            className="mt-6 inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Browse Courses
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enrollments.map((enrollment) => (
                            <CourseCard
                                key={enrollment._id}
                                course={enrollment.course}
                                isEnrolled={true}
                                progress={enrollment.progress}
                                onUpdateProgress={() => handleUpdateProgress(enrollment._id, enrollment.progress)}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
