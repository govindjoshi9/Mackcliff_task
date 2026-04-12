import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import CourseCard from '../components/CourseCard';
import DashboardLayout from '../components/DashboardLayout';
import { Loader2, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const { data: courses, isLoading: loadingCourses, isError: errorCourses } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const response = await api.get('/courses');
            return response.data;
        },
    });

    const { data: enrollments, isLoading: loadingEnrollments } = useQuery({
        queryKey: ['enrollments'],
        queryFn: async () => {
            const response = await api.get('/enrollments');
            return response.data;
        },
    });

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
        if (!Array.isArray(enrollments)) return false;
        return enrollments.some(e => e.course?._id === courseId);
    };

    if (loadingCourses || loadingEnrollments) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Explore Courses</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">Discover international certifications and boost your global career.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search courses..." 
                            className="pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-full md:w-64"
                        />
                    </div>
                    <button className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-500 hover:text-blue-600 transition-colors">
                        <Filter size={18} />
                    </button>
                </div>
            </div>
            
            {errorCourses ? (
                <div className="bg-rose-50 dark:bg-rose-900/10 text-rose-600 p-6 rounded-2xl border border-rose-100 dark:border-rose-900/20 font-bold">
                    Failed to load courses. Please try again later.
                </div>
            ) : (!Array.isArray(courses) || courses.length === 0) ? (
                <div className="bg-white dark:bg-gray-900 p-20 text-center rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all">
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No courses available at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
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
        </DashboardLayout>
    );
};

export default Courses;
