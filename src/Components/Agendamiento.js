import React, { useState } from 'react';
import { Container, Form, Button, Alert, Table, Row, Col, Card } from 'react-bootstrap';
import { FaCalendarAlt, FaUser, FaEnvelope, FaClock, FaNotesMedical, FaPlus, FaTrash } from 'react-icons/fa';

const Agendamiento = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    fecha: '',
    hora: '',
    motivo: ''
  });

  const [citas, setCitas] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCitas([...citas, formData]);
    setFormData({
      nombre: '',
      email: '',
      fecha: '',
      hora: '',
      motivo: ''
    });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleDelete = (index) => {
    const nuevasCitas = [...citas];
    nuevasCitas.splice(index, 1);
    setCitas(nuevasCitas);
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4" style={{ color: '#2c3e50' }}>
        <FaCalendarAlt className="me-2" />
        Gestión de Citas Médicas
      </h2>
      
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className="shadow-sm">
          <FaCalendarAlt className="me-2" />
          Cita agendada correctamente!
        </Alert>
      )}

      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <FaPlus className="me-2" />
                Agendar Nueva Cita
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUser className="me-2 text-muted" />
                    Nombre completo
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="border-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaEnvelope className="me-2 text-muted" />
                    Correo electrónico
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-2"
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        <FaCalendarAlt className="me-2 text-muted" />
                        Fecha
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        required
                        className="border-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>
                        <FaClock className="me-2 text-muted" />
                        Hora
                      </Form.Label>
                      <Form.Control
                        type="time"
                        name="hora"
                        value={formData.hora}
                        onChange={handleChange}
                        required
                        className="border-2"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>
                    <FaNotesMedical className="me-2 text-muted" />
                    Motivo de la cita
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="motivo"
                    value={formData.motivo}
                    onChange={handleChange}
                    required
                    className="border-2"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit"
                    className="fw-bold"
                  >
                    <FaPlus className="me-2" />
                    Agendar Cita
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0">
                <FaCalendarAlt className="me-2" />
                Citas Agendadas
              </h5>
            </Card.Header>
            <Card.Body>
              {citas.length > 0 ? (
                <div className="table-responsive">
                  <Table striped hover className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="text-nowrap">Paciente</th>
                        <th className="text-nowrap">Fecha</th>
                        <th className="text-nowrap">Hora</th>
                        <th className="text-nowrap">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {citas.map((cita, index) => (
                        <tr key={index}>
                          <td>
                            <div className="fw-bold">{cita.nombre}</div>
                            <small className="text-muted">{cita.email}</small>
                          </td>
                          <td className="text-nowrap">{cita.fecha}</td>
                          <td className="text-nowrap">{cita.hora}</td>
                          <td>
                            <Button 
                              variant="outline-danger" 
                              size="sm" 
                              onClick={() => handleDelete(index)}
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-4">
                  <FaCalendarAlt size={48} className="text-muted mb-3" />
                  <h5 className="text-muted">No hay citas agendadas</h5>
                  <p className="text-muted">Agenda tu primera cita usando el formulario</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Agendamiento;