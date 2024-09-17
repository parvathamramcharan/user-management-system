import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; 
function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://user-management-system-sandy.vercel.app/allusers');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: value
    // })); or 
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        
        await axios.put(`https://user-management-system-sandy.vercel.app/userupdate/${editUserId}`, formData);
        setIsEditing(false);
        setEditUserId(null);
      } else {
       
        await axios.post('https://user-management-system-sandy.vercel.app/createusers', formData);
      }
      fetchUsers(); 
      setFormData({ name: '', email: '', age: '', phone: '' }); // Clear form
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://user-management-system-sandy.vercel.app/userdelete/${id}`);
      fetchUsers(); 
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditUserId(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age,
      phone: user.phone
    });
  };

  return (
    <div>
      <h1>User Management System</h1>

     
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
      </form>

      {/* Display Users */}
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
