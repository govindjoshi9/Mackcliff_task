import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import CourseCard from '../components/CourseCard';
import DashboardLayout from '../components/DashboardLayout';
import StatsGrid from '../components/dashboard/StatsGrid';
import AnalyticsGraph from '../components/dashboard/AnalyticsGraph';
import Leaderboard from '../components/dashboard/Leaderboard';
import SkillsRadar from '../components/dashboard/SkillsRadar';
import DashboardHero from '../components/dashboard/DashboardHero';
import GlassCard from '../components/common/GlassCard';
import { Loader2, Plus, ArrowRight, Rss, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const newsItems = [
    { id: 1, title: "NASA's Artemis III Mission Updates", time: "2h ago", image: "/assets/dashboard-welcome.webp" },
    { id: 2, title: "New Robotics Module Now Live", time: "5h ago", image: "/assets/robotics.webp" },
    { id: 3, title: "Top 10 Algebra Finalists Announced", time: "1d ago", image: "/assets/project-algebra.webp" }
];

const Dashboard = () => {
    const queryClient = useQueryClient();

    const { data: enrollments, isLoading, isError, error } = useQuery({
        queryKey: ['enrollments'],
        queryFn: async () => {
            const response = await api.get('/enrollments');
            return response.data;
        },
    });

    const updateProgressMutation = useMutation({
        mutationFn: async ({ enrollmentId, newProgress }) => {
            const response = await api.put(`/enrollments/${enrollmentId}/progress`, { progress: newProgress });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['enrollments']);
        },
    });

    const handleUpdateProgress = (enrollmentId, currentProgress) => {
        const newProgress = Math.min(currentProgress + 10, 100);
        updateProgressMutation.mutate({ enrollmentId, newProgress });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            </div>
        );
    }



    return (
        <DashboardLayout>
            <DashboardHero userName="Alex" />

            <StatsGrid delay={0.2} />

            <div className="space-y-12">
                {/* Row 3: Insights (3-Way Split: Analytics | News | Skills) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-6 h-full">
                        <GlassCard title="Learning Pulse" delay={0.4} className="h-full">
                            <div className="h-[340px] mt-4">
                                <AnalyticsGraph />
                            </div>
                        </GlassCard>
                    </div>

                    <div className="lg:col-span-3 h-full">
                        <GlassCard className="border-none! h-full flex flex-col">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 bg-blue-500/20 rounded-xl">
                                    <Rss className="text-blue-400" size={18} />
                                </div>
                                <h3 className="text-lg font-bold tracking-tight dark:text-white">Tech Feed</h3>
                            </div>
                            
                            <div className="space-y-6 flex-1">
                                {newsItems.map((news) => (
                                    <div key={news.id} className="group cursor-pointer">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-slate-700">
                                                <img src={news.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-blue-500 transition-colors leading-tight">{news.title}</h4>
                                                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium font-sans">
                                                    <Clock size={10} />
                                                    {news.time}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <button className="w-full mt-10 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 font-bold text-xs transition-all border border-slate-200 dark:border-slate-700/50">
                                View Updates
                            </button>
                        </GlassCard>
                    </div>

                    <div className="lg:col-span-3 h-full">
                        <SkillsRadar delay={0.6} className="h-full" />
                    </div>
                </div>

                {/* Row 4: Learning & Sidebar (8:4 Split) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8">
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold bg-linear-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">Explore Courses</h2>
                                <Link to="/courses" className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:gap-2 transition-all group">
                                    View Catalog <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {(!enrollments || enrollments.length === 0) ? (
                                <GlassCard className="text-center p-16 border-dashed! dark:border-slate-800">
                                    <div className="mx-auto h-20 w-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                                        <Plus size={32} className="text-blue-500" />
                                    </div>
                                    <h3 className="text-xl font-bold">No active enrollments</h3>
                                    <p className="mt-2 text-slate-500 max-w-sm mx-auto font-medium">Your next big discovery is just a click away.</p>
                                    <Link 
                                        to="/courses" 
                                        className="mt-8 inline-flex items-center justify-center px-10 py-3.5 bg-slate-900 dark:bg-blue-600 text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl"
                                    >
                                        Explore Courses
                                    </Link>
                                </GlassCard>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {Array.isArray(enrollments) && enrollments.slice(0, 4).map((enrollment, idx) => (
                                        <motion.div
                                            key={enrollment._id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <CourseCard
                                                course={enrollment.course}
                                                isEnrolled={true}
                                                progress={enrollment.progress}
                                                onUpdateProgress={() => handleUpdateProgress(enrollment._id, enrollment.progress)}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>

                    <div className="lg:col-span-4">
                        <Leaderboard delay={0.7} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
