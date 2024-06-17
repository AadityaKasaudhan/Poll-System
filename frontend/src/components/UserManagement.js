// src/components/UserManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Container } from 'react-bootstrap';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleDelete = async (id) => {
    await axios.delete('http://localhost:5000/api/users', { data: { id } });
    setUsers(users.filter(user => user.id !== id));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await axios.put('http://localhost:5000/api/users', editUser);
    setEditUser(null);
  };

  return (
    <Container>
      <h1>User Management</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(user)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {editUser && (
        <Form onSubmit={handleSave}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editUser.name}
              onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={editUser.phone}
              onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={editUser.role}
              onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Save</Button>
        </Form>
      )}
    </Container>
  );
};

export default UserManagement;
