import React, { useState } from 'react';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserForm from './components/UserForm';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import CommentList from './components/CommentList';
import CommentDetail from './components/CommentDetail';
import CommentForm from './components/CommentForm';
import CommentFormRepeater from './components/CommentFormRepeater';
import ProductsPage from './pages/ProductsPage';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('users'); // 'users', 'posts', 'comments', or 'products'
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showCommentRepeater, setShowCommentRepeater] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editingComment, setEditingComment] = useState(null);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setSelectedPostId(null);
  };

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
    setSelectedUserId(null);
    setSelectedCommentId(null);
  };

  const handleCommentClick = (commentId) => {
    setSelectedCommentId(commentId);
    setSelectedUserId(null);
    setSelectedPostId(null);
  };

  const handleBackToList = () => {
    setSelectedUserId(null);
    setSelectedPostId(null);
    setSelectedCommentId(null);
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleUserFormSuccess = () => {
    setShowUserForm(false);
    setEditingUser(null);
    // Refresh will happen automatically via useEffect in UserList
  };

  const handleUserFormCancel = () => {
    setShowUserForm(false);
    setEditingUser(null);
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowPostForm(true);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowPostForm(true);
  };

  const handlePostFormSuccess = () => {
    setShowPostForm(false);
    setEditingPost(null);
    // Refresh will happen automatically via useEffect in PostList
  };

  const handlePostFormCancel = () => {
    setShowPostForm(false);
    setEditingPost(null);
  };

  const handleCreateComment = () => {
    setEditingComment(null);
    setShowCommentForm(true);
    setShowCommentRepeater(false);
  };

  const handleCreateCommentRepeater = () => {
    setEditingComment(null);
    setShowCommentRepeater(true);
    setShowCommentForm(false);
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setShowCommentForm(true);
  };

  const handleCommentFormSuccess = () => {
    setShowCommentForm(false);
    setEditingComment(null);
    // Refresh will happen automatically via useEffect in CommentList
  };

  const handleCommentFormCancel = () => {
    setShowCommentForm(false);
    setEditingComment(null);
  };

  const handleCommentRepeaterSuccess = () => {
    setShowCommentRepeater(false);
    setEditingComment(null);
    // Refresh will happen automatically via useEffect in CommentList
  };

  const handleCommentRepeaterCancel = () => {
    setShowCommentRepeater(false);
    setEditingComment(null);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>Backend Development & Integrasi API</h1>
          <p>Day 3 - React + Node.js + Express + Sequelize</p>
        </div>

        {/* Navigation Tabs */}
        <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
          <button
            className={`btn ${activeView === 'users' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              setActiveView('users');
              handleBackToList();
              setShowUserForm(false);
              setShowPostForm(false);
              setShowCommentForm(false);
            }}
          >
            Users
          </button>
          <button
            className={`btn ${activeView === 'posts' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              setActiveView('posts');
              handleBackToList();
              setShowUserForm(false);
              setShowPostForm(false);
              setShowCommentForm(false);
            }}
          >
            Posts
          </button>
          <button
            className={`btn ${activeView === 'comments' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              setActiveView('comments');
              handleBackToList();
              setShowUserForm(false);
              setShowPostForm(false);
              setShowCommentForm(false);
              setShowCommentRepeater(false);
            }}
          >
            Comments
          </button>
          <button
            className={`btn ${activeView === 'products' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              setActiveView('products');
              handleBackToList();
              setShowUserForm(false);
              setShowPostForm(false);
              setShowCommentForm(false);
              setShowCommentRepeater(false);
            }}
          >
            Products (Modal CRUD)
          </button>
        </div>

        {/* Users Section */}
        {activeView === 'users' && (
          <>
            {!selectedUserId && !showUserForm && (
              <div style={{ marginBottom: '20px' }}>
                <button className="btn btn-success" onClick={handleCreateUser}>
                  + Create New User
                </button>
              </div>
            )}

            {showUserForm && (
              <UserForm
                user={editingUser}
                onSuccess={handleUserFormSuccess}
                onCancel={handleUserFormCancel}
              />
            )}

            {selectedUserId && !showUserForm && (
              <UserDetail
                userId={selectedUserId}
                onBack={handleBackToList}
              />
            )}

            {!selectedUserId && !showUserForm && (
              <UserList
                onUserClick={handleUserClick}
                onEditUser={handleEditUser}
                onDeleteUser={() => {
                  // List will refresh automatically
                }}
              />
            )}
          </>
        )}

        {/* Posts Section */}
        {activeView === 'posts' && (
          <>
            {!selectedPostId && !showPostForm && (
              <div style={{ marginBottom: '20px' }}>
                <button className="btn btn-success" onClick={handleCreatePost}>
                  + Create New Post
                </button>
              </div>
            )}

            {showPostForm && (
              <PostForm
                post={editingPost}
                onSuccess={handlePostFormSuccess}
                onCancel={handlePostFormCancel}
              />
            )}

            {selectedPostId && !showPostForm && (
              <PostDetail
                postId={selectedPostId}
                onBack={handleBackToList}
              />
            )}

            {!selectedPostId && !showPostForm && (
              <PostList
                onPostClick={handlePostClick}
                onEditPost={handleEditPost}
                onDeletePost={() => {
                  // List will refresh automatically
                }}
              />
            )}
          </>
        )}

        {/* Comments Section */}
        {activeView === 'comments' && (
          <>
            {!selectedCommentId && !showCommentForm && !showCommentRepeater && (
              <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <button className="btn btn-success" onClick={handleCreateComment}>
                  + Create Single Comment
                </button>
                <button className="btn btn-success" onClick={handleCreateCommentRepeater}>
                  + Create Multiple Comments (Repeater)
                </button>
              </div>
            )}

            {showCommentForm && (
              <CommentForm
                comment={editingComment}
                onSuccess={handleCommentFormSuccess}
                onCancel={handleCommentFormCancel}
              />
            )}

            {showCommentRepeater && (
              <CommentFormRepeater
                onSuccess={handleCommentRepeaterSuccess}
                onCancel={handleCommentRepeaterCancel}
              />
            )}

            {selectedCommentId && !showCommentForm && !showCommentRepeater && (
              <CommentDetail
                commentId={selectedCommentId}
                onBack={handleBackToList}
              />
            )}

            {!selectedCommentId && !showCommentForm && !showCommentRepeater && (
              <CommentList
                onCommentClick={handleCommentClick}
                onEditComment={handleEditComment}
                onDeleteComment={() => {
                  // List will refresh automatically
                }}
              />
            )}
          </>
        )}

        {/* Products Section - Modal-based CRUD */}
        {activeView === 'products' && (
          <ProductsPage />
        )}
      </div>
    </div>
  );
}

export default App;

