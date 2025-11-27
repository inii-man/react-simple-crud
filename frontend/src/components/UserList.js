import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';

const UserList = ({ onUserClick, onEditUser, onDeleteUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await userAPI.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users. Make sure the backend server is running.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
        if (onDeleteUser) onDeleteUser();
      } catch (err) {
        setError('Failed to delete user');
        console.error('Error deleting user:', err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return (
      <div>
        <div className="error">{error}</div>
        <button className="btn btn-primary" onClick={fetchUsers}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Users List</h2>
      {users.length === 0 ? (
        <p>No users found. Create your first user!</p>
      ) : (
        <div className="grid">
          {users.map(user => (
            <div key={user.id} className="card">
              <h3>{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Posts:</strong> {user.posts?.length || 0}</p>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => onUserClick(user.id)}
                >
                  View Details
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => onEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user.id)}
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

export default UserList;

