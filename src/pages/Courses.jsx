import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    // Fetch all courses
    const { data: courses, isLoading: loadingCourses, isError: errorCourses } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const response = await api.get('/courses');
            return response.data;
        },
    });

    // Fetch user enrollments to check if already enrolled
    const { data: enrollments, isLoading: loadingEnrollments } = useQuery({
        queryKey: ['enrollments'],
        queryFn: async () => {
            const response = await api.get('/enrollments');
            return response.data;
        },
    });

    // Enroll Mutation
    const enrollMutation = useMutation({
        mutationFn: async (courseId) => {
            const response = await api.post('/enrollments', { courseId });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['enrollments']);
            navigate('/');
        },
        onError: (error) => {
            alert(error.response?.data?.message || 'Failed to enroll');
        }
    });

    const handleEnroll = (courseId) => {
        enrollMutation.mutate(courseId);
    };

    const isEnrolledInCourse = (courseId) => {
        if (!enrollments) return false;
        return enrollments.some(e => e.course._id === courseId);
    };

    if (loadingCourses || loadingEnrollments) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Browse Courses</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Discover new skills and accelerate your career</p>
                </div>
                
                {errorCourses ? (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg">Failed to load courses.</div>
                ) : courses?.length === 0 ? (
                    <div className="bg-white dark:bg-gray-900 p-12 text-center rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No courses available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map(course => (
                            <CourseCard 
                                key={course._id} 
                                course={course}
                                isEnrolled={isEnrolledInCourse(course._id)}
                                onEnroll={handleEnroll}
                                isEnrolling={enrollMutation.isPending && enrollMutation.variables === course._id}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Courses;
