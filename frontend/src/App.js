// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import PollManagement from './components/PollManagement';

const App = () => {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Poll System</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" style={{ marginRight: '50px' }}>Home</Nav.Link>
          <Nav.Link as={Link} to="/register" style={{ marginRight: '50px' }}>Register</Nav.Link>
          <Nav.Link as={Link} to="/login" style={{ marginRight: '50px' }}>Login</Nav.Link>
          <Nav.Link as={Link} to="/users" style={{ marginRight: '50px' }}>User Management</Nav.Link>
          <Nav.Link as={Link} to="/polls" style={{ marginRight: '50px' }}>Poll Management</Nav.Link>
        </Nav>

      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/polls" element={<PollManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
