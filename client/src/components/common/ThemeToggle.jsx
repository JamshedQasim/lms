import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isDarkMode
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 focus:ring-yellow-500'
          : 'bg-white text-gray-600 hover:bg-gray-50 focus:ring-blue-500'
      } shadow-lg hover:shadow-xl transform hover:scale-105 ${className}`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? (
        // Sun icon for dark mode
        <svg
          className="w-6 h-6 transition-transform duration-300 rotate-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Moon icon for light mode
        <svg
          className="w-6 h-6 transition-transform duration-300 rotate-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
      
      {/* Animated ring effect */}
      <div
        className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
          isDarkMode
            ? 'border-yellow-400/30 scale-110'
            : 'border-blue-500/30 scale-110'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
