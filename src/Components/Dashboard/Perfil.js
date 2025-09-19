import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Modal, Badge, ProgressBar } from 'react-bootstrap';
import { Person, Envelope, Telephone, GeoAlt, Calendar, Pencil, Check, X, Shield, HeartPulse, Camera, Upload, Activity, ClipboardCheck } from 'react-bootstrap-icons';

const Perfil = ({ userData, onUpdateUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const fileInputRef = useRef(null);
  
  // Datos del usuario - en una app real vendrían de props o contexto
  const [user, setUser] = useState({
    name: userData?.name || 'María González',
    email: userData?.email || 'maria.gonzalez@salud.com',
    phone: userData?.phone || '+34 612 345 678',
    address: userData?.address || 'Calle Salud 123, Madrid',
    birthDate: userData?.birthDate || '1985-06-15',
    bloodType: userData?.bloodType || 'A+',
    allergies: userData?.allergies || 'Penicilina, Polen',
    emergencyContact: userData?.emergencyContact || 'Juan González - +34 600 123 456',
    profilePhoto: userData?.profilePhoto || null,
    medicalId: userData?.medicalId || 'MID-789456123',
    insurance: userData?.insurance || 'Sanitas Premium',
    primaryDoctor: userData?.primaryDoctor || 'Dr. Carlos Rodríguez'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular actualización
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (onUpdateUser) {
      onUpdateUser(user);
    }
    
    setIsLoading(false);
    setEditMode(false);
    setShowSuccess(true);
    
    // Ocultar alerta después de 3 segundos
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setEditMode(false);
    // Restaurar datos originales si es necesario
    if (userData) {
      setUser(userData);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simular progreso de carga
      setShowUploadProgress(true);
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Cuando la carga se completa
            const reader = new FileReader();
            reader.onload = (event) => {
              setUser(prev => ({ ...prev, profilePhoto: event.target.result }));
              setShowUploadProgress(false);
            };
            reader.readAsDataURL(file);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #e0f2ff, #a8d5ff)',
      minHeight: '100vh',
      padding: '20px 0',
      color: '#2a5c8b'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={10}>
            <h1 className="text-center mb-4 fw-bold" style={{ color: '#2a5c8b' }}>
              <HeartPulse className="me-2" />
              Mi Perfil de Salud
            </h1>
            
            {showSuccess && (
              <Alert variant="success" className="rounded-3 mb-4" style={{ 
                background: 'rgba(200, 255, 200, 0.9)',
                borderColor: '#4caf50',
                color: '#2e7d32'
              }}>
                <Check className="me-2" />
                Perfil actualizado correctamente.
              </Alert>
            )}
            
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden mb-4" style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '2px solid #89c2f0'
            }}>
              {/* Header con foto de perfil */}
              <div style={{
                background: 'linear-gradient(135deg, #4a9fea, #2a5c8b)',
                padding: '1.5rem',
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
                
                <Row className="align-items-center">
                  <Col xs="auto">
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <div 
                        className="rounded-circle overflow-hidden border border-4 border-white shadow"
                        style={{ 
                          width: '120px', 
                          height: '120px',
                          background: user.profilePhoto ? `url(${user.profilePhoto}) center/cover` : '#c2e3ff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#2a5c8b',
                          fontSize: '3rem'
                        }}
                      >
                        {!user.profilePhoto && <Person size={60} />}
                      </div>
                      {editMode && (
                        <Button 
                          variant="primary" 
                          size="sm" 
                          className="rounded-circle p-0"
                          style={{
                            position: 'absolute',
                            bottom: '5px',
                            right: '5px',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onClick={triggerFileInput}
                        >
                          <Camera size={16} />
                        </Button>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handlePhotoUpload}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h3 className="fw-bold mb-0" style={{ color: '#ffffff' }}>
                          {user.name}
                        </h3>
                        {!editMode ? (
                          <Button 
                            variant="outline-light" 
                            onClick={() => setEditMode(true)}
                            className="d-flex align-items-center"
                          >
                            <Pencil className="me-1" /> Editar
                          </Button>
                        ) : (
                          <div>
                            <Button 
                              variant="outline-light" 
                              onClick={handleCancel}
                              className="me-2"
                            >
                              <X /> Cancelar
                            </Button>
                            <Button 
                              variant="light" 
                              type="submit"
                              form="profile-form"
                              disabled={isLoading}
                            >
                              {isLoading ? 'Guardando...' : (
                                <>
                                  <Check /> Guardar
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <Badge bg="light" text="dark">
                          {calculateAge(user.birthDate)} años
                        </Badge>
                        <Badge bg="light" text="dark">
                          {user.bloodType}
                        </Badge>
                        <Badge bg="light" text="dark">
                          {user.medicalId}
                        </Badge>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              
              {showUploadProgress && (
                <div className="p-3 border-bottom" style={{background: 'rgba(168, 213, 255, 0.2)'}}>
                  <div className="d-flex align-items-center">
                    <Upload className="me-2" style={{color: '#2a5c8b'}} />
                    <div className="flex-grow-1 me-3">
                      <ProgressBar 
                        now={uploadProgress} 
                        label={`${uploadProgress}%`}
                        style={{height: '10px'}}
                        variant="primary"
                      />
                    </div>
                    <small style={{color: '#2a5c8b'}}>Subiendo imagen...</small>
                  </div>
                </div>
              )}
              
              <Card.Body className="p-4 p-md-5" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
                <Form id="profile-form" onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="small fw-bold" style={{ color: '#2a5c8b' }}>
                          <Person className="me-1" /> Nombre Completo
                        </Form.Label>
                        {editMode ? (
                          <Form.Control
                            type="text"
                            value={user.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            style={{
                              border: '1px solid #89c2f0',
                              background: 'rgba(168, 213, 255, 0.1)',
                              color: '#2a5c8b'
                            }}
                          />
                        ) : (
                          <div className="p-2 rounded" style={{ 
                            border: '1px solid #c2e3ff',
                            background: 'rgba(168, 213, 255, 0.1)',
                            color: '#2a5c8b',
                            minHeight: '38px'
                          }}>
                            {user.name}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="small fw-bold" style={{ color: '#2a5c8b' }}>
                          <Envelope className="me-1" /> Correo Electrónico
                        </Form.Label>
                        {editMode ? (
                          <Form.Control
                            type="email"
                            value={user.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            style={{
                              border: '1px solid #89c2f0',
                              background: 'rgba(168, 213, 255, 0.1)',
                              color: '#2a5c8b'
                            }}
                          />
                        ) : (
                          <div className="p-2 rounded" style={{ 
                            border: '1px solid #c2e3ff',
                            background: 'rgba(168, 213, 255, 0.1)',
                            color: '#2a5c8b',
                            minHeight: '38px'
                          }}>
                            {user.email}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="small fw-bold" style={{ color: '#2a5c8b' }}>
                          <Telephone className="me-1" /> Teléfono
                        </Form.Label>
                        {editMode ? (
                          <Form.Control
                            type="tel"
                            value={user.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            style={{
                              border: '1px solid #89c2f0',
                              background: 'rgba(168, 213, 255, 0.1)',
                              color: '#2a5c8b'
                            }}
                          />
                        ) : (
                          <div className="p-2 rounded" style={{ 
                            border: '1px solid #c2e3ff',
                            background: 'rgba(168, 213, 255, 0.1)',
                            color: '#2a5c8b',
                            minHeight: '38px'
                          }}>
                            {user.phone}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="small fw-bold" style={{ color: '#2a5c8b' }}>
                          <GeoAlt className="me-1" /> Dirección
                        </Form.Label>
                        {editMode ? (
                          <Form.Control
                            type="text"
                            value={user.address}
                            onChange={(e) => handleChange('address', e.target.value)}
                            style={{
                              border: '1px solid #89c2f0',
                              background: 'rgba(168, 213, 255, 0.1)',
                              color: '#2a5c8b'
                            }}
                          />
                        ) : (
                          <div className="p-2 rounded" style={{ 
                            border: '1px solid #c2e3ff',
                            background: 'rgba(168, 213, 255, 0.1)',
                            color: '#2a5c8b',
                            minHeight: '38px'
                          }}>
                            {user.address}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="small fw-bold" style={{ color: '#2a5c8b' }}>
                          <Calendar className="me-1" /> Fecha de Nacimiento
                        </Form.Label>
                        {editMode ? (
                          <Form.Control
                            type="date"
                            value={user.birthDate}
                            onChange={(e) => handleChange('birthDate', e.target.value)}
                            style={{
                              border: '1px solid #89c2f0',
                              background: 'rgba(168, 213, 255, 0.1)',
                              color: '#2a5c8b'
                            }}
                          />
                        ) : (
                          <div className="p-2 rounded" style={{ 
                            border: '1px solid #c2e3ff',
                            background: 'rgba(168, 213, 255, 0.1)',
                            color: '#2a5c8b',
                            minHeight: '38px'
                          }}>
                            {user.birthDate} ({calculateAge(user.birthDate)} años)
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="small fw-bold" style={{ color: '#2a5c8b' }}>
                          <HeartPulse className="me-1" /> Tipo de Sangre
                        </Form.Label>
                        {editMode ? (
                          <Form.Select
                            value={user.bloodType}
                            onChange={(e) => handleChange('bloodType', e.target.value)}
                            style={{
                              border: '1px solid #89c2f0',
                              background: 'rgba(168, 213, 255, 0.1)',
                              color: '#2a5c8b'
                            }}
                          >
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </Form.Select>
                        ) : (
                          <div className="p-2 rounded" style={{ 
                            border: '1px solid #c2e3ff',
                            background: 'rgba(168, 213, 255, 0.1)',
                            color: '#2a5c8b',
                            minHeight: '38px'
                          }}>
                            {user.bloodType}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="small fw-bold" style={{ color: '#2a5c8b' }}>
                          <Shield className="me-1" /> Alergias
                        </Form.Label>
                        {editMode ? (
                          <Form.Control
                            as="textarea"
                            rows={2}
                            value={user.allergies}
                            onChange={(e) => handleChange('allergies', e.target.value)}
                            style={{
                              border: '1px solid #89c2f0',
                              background: 'rgba(168, 213, 255, 0.1)',
                              color: '#2a5c8b'
                            }}
                          />
                        ) : (
                          <div className="p-2 rounded" style={{ 
                            border: '1px solid #c2e3ff',
                            background: 'rgba(168, 213, 255, 0.1)',
                            color: '#2a5c8b',
                            minHeight: '76px'
                          }}>
                            {user.allergies}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="small fw-bold" style={{ color: '#2a5c8b' }}>
                          <Telephone className="me-1" /> Contacto de Emergencia
                        </Form.Label>
                        {editMode ? (
                          <Form.Control
                            type="text"
                            value={user.emergencyContact}
                            onChange={(e) => handleChange('emergencyContact', e.target.value)}
                            style={{
                              border: '1px solid #89c2f0',
                              background: 'rgba(168, 213, 255, 0.1)',
                              color: '#2a5c8b'
                            }}
                          />
                        ) : (
                          <div className="p-2 rounded" style={{ 
                            border: '1px solid #c2e3ff',
                            background: 'rgba(168, 213, 255, 0.1)',
                            color: '#2a5c8b',
                            minHeight: '38px'
                          }}>
                            {user.emergencyContact}
                          </div>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="small fw-bold" style={{ color: '#2a5c8b' }}>
                          <ClipboardCheck className="me-1" /> ID Médico
                        </Form.Label>
                        {editMode ? (
                          <Form.Control
                            type="text"
                            value={user.medicalId}
                            onChange={(e) => handleChange('medicalId', e.target.value)}
                            style={{
                              border: '1px solid #89c2f0',
                              background: 'rgba(168, 213, 255, 0.1)',
                              color: '#2a5c8b'
                            }}
                          />
                        ) : (
                          <div className="p-2 rounded" style={{ 
                            border: '1px solid #c2e3ff',
                            background: 'rgba(168, 213, 255, 0.1)',
                            color: '#2a5c8b',
                            minHeight: '38px'
                          }}>
                            {user.medicalId}
                          </div>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="small fw-bold" style={{ color: '#2a5c8b' }}>
                          <Activity className="me-1" /> Seguro Médico
                        </Form.Label>
                        {editMode ? (
                          <Form.Control
                            type="text"
                            value={user.insurance}
                            onChange={(e) => handleChange('insurance', e.target.value)}
                            style={{
                              border: '1px solid #89c2f0',
                              background: 'rgba(168, 213, 255, 0.1)',
                              color: '#2a5c8b'
                            }}
                          />
                        ) : (
                          <div className="p-2 rounded" style={{ 
                            border: '1px solid #c2e3ff',
                            background: 'rgba(168, 213, 255, 0.1)',
                            color: '#2a5c8b',
                            minHeight: '38px'
                          }}>
                            {user.insurance}
                          </div>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="small fw-bold" style={{ color: '#2a5c8b' }}>
                          <Person className="me-1" /> Médico de Cabecera
                        </Form.Label>
                        {editMode ? (
                          <Form.Control
                            type="text"
                            value={user.primaryDoctor}
                            onChange={(e) => handleChange('primaryDoctor', e.target.value)}
                            style={{
                              border: '1px solid #89c2f0',
                              background: 'rgba(168, 213, 255, 0.1)',
                              color: '#2a5c8b'
                            }}
                          />
                        ) : (
                          <div className="p-2 rounded" style={{ 
                            border: '1px solid #c2e3ff',
                            background: 'rgba(168, 213, 255, 0.1)',
                            color: '#2a5c8b',
                            minHeight: '38px'
                          }}>
                            {user.primaryDoctor}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
            
            {/* Tarjeta de acciones adicionales */}
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden" style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '2px solid #89c2f0'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #4a9fea, #2a5c8b)',
                padding: '1rem',
                borderBottom: '2px solid #c2e3ff'
              }}>
                <h4 className="fw-bold mb-0" style={{ color: '#ffffff' }}>
                  <Shield className="me-2" />
                  Acciones de Cuenta
                </h4>
              </div>
              
              <Card.Body className="p-4">
                <Row>
                  <Col md={4} className="mb-3">
                    <Button 
                      variant="outline-primary" 
                      className="w-100"
                      onClick={() => setShowModal(true)}
                      style={{
                        borderColor: '#4a9fea',
                        color: '#2a5c8b'
                      }}
                    >
                      Cambiar Contraseña
                    </Button>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Button 
                      variant="outline-warning" 
                      className="w-100"
                      style={{
                        borderColor: '#ffc107',
                        color: '#856404'
                      }}
                    >
                      Exportar Datos
                    </Button>
                  </Col>
                  <Col md={4} className="mb-3">
                    <Button 
                      variant="outline-danger" 
                      className="w-100"
                      style={{
                        borderColor: '#ff6b6b',
                        color: '#c53030'
                      }}
                    >
                      Eliminar Cuenta
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      {/* Modal para cambiar contraseña */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton style={{
          background: 'linear-gradient(135deg, #4a9fea, #2a5c8b)',
          color: '#ffffff',
          borderBottom: '2px solid #c2e3ff'
        }}>
          <Modal.Title>
            <Shield className="me-2" />
            Cambiar Contraseña
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña Actual</Form.Label>
              <Form.Control 
                type="password" 
                style={{
                  border: '1px solid #89c2f0',
                  background: 'rgba(168, 213, 255, 0.1)',
                  color: '#2a5c8b'
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nueva Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                style={{
                  border: '1px solid #89c2f0',
                  background: 'rgba(168, 213, 255, 0.1)',
                  color: '#2a5c8b'
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar Nueva Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                style={{
                  border: '1px solid #89c2f0',
                  background: 'rgba(168, 213, 255, 0.1)',
                  color: '#2a5c8b'
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ background: 'rgba(224, 242, 255, 0.7)' }}>
          <Button 
            variant="secondary" 
            onClick={() => setShowModal(false)}
            style={{
              background: '#6c757d',
              border: 'none'
            }}
          >
            Cancelar
          </Button>
          <Button 
            style={{
              background: 'linear-gradient(135deg, #4a9fea, #2a5c8b)',
              border: 'none'
            }}
          >
            Cambiar Contraseña
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Perfil;