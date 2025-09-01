import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card, Row, Col } from 'react-bootstrap';
import { Envelope, Key, MusicNote, ArrowCounterclockwise } from 'react-bootstrap-icons';

const ForgotPassword = ({ setActiveTab }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulación de recuperación con delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    setMessage('A new password has been sent to your email.');
    
    setIsLoading(false);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a0b2e, #2d1b4a)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '20px 0',
      color: '#e8d7b0'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden" style={{
              background: 'rgba(45, 27, 74, 0.8)',
              border: '1px solid #5a3a8a'
            }}>
              {/* Header con temática musical */}
              <div style={{
                background: 'linear-gradient(135deg, #5a3a8a, #3a1d5a)',
                padding: '1.5rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                borderBottom: '1px solid #e8d7b0'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23e8d7b0\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
                }}></div>
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <Key className="mb-2" style={{ fontSize: '2rem', color: '#e8d7b0' }} />
                  <h3 className="fw-bold mb-1" style={{ color: '#e8d7b0', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Recover Password</h3>
                  <p className="mb-0" style={{ color: '#c9b6a2' }}>Reset your password</p>
                </div>
              </div>
              
              <Card.Body className="p-4 p-md-5" style={{ background: 'rgba(26, 11, 46, 0.7)' }}>
                {message ? (
                  <Alert variant="success" className="rounded-3" style={{ 
                    background: 'rgba(40, 150, 40, 0.7)',
                    borderColor: '#2a8a2a',
                    color: '#d7ffd7'
                  }}>
                    <MusicNote className="me-2" />
                    {message}
                  </Alert>
                ) : (
                  <>
                    <p className="mb-4 text-center" style={{ color: '#c9b6a2' }}>
                      Enter your email address to receive instructions.
                    </p>
                    
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-4">
                        <Form.Label className="small fw-bold" style={{ color: '#d4c19c' }}>Associated Email Address</Form.Label>
                        <div className="input-group" style={{ 
                          border: '1px solid #5a3a8a',
                          borderRadius: '8px',
                          background: 'rgba(90, 58, 138, 0.2)'
                        }}>
                          <span className="input-group-text border-0" style={{ 
                            background: 'transparent',
                            color: '#e8d7b0'
                          }}>
                            <Envelope />
                          </span>
                          <Form.Control 
                            type="email" 
                            placeholder="tu@armonia.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-0 ps-0"
                            required
                            style={{
                              background: 'transparent',
                              color: '#e8d7b0',
                              boxShadow: 'none'
                            }}
                          />
                        </div>
                      </Form.Group>
                      
                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="w-100 py-3 fw-bold rounded-3 border-0 mb-3"
                        disabled={isLoading}
                        style={{
                          background: 'linear-gradient(135deg, #e8d7b0, #c9b6a2)',
                          color: '#2d1b4a',
                          boxShadow: '0 4px 8px rgba(232, 215, 176, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'linear-gradient(135deg, #f5e7c8, #d9c6b2)';
                          e.target.style.boxShadow = '0 6px 12px rgba(232, 215, 176, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'linear-gradient(135deg, #e8d7b0, #c9b6a2)';
                          e.target.style.boxShadow = '0 4px 8px rgba(232, 215, 176, 0.3)';
                        }}
                      >
                        {isLoading ? 'Enviando melodía...' : (
                          <>
                            Recover <ArrowCounterclockwise className="ms-2" />
                          </>
                        )}
                      </Button>
                    </Form>
                  </>
                )}
                
                <div className="text-center mt-4">
                  <Button 
                    variant="link" 
                    className="text-decoration-none small" 
                    onClick={() => setActiveTab('login')}
                    style={{ color: '#c9b6a2' }}
                  >
                    <ArrowCounterclockwise className="me-1" /> Return to login
                  </Button>
                </div>
              </Card.Body>
              
              <div className="py-3 text-center" style={{ 
                background: 'rgba(45, 27, 74, 0.9)',
                borderTop: '1px solid #5a3a8a'
              }}>
                <p className="mb-0 small" style={{ color: '#c9b6a2' }}>
                  Do you require assistance? <Button variant="link" className="text-decoration-none p-0 small" style={{ color: '#e8d7b0' }}>Contact Technical Support</Button>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;