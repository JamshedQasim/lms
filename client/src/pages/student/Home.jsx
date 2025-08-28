import React from 'react'
import { assets } from '../../assets/assets'
import Navbar from '../../components/student/Navbar'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Decorative Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 transform rotate-45 rounded-lg blur-sm"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-pink-500/30 transform -rotate-12 rounded-full blur-sm"></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-br from-indigo-500/30 to-blue-500/30 transform rotate-12 rounded-lg blur-sm"></div>
      </div>


      <Navbar />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center relative">
          {/* Main Headline with Enhanced Styling */}
          <div className="relative mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 mb-6 leading-tight">
              Empower your future with the courses designed to{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                  fit your choice.
                </span>
                {/* Enhanced Underline with Gradient */}
                <div className="absolute -bottom-3 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full transform scale-x-0 animate-pulse"></div>
              </span>
            </h1>
            
            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-sm"></div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-indigo-400 to-cyan-400 rounded-full opacity-20 blur-sm"></div>
          </div>
          
          {/* Enhanced Sub-text with Better Typography */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            We bring together <span className="text-blue-600 font-semibold">world-class instructors</span>,{' '}
            <span className="text-purple-600 font-semibold">interactive content</span>, and a{' '}
            <span className="text-indigo-600 font-semibold">supportive community</span> to help you achieve your personal and professional goals.
          </p>
          
          {/* Enhanced Search Bar with Glass Morphism */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mb-20">
            <div className="relative flex-1 w-full sm:w-auto group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for courses..."
                className="w-full pl-14 pr-6 py-5 text-gray-900 bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-transparent shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
              />
            </div>
            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </span>
            </button>
          </div>
        </div>

        {/* Enhanced Trusted by learners section */}
        <div className="text-center mb-20 relative">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-3xl blur-sm"></div>
          
          <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl">
            <p className="text-gray-700 mb-8 text-lg font-semibold">Trusted by learners from leading companies worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <div className="group p-4 bg-white/80 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <img src={assets.microsoft_logo} alt="Microsoft" className="h-10 md:h-12 opacity-70 group-hover:opacity-100 transition-all duration-300" />
              </div>
              <div className="group p-4 bg-white/80 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <img src={assets.walmart_logo} alt="Walmart" className="h-10 md:h-12 opacity-70 group-hover:opacity-100 transition-all duration-300" />
              </div>
              <div className="group p-4 bg-white/80 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <img src={assets.accenture_logo} alt="Accenture" className="h-10 md:h-12 opacity-70 group-hover:opacity-100 transition-all duration-300" />
              </div>
              <div className="group p-4 bg-white/80 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <img src={assets.adobe_logo} alt="Adobe" className="h-10 md:h-12 opacity-70 group-hover:opacity-100 transition-all duration-300" />
              </div>
              <div className="group p-4 bg-white/80 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <img src={assets.paypal_logo} alt="PayPal" className="h-10 md:h-12 opacity-70 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Learn from the best section */}
        <div className="mb-20 relative">
          {/* Section Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-indigo-50/50 rounded-3xl blur-sm"></div>
          
          <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-12 border border-white/50 shadow-xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.246 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
                  </svg>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900">
                  Learn from the best
                </h2>
              </div>
              <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
                Discover our <span className="text-blue-600 font-semibold">top-rated courses</span> across various categories. From{' '}
                <span className="text-purple-600 font-semibold">coding and design</span> to{' '}
                <span className="text-indigo-600 font-semibold">business and wellness</span>, our courses are crafted to deliver exceptional results.
              </p>
            </div>
          
          {/* Course Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {/* Course Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-green-100 h-32 flex items-center justify-center">
                <div className="text-center text-green-800">
                  <p className="font-semibold">Text to Image SAAS App</p>
                  <p className="text-sm">Screenshot</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Build Text to image SaaS App in React JS</h3>
                <p className="text-gray-600 text-sm mb-2">Richard James</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">(122)</span>
                </div>
                <p className="text-blue-600 font-bold">$10.99</p>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 h-32 flex items-center justify-center">
                <div className="text-center text-purple-800">
                  <p className="font-semibold">AI BG Removal SAAS App</p>
                  <p className="text-sm">Screenshot</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Build AI BG Removal SaaS App in React JS</h3>
                <p className="text-gray-600 text-sm mb-2">Richard James</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">(122)</span>
                </div>
                <p className="text-blue-600 font-bold">$10.99</p>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-blue-900 h-32 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="font-semibold">React Router In Depth</p>
                  <p className="text-sm">Complete Course In One Video</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">React Router Complete Course in One Video</h3>
                <p className="text-gray-600 text-sm mb-2">Richard James</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">(122)</span>
                </div>
                <p className="text-blue-600 font-bold">$10.99</p>
              </div>
            </div>

            {/* Course Card 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 h-32 flex items-center justify-center">
                <div className="text-center text-blue-800">
                  <p className="font-semibold">Build Full Stack E-Commerce MERN app</p>
                  <p className="text-sm">Screenshot</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Build Full Stack E-Commerce App in React JS</h3>
                <p className="text-gray-600 text-sm mb-2">Richard James</p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">(122)</span>
                </div>
                <p className="text-blue-600 font-bold">$10.99</p>
              </div>
            </div>
          </div>

          {/* Show all courses button */}
          <div className="text-center">
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Show all courses
            </button>
          </div>
        </div>

        {/* Testimonials section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Testimonials</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our learners as they share their journeys of transformation, success, and how our platform has made a difference in their lives.
            </p>
          </div>
          
          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img src={assets.profile_img} alt="Donald Jackman" className="w-16 h-16 rounded-full mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-1">Donald Jackman</h3>
              <p className="text-gray-600 text-sm mb-3">SWE 1 @ Amazon</p>
              <div className="flex justify-center text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Read more</a>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img src={assets.profile_img2} alt="Richard Nelson" className="w-16 h-16 rounded-full mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-1">Richard Nelson</h3>
              <p className="text-gray-600 text-sm mb-3">SWE 2 @ Samsung</p>
              <div className="flex justify-center text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Read more</a>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img src={assets.profile_img3} alt="James Washington" className="w-16 h-16 rounded-full mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-1">James Washington</h3>
              <p className="text-gray-600 text-sm mb-3">SWE 2 @ Google</p>
              <div className="flex justify-center text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Read more</a>
            </div>
          </div>
        </div>

        {/* New Hero Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Learn anything, anytime, anywhere
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get started
            </button>
            <div className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer">
              <span className="font-medium">Learn more</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom arc */}
      <div className="relative">
        <svg className="w-full" viewBox="0 0 1200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M0 200C200 150 400 100 600 120C800 140 1000 180 1200 200L1200 200L0 200Z" 
            fill="#1f2937"
          />
        </svg>
      </div>
      
      {/* Comprehensive Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Branding and Description */}
            <div>
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <span className="text-2xl font-bold">CourseStudy</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>

            {/* Middle Column - Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy policy</a></li>
              </ul>
            </div>

            {/* Right Column - Newsletter Subscription */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
              <p className="text-gray-400 mb-4">
                The latest news, articles, and resources, sent to your inbox weekly.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright Line */}
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400">
              Copyright 2024 © CourseStudy. All Right Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
}

export default Home;
