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
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Loader2, Plus, ArrowRight, Rss, Clock, 
    ChevronLeft, ChevronRight, Compass 
} from 'lucide-react';

const newsItems = [
    { id: 1, title: "NASA's Artemis III Mission Updates", time: "2h ago", image: "/assets/dashboard-welcome.webp" },
    { id: 2, title: "New Robotics Module Now Live", time: "5h ago", image: "/assets/robotics.webp" },
    { id: 3, title: "Top 10 Algebra Finalists Announced", time: "1d ago", image: "/assets/project-algebra.webp" }
];

const Dashboard = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [sliderIndex, setSliderIndex] = React.useState(0);
    const scrollContainerRef = React.useRef(null);

    const { data: courses, isLoading: loadingCatalog } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const response = await api.get('/courses');
            return response.data;
        },
    });

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

    const handleEnroll = async (courseId) => {
        try {
            await api.post('/enrollments', { courseId });
            queryClient.invalidateQueries(['enrollments']);
        } catch (error) {
            console.error('Enrollment failed:', error);
        }
    };

    const isEnrolledInCourse = (courseId) => {
        if (!Array.isArray(enrollments)) return false;
        return enrollments.some(e => e.course?._id === courseId);
    };

    const nextSlide = () => {
        if (courses && sliderIndex < courses.length - 2) {
            setSliderIndex(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (sliderIndex > 0) {
            setSliderIndex(prev => prev - 1);
        }
    };

    if (isLoading || loadingCatalog) {
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

                {/* Row 4: Explore & Leaderboard (8:4 Split) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 overflow-hidden">
                        <section className="space-y-8 relative group">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-500/10 rounded-xl">
                                        <Compass className="text-amber-500" size={22} />
                                    </div>
                                    <h2 className="text-2xl font-bold bg-linear-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">Explore Courses</h2>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="hidden group-hover:flex items-center gap-2">
                                        <button 
                                            onClick={prevSlide}
                                            disabled={sliderIndex === 0}
                                            className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 disabled:opacity-30 transition-all hover:scale-110 active:scale-95 text-slate-600 dark:text-slate-300"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button 
                                            onClick={nextSlide}
                                            disabled={!courses || sliderIndex >= courses.length - 2}
                                            className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 disabled:opacity-30 transition-all hover:scale-110 active:scale-95 text-slate-600 dark:text-slate-300"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                    <Link to="/courses" className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:gap-2 transition-all group/link">
                                        View All <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            {(!courses || courses.length === 0) ? (
                                <GlassCard className="text-center p-16 border-dashed! dark:border-slate-800">
                                    <div className="mx-auto h-20 w-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                                        <Compass size={32} className="text-blue-500" />
                                    </div>
                                    <h3 className="text-xl font-bold">No courses discovered</h3>
                                    <p className="mt-2 text-slate-500 max-w-sm mx-auto font-medium">Check back later for new international certifications.</p>
                                </GlassCard>
                            ) : (
                                <div className="relative overflow-visible">
                                    <motion.div 
                                        className="flex gap-8"
                                        animate={{ x: `-${sliderIndex * 50}%` }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    >
                                        {courses.map((course, idx) => {
                                            const enrollment = enrollments?.find(e => e.course?._id === course._id);
                                            return (
                                                <div key={course._id} className="min-w-[calc(50%-16px)] flex-shrink-0">
                                                    <CourseCard
                                                        course={course}
                                                        isEnrolled={!!enrollment}
                                                        progress={enrollment?.progress}
                                                        onEnroll={() => handleEnroll(course._id)}
                                                        onUpdateProgress={() => handleUpdateProgress(enrollment._id, enrollment.progress)}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </motion.div>
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
