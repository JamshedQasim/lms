import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const isCourseListPage = location.pathname.includes('/course-list');

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Call backend logout API
        await fetch('http://localhost:3001/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with logout even if API call fails
    } finally {
      // Always clear local storage and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      navigate('/');
    }
  };

  return (
    <div className="bg-white py-3 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <div className="flex items-center">
              {/* Lightning bolt icon */}
              <svg className="w-7 h-7 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              {/* CourseStudy text */}
              <span className="text-xl font-bold text-gray-900">CourseStudy</span>
            </div>
          </Link>
          
          {/* Right side navigation */}
          <div className='flex items-center gap-4 sm:gap-6 text-gray-700'>
            {/* Home link - always visible */}
            <Link to='/' className="hover:text-gray-900 transition-colors font-medium text-sm">
              🏠 Home
            </Link>
            
            {user ? (
              <>
                {user.role === 'instructor' ? (
                  <>
                    <Link to='/instructor/dashboard' className="hidden sm:block hover:text-gray-900 transition-colors font-medium text-sm">
                      🎓 Dashboard
                    </Link>
                    <Link to='/instructor/create-course' className="hidden sm:block hover:text-gray-900 transition-colors font-medium text-sm">
                      ➕ Create Course
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to='/browse-courses' className="hidden sm:block hover:text-gray-900 transition-colors font-medium text-sm">
                      Browse Courses
                    </Link>
                    <Link to='/my-enrollments' className="hidden sm:block hover:text-gray-900 transition-colors font-medium text-sm">
                      My Courses
                    </Link>
                  </>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700">
                    Welcome, <span className="font-medium text-blue-600">{user.name}</span>!
                    {user.role === 'instructor' && <span className="ml-1 text-xs text-purple-600">(Instructor)</span>}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to='/add-course' className="hidden sm:block hover:text-gray-900 transition-colors font-medium text-sm">
                  Add Courses
                </Link>
                <Link to='/login' className="hover:text-gray-900 transition-colors font-medium text-sm">
                  Login
                </Link>
                <Link to='/signup' className='bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm'>
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
