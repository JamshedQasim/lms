import React from 'react'
import { assets } from '../../assets/assets'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();
  const isCourseListPage = location.pathname.includes('/course-list');

  return (
    <div className="bg-white py-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center">
              {/* Lightning bolt icon */}
              <svg className="w-8 h-8 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              {/* Edemy text */}
              <span className="text-2xl font-bold text-gray-900">CourseStudy</span>
            </div>
          </div>
          
          {/* Right side navigation */}
          <div className='flex items-center gap-6 text-gray-700'>
            <Link to='/add-course' className="hover:text-gray-900 transition-colors font-medium">
              Add Courses
            </Link>
            <Link to='/login' className="hover:text-gray-900 transition-colors font-medium">
              Login
            </Link>
            <button className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium'>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
