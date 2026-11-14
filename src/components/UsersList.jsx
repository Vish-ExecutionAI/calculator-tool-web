import { useState, useEffect } from 'react';
import { api } from '../lib/api.js';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    const fetchedUsers = await api.listUsers();
    setUsers(fetchedUsers);
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email) {
      alert('Please enter both name and email.');
      return;
    }
    await api.createUser({ name, email });
    setName('');
    setEmail('');
    loadUsers(); // Reload users after creation
  }

  return (
    <div className="users-section">
      <h3>Add New User</h3>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Create User</button>
      </form>

      <h3>Existing Users</h3>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}