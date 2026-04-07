import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import CourseCard from '../components/CourseCard';
import DashboardLayout from '../components/DashboardLayout';
import StatsGrid from '../components/dashboard/StatsGrid';
import AnalyticsGraph from '../components/dashboard/AnalyticsGraph';
import Leaderboard from '../components/dashboard/Leaderboard';
import SkillsRadar from '../components/dashboard/SkillsRadar';
import { Loader2, Plus, ArrowRight } from 'lucide-react';
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
        const newProgress = Math.min(currentProgress + 10, 100);
        updateProgressMutation.mutate({ enrollmentId, newProgress });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (isError) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
                    <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-3xl mb-6">
                        <Loader2 className="w-12 h-12 text-red-500 rotate-45" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Oops! Something went wrong</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md">
                        {error?.response?.data?.message || error?.message || "We couldn't load your dashboard. Please try again later."}
                    </p>
                    <button 
                        onClick={() => queryClient.invalidateQueries(['enrollments'])}
                        className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg"
                    >
                        Retry Loading
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Welcome back, Student! 👋</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Here's what's happening with your learning journey today.</p>
                </div>
                <Link 
                    to="/courses" 
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 active:scale-95"
                >
                    <Plus size={18} />
                    <span>Explore New Courses</span>
                </Link>
            </div>

            {/* Gamification Stats */}
            <StatsGrid />

            {/* Analytics, Skills & Ranking Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <AnalyticsGraph />
                </div>
                <div className="space-y-8 flex flex-col h-full">
                    <SkillsRadar />
                    <Leaderboard />
                </div>
            </div>

            {/* Active Courses Section */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Active Courses</h2>
                    <Link to="/my-courses" className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:gap-2 transition-all">
                        View All <ArrowRight size={14} />
                    </Link>
                </div>

                {(!enrollments || enrollments.length === 0) ? (
                    <div className="text-center p-16 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 shadow-sm transition-all">
                        <div className="mx-auto h-24 w-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                            <Plus size={32} className="text-gray-300 dark:text-gray-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">No active enrollments</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm mx-auto font-medium">Start your learning journey by exploring our international course catalog.</p>
                        <Link 
                            to="/courses" 
                            className="mt-8 inline-flex items-center justify-center px-8 py-3 bg-gray-900 dark:bg-blue-600 text-white font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-blue-700 transition-all shadow-xl"
                        >
                            Start Browsing
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {Array.isArray(enrollments) && enrollments.slice(0, 3).map((enrollment) => (
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
            </section>
        </DashboardLayout>
    );
};

export default Dashboard;
