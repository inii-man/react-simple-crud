import React, { useState, useEffect } from 'react';
import { postAPI } from '../services/api';

const PostList = ({ onPostClick, onEditPost, onDeletePost }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await postAPI.getAllPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to fetch posts. Make sure the backend server is running.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postAPI.deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
        if (onDeletePost) onDeletePost();
      } catch (err) {
        setError('Failed to delete post');
        console.error('Error deleting post:', err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return (
      <div>
        <div className="error">{error}</div>
        <button className="btn btn-primary" onClick={fetchPosts}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Posts List</h2>
      {posts.length === 0 ? (
        <p>No posts found. Create your first post!</p>
      ) : (
        <div className="grid">
          {posts.map(post => (
            <div key={post.id} className="card">
              <h3>{post.title}</h3>
              <p>{post.content.substring(0, 100)}...</p>
              <p><strong>Author:</strong> {post.user?.name || 'Unknown'}</p>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => onPostClick(post.id)}
                >
                  View Details
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => onEditPost(post)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(post.id)}
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

export default PostList;

