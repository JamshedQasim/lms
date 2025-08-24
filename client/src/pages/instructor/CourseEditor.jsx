import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/student/Navbar';

const CourseEditor = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModule, setShowAddModule] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [newModule, setNewModule] = useState({ title: '', description: '' });
  const [newLesson, setNewLesson] = useState({ 
    title: '', 
    description: '', 
    type: 'video', 
    content: '', 
    duration: 0 
  });

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = () => {
    try {
      // Get course from localStorage
      const allCourses = JSON.parse(localStorage.getItem('instructorCourses') || '[]');
      const foundCourse = allCourses.find(c => c._id === courseId);
      
      if (!foundCourse) {
        setError('Course not found');
        setLoading(false);
        return;
      }

      setCourse(foundCourse);
      setModules(foundCourse.modules || []);
      setLoading(false);
    } catch (error) {
      setError('Failed to load course data');
      setLoading(false);
    }
  };

  const handleAddModule = () => {
    if (!newModule.title.trim()) {
      alert('Please enter a module title');
      return;
    }

    const module = {
      _id: Date.now().toString(),
      title: newModule.title,
      description: newModule.description,
      lessons: [],
      order: modules.length + 1,
      createdAt: new Date().toISOString()
    };

    const updatedModules = [...modules, module];
    setModules(updatedModules);
    
    // Update course in localStorage
    updateCourseInStorage(updatedModules);
    
    setNewModule({ title: '', description: '' });
    setShowAddModule(false);
  };

  const handleAddLesson = () => {
    if (!newLesson.title.trim()) {
      alert('Please enter a lesson title');
      return;
    }

    if (!selectedModuleId) {
      alert('Please select a module first');
      return;
    }

    const lesson = {
      _id: Date.now().toString(),
      title: newLesson.title,
      description: newLesson.description,
      type: newLesson.type,
      content: newLesson.content,
      duration: parseInt(newLesson.duration) || 0,
      order: 0,
      createdAt: new Date().toISOString()
    };

    const updatedModules = modules.map(module => {
      if (module._id === selectedModuleId) {
        lesson.order = module.lessons.length + 1;
        return {
          ...module,
          lessons: [...module.lessons, lesson]
        };
      }
      return module;
    });

    setModules(updatedModules);
    updateCourseInStorage(updatedModules);
    
    setNewLesson({ 
      title: '', 
      description: '', 
      type: 'video', 
      content: '', 
      duration: 0 
    });
    setShowAddLesson(false);
  };

  const updateCourseInStorage = (updatedModules) => {
    try {
      // Update instructor courses
      const allCourses = JSON.parse(localStorage.getItem('instructorCourses') || '[]');
      const updatedCourses = allCourses.map(c => {
        if (c._id === courseId) {
          return { ...c, modules: updatedModules };
        }
        return c;
      });
      localStorage.setItem('instructorCourses', JSON.stringify(updatedCourses));

      // Update main courses
      const mainCourses = JSON.parse(localStorage.getItem('mainCourses') || '[]');
      const updatedMainCourses = mainCourses.map(c => {
        if (c._id === courseId) {
          return { ...c, modules: updatedModules };
        }
        return c;
      });
      localStorage.setItem('mainCourses', JSON.stringify(updatedMainCourses));
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteModule = (moduleId) => {
    if (confirm('Are you sure you want to delete this module? All lessons will be lost.')) {
      const updatedModules = modules.filter(m => m._id !== moduleId);
      setModules(updatedModules);
      updateCourseInStorage(updatedModules);
    }
  };

  const handleDeleteLesson = (moduleId, lessonId) => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      const updatedModules = modules.map(module => {
        if (module._id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.filter(l => l._id !== lessonId)
          };
        }
        return module;
      });
      setModules(updatedModules);
      updateCourseInStorage(updatedModules);
    }
  };

  const handlePublishCourse = () => {
    if (modules.length === 0) {
      alert('Please add at least one module before publishing');
      return;
    }

    const hasLessons = modules.some(module => module.lessons.length > 0);
    if (!hasLessons) {
      alert('Please add at least one lesson before publishing');
      return;
    }

    try {
      // Update course status to published
      const allCourses = JSON.parse(localStorage.getItem('instructorCourses') || '[]');
      const updatedCourses = allCourses.map(c => {
        if (c._id === courseId) {
          return { ...c, status: 'published' };
        }
        return c;
      });
      localStorage.setItem('instructorCourses', JSON.stringify(updatedCourses));

      // Update main courses
      const mainCourses = JSON.parse(localStorage.getItem('mainCourses') || '[]');
      const updatedMainCourses = mainCourses.map(c => {
        if (c._id === courseId) {
          return { ...c, status: 'published' };
        }
        return c;
      });
      localStorage.setItem('mainCourses', JSON.stringify(updatedMainCourses));

      setCourse({ ...course, status: 'published' });
      alert('Course published successfully! Students can now enroll.');
    } catch (error) {
      alert('Failed to publish course');
    }
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
              to="/instructor/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Back to Dashboard
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Course Editor</h1>
              <p className="mt-2 text-gray-600">{course.title}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  course.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {course.status === 'published' ? 'Published' : 'Draft'}
                </span>
                <span className="text-sm text-gray-500">
                  {modules.length} modules • {modules.reduce((sum, m) => sum + m.lessons.length, 0)} lessons
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModule(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Module
              </button>
              {course.status === 'draft' && (
                <button
                  onClick={handlePublishCourse}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Publish Course
                </button>
              )}
              <Link
                to="/instructor/dashboard"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {modules.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No modules yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding your first module.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowAddModule(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Your First Module
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {modules.map((module, moduleIndex) => (
              <div key={module._id} className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Module {module.order}: {module.title}
                      </h3>
                      {module.description && (
                        <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedModuleId(module._id);
                          setShowAddLesson(true);
                        }}
                        className="inline-flex items-center px-3 py-1 border border-blue-300 text-xs font-medium rounded text-blue-700 bg-blue-50 hover:bg-blue-100"
                      >
                        + Add Lesson
                      </button>
                      <button
                        onClick={() => handleDeleteModule(module._id)}
                        className="inline-flex items-center px-3 py-1 border border-red-300 text-xs font-medium rounded text-red-700 bg-red-50 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {module.lessons.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No lessons in this module yet. Add your first lesson!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500 w-8">#{lesson.order}</span>
                            <div>
                              <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="capitalize">{lesson.type}</span>
                                {lesson.duration > 0 && <span>⏱️ {lesson.duration} min</span>}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteLesson(module._id, lesson._id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Module Modal */}
      {showAddModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Module</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Module Title *</label>
                <input
                  type="text"
                  value={newModule.title}
                  onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                  placeholder="e.g., Introduction to React"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newModule.description}
                  onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                  placeholder="Brief description of what this module covers..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModule(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddModule}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Module
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {showAddLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Lesson</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Title *</label>
                <input
                  type="text"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                  placeholder="e.g., What is React?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newLesson.description}
                  onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                  placeholder="Brief description of this lesson..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={newLesson.type}
                    onChange={(e) => setNewLesson({ ...newLesson, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="video">Video</option>
                    <option value="text">Text</option>
                    <option value="quiz">Quiz</option>
                    <option value="assignment">Assignment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (min)</label>
                  <input
                    type="number"
                    value={newLesson.duration}
                    onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={newLesson.content}
                  onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                  placeholder="Lesson content, video URL, or instructions..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddLesson(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLesson}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseEditor;
