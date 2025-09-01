import React, { useState } from 'react';
import { Card, Button, Row, Col, Badge, Container, Modal, Form, Alert } from 'react-bootstrap';

const PlanesCobro = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentStep, setPaymentStep] = useState(1);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: ''
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setPaymentStep(1);
    setPaymentSuccess(false);
    setPaymentData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: '',
      email: ''
    });
  };

  const handleShowModal = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Simular procesamiento de pago
    setTimeout(() => {
      setPaymentSuccess(true);
      setPaymentStep(3);
    }, 2000);
    setPaymentStep(2); // Mostrar estado de procesamiento
  };

  const plans = [
    {
      id: 1,
      name: "Plan Básico",
      price: "$9.99",
      period: "mensual",
      description: "Ideal para usuarios individuales que necesitan funcionalidades esenciales.",
      features: ["5 proyectos activos", "3 GB de almacenamiento", "Soporte por email", "Acceso básico a reportes"],
      popular: false,
      buttonVariant: "outline-primary"
    },
    {
      id: 2,
      name: "Plan Avanzado",
      price: "$19.99",
      period: "mensual",
      description: "Perfecto para pequeños equipos que requieren más recursos.",
      features: ["Proyectos ilimitados", "10 GB de almacenamiento", "Soporte prioritario", "Reportes avanzados", "Integraciones API"],
      popular: true,
      buttonVariant: "primary"
    },
    {
      id: 3,
      name: "Plan Empresarial",
      price: "$49.99",
      period: "mensual",
      description: "Para empresas que necesitan potencia total y soporte premium.",
      features: ["Proyectos ilimitados", "Almacenamiento ilimitado", "Soporte 24/7", "Reportes personalizados", "Integraciones API ilimitadas", "Acceso a betas"],
      popular: false,
      buttonVariant: "outline-primary"
    }
  ];

  // Función para formatear número de tarjeta
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Función para formatear fecha de expiración
  const formatExpiryDate = (value) => {
    const expDate = value;
    const expDateFormatter = /^(\d{0,2})(\/?)(\d{0,2})/;
    
    if (expDate.match(expDateFormatter)) {
      return expDate
        .replace(expDateFormatter, (_, m1, sep, m2) => {
          let output = m1;
          
          if (m2.length) {
            output += `/${m2}`;
          }
          
          return output;
        });
    }
    
    return value;
  };

  return (
    <Container className="my-5 py-4">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold">Planes de Pago</h2>
        <p className="lead text-muted">Elige el plan que mejor se adapte a tus necesidades</p>
      </div>

      <Row className="justify-content-center">
        {plans.map((plan) => (
          <Col key={plan.id} lg={4} md={6} className="mb-4">
            <Card className={`h-100 shadow-sm ${plan.popular ? 'border-primary' : ''} position-relative plan-card`}>
              {plan.popular && (
                <div className="position-absolute top-0 start-50 translate-middle">
                  <Badge bg="primary" className="rounded-pill px-3 py-2">Más Popular</Badge>
                </div>
              )}
              <Card.Body className="d-flex flex-column p-4">
                <div className="text-center mb-4">
                  <Card.Title as="h3" className="fw-bold">{plan.name}</Card.Title>
                  <div className="my-3">
                    <span className="display-4 fw-bold">{plan.price}</span>
                    <span className="text-muted">/{plan.period}</span>
                  </div>
                  <Card.Text className="text-muted">{plan.description}</Card.Text>
                </div>
                
                <ul className="list-unstyled mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check text-success me-2" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant} 
                  size="lg" 
                  className="mt-auto"
                  onClick={() => handleShowModal(plan)}
                >
                  Seleccionar Plan
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal de pago */}
      <Modal show={showModal} onHide={handleCloseModal} centered size={paymentStep === 1 ? "md" : "lg"}>
        {paymentStep === 1 && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar selección</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedPlan && (
                <div>
                  <h5 className="mb-3">Resumen del plan seleccionado:</h5>
                  <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
                    <div>
                      <h6 className="mb-0">{selectedPlan.name}</h6>
                      <small className="text-muted">{selectedPlan.description}</small>
                    </div>
                    <div className="text-end">
                      <h5 className="mb-0">{selectedPlan.price}<small className="text-muted">/{selectedPlan.period}</small></h5>
                    </div>
                  </div>
                  
                  <h6 className="mt-4">Características incluidas:</h6>
                  <ul className="list-unstyled">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check text-success me-2" viewBox="0 0 16 16">
                          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setPaymentStep(2)}>
                Proceder al Pago
              </Button>
            </Modal.Footer>
          </>
        )}
        
        {paymentStep === 2 && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Completar Pago</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Alert variant="info" className="d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-check me-2" viewBox="0 0 16 16">
                  <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                  <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                <span>Procesamiento seguro con encriptación SSL</span>
              </Alert>
              
              <Form onSubmit={handlePaymentSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={paymentData.email}
                        onChange={handleInputChange}
                        placeholder="tu@ejemplo.com"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre en la tarjeta</Form.Label>
                      <Form.Control
                        type="text"
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handleInputChange}
                        placeholder="Como aparece en la tarjeta"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Número de tarjeta</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardNumber"
                    value={formatCardNumber(paymentData.cardNumber)}
                    onChange={handleInputChange}
                    placeholder="0000 0000 0000 0000"
                    maxLength="19"
                    required
                  />
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Fecha de expiración</Form.Label>
                      <Form.Control
                        type="text"
                        name="expiryDate"
                        value={formatExpiryDate(paymentData.expiryDate)}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                        maxLength="5"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="text"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleInputChange}
                        placeholder="000"
                        maxLength="3"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <Button variant="outline-secondary" onClick={() => setPaymentStep(1)}>
                    Volver
                  </Button>
                  <Button variant="primary" type="submit">
                    Pagar ahora {selectedPlan?.price}
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </>
        )}
        
        {paymentStep === 3 && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>¡Pago Completado!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center py-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-check-circle-fill text-success mb-3" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
              <h4>¡Gracias por tu compra!</h4>
              <p className="text-muted">Tu suscripción al <strong>{selectedPlan?.name}</strong> ha sido activada exitosamente.</p>
              <p>Hemos enviado un correo de confirmación a <strong>{paymentData.email}</strong> con los detalles de tu compra.</p>
              <Button variant="primary" onClick={handleCloseModal}>
                Continuar
              </Button>
            </Modal.Body>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default PlanesCobro;