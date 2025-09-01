import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Alert, Container, Spinner, Modal } from 'react-bootstrap';
import { FaPaperPlane, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaComment, FaClock, FaWhatsapp, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    consulta: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }
    if (!formData.asunto) newErrors.asunto = 'El asunto es requerido';
    if (!formData.consulta.trim()) newErrors.consulta = 'La consulta es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      // Simular envío de formulario
      setTimeout(() => {
        console.log('Formulario enviado:', formData);
        setSubmitted(true);
        setLoading(false);
        setShowModal(true);
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          asunto: '',
          consulta: ''
        });
      }, 1500);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container className="py-5 mt-4">
      <Row className="justify-content-center mb-5">
        <Col lg={8} className="text-center">
          <h1 className="display-5 fw-bold text-primary mb-3">Contáctenos</h1>
          <p className="lead text-muted">Estamos aquí para ayudarle. Complete el formulario o utilice nuestra información de contacto.</p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="shadow-lg border-0 rounded-3 h-100">
            <Card.Body className="p-5">
              <Card.Title className="mb-4 d-flex align-items-center fs-3">
                <FaPaperPlane className="me-2 text-primary" />
                Formulario de Contacto
              </Card.Title>
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formNombre" className="mb-3">
                      <Form.Label className="fw-semibold d-flex align-items-center">
                        <FaUser className="me-2 text-primary" />
                        Nombre completo
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Ingrese su nombre completo"
                        isInvalid={!!errors.nombre}
                        className="py-2"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nombre}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formEmail" className="mb-3">
                      <Form.Label className="fw-semibold d-flex align-items-center">
                        <MdEmail className="me-2 text-primary" />
                        Correo electrónico
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ejemplo@correo.com"
                        isInvalid={!!errors.email}
                        className="py-2"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formTelefono" className="mb-3">
                      <Form.Label className="fw-semibold d-flex align-items-center">
                        <FaPhone className="me-2 text-primary" />
                        Teléfono (opcional)
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+1 234 567 890"
                        className="py-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formAsunto" className="mb-3">
                      <Form.Label className="fw-semibold d-flex align-items-center">
                        <FaComment className="me-2 text-primary" />
                        Asunto
                      </Form.Label>
                      <Form.Select 
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        isInvalid={!!errors.asunto}
                        className="py-2"
                      >
                        <option value="">Seleccione un asunto</option>
                        <option value="consulta">Consulta general</option>
                        <option value="cita">Solicitud de cita</option>
                        <option value="emergencia">Emergencia</option>
                        <option value="queja">Queja o sugerencia</option>
                        <option value="otros">Otros</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.asunto}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formConsulta" className="mb-4">
                  <Form.Label className="fw-semibold">Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="consulta"
                    value={formData.consulta}
                    onChange={handleChange}
                    placeholder="Describa su consulta en detalle..."
                    isInvalid={!!errors.consulta}
                    className="py-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.consulta}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg" 
                    className="fw-semibold py-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="me-2" />
                        Enviar mensaje
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="shadow-lg border-0 rounded-3 h-100">
            <Card.Body className="p-5">
              <Card.Title className="mb-4 d-flex align-items-center fs-3">
                <FaMapMarkerAlt className="me-2 text-primary" />
                Información de Contacto
              </Card.Title>
              
              <div className="contact-info">
                <div className="d-flex align-items-start mb-4 p-3 bg-light rounded-3">
                  <div className="icon-circle bg-primary text-white me-3">
                    <FaPhone size={18} />
                  </div>
                  <div>
                    <h5 className="mb-1 fw-semibold">Teléfono</h5>
                    <p className="mb-1 text-muted">+1 234 567 890</p>
                    <p className="mb-0 text-muted">+1 987 654 321</p>
                    <div className="mt-2">
                      <Button variant="outline-success" size="sm" className="mt-1">
                        <FaWhatsapp className="me-1" /> WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-4 p-3 bg-light rounded-3">
                  <div className="icon-circle bg-primary text-white me-3">
                    <FaEnvelope size={18} />
                  </div>
                  <div>
                    <h5 className="mb-1 fw-semibold">Email</h5>
                    <p className="mb-1 text-muted">info@salud.com</p>
                    <p className="mb-0 text-muted">emergencias@salud.com</p>
                    <div className="mt-2">
                      <Button variant="outline-primary" size="sm" className="mt-1">
                        <MdEmail className="me-1" /> Enviar email
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-4 p-3 bg-light rounded-3">
                  <div className="icon-circle bg-primary text-white me-3">
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div>
                    <h5 className="mb-1 fw-semibold">Dirección</h5>
                    <p className="mb-1 text-muted">Calle Salud 123</p>
                    <p className="mb-0 text-muted">Ciudad, País 12345</p>
                    <div className="mt-2">
                      <Button variant="outline-danger" size="sm" className="mt-1">
                        Ver en mapa
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-4 p-3 bg-light rounded-3">
                  <div className="icon-circle bg-primary text-white me-3">
                    <FaClock size={18} />
                  </div>
                  <div>
                    <h5 className="mb-1 fw-semibold">Horario de atención</h5>
                    <ul className="list-unstyled text-muted mb-0">
                      <li className="mb-1">Lunes a Viernes: 8:00 AM - 8:00 PM</li>
                      <li className="mb-1">Sábados: 9:00 AM - 2:00 PM</li>
                      <li>Domingos: Solo emergencias</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-light rounded-3">
                  <h5 className="mb-3 fw-semibold">Síganos en redes sociales</h5>
                  <div className="d-flex gap-2">
                    <Button variant="primary" size="sm" className="rounded-circle p-2">
                      <FaFacebook size={18} />
                    </Button>
                    <Button variant="info" size="sm" className="rounded-circle p-2">
                      <FaTwitter size={18} />
                    </Button>
                    <Button variant="primary" size="sm" className="rounded-circle p-2">
                      <FaLinkedin size={18} />
                    </Button>
                    <Button variant="success" size="sm" className="rounded-circle p-2">
                      <FaWhatsapp size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="text-success">¡Mensaje Enviado!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-4 mb-3">
            <FaPaperPlane size={30} className="text-success" />
          </div>
          <h5 className="mb-2">Gracias por contactarnos</h5>
          <p className="text-muted">Hemos recibido tu mensaje y te responderemos dentro de las próximas 24 horas.</p>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <Button variant="success" onClick={handleCloseModal}>
            Entendido
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .icon-circle {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .contact-info h5 {
          color: #2c3e50;
          font-size: 1.1rem;
        }
        .card {
          transition: transform 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </Container>
  );
};

export default Contacto;