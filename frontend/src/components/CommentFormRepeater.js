import React, { useState, useEffect } from 'react';
import { commentAPI, userAPI, postAPI } from '../services/api';

const CommentFormRepeater = ({ onSuccess, onCancel }) => {
  const [items, setItems] = useState([
    { content: '', userId: '', postId: '' }
  ]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsersAndPosts();
  }, []);

  const fetchUsersAndPosts = async () => {
    try {
      const [usersData, postsData] = await Promise.all([
        userAPI.getAllUsers(),
        postAPI.getAllPosts(),
      ]);
      setUsers(usersData);
      setPosts(postsData);
      // Set default values
      if (usersData.length > 0 && postsData.length > 0) {
        setItems([{
          content: '',
          userId: usersData[0].id.toString(),
          postId: postsData[0].id.toString(),
        }]);
      }
    } catch (err) {
      console.error('Error fetching users and posts:', err);
      setError('Failed to load users and posts');
    }
  };

  const handleAddRow = () => {
    setItems([...items, { content: '', userId: users[0]?.id.toString() || '', postId: posts[0]?.id.toString() || '' }]);
  };

  const handleRemoveRow = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate all items
    const invalidItems = items.filter(item => !item.content || !item.userId || !item.postId);
    if (invalidItems.length > 0) {
      setError('Please fill all fields for all comments');
      setLoading(false);
      return;
    }

    try {
      // Create all comments
      const promises = items.map(item =>
        commentAPI.createComment({
          content: item.content,
          userId: parseInt(item.userId),
          postId: parseInt(item.postId),
        })
      );

      await Promise.all(promises);
      setSuccess(`Successfully created ${items.length} comment(s)!`);
      
      // Reset form
      setItems([{ content: '', userId: users[0]?.id.toString() || '', postId: posts[0]?.id.toString() || '' }]);

      // Call success callback after a short delay
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to save comments';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (users.length === 0 || posts.length === 0) {
    return (
      <div className="card">
        <h2>Create Multiple Comments</h2>
        <div className="error">
          {users.length === 0 && posts.length === 0
            ? 'Please create at least one User and one Post first.'
            : users.length === 0
            ? 'Please create at least one User first.'
            : 'Please create at least one Post first.'}
        </div>
        {onCancel && (
          <button className="btn btn-secondary" onClick={onCancel} style={{ marginTop: '10px' }}>
            Cancel
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Create Multiple Comments (Form Repeater)</h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Add multiple comments at once. Click "Add Row" to add more comment fields.
      </p>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {items.map((item, index) => (
          <div key={index} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '15px',
            backgroundColor: '#fafafa',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#2c3e50' }}>Comment #{index + 1}</h3>
              {items.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveRow(index)}
                  disabled={loading}
                  style={{ padding: '5px 15px', fontSize: '12px' }}
                >
                  Remove
                </button>
              )}
            </div>

            <div className="form-group">
              <label htmlFor={`userId-${index}`}>Author (User) *</label>
              <select
                id={`userId-${index}`}
                name={`userId-${index}`}
                value={item.userId}
                onChange={(e) => handleChange(index, 'userId', e.target.value)}
                required
                disabled={loading}
              >
                <option value="">Select a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor={`postId-${index}`}>Post *</label>
              <select
                id={`postId-${index}`}
                name={`postId-${index}`}
                value={item.postId}
                onChange={(e) => handleChange(index, 'postId', e.target.value)}
                required
                disabled={loading}
              >
                <option value="">Select a post</option>
                {posts.map(post => (
                  <option key={post.id} value={post.id}>
                    {post.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor={`content-${index}`}>Content *</label>
              <textarea
                id={`content-${index}`}
                name={`content-${index}`}
                value={item.content}
                onChange={(e) => handleChange(index, 'content', e.target.value)}
                required
                disabled={loading}
                rows="3"
              />
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleAddRow}
            disabled={loading}
          >
            + Add Row
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : `Create ${items.length} Comment(s)`}
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

export default CommentFormRepeater;

