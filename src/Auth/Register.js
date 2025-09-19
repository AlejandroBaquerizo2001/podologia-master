import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card, Row, Col } from 'react-bootstrap';
import { Envelope, Lock, PersonPlus, ArrowLeftRight } from 'react-bootstrap-icons';

const Register = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulando validación
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (password !== confirmPassword) {
      setShowAlert(true);
    } else {
      // Simulando registro exitoso
      await new Promise(resolve => setTimeout(resolve, 500));
      setActiveTab('login');
    }
    
    setIsLoading(false);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #e0f2ff, #a8d5ff)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '20px 0',
      color: '#2a5c8b'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden" style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '2px solid #89c2f0'
            }}>
              {/* Header con temática de salud */}
              <div style={{
                background: 'linear-gradient(135deg, #4a9fea, #2a5c8b)',
                padding: '1.5rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                borderBottom: '2px solid #c2e3ff'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
                }}></div>
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <PersonPlus className="mb-2" style={{ fontSize: '2rem', color: '#ffffff' }} />
                  <h3 className="fw-bold mb-1" style={{ color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>Centro de Salud</h3>
                  <p className="mb-0" style={{ color: '#c2e3ff' }}>Cree sus nuevas credenciales</p>
                </div>
              </div>
              
              <Card.Body className="p-4 p-md-5" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
                {showAlert && (
                  <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible 
                    className="rounded-3" style={{ 
                      background: 'rgba(255, 200, 200, 0.9)',
                      borderColor: '#ff6b6b',
                      color: '#c53030'
                    }}>
                    Las contraseñas no coinciden.
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold" style={{ color: '#2a5c8b' }}>Correo Electrónico</Form.Label>
                    <div className="input-group" style={{ 
                      border: '1px solid #89c2f0',
                      borderRadius: '8px',
                      background: 'rgba(168, 213, 255, 0.1)'
                    }}>
                      <span className="input-group-text border-0" style={{ 
                        background: 'transparent',
                        color: '#4a9fea'
                      }}>
                        <Envelope />
                      </span>
                      <Form.Control 
                        type="email" 
                        placeholder="usuario@salud.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-0 ps-0"
                        required
                        style={{
                          background: 'transparent',
                          color: '#2a5c8b',
                          boxShadow: 'none'
                        }}
                      />
                    </div>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold" style={{ color: '#2a5c8b' }}>Nueva Contraseña</Form.Label>
                    <div className="input-group" style={{ 
                      border: '1px solid #89c2f0',
                      borderRadius: '8px',
                      background: 'rgba(168, 213, 255, 0.1)'
                    }}>
                      <span className="input-group-text border-0" style={{ 
                        background: 'transparent',
                        color: '#4a9fea'
                      }}>
                        <Lock />
                      </span>
                      <Form.Control 
                        type="password" 
                        placeholder="Crea tu contraseña segura" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-0 ps-0"
                        required
                        style={{
                          background: 'transparent',
                          color: '#2a5c8b',
                          boxShadow: 'none'
                        }}
                      />
                    </div>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-bold" style={{ color: '#2a5c8b' }}>Confirmar Contraseña</Form.Label>
                    <div className="input-group" style={{ 
                      border: '1px solid #89c2f0',
                      borderRadius: '8px',
                      background: 'rgba(168, 213, 255, 0.1)'
                    }}>
                      <span className="input-group-text border-0" style={{ 
                        background: 'transparent',
                        color: '#4a9fea'
                      }}>
                        <ArrowLeftRight />
                      </span>
                      <Form.Control 
                        type="password" 
                        placeholder="Repite tu contraseña" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border-0 ps-0"
                        required
                        style={{
                          background: 'transparent',
                          color: '#2a5c8b',
                          boxShadow: 'none'
                        }}
                      />
                    </div>
                  </Form.Group>
                  
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 py-3 fw-bold rounded-3 border-0"
                    disabled={isLoading}
                    style={{
                      background: 'linear-gradient(135deg, #4a9fea, #2a5c8b)',
                      color: '#ffffff',
                      boxShadow: '0 4px 8px rgba(74, 159, 234, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #5aaffe, #3a6cab)';
                      e.target.style.boxShadow = '0 6px 12px rgba(74, 159, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #4a9fea, #2a5c8b)';
                      e.target.style.boxShadow = '0 4px 8px rgba(74, 159, 234, 0.3)';
                    }}
                  >
                    {isLoading ? 'Registrando...' : (
                      <>
                        Registrarse <PersonPlus className="ms-2" />
                      </>
                    )}
                  </Button>
                </Form>
                
                <div className="text-center mt-4">
                  <Button 
                    variant="link" 
                    className="text-decoration-none small" 
                    onClick={() => setActiveTab('login')}
                    style={{ color: '#4a9fea' }}
                  >
                    ¿Ya tiene una cuenta? <span style={{ color: '#2a5c8b', fontWeight: 'bold' }}>Iniciar Sesión</span>
                  </Button>
                </div>
              </Card.Body>
              
              <div className="py-3 text-center" style={{ 
                background: 'rgba(224, 242, 255, 0.7)',
                borderTop: '1px solid #89c2f0'
              }}>
                <p className="mb-0 small" style={{ color: '#2a5c8b' }}>
                  Al registrarse, acepta nuestros <Button variant="link" className="text-decoration-none p-0 small" style={{ color: '#4a9fea' }}>Términos y Condiciones</Button>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;