import React, { useState, useEffect } from 'react';
import reviewService from '../../services/reviewService.js';
import authService from '../../services/authService.js';

const CourseReviews = ({ courseId }) => {
  const [reviews, setReviews] = useState([]);
  const [ratingStats, setRatingStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    content: '',
    pros: '',
    cons: ''
  });

  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    loadReviews();
  }, [courseId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const [reviewsData, statsData] = await Promise.all([
        reviewService.getCourseReviews(courseId),
        reviewService.getCourseRatingStats(courseId)
      ]);
      
      setReviews(reviewsData);
      setRatingStats(statsData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!reviewForm.title.trim() || !reviewForm.content.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await reviewService.addReview(courseId, reviewForm);
      
      // Reset form and reload reviews
      setReviewForm({
        rating: 5,
        title: '',
        content: '',
        pros: '',
        cons: ''
      });
      setShowReviewForm(false);
      setError('');
      
      // Reload reviews to show the new one
      await loadReviews();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setReviewForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLikeReview = async (reviewId) => {
    try {
      await reviewService.likeReview(reviewId);
      // Reload reviews to update like count
      await loadReviews();
    } catch (error) {
      console.error('Error liking review:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (loading && reviews.length === 0) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Course Reviews</h3>
        {currentUser && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showReviewForm ? 'Cancel Review' : 'Write a Review'}
          </button>
        )}
      </div>

      {/* Rating Statistics */}
      {ratingStats && (
        <div className="bg-white rounded-lg border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {ratingStats.averageRating?.toFixed(1) || '0.0'}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(ratingStats.averageRating || 0))}
              </div>
              <p className="text-gray-600">
                Based on {ratingStats.totalReviews || 0} reviews
              </p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingStats.ratingBreakdown?.[rating] || 0;
                const percentage = ratingStats.totalReviews > 0 
                  ? (count / ratingStats.totalReviews) * 100 
                  : 0;
                
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-8">{rating}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white rounded-lg border p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Write Your Review</h4>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleReviewSubmit} className="space-y-4">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleInputChange('rating', rating)}
                    className="focus:outline-none"
                  >
                    <svg
                      className={`w-8 h-8 ${
                        rating <= reviewForm.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Title *
              </label>
              <input
                type="text"
                value={reviewForm.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Summarize your experience"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Content *
              </label>
              <textarea
                value={reviewForm.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your detailed thoughts about the course..."
                required
              />
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What you liked
                </label>
                <textarea
                  value={reviewForm.pros}
                  onChange={(e) => handleInputChange('pros', e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What were the highlights?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What could be improved
                </label>
                <textarea
                  value={reviewForm.cons}
                  onChange={(e) => handleInputChange('cons', e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any suggestions for improvement?"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="bg-white rounded-lg border p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {review.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">{review.user?.name || 'Anonymous'}</h5>
                    <p className="text-sm text-gray-600">{formatDate(review.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  {renderStars(review.rating)}
                </div>
              </div>

              {/* Review Title */}
              {review.title && (
                <h6 className="font-semibold text-gray-900 mb-2">{review.title}</h6>
              )}

              {/* Review Content */}
              <p className="text-gray-700 mb-4">{review.content}</p>

              {/* Pros and Cons */}
              {(review.pros || review.cons) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {review.pros && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h6 className="font-medium text-green-800 mb-1">👍 What you liked</h6>
                      <p className="text-green-700 text-sm">{review.pros}</p>
                    </div>
                  )}
                  
                  {review.cons && (
                    <div className="bg-red-50 p-3 rounded-lg">
                      <h6 className="font-medium text-red-800 mb-1">👎 What could be improved</h6>
                      <p className="text-red-700 text-sm">{review.cons}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLikeReview(review._id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>{review.likes || 0}</span>
                  </button>
                </div>
                
                {/* Edit/Delete for own reviews */}
                {currentUser && review.user?._id === currentUser._id && (
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-700 text-sm">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">📝</div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h4>
            <p className="text-gray-600 mb-4">Be the first to share your experience with this course!</p>
            {currentUser && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Write First Review
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseReviews;
