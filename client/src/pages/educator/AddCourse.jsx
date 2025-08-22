import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const AddCourse = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [courseData, setCourseData] = useState({
    title: '',
    headings: '',
    description: '',
    price: '0',
    thumbnail: null
  });

  const handleInputChange = (field, value) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Course Data:', courseData);
    // Handle course submission here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1">
        {/* Left Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-blue-100">
          <div className="p-6">
            {/* Logo */}
            <div className="flex items-center mb-8">
              <svg className="w-8 h-8 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="text-2xl font-bold text-gray-900">CourseStudy</span>
            </div>
            
            {/* Navigation Links */}
            <nav className="space-y-2">
              <a href="/educator" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                </svg>
                Dashboard
              </a>
              <a href="/add-course" className="flex items-center gap-3 px-4 py-3 text-purple-600 bg-purple-50 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Course
              </a>
              <a href="/my-courses" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                My Courses
              </a>
              <a href="/student-enrolled" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                Student Enrolled
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div></div> {/* Spacer */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors"
                >
                  <span className="text-gray-700">Hi! Richard</span>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">R</span>
                  </div>
                </button>
                
                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                      My Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Add Course Form */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Add Course</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Course Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={courseData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Type here"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Course Headings */}
                <div>
                  <label htmlFor="headings" className="block text-sm font-medium text-gray-700 mb-2">
                    Course Headings
                  </label>
                  <input
                    type="text"
                    id="headings"
                    value={courseData.headings}
                    onChange={(e) => handleInputChange('headings', e.target.value)}
                    placeholder="Type here"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Course Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Course Description
                  </label>
                  <textarea
                    id="description"
                    rows={6}
                    value={courseData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Type here"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  />
                </div>

                {/* Course Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Course Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={courseData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    min="0"
                    step="0.01"
                    className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Course Thumbnail */}
    <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Thumbnail
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload
                    </button>
                    
                    {/* Thumbnail Preview */}
                    {courseData.thumbnail ? (
                      <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center border-2 border-dashed border-green-300">
                        <span className="text-green-600 text-xs text-center">Thumbnail</span>
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        <span className="text-gray-400 text-xs text-center">No image</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    ADD
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer - Fixed at bottom */}
      <footer className="bg-white border-t border-gray-200 py-6 px-8 mt-16">
        <div className="flex items-center justify-between">
          {/* Left - Logo */}
          <div className="flex items-center">
            <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span className="text-lg font-bold text-gray-900">CourseStudy</span>
          </div>
          
          {/* Center - Copyright */}
          <div className="text-gray-600 text-sm">
            All right reserved. Copyright ©CourseStudy
          </div>
          
          {/* Right - Social Media Icons */}
          <div className="flex items-center gap-4">
            {/* Facebook */}
            <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            
            {/* Twitter */}
            <a href="#" className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            
            {/* Instagram */}
            <a href="#" className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.49.49-1.297.49-1.787 0-.49-.49-.49-1.297 0-1.787.49-.49 1.297-.49 1.787 0 .49.49.49 1.297 0 1.787z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AddCourse
