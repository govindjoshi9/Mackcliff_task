import { Book, Clock, IndianRupee } from 'lucide-react';

const CourseCard = ({ course, isEnrolled, onEnroll, isEnrolling, progress, onUpdateProgress }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="h-48 bg-gray-200 relative">
                <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{course.title}</h3>
                </div>
                
                <p className="mt-2 text-gray-600 text-sm line-clamp-3">{course.description}</p>
                
                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center"><Book className="w-4 h-4 mr-1" /> {course.modulesCount} Modules</span>
                    <span className="flex items-center"><IndianRupee className="w-4 h-4 mr-1" /> {course.price}</span>
                </div>
                
                <div className="mt-auto pt-5">
                    {isEnrolled ? (
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-700 font-medium">Progress</span>
                                    <span className="text-blue-600 font-bold">{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            <button
                                onClick={() => onUpdateProgress(course._id)}
                                className="w-full py-2 px-4 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors text-sm"
                            >
                                Continue Learning
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => onEnroll(course._id)}
                            disabled={isEnrolling}
                            className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition-colors
                                ${isEnrolling 
                                    ? 'bg-blue-400 cursor-not-allowed' 
                                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                                }`}
                        >
                            {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
