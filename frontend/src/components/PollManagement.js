// src/components/PollManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Container } from 'react-bootstrap';

const PollManagement = () => {
  const [polls, setPolls] = useState([]);
  const [newPoll, setNewPoll] = useState({ title: '', options: '' });

  useEffect(() => {
    const fetchPolls = async () => {
      const response = await axios.get('http://localhost:5000/api/polls');
      setPolls(response.data);
    };
    fetchPolls();
  }, []);

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/api/polls', newPoll);
    setPolls([...polls, response.data]);
    setNewPoll({ title: '', options: '' });
  };

  const handleVote = async (pollId, option) => {
    await axios.post('http://localhost:5000/api/polls/vote', { pollId, option });
    const updatedPolls = polls.map(poll => {
      if (poll.id === pollId) {
        return { ...poll, options: { ...poll.options, [option]: poll.options[option] + 1 } };
      }
      return poll;
    });
    setPolls(updatedPolls);
  };

  return (
    <Container>
      <h1>Poll Management</h1>
      <Form onSubmit={handleCreatePoll}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={newPoll.title}
            onChange={(e) => setNewPoll({ ...newPoll, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Options (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            value={newPoll.options}
            onChange={(e) => setNewPoll({ ...newPoll, options: e.target.value.split(',') })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Create Poll</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Options</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {polls.map(poll => (
            <tr key={poll.id}>
              <td>{poll.title}</td>
              <td>{JSON.stringify(poll.options)}</td>
              <td>
                {Object.keys(poll.options).map(option => (
                  <Button key={option} onClick={() => handleVote(poll.id, option)}>{option}</Button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PollManagement;
