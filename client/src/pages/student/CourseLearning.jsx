import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/student/Navbar';

const CourseLearning = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState({});

  useEffect(() => {
    fetchCourseData();
    loadProgress();
  }, [courseId]);

  const fetchCourseData = () => {
    try {
      // Get course from localStorage
      const allCourses = JSON.parse(localStorage.getItem('mainCourses') || '[]');
      const foundCourse = allCourses.find(c => c._id === courseId);
      
      if (!foundCourse) {
        setError('Course not found');
        setLoading(false);
        return;
      }

      setCourse(foundCourse);
      if (foundCourse.modules && foundCourse.modules.length > 0) {
        setSelectedModule(foundCourse.modules[0]);
        if (foundCourse.modules[0].lessons && foundCourse.modules[0].lessons.length > 0) {
          setSelectedLesson(foundCourse.modules[0].lessons[0]);
        }
      }
      setLoading(false);
    } catch (error) {
      setError('Failed to load course data');
      setLoading(false);
    }
  };

  const loadProgress = () => {
    try {
      const savedProgress = JSON.parse(localStorage.getItem(`progress_${courseId}`) || '{}');
      setProgress(savedProgress);
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const markLessonComplete = (lessonId) => {
    const newProgress = {
      ...progress,
      [lessonId]: {
        completed: true,
        completedAt: new Date().toISOString()
      }
    };
    setProgress(newProgress);
    localStorage.setItem(`progress_${courseId}`, JSON.stringify(newProgress));
  };

  const getProgressPercentage = () => {
    if (!course || !course.modules) return 0;
    
    const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
    if (totalLessons === 0) return 0;
    
    const completedLessons = Object.keys(progress).filter(lessonId => 
      progress[lessonId]?.completed
    ).length;
    
    return Math.round((completedLessons / totalLessons) * 100);
  };

  const getModuleProgress = (moduleId) => {
    const module = course?.modules?.find(m => m._id === moduleId);
    if (!module) return 0;
    
    const totalLessons = module.lessons.length;
    if (totalLessons === 0) return 0;
    
    const completedLessons = module.lessons.filter(lesson => 
      progress[lesson._id]?.completed
    ).length;
    
    return Math.round((completedLessons / totalLessons) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'The requested course could not be found.'}</p>
            <Link
              to="/browse-courses"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
              <p className="mt-1 text-gray-600">by {course.instructorName}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {course.category}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {course.level}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{getProgressPercentage()}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Course Content */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow sticky top-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Course Content</h3>
                <p className="text-sm text-gray-500">{course.modules?.length || 0} modules</p>
              </div>
              
              <div className="p-4">
                {course.modules && course.modules.length > 0 ? (
                  <div className="space-y-2">
                    {course.modules.map((module, moduleIndex) => (
                      <div key={module._id} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => setSelectedModule(module)}
                          className={`w-full text-left p-3 hover:bg-gray-50 transition-colors ${
                            selectedModule?._id === module._id ? 'bg-blue-50 border-blue-200' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                Module {module.order}: {module.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-gray-500">
                                  {module.lessons.length} lessons
                                </span>
                                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className="bg-blue-600 h-1.5 rounded-full"
                                    style={{ width: `${getModuleProgress(module._id)}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-400">
                                  {getModuleProgress(module._id)}%
                                </span>
                              </div>
                            </div>
                            <svg className={`w-5 h-5 text-gray-400 transition-transform ${
                              selectedModule?._id === module._id ? 'rotate-90' : ''
                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                        
                        {selectedModule?._id === module._id && module.lessons && (
                          <div className="border-t border-gray-200 bg-gray-50">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <button
                                key={lesson._id}
                                onClick={() => setSelectedLesson(lesson)}
                                className={`w-full text-left p-3 hover:bg-gray-100 transition-colors ${
                                  selectedLesson?._id === lesson._id ? 'bg-blue-100' : ''
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex-shrink-0">
                                    {progress[lesson._id]?.completed ? (
                                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    ) : (
                                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {lesson.order}. {lesson.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-xs text-gray-500 capitalize">
                                        {lesson.type}
                                      </span>
                                      {lesson.duration > 0 && (
                                        <span className="text-xs text-gray-500">
                                          ⏱️ {lesson.duration} min
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No content available yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Lesson Content */}
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedLesson.title}</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Module {selectedModule?.order}: {selectedModule?.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {!progress[selectedLesson._id]?.completed && (
                        <button
                          onClick={() => markLessonComplete(selectedLesson._id)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Mark Complete
                        </button>
                      )}
                      {progress[selectedLesson._id]?.completed && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {selectedLesson.description && (
                    <p className="text-gray-600 mb-6">{selectedLesson.description}</p>
                  )}
                  
                  <div className="space-y-4">
                    {selectedLesson.type === 'video' && (
                      <div className="bg-gray-100 rounded-lg p-8 text-center">
                        <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Video Lesson</h3>
                        <p className="text-gray-500 mb-4">
                          {selectedLesson.content || 'Video content will be displayed here'}
                        </p>
                        <div className="text-sm text-gray-400">
                          Duration: {selectedLesson.duration > 0 ? `${selectedLesson.duration} minutes` : 'Not specified'}
                        </div>
                      </div>
                    )}
                    
                    {selectedLesson.type === 'text' && (
                      <div className="prose max-w-none">
                        <div className="bg-gray-50 rounded-lg p-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Lesson Content</h3>
                          <div className="text-gray-700 whitespace-pre-wrap">
                            {selectedLesson.content || 'No content available for this lesson.'}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedLesson.type === 'quiz' && (
                      <div className="bg-yellow-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-yellow-900 mb-2">Quiz</h3>
                        <p className="text-yellow-700">
                          {selectedLesson.content || 'Quiz content will be displayed here'}
                        </p>
                      </div>
                    )}
                    
                    {selectedLesson.type === 'assignment' && (
                      <div className="bg-purple-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-purple-900 mb-2">Assignment</h3>
                        <p className="text-purple-700">
                          {selectedLesson.content || 'Assignment instructions will be displayed here'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow">
                <div className="p-12 text-center">
                  <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Lesson</h3>
                  <p className="text-gray-500">Choose a lesson from the sidebar to start learning</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;
