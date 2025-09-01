import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FiCalendar, FiClock, FiUser, FiPlus, FiSearch, FiMapPin, FiMessageSquare } from 'react-icons/fi';
import './AgendaModern.css'; // Assuming you have a CSS file for styling

const AgendaModern = () => {
  return (
    <div className="modern-promo-container">
      {/* Hero Section 1 - Gradient */}
      <section className="gradient-hero py-6">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4 text-white">
                <FiCalendar className="me-3" />
                Agenda Médica Inteligente
              </h1>
              <p className="lead text-white mb-4">
                Gestiona tus citas de manera eficiente y nunca pierdas el control de tu agenda
              </p>
              <Button variant="light" size="lg" className="rounded-pill px-4 shadow-sm hover-scale">
                <FiMessageSquare className="me-2" /> Contáctanos por WhatsApp
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Hero Section 2 - Clean */}
      <section className="clean-hero py-6">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="fw-bold mb-4">Organiza tu tiempo como nunca antes</h2>
              <p className="lead mb-4">
                Regístrate y comienza a optimizar la gestión de tus citas médicas
              </p>
              <Button variant="primary" size="lg" className="rounded-pill px-4 shadow hover-scale">
                Empieza gratis - Sin compromisos
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-6">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className="fw-bold mb-3">Características de Nuestra Agenda</h2>
              <p className="text-muted">Diseñada para profesionales de la salud que valoran su tiempo</p>
            </Col>
          </Row>

          <Row className="g-4">
            {/* Feature 1 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-primary-light">
                    <FiCalendar className="text-primary" size={24} />
                  </div>
                  <h4 className="my-3">Agenda Centralizada</h4>
                  <p className="text-muted">
                    Administra todas tus citas en un solo lugar con una interfaz intuitiva y fácil de usar.
                  </p>
                  <ul className="feature-list">
                    <li>Vista diaria, semanal y mensual</li>
                    <li>Recordatorios automáticos</li>
                    <li>Sincronización en tiempo real</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 2 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-success-light">
                    <FiClock className="text-success" size={24} />
                  </div>
                  <h4 className="my-3">Gestión de Tiempo</h4>
                  <p className="text-muted">
                    Optimiza tu tiempo con herramientas inteligentes de programación y seguimiento.
                  </p>
                  <ul className="feature-list">
                    <li>Bloques de tiempo personalizables</li>
                    <li>Control de disponibilidad</li>
                    <li>Reportes de productividad</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 3 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-warning-light">
                    <FiUser className="text-warning" size={24} />
                  </div>
                  <h4 className="my-3">Pacientes Integrados</h4>
                  <p className="text-muted">
                    Vincula directamente las citas con las fichas clínicas de tus pacientes.
                  </p>
                  <ul className="feature-list">
                    <li>Acceso rápido a historial</li>
                    <li>Notas de citas anteriores</li>
                    <li>Preferencias del paciente</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 4 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-danger-light">
                    <FiSearch className="text-danger" size={24} />
                  </div>
                  <h4 className="my-3">Búsqueda Inteligente</h4>
                  <p className="text-muted">
                    Encuentra rápidamente citas, pacientes o horarios específicos con búsqueda avanzada.
                  </p>
                  <ul className="feature-list">
                    <li>Filtros personalizados</li>
                    <li>Búsqueda por múltiples criterios</li>
                    <li>Resultados en tiempo real</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 5 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-info-light">
                    <FiMapPin className="text-info" size={24} />
                  </div>
                  <h4 className="my-3">Múltiples Ubicaciones</h4>
                  <p className="text-muted">
                    Gestiona citas en diferentes consultorios o ubicaciones de trabajo.
                  </p>
                  <ul className="feature-list">
                    <li>Configuración de sedes</li>
                    <li>Disponibilidad por ubicación</li>
                    <li>Direcciones integradas</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 6 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-purple-light">
                    <FiPlus className="text-purple" size={24} />
                  </div>
                  <h4 className="my-3">Programación Flexible</h4>
                  <p className="text-muted">
                    Crea y modifica citas con facilidad usando nuestro sistema intuitivo.
                  </p>
                  <ul className="feature-list">
                    <li>Arrrastrar y soltar</li>
                    <li>Programación rápida</li>
                    <li>Plantillas reutilizables</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Demo Section */}
      <section className="demo-section py-6 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="fw-bold mb-4">Visualiza tu agenda de manera clara y organizada</h2>
              <p className="text-muted mb-4">
                Nuestra interfaz te permite ver todas tus citas en un vistazo, con colores que indican el estado de cada cita y recordatorios importantes.
              </p>
              <div className="demo-features">
                <div className="demo-feature-item">
                  <div className="demo-badge bg-success"></div>
                  <span>Citas confirmadas</span>
                </div>
                <div className="demo-feature-item">
                  <div className="demo-badge bg-warning"></div>
                  <span>Citas pendientes</span>
                </div>
                <div className="demo-feature-item">
                  <div className="demo-badge bg-danger"></div>
                  <span>Citas canceladas</span>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="demo-calendar">
                <div className="calendar-header">
                  <span>Enero 2024</span>
                </div>
                <div className="calendar-grid">
                  {/* Simulación de calendario visual */}
                  <div className="calendar-day">15</div>
                  <div className="calendar-day active">16</div>
                  <div className="calendar-day">17</div>
                  <div className="calendar-day">18</div>
                  <div className="calendar-day">19</div>
                </div>
                <div className="calendar-events">
                  <div className="event-item confirmed">
                    <div className="event-time">09:00</div>
                    <div className="event-info">
                      <strong>Juan Pérez</strong>
                      <span>Consulta de control</span>
                    </div>
                  </div>
                  <div className="event-item pending">
                    <div className="event-time">11:30</div>
                    <div className="event-info">
                      <strong>Ana Silva</strong>
                      <span>Evaluación inicial</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-6 final-cta">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="fw-bold mb-4">¿Listo para transformar tu agenda médica?</h2>
              <p className="lead mb-4">
                Únete a profesionales que ya optimizan su tiempo y mejoran la experiencia de sus pacientes
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Button variant="primary" size="lg" className="rounded-pill px-4 shadow hover-scale">
                  Comenzar ahora
                </Button>
                <Button variant="outline-primary" size="lg" className="rounded-pill px-4 hover-scale">
                  Ver video demostrativo
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AgendaModern;