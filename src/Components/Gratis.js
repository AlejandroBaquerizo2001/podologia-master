import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const Gratis = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    rut: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    celular: '',
    password: '',
    confirmPassword: '',
    profesion: '',
    registroSuperintendencia: '',
    plan: '',
    aceptoTerminos: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Datos del formulario:', formData);
    alert('¡Registro exitoso!');
    setActiveTab('login');
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0" style={{ 
            borderRadius: '15px',
            background: 'linear-gradient(to bottom, #ffffff, #e6f7ff)',
            overflow: 'hidden'
          }}>
            {/* Encabezado con temática acuática */}
            <div style={{
              background: 'linear-gradient(135deg, #3a7bd5, #00d2ff)',
              padding: '20px',
              textAlign: 'center',
              color: 'white'
            }}>
              <h2 className="mb-0">Registro Profesional</h2>
              <p className="mb-0">Comienza tu experiencia gratuita</p>
            </div>

            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>RUT *</Form.Label>
                      <Form.Control
                        type="text"
                        name="rut"
                        value={formData.rut}
                        onChange={handleChange}
                        required
                        placeholder="12345678-9"
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombres *</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellido Paterno *</Form.Label>
                      <Form.Control
                        type="text"
                        name="apellidoPaterno"
                        value={formData.apellidoPaterno}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellido Materno *</Form.Label>
                      <Form.Control
                        type="text"
                        name="apellidoMaterno"
                        value={formData.apellidoMaterno}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Celular *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="celular"
                        value={formData.celular}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contraseña *</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Repetir Contraseña *</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Profesión</Form.Label>
                      <Form.Control
                        type="text"
                        name="profesion"
                        value={formData.profesion}
                        onChange={handleChange}
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nº Registro Superintendencia</Form.Label>
                      <Form.Control
                        type="text"
                        name="registroSuperintendencia"
                        value={formData.registroSuperintendencia}
                        onChange={handleChange}
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Plan *</Form.Label>
                  <Form.Select 
                    name="plan" 
                    value={formData.plan} 
                    onChange={handleChange}
                    required
                    style={{ borderRadius: '8px' }}
                  >
                    <option value="">Selecciona un plan</option>
                    <option value="basico">Plan Básico Gratuito</option>
                    <option value="premium">Plan Premium</option>
                    <option value="empresarial">Plan Empresarial</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    name="aceptoTerminos"
                    checked={formData.aceptoTerminos}
                    onChange={handleChange}
                    label={
                      <span>
                        Acepto los <a href="#terminos" style={{ color: '#3a7bd5' }}>Términos y Condiciones</a>
                      </span>
                    }
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button 
                    type="submit" 
                    size="lg"
                    style={{
                      background: 'linear-gradient(135deg, #3a7bd5, #00d2ff)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Crear Cuenta
                  </Button>
                </div>

                <div className="text-center mt-3">
                  <p>
                    ¿Ya tienes una cuenta?{' '}
                    <Button 
                      variant="link" 
                      onClick={() => setActiveTab('login')}
                      style={{ color: '#3a7bd5', textDecoration: 'none', padding: 0 }}
                    >
                      Inicia sesión aquí
                    </Button>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Gratis;