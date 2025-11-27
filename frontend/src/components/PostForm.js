import React, { useState, useEffect } from 'react';
import { postAPI, userAPI } from '../services/api';

const PostForm = ({ post, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    userId: '',
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsers();
    if (post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        userId: post.userId || '',
      });
    }
  }, [post]);

  const fetchUsers = async () => {
    try {
      const data = await userAPI.getAllUsers();
      setUsers(data);
      // Set default user if not editing
      if (!post && data.length > 0) {
        setFormData(prev => ({ ...prev, userId: data[0].id.toString() }));
      }
    } catch (err) {
      console.error('Error fetching users:', err);
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
        title: formData.title,
        content: formData.content,
        userId: parseInt(formData.userId),
      };

      if (post) {
        // Update existing post (only title and content)
        await postAPI.updatePost(post.id, {
          title: submitData.title,
          content: submitData.content,
        });
        setSuccess('Post updated successfully!');
      } else {
        // Create new post
        await postAPI.createPost(submitData);
        setSuccess('Post created successfully!');
        setFormData({ title: '', content: '', userId: users[0]?.id.toString() || '' });
      }

      // Call success callback after a short delay
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to save post';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>{post ? 'Edit Post' : 'Create New Post'}</h2>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {!post && (
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
        )}

        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || (!post && users.length === 0)}
          >
            {loading ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
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

export default PostForm;

