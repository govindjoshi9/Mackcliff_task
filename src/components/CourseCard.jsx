import React from 'react';
import { Book, Clock, Star, PlayCircle } from 'lucide-react';
import GlassCard from './common/GlassCard';
import { motion } from 'framer-motion';

const CourseCard = ({ course, isEnrolled, onEnroll, isEnrolling, progress, onUpdateProgress }) => {
    return (
        <GlassCard className="group flex flex-col h-full overflow-hidden p-0! border-none!">
            {/* Thumbnail Wrap */}
            <div className="h-52 overflow-hidden relative">
                <img 
                    src={course.thumbnail || '/assets/hero.jpg'} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent opacity-60" />
                
                {isEnrolled && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-lg backdrop-blur-md">
                        In Progress
                    </div>
                )}

                <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                        {course.modulesCount} Modules
                    </span>
                    <span className="px-2 py-1 bg-amber-500/80 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase tracking-wider">
                        Popular
                    </span>
                </div>
            </div>

            {/* Content Wrap */}
            <div className="p-6 flex-1 flex flex-col bg-white dark:bg-slate-900/50">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-500 transition-colors">
                        {course.title}
                    </h3>
                    <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm line-clamp-2 font-medium">
                        {course.description || "Master the art of this subject with our comprehensive guide and hands-on projects."}
                    </p>
                </div>
                
                <div className="mt-auto space-y-5">
                    {isEnrolled ? (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                                    <span className="text-slate-400">Course Progress</span>
                                    <span className="text-blue-500">{progress}%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="premium-gradient h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                                    />
                                </div>
                            </div>
                            
                            <button
                                onClick={() => onUpdateProgress(course._id)}
                                className="w-full py-3 px-4 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
                            >
                                <PlayCircle size={18} className="group-hover/btn:scale-110 transition-transform" />
                                <span>Continue Lesson</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => onEnroll(course._id)}
                            disabled={isEnrolling}
                            className={`w-full py-3.5 px-4 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95
                                ${isEnrolling 
                                    ? 'bg-blue-400 cursor-not-allowed' 
                                    : 'premium-gradient hover:shadow-blue-500/25'
                                }`}
                        >
                            {isEnrolling ? 'Processing...' : 'Start Learning Now'}
                        </button>
                    )}
                </div>
            </div>
        </GlassCard>
    );
};

export default CourseCard;
