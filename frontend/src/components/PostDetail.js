import React, { useState, useEffect } from 'react';
import { postAPI } from '../services/api';

const PostDetail = ({ postId, onBack }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await postAPI.getPostById(postId);
      setPost(data);
    } catch (err) {
      setError('Failed to fetch post details');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading post details...</div>;
  }

  if (error) {
    return (
      <div>
        <div className="error">{error}</div>
        <button className="btn btn-primary" onClick={fetchPost}>
          Retry
        </button>
        <button className="btn btn-secondary" onClick={onBack} style={{ marginLeft: '10px' }}>
          Back to List
        </button>
      </div>
    );
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="detail-view">
      <button className="btn btn-secondary back-button" onClick={onBack}>
        ← Back to List
      </button>
      <h2>Post Details</h2>
      <div className="info-item">
        <div className="info-label">ID:</div>
        <div className="info-value">{post.id}</div>
      </div>
      <div className="info-item">
        <div className="info-label">Title:</div>
        <div className="info-value">{post.title}</div>
      </div>
      <div className="info-item">
        <div className="info-label">Content:</div>
        <div className="info-value" style={{ whiteSpace: 'pre-wrap' }}>{post.content}</div>
      </div>
      <div className="info-item">
        <div className="info-label">Author:</div>
        <div className="info-value">{post.user?.name || 'Unknown'} ({post.user?.email || 'N/A'})</div>
      </div>
      <div className="info-item">
        <div className="info-label">Created At:</div>
        <div className="info-value">{new Date(post.createdAt).toLocaleString()}</div>
      </div>
      <div className="info-item">
        <div className="info-label">Updated At:</div>
        <div className="info-value">{new Date(post.updatedAt).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default PostDetail;

