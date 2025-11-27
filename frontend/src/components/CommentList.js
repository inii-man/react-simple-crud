import React, { useState, useEffect } from 'react';
import { commentAPI } from '../services/api';

const CommentList = ({ onCommentClick, onEditComment, onDeleteComment }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await commentAPI.getAllComments();
      setComments(data);
    } catch (err) {
      setError('Failed to fetch comments. Make sure the backend server is running.');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await commentAPI.deleteComment(id);
        setComments(comments.filter(comment => comment.id !== id));
        if (onDeleteComment) onDeleteComment();
      } catch (err) {
        setError('Failed to delete comment');
        console.error('Error deleting comment:', err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading comments...</div>;
  }

  if (error) {
    return (
      <div>
        <div className="error">{error}</div>
        <button className="btn btn-primary" onClick={fetchComments}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Comments List</h2>
      {comments.length === 0 ? (
        <p>No comments found. Create your first comment!</p>
      ) : (
        <div className="grid">
          {comments.map(comment => (
            <div key={comment.id} className="card">
              <h3>Comment #{comment.id}</h3>
              <p><strong>Content:</strong> {comment.content.substring(0, 100)}{comment.content.length > 100 ? '...' : ''}</p>
              <p><strong>Author:</strong> {comment.user?.name || 'Unknown'} ({comment.user?.email || 'N/A'})</p>
              <p><strong>Post:</strong> {comment.post?.title || 'Unknown'}</p>
              <p><strong>Date:</strong> {new Date(comment.createdAt).toLocaleString()}</p>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => onCommentClick(comment.id)}
                >
                  View Details
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => onEditComment(comment)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(comment.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;

