import React, { useState, useEffect } from 'react';
import { commentAPI, userAPI, postAPI } from '../services/api';

const CommentForm = ({ comment, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    content: '',
    userId: '',
    postId: '',
  });
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsersAndPosts();
    if (comment) {
      setFormData({
        content: comment.content || '',
        userId: comment.userId || '',
        postId: comment.postId || '',
      });
    }
  }, [comment]);

  const fetchUsersAndPosts = async () => {
    try {
      const [usersData, postsData] = await Promise.all([
        userAPI.getAllUsers(),
        postAPI.getAllPosts(),
      ]);
      setUsers(usersData);
      setPosts(postsData);
      // Set default values if not editing
      if (!comment && usersData.length > 0 && postsData.length > 0) {
        setFormData(prev => ({
          ...prev,
          userId: usersData[0].id.toString(),
          postId: postsData[0].id.toString(),
        }));
      }
    } catch (err) {
      console.error('Error fetching users and posts:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const submitData = {
        content: formData.content,
        userId: parseInt(formData.userId),
        postId: parseInt(formData.postId),
      };

      if (comment) {
        // Update existing comment (only content can be updated)
        await commentAPI.updateComment(comment.id, {
          content: submitData.content,
        });
        setSuccess('Comment updated successfully!');
      } else {
        // Create new comment
        await commentAPI.createComment(submitData);
        setSuccess('Comment created successfully!');
        setFormData({
          content: '',
          userId: users[0]?.id.toString() || '',
          postId: posts[0]?.id.toString() || '',
        });
      }

      // Call success callback after a short delay
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to save comment';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>{comment ? 'Edit Comment' : 'Create New Comment'}</h2>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {!comment && (
          <>
            <div className="form-group">
              <label htmlFor="userId">Author (User) *</label>
              <select
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
                disabled={loading || users.length === 0}
              >
                {users.length === 0 ? (
                  <option value="">No users available. Please create a user first.</option>
                ) : (
                  <>
                    <option value="">Select a user</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="postId">Post *</label>
              <select
                id="postId"
                name="postId"
                value={formData.postId}
                onChange={handleChange}
                required
                disabled={loading || posts.length === 0}
              >
                {posts.length === 0 ? (
                  <option value="">No posts available. Please create a post first.</option>
                ) : (
                  <>
                    <option value="">Select a post</option>
                    {posts.map(post => (
                      <option key={post.id} value={post.id}>
                        {post.title}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            disabled={loading}
            rows="5"
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || (!comment && (users.length === 0 || posts.length === 0))}
          >
            {loading ? 'Saving...' : (comment ? 'Update Comment' : 'Create Comment')}
          </button>
          {onCancel && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentForm;

