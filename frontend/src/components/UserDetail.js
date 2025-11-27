import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';

const UserDetail = ({ userId, onBack }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const fetchUser = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await userAPI.getUserById(userId);
      setUser(data);
    } catch (err) {
      setError('Failed to fetch user details');
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading user details...</div>;
  }

  if (error) {
    return (
      <div>
        <div className="error">{error}</div>
        <button className="btn btn-primary" onClick={fetchUser}>
          Retry
        </button>
        <button className="btn btn-secondary" onClick={onBack} style={{ marginLeft: '10px' }}>
          Back to List
        </button>
      </div>
    );
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="detail-view">
      <button className="btn btn-secondary back-button" onClick={onBack}>
        ← Back to List
      </button>
      <h2>User Details</h2>
      <div className="info-item">
        <div className="info-label">ID:</div>
        <div className="info-value">{user.id}</div>
      </div>
      <div className="info-item">
        <div className="info-label">Name:</div>
        <div className="info-value">{user.name}</div>
      </div>
      <div className="info-item">
        <div className="info-label">Email:</div>
        <div className="info-value">{user.email}</div>
      </div>
      <div className="info-item">
        <div className="info-label">Created At:</div>
        <div className="info-value">{new Date(user.createdAt).toLocaleString()}</div>
      </div>
      <div className="info-item">
        <div className="info-label">Posts ({user.posts?.length || 0}):</div>
        {user.posts && user.posts.length > 0 ? (
          <div style={{ marginTop: '10px' }}>
            {user.posts.map(post => (
              <div key={post.id} className="card" style={{ marginBottom: '10px' }}>
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <small>{new Date(post.createdAt).toLocaleString()}</small>
              </div>
            ))}
          </div>
        ) : (
          <div className="info-value">No posts yet</div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;

