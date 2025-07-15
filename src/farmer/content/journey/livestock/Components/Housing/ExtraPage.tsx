import { useState } from 'react';
import { Card, Badge, Form, Button, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import { FiEdit, FiCalendar, FiClock} from 'react-icons/fi';
import Saved from '../../Shared/Saved';
import { useNavigate } from 'react-router-dom';

const Extrapage = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [time, setTime] = useState<string | null>('10:00');
    const [showSaved, setShowSaved] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="container p-4">
            {showSaved && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.2)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Saved onDone={() => navigate('/farmer/projects/livestock/housing/results')} />
                </div>
            )}
            {/* First row with 3 cards */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <Card className="h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-start">
                                <Card.Title as="h3" className="h3-bold mb-2">Ventilation</Card.Title>
                                <div className="d-flex align-items-center gap-5">
                                    <Badge bg="" style={{
                                        background: 'var(--Primary, #457900)',
                                        color: '#fff',
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '1rem'
                                    }}>
                                        Excellent
                                    </Badge>
                                    <FiEdit style={{ cursor: 'pointer', color: '#6c757d' }} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mb-1">
                                <small className="text-muted">Type</small>
                                <small className="body-bold">Mechanical</small>
                            </div>
                            <div className="d-flex justify-content-between">
                                <small className="text-muted">Notes</small>
                                <small className="fw-bold">--</small>
                            </div>
                        </Card.Body>
                    </Card>
                </div>


                <div className="col-md-4">
                    <Card className="h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-start">
                                <Card.Title as="h3" className="h3-bold mb-2">Space</Card.Title>
                                <div className="d-flex align-items-center gap-5">
                                    <Badge bg="" style={{
                                        background: 'var(--Primary, #457900)',
                                        color: '#fff',
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '1rem'
                                    }}>
                                        Excellent
                                    </Badge>
                                    <FiEdit style={{ cursor: 'pointer', color: '#6c757d' }} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mb-1">
                                <small className="text-muted">Type</small>
                                <small className="body-bold">Mechanical</small>
                            </div>
                            <div className="d-flex justify-content-between"><small className="text-muted">Total area in (m²)</small><small className="fw-bold">15,000m²</small></div>
                            <div className="d-flex justify-content-between"><small className="text-muted">Animal Capacity</small><small className="fw-bold">15 Cows</small></div>
                            <div className="d-flex justify-content-between"><small className="text-muted">Density</small><small className="fw-bold">1 cow per 1000m²</small></div>
                            <div className="d-flex justify-content-between"><small className="text-muted">Notes</small><small className="fw-bold">--</small></div>
                        </Card.Body>
                    </Card>
                </div>


                <div className="col-md-4">
                    <Card className="h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-start">
                                <Card.Title as="h3" className="h3-bold mb-2">Waste Management</Card.Title>
                                <div className="d-flex align-items-center gap-5">
                                    <Badge bg="" style={{
                                        background: 'var(--Primary, #457900)',
                                        color: '#fff',
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '1rem'
                                    }}>
                                        Excellent
                                    </Badge>
                                    <FiEdit style={{ cursor: 'pointer', color: '#6c757d' }} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mb-1">
                                <small className="text-muted">Type</small>
                                <small className="body-bold">Mechanical</small>
                            </div>
                            <div className="d-flex justify-content-between"><small className="text-muted">Disposal Method</small><small className="fw-bold">Biogas Production</small></div>
                            <div className="d-flex justify-content-between"><small className="text-muted">Frequency</small><small className="fw-bold">Daily</small></div>
                            <div className="d-flex justify-content-between"><small className="text-muted">Volume</small><small className="fw-bold">12,000kg</small></div>
                            <div className="d-flex justify-content-between"><small className="text-muted">Notes</small><small className="fw-bold">--</small></div>
                        </Card.Body>
                    </Card>
                </div>
            </div>






            {/* Second row with 2 cards */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <Card className="h-100">
                        <Card.Body>
                            <Card.Title as="h6" className="mb-3 h3-semibold">Add New Activity</Card.Title>
                            <Form onSubmit={e => { e.preventDefault(); setShowSaved(true); }}>
                                <Form.Group className="mb-3" controlId="activityType">
                                    <Form.Label><small>Activity Type</small></Form.Label>
                                    <Form.Control type="text" placeholder="Lorem Ipsum" />
                                </Form.Group>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3" controlId="date">
                                            <Form.Label><small>Date</small></Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text><FiCalendar /></InputGroup.Text>
                                                <DatePicker selected={startDate} onChange={(date: Date | null) => setStartDate(date)} className="form-control" />
                                            </InputGroup>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3" controlId="time">
                                            <Form.Label><small>Time</small></Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text><FiClock /></InputGroup.Text>
                                                <TimePicker onChange={(value) => setTime(value)} value={time} className="form-control" disableClock={true} />
                                            </InputGroup>
                                        </Form.Group>
                                    </div>
                                </div>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label><small>Description</small></Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                                <Button variant="success" type="submit" className="w-lg-25" style={{ backgroundColor: 'var(--Primary, #457900)' }}>
                                    Add Activity
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card className="h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <Card.Title as="h6" className="mb-0 h3-semibold">Upcoming Activities</Card.Title>

                            </div>
                            <Card className="mb-3">
                                <Card.Body className="p-2">
                                    <div className="d-flex align-items-start">
                                        <Form.Check type="checkbox" id="wasteDisposal" className="me-2" />
                                        <div>
                                            <div className="body-semibold">Waste Disposal</div>
                                            <small className="text-primary">2025/12/03 8:00AM</small>
                                            <div><small>Lorem Ipsum</small></div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body className="p-2">
                                    <div className="d-flex align-items-start">
                                        <Form.Check type="checkbox" id="checkVentilation" defaultChecked className="me-2" />
                                        <div>
                                            <div className="body-semibold">Check Ventilation System</div>
                                            <small className="text-success">Done</small>
                                            <div><small>Lorem Ipsum</small></div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            {/* Third row with 1 card */}
            <div className="row">
                <div className="col-md-12">
                    <Card>
                        <Card.Body>
                            <Card.Title as="h6" className="mb-3 h3-semibold">Requests</Card.Title>
                            <Card>
                                <Card.Body className="d-flex justify-content-between align-items-center p-2">
                                    <div>
                                        <div className="body-medium">Livestock Protection Service Request</div>
                                        <small className="text-muted">2025/03/07</small>
                                        <div><small>AgriFarm</small></div>
                                    </div>
                                    <Button variant="outline-success" size="sm">View Report</Button>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Extrapage;

