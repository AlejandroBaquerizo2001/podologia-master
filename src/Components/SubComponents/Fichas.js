import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FiDownload, FiAlertCircle, FiCalendar, FiFileText, FiUser, FiMessageSquare } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './FichasModern.css';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const FichasModern = () => {
  return (
    <div className="modern-promo-container">
      {/* Hero Section 1 - Gradient */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.8 }}
        className="gradient-hero py-6"
      >
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4 text-white">
                Transforma tu práctica médica con nuestro sistema 100% online
              </h1>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="light" size="lg" className="rounded-pill px-4 shadow-sm">
                  <FiMessageSquare className="me-2" /> Contáctanos por WhatsApp
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* Hero Section 2 - Clean */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="clean-hero py-6"
      >
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="fw-bold mb-4">Comienza hoy mismo sin costo inicial</h2>
              <p className="lead mb-4">
                Regístrate y descubre cómo podemos optimizar la gestión de tus fichas clínicas
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="primary" size="lg" className="rounded-pill px-4 shadow">
                  Empieza gratis - Sin tarjeta requerida
                </Button>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* Features Grid */}
      <section className="py-6">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="fw-bold mb-3">Todo lo que necesitas en un solo lugar</h2>
              <p className="text-muted">Diseñado por profesionales para profesionales de la salud</p>
            </Col>
          </Row>

          <Row className="g-4">
            {/* Feature 1 */}
            <Col md={6} lg={4}>
              <motion.div whileHover={{ y: -5 }}>
                <Card className="h-100 feature-card border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="icon-wrapper bg-primary-light">
                      <FiFileText className="text-primary" size={24} />
                    </div>
                    <h4 className="my-3">Gestión de Atenciones</h4>
                    <p className="text-muted">
                      Registro completo de atenciones médicas con historial detallado, anamnesis y evaluaciones.
                    </p>
                    <ul className="feature-list">
                      <li>Diagnósticos CIE-10</li>
                      <li>Notas médicas</li>
                      <li>Historial completo</li>
                    </ul>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* Feature 2 */}
            <Col md={6} lg={4}>
              <motion.div whileHover={{ y: -5 }}>
                <Card className="h-100 feature-card border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="icon-wrapper bg-success-light">
                      <FiCalendar className="text-success" size={24} />
                    </div>
                    <h4 className="my-3">Agenda Inteligente</h4>
                    <p className="text-muted">
                      Programa, administra y sigue el historial de citas de tus pacientes de manera eficiente.
                    </p>
                    <ul className="feature-list">
                      <li>Recordatorios automáticos</li>
                      <li>Disponibilidad en tiempo real</li>
                      <li>Calendario integrado</li>
                    </ul>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* Feature 3 */}
            <Col md={6} lg={4}>
              <motion.div whileHover={{ y: -5 }}>
                <Card className="h-100 feature-card border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="icon-wrapper bg-warning-light">
                      <FiAlertCircle className="text-warning" size={24} />
                    </div>
                    <h4 className="my-3">Alertas e Indicaciones</h4>
                    <p className="text-muted">
                      Sistema de alertas para tratamientos y seguimiento de indicaciones médicas.
                    </p>
                    <ul className="feature-list">
                      <li>Notificaciones importantes</li>
                      <li>Indicaciones personalizadas</li>
                      <li>Seguimiento de tratamientos</li>
                    </ul>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* Feature 4 */}
            <Col md={6} lg={4}>
              <motion.div whileHover={{ y: -5 }}>
                <Card className="h-100 feature-card border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="icon-wrapper bg-danger-light">
                      <FiFileText className="text-danger" size={24} />
                    </div>
                    <h4 className="my-3">Diagnósticos Avanzados</h4>
                    <p className="text-muted">
                      Sistema de clasificación de diagnósticos con búsqueda inteligente y sugerencias.
                    </p>
                    <ul className="feature-list">
                      <li>Clasificación CIE-10</li>
                      <li>Búsqueda rápida</li>
                      <li>Historial diagnóstico</li>
                    </ul>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* Feature 5 */}
            <Col md={6} lg={4}>
              <motion.div whileHover={{ y: -5 }}>
                <Card className="h-100 feature-card border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="icon-wrapper bg-info-light">
                      <FiUser className="text-info" size={24} />
                    </div>
                    <h4 className="my-3">Historial del Paciente</h4>
                    <p className="text-muted">
                      Acceso completo al historial médico de cada paciente en un solo lugar.
                    </p>
                    <ul className="feature-list">
                      <li>Fichas completas</li>
                      <li>Evolución clínica</li>
                      <li>Documentos asociados</li>
                    </ul>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* Feature 6 */}
            <Col md={6} lg={4}>
              <motion.div whileHover={{ y: -5 }}>
                <Card className="h-100 feature-card border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="icon-wrapper bg-purple-light">
                      <FiDownload className="text-purple" size={24} />
                    </div>
                    <h4 className="my-3">Exportación de Datos</h4>
                    <p className="text-muted">
                      Genera y descarga reportes en PDF o comparte información de manera segura.
                    </p>
                    <ul className="feature-list">
                      <li>Formatos personalizables</li>
                      <li>Fichas en PDF</li>
                      <li>Comparte selectivamente</li>
                    </ul>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Final CTA */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="py-6 final-cta"
      >
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="fw-bold mb-4">¿Listo para modernizar tu consulta?</h2>
              <p className="lead mb-4">
                Únete a cientos de profesionales que ya gestionan sus fichas clínicas de manera eficiente
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="primary" size="lg" className="rounded-pill px-4 shadow">
                    Comenzar ahora
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline-primary" size="lg" className="rounded-pill px-4">
                    Ver demostración
                  </Button>
                </motion.div>
              </div>
            </Col>
          </Row>
        </Container>
      </motion.section>
    </div>
  );
};

export default FichasModern;