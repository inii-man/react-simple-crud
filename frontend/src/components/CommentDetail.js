import React, { useState, useEffect } from 'react';
import { commentAPI } from '../services/api';

const CommentDetail = ({ commentId, onBack }) => {
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (commentId) {
      fetchComment();
    }
  }, [commentId]);

  const fetchComment = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await commentAPI.getCommentById(commentId);
      setComment(data);
    } catch (err) {
      setError('Failed to fetch comment details');
      console.error('Error fetching comment:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading comment details...</div>;
  }

  if (error) {
    return (
      <div>
        <div className="error">{error}</div>
        <button className="btn btn-primary" onClick={fetchComment}>
          Retry
        </button>
        <button className="btn btn-secondary" onClick={onBack} style={{ marginLeft: '10px' }}>
          Back to List
        </button>
      </div>
    );
  }

  if (!comment) {
    return <div>Comment not found</div>;
  }

  return (
    <div className="detail-view">
      <button className="btn btn-secondary back-button" onClick={onBack}>
        ← Back to List
      </button>
      <h2>Comment Details</h2>
      <div className="info-item">
        <div className="info-label">ID:</div>
        <div className="info-value">{comment.id}</div>
      </div>
      <div className="info-item">
        <div className="info-label">Content:</div>
        <div className="info-value" style={{ whiteSpace: 'pre-wrap' }}>{comment.content}</div>
      </div>
      <div className="info-item">
        <div className="info-label">Author:</div>
        <div className="info-value">
          {comment.user?.name || 'Unknown'} ({comment.user?.email || 'N/A'})
        </div>
      </div>
      <div className="info-item">
        <div className="info-label">Post:</div>
        <div className="info-value">
          <strong>{comment.post?.title || 'Unknown'}</strong>
          {comment.post?.content && (
            <div style={{ marginTop: '10px', padding: '10px', background: '#f5f5f5', borderRadius: '5px' }}>
              {comment.post.content.substring(0, 200)}...
            </div>
          )}
        </div>
      </div>
      <div className="info-item">
        <div className="info-label">Created At:</div>
        <div className="info-value">{new Date(comment.createdAt).toLocaleString()}</div>
      </div>
      <div className="info-item">
        <div className="info-label">Updated At:</div>
        <div className="info-value">{new Date(comment.updatedAt).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default CommentDetail;

