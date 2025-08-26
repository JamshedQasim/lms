import React, { useState, useEffect } from 'react';
import forumService from '../../services/forumService.js';
import authService from '../../services/authService.js';

const CourseDiscussions = ({ courseId }) => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDiscussionForm, setShowDiscussionForm] = useState(false);
  const [discussionForm, setDiscussionForm] = useState({
    title: '',
    content: '',
    tags: '',
    category: 'general'
  });

  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    loadDiscussions();
  }, [courseId]);

  const loadDiscussions = async () => {
    try {
      setLoading(true);
      const discussionsData = await forumService.getCourseDiscussions(courseId);
      setDiscussions(discussionsData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscussionSubmit = async (e) => {
    e.preventDefault();
    
    if (!discussionForm.title.trim() || !discussionForm.content.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await forumService.createDiscussion(courseId, {
        ...discussionForm,
        tags: discussionForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      });
      
      // Reset form and reload discussions
      setDiscussionForm({
        title: '',
        content: '',
        tags: '',
        category: 'general'
      });
      setShowDiscussionForm(false);
      setError('');
      
      // Reload discussions to show the new one
      await loadDiscussions();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setDiscussionForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800',
      question: 'bg-green-100 text-green-800',
      help: 'bg-yellow-100 text-yellow-800',
      discussion: 'bg-purple-100 text-purple-800',
      announcement: 'bg-red-100 text-red-800'
    };
    return colors[category] || colors.general;
  };

  if (loading && discussions.length === 0) {
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
        <h3 className="text-2xl font-bold text-gray-900">Course Discussions</h3>
        {currentUser && (
          <button
            onClick={() => setShowDiscussionForm(!showDiscussionForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showDiscussionForm ? 'Cancel Discussion' : 'Start Discussion'}
          </button>
        )}
      </div>

      {/* Discussion Form */}
      {showDiscussionForm && (
        <div className="bg-white rounded-lg border p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Start a New Discussion</h4>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleDiscussionSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discussion Title *
              </label>
              <input
                type="text"
                value={discussionForm.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What would you like to discuss?"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={discussionForm.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="general">General Discussion</option>
                <option value="question">Question</option>
                <option value="help">Help Needed</option>
                <option value="discussion">Open Discussion</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discussion Content *
              </label>
              <textarea
                value={discussionForm.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your thoughts, ask questions, or start a conversation..."
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={discussionForm.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., javascript, react, beginner"
              />
              <p className="text-sm text-gray-500 mt-1">
                Add relevant tags to help others find your discussion
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Discussion'}
              </button>
              <button
                type="button"
                onClick={() => setShowDiscussionForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Discussions List */}
      <div className="space-y-4">
        {discussions.length > 0 ? (
          discussions.map((discussion) => (
            <div key={discussion._id} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
              {/* Discussion Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {discussion.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">{discussion.user?.name || 'Anonymous'}</h5>
                    <p className="text-sm text-gray-600">{formatDate(discussion.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(discussion.category)}`}>
                    {discussion.category}
                  </span>
                  {discussion.isPinned && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      📌 Pinned
                    </span>
                  )}
                  {discussion.isResolved && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      ✅ Resolved
                    </span>
                  )}
                </div>
              </div>

              {/* Discussion Title */}
              <h6 className="font-semibold text-gray-900 mb-2 text-lg">{discussion.title}</h6>

              {/* Discussion Content */}
              <p className="text-gray-700 mb-4 line-clamp-3">{discussion.content}</p>

              {/* Tags */}
              {discussion.tags && discussion.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {discussion.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Discussion Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {discussion.replyCount || 0} replies
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {discussion.viewCount || 0} views
                  </span>
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Discussion
                  </button>
                  
                  {/* Edit/Delete for own discussions */}
                  {currentUser && discussion.user?._id === currentUser._id && (
                    <>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-700 text-sm">
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">💬</div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No discussions yet</h4>
            <p className="text-gray-600 mb-4">Start the conversation! Ask questions, share insights, or discuss course topics.</p>
            {currentUser && (
              <button
                onClick={() => setShowDiscussionForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Start First Discussion
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDiscussions;
