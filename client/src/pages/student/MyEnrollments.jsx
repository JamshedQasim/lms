import React, { useState, useEffect } from 'react'
import Navbar from '../../components/student/Navbar'

const MyEnrollments = () => {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Get enrolled courses from user data
      if (parsedUser.enrolledCourses) {
        setEnrolledCourses(parsedUser.enrolledCourses);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name || 'Student'}! 👋
              </h1>
              <p className="text-gray-600">
                Here are your enrolled courses and learning progress
              </p>
            </div>
            <div className="flex gap-3">
              <Link 
                to="/course-list" 
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5c1.747 0 3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.246 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
                </svg>
                Browse More Courses
              </Link>
              <Link 
                to="/" 
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Enrolled Courses Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Enrolled Courses</h2>
          
          {enrolledCourses && enrolledCourses.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course, index) => (
                <div key={course.id || index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Course Image */}
                  <div className="relative">
                    <img 
                      src={course.image || "https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Course"} 
                      alt={course.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        Enrolled
                      </span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg line-clamp-2">
                      {course.title || `Course ${index + 1}`}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      {course.description || 'Course description'}
                    </p>
                    
                    {/* Course Stats */}
                    <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                      <span>📚 {course.lessons || 'N/A'} lessons</span>
                      <span>⏱️ {course.duration || 'N/A'}</span>
                    </div>

                    {/* Instructor */}
                    {course.instructor && (
                      <p className="text-xs text-gray-700 mb-3">
                        <span className="font-medium">By</span> {course.instructor}
                      </p>
                    )}

                    {/* Progress and Actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600 font-medium">In Progress</span>
                      <div className="flex gap-2">
                        <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                          Continue Learning →
                        </button>
                        <button className="text-xs bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5c1.747 0 3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.246 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled yet</h3>
              <p className="text-gray-600 mb-6">
                Start your learning journey by enrolling in courses
              </p>
              <Link 
                to="/course-list" 
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          )}
        </div>

        {/* Learning Stats */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5c1.747 0 3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.246 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Courses Enrolled</p>
                <p className="text-2xl font-bold text-gray-900">{enrolledCourses?.length || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Hours Spent</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyEnrollments
