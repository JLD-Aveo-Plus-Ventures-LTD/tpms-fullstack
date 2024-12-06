import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUserRole, deleteUser } from '../services/apiService';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await createUser(newUser);
      setSuccess('User created successfully');
      setNewUser({ username: '', password: '', role: '' });
      fetchUsers();
    } catch (err) {
      setError('Failed to create user');
    }
  };

  const handleUpdateRole = async (userId, role) => {
    setError('');
    setSuccess('');
    setActionLoading(userId);
    try {
      await updateUserRole(userId, role);
      setSuccess(`Role updated to ${role}`);
      fetchUsers();
    } catch (err) {
      setError('Failed to update role');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    setError('');
    setSuccess('');
    setActionLoading(userId);
    try {
      await deleteUser(userId);
      setSuccess('User deleted successfully');
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Users Management */}
      <h3>All Users</h3>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.user_id}>
              <strong>{user.username}</strong> - {user.role}
              <button
                onClick={() => handleUpdateRole(user.user_id, 'cashier')}
                disabled={actionLoading === user.user_id || user.role === 'cashier'}
              >
                Set as Cashier
              </button>
              <button
                onClick={() => handleUpdateRole(user.user_id, 'operations')}
                disabled={actionLoading === user.user_id || user.role === 'operations'}
              >
                Set as Operations
              </button>
              <button
                onClick={() => handleDeleteUser(user.user_id)}
                disabled={actionLoading === user.user_id}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* User Creation */}
      <h3>Create New User</h3>
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          required
        >
          <option value="">Select Role</option>
          <option value="cashier">Cashier</option>
          <option value="operations">Operations</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
