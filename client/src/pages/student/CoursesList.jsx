import React, { useState, useEffect } from 'react'
import Navbar from '../../components/student/Navbar'
import { Link } from 'react-router-dom'

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
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

    // Sample courses data
    const sampleCourses = [
      {
        id: 1,
        title: "Build Text to Image SaaS App in React JS",
        description: "Master MERN Stack by building a Full Stack AI Text to Image SaaS App using React js, MongoDB, Nodejs, Express js and Stripe Payment",
        instructor: "Richard James",
        duration: "30 hours",
        lessons: 54,
        rating: 4.5,
        students: 21,
        price: 10.99,
        originalPrice: 19.99,
        discount: 50,
        image: "https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=AI+SaaS",
        category: "Full Stack",
        level: "Intermediate"
      },
      {
        id: 2,
        title: "Complete JavaScript Course 2024",
        description: "Learn JavaScript from scratch and build 30 real-world projects. Perfect for beginners and intermediate developers.",
        instructor: "Sarah Johnson",
        duration: "25 hours",
        lessons: 45,
        rating: 4.8,
        students: 156,
        price: 15.99,
        originalPrice: 29.99,
        discount: 47,
        image: "https://via.placeholder.com/300x200/10B981/FFFFFF?text=JavaScript",
        category: "Frontend",
        level: "Beginner"
      },
      {
        id: 3,
        title: "Python for Data Science & Machine Learning",
        description: "Master Python programming for data analysis, visualization, and machine learning with hands-on projects.",
        instructor: "Michael Chen",
        duration: "35 hours",
        lessons: 62,
        rating: 4.7,
        students: 89,
        price: 12.99,
        originalPrice: 24.99,
        discount: 48,
        image: "https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Python+ML",
        category: "Data Science",
        level: "Advanced"
      },
      {
        id: 4,
        title: "React Native Mobile App Development",
        description: "Build cross-platform mobile apps with React Native. Learn to create apps for both iOS and Android.",
        instructor: "Emily Davis",
        duration: "28 hours",
        lessons: 48,
        rating: 4.6,
        students: 73,
        price: 18.99,
        originalPrice: 34.99,
        discount: 46,
        image: "https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=React+Native",
        category: "Mobile",
        level: "Intermediate"
      },
      {
        id: 5,
        title: "Node.js Backend Development",
        description: "Learn to build scalable backend APIs and microservices with Node.js, Express, and MongoDB.",
        instructor: "David Wilson",
        duration: "22 hours",
        lessons: 38,
        rating: 4.4,
        students: 67,
        price: 14.99,
        originalPrice: 27.99,
        discount: 46,
        image: "https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Node.js",
        category: "Backend",
        level: "Intermediate"
      },
      {
        id: 6,
        title: "AWS Cloud Computing & DevOps",
        description: "Master AWS services, cloud architecture, and DevOps practices for modern application deployment.",
        instructor: "Lisa Anderson",
        duration: "40 hours",
        lessons: 70,
        rating: 4.9,
        students: 45,
        price: 24.99,
        originalPrice: 49.99,
        discount: 50,
        image: "https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=AWS+Cloud",
        category: "DevOps",
        level: "Advanced"
      }
    ];

    setCourses(sampleCourses);
  }, []);

  const handleEnroll = (courseId) => {
    if (!user) {
      alert('Please login to enroll in courses');
      return;
    }

    // Check if already enrolled
    if (enrolledCourses.find(course => course.id === courseId)) {
      alert('You are already enrolled in this course');
      return;
    }

    // Find the course to enroll
    const courseToEnroll = courses.find(course => course.id === courseId);
    
    // Add to enrolled courses
    const newEnrolledCourses = [...enrolledCourses, courseToEnroll];
    setEnrolledCourses(newEnrolledCourses);
    
    // Update localStorage
    const updatedUser = { ...user, enrolledCourses: newEnrolledCourses };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    alert(`Successfully enrolled in "${courseToEnroll.title}"!`);
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.some(course => course.id === courseId);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="flex items-center justify-between mb-6">
    <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Courses</h1>
            <p className="text-gray-600">Discover amazing courses and start your learning journey</p>
          </div>
          <div className="flex gap-3">
            {user && (
              <Link 
                to="/my-enrollments" 
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5c1.747 0 3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.246 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
                </svg>
                My Courses ({enrolledCourses.length})
              </Link>
            )}
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

        {/* Course Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
              {/* Course Image */}
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    {course.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-semibold">
                    {course.level}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill={i < Math.floor(course.rating) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1">{course.rating}</span>
                  </div>
                  <span>{course.students} students</span>
                </div>

                {/* Course Details */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <span>📚 {course.lessons} lessons</span>
                  <span>⏱️ {course.duration}</span>
                </div>

                {/* Instructor */}
                <p className="text-sm text-gray-700 mb-4">
                  <span className="font-medium">By</span> {course.instructor}
                </p>

                {/* Price and Enroll Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                    <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold">
                      {course.discount}% off
                    </span>
                  </div>
                  
                  {isEnrolled(course.id) ? (
                    <button 
                      disabled
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium cursor-not-allowed"
                    >
                      ✓ Enrolled
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleEnroll(course.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CoursesList
