import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const CourseDetails = () => {
  const [expandedModules, setExpandedModules] = useState([0, 1]); 

  const toggleModule = (index) => {
    setExpandedModules(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const courseModules = [
    {
      title: "Project Introduction",
      lectures: 3,
      duration: "45m",
      expanded: [
        { title: "App Overview - Build Text-to-Image SaaS", duration: "10 mins" },
        { title: "Tech Stack - React, Node.js, MongoDB.", duration: "15 mins" },
        { title: "Core Features - Authentication, payment, deployment", duration: "20 mins" }
      ]
    },
    {
      title: "Project Setup and configuration",
      lectures: 4,
      duration: "45m",
      expanded: [
        { title: "Environment Setup - Install Node.js, VS Code", duration: "10 mins" },
        { title: "Repository Setup - Clone project repository", duration: "10 mins" },
        { title: "Install Dependencies - Set up npm packages", duration: "10 mins" },
        { title: "Initial Configuration - Set up basic files and folders", duration: "15 mins" }
      ]
    },
    {
      title: "Tailwind Setup",
      lectures: 4,
      duration: "45m",
      expanded: []
    },
    {
      title: "Frontend Project",
      lectures: 4,
      duration: "45m",
      expanded: []
    },
    {
      title: "Backend Project",
      lectures: 4,
      duration: "45m",
      expanded: []
    },
    {
      title: "Payment Integration",
      lectures: 4,
      duration: "45m",
      expanded: []
    },
    {
      title: "Project Deployment",
      lectures: 4,
      duration: "45m",
      expanded: []
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Left Side - Course Content */}
          <div className="lg:col-span-2">
            {/* Course Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Build Text to image SaaS App in React JS
            </h1>
            
            {/* Course Description */}
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Master MERN Stack by building a Full Stack AI Text to Image SaaS App using React js, Mongodb, Nodejs, Express js and Stripe Payment
            </p>
            
            {/* Rating and Students */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill={i < 4 ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-700 font-medium">4.5</span>
                <span className="text-gray-500">(122 ratings)</span>
              </div>
              <span className="text-gray-700">21 students</span>
            </div>
            
            {/* Instructor */}
            <p className="text-gray-700 mb-8">
              <span className="font-medium">Course by</span> Richard James
            </p>
            
            {/* Course Structure */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Course Structure</h2>
              <div className="text-gray-600 mb-4">
                <span className="font-medium">{courseModules.length} sections</span> - 
                <span className="font-medium"> 54 lectures</span> - 
                <span className="font-medium"> 27h 25m total duration</span>
              </div>
              
              {/* Course Modules */}
              <div className="space-y-2">
                {courseModules.map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleModule(index)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <svg 
                          className={`w-5 h-5 text-gray-500 transition-transform ${expandedModules.includes(index) ? 'rotate-90' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="font-medium text-gray-900">{module.title}</span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {module.lectures} lectures - {module.duration}
                      </span>
                    </button>
                    
                    {/* Expanded Module Content */}
                    {expandedModules.includes(index) && module.expanded.length > 0 && (
                      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                        {module.expanded.map((lecture, lectureIndex) => (
                          <div key={lectureIndex} className="flex items-center justify-between py-2">
                            <span className="text-gray-700 text-sm">{lecture.title}</span>
                            <span className="text-gray-500 text-sm">{lecture.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Course Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Course Description</h2>
              <p className="text-gray-600 leading-relaxed">
                This is the most comprehensive and in-depth JavaScript course with 30 JavaScript projects. JavaScript is the most popular programming language in the world and it's growing faster than any other programming language. As a web developer or full-stack developer, you can't get around JavaScript. If you want to get a high-paying job, you need to know JavaScript.
              </p>
            </div>
          </div>
          
          {/* Right Side - Course Card / Purchase Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 sticky top-8">
              {/* Course Thumbnail */}
              <div className="relative mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white text-center">
                  <div className="bg-white/20 rounded-lg p-4 mb-4">
                    <h3 className="font-bold text-lg mb-2">Text to Image SaaS App</h3>
                    <p className="text-sm opacity-90">Turn Text to image, in seconds.</p>
                  </div>
                  <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                    FULL STACK
                  </span>
                </div>
              </div>
              
              {/* Discount Information */}
              <div className="text-center mb-6">
                <p className="text-red-600 font-semibold text-sm mb-2">5 days left at this price!</p>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-gray-900">$10.99</span>
                  <span className="text-lg text-gray-500 line-through">$19.99</span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">50% off</span>
                </div>
              </div>
              
              {/* Course Statistics */}
              <div className="flex items-center justify-center gap-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill={i < 4 ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span>4.5</span>
                </div>
                <span>30 hours</span>
                <span>54 lessons</span>
              </div>
              
              {/* Enroll Button */}
              <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors mb-6">
                Enroll Now
              </button>
              
              {/* What's in the course */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">What's in the course?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Lifetime access with free updates
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Step-by-step, hands-on project guidance
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Downloadable resources and source code
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Quizzes to test your knowledge
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Certificate of completion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails
