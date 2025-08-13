import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

interface Activity {
  id: number;
  type: string;
  date: string;
  time: string;
  description: string;
  done: boolean;
}

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: 'Waste Disposal',
      date: '2025/12/03',
      time: '8:00am',
      description: 'Lorem Ipsum',
      done: false,
    },
    {
      id: 2,
      type: 'Check Ventilation System',
      date: '',
      time: '',
      description: 'Lorem Ipsum',
      done: true,
    },
  ]);

  const [newActivity, setNewActivity] = useState({
    type: '',
    date: '',
    time: '',
    description: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newActivity.type && newActivity.date && newActivity.time) {
      const newId = activities.length ? activities[activities.length - 1].id + 1 : 1;
      setActivities([
        ...activities,
        {
          ...newActivity,
          id: newId,
          done: false,
        },
      ]);
      setNewActivity({ type: '', date: '', time: '', description: '' });
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        {/* Add New Activity */}
        <Col md={6}>
          <h5 className="mb-3">Add New Activity</h5>
          <Form onSubmit={handleAddActivity}>
            <Form.Group className="mb-3" controlId="activityType">
              <Form.Label>Activity Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Lorem Ipsum"
                name="type"
                value={newActivity.type}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="activityDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newActivity.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="activityTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={newActivity.time}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="activityDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={newActivity.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Add Activity
            </Button>
          </Form>
        </Col>

        {/* Upcoming Activities */}
        <Col md={6}>
          <h5 className="mb-3">Upcoming Activities</h5>
          {activities.map((activity) => (
            <Card key={activity.id} className="mb-3">
              <Card.Body className="d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  checked={activity.done}
                  readOnly
                  className="me-2"
                  style={{ pointerEvents: 'none' }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>{activity.type}</div>
                  {activity.done ? (
                    <div style={{ color: 'green', fontWeight: 500 }}>
                      Done
                    </div>
                  ) : (
                    <div>
                      <span style={{ color: '#1976d2', fontWeight: 500 }}>
                        {activity.date}
                      </span>
                      {'  '}
                      <span style={{ color: '#1976d2', fontWeight: 500 }}>
                        {activity.time}
                      </span>
                    </div>
                  )}
                  <div style={{ fontSize: '0.95em', color: '#555' }}>
                    {activity.description}
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Activities;
