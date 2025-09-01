import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FiBook, FiFileText, FiDownload, FiSearch, FiDatabase, FiMessageSquare } from 'react-icons/fi';
import './BibliotecaModern.css'

const BibliotecaModern = () => {
  return (
    <div className="modern-promo-container">
      {/* Hero Section 1 - Gradient */}
      <section className="gradient-hero py-6">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4 text-white">
                <FiDatabase className="me-3" />
                Biblioteca Médica Digital
              </h1>
              <p className="lead text-white mb-4">
                Accede a toda la información médica y recursos clínicos en un solo lugar
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
              <h2 className="fw-bold mb-4">Tu conocimiento médico siempre disponible</h2>
              <p className="lead mb-4">
                Regístrate y accede a nuestra completa biblioteca de recursos médicos
              </p>
              <Button variant="primary" size="lg" className="rounded-pill px-4 shadow hover-scale">
                Empieza gratis - Acceso inmediato
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
              <h2 className="fw-bold mb-3">Recursos y Herramientas Disponibles</h2>
              <p className="text-muted">Todo el conocimiento médico que necesitas, organizado y actualizado</p>
            </Col>
          </Row>

          <Row className="g-4">
            {/* Feature 1 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-primary-light">
                    <FiBook className="text-primary" size={24} />
                  </div>
                  <h4 className="my-3">Protocolos Clínicos</h4>
                  <p className="text-muted">
                    Accede a protocolos estandarizados y guías de práctica clínica actualizadas.
                  </p>
                  <ul className="feature-list">
                    <li>Guías internacionales</li>
                    <li>Protocolos por especialidad</li>
                    <li>Actualizaciones automáticas</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 2 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-success-light">
                    <FiFileText className="text-success" size={24} />
                  </div>
                  <h4 className="my-3">Artículos Científicos</h4>
                  <p className="text-muted">
                    Biblioteca con miles de artículos médicos indexados y revisados.
                  </p>
                  <ul className="feature-list">
                    <li>Búsqueda avanzada</li>
                    <li>Acceso a revistas indexadas</li>
                    <li>Descargas en PDF</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 3 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-warning-light">
                    <FiSearch className="text-warning" size={24} />
                  </div>
                  <h4 className="my-3">Búsqueda Inteligente</h4>
                  <p className="text-muted">
                    Motor de búsqueda avanzado con filtros por especialidad, año y relevancia.
                  </p>
                  <ul className="feature-list">
                    <li>Búsqueda semántica</li>
                    <li>Filtros personalizados</li>
                    <li>Resultados relevantes</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 4 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-danger-light">
                    <FiDownload className="text-danger" size={24} />
                  </div>
                  <h4 className="my-3">Descargas Ilimitadas</h4>
                  <p className="text-muted">
                    Descarga todos los recursos que necesites sin límites ni restricciones.
                  </p>
                  <ul className="feature-list">
                    <li>Formatos múltiples</li>
                    <li>Descargas rápidas</li>
                    <li>Acceso offline</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 5 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-info-light">
                    <FiDatabase className="text-info" size={24} />
                  </div>
                  <h4 className="my-3">Base de Datos CIE-10</h4>
                  <p className="text-muted">
                    Acceso completo a la clasificación internacional de enfermedades.
                  </p>
                  <ul className="feature-list">
                    <li>Búsqueda por código</li>
                    <li>Descriptores completos</li>
                    <li>Actualizaciones 2024</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 6 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-purple-light">
                    <FiFileText className="text-purple" size={24} />
                  </div>
                  <h4 className="my-3">Plantillas Médicas</h4>
                  <p className="text-muted">
                    Colección de plantillas listas para usar en tu práctica diaria.
                  </p>
                  <ul className="feature-list">
                    <li>Formatos editables</li>
                    <li>Personalizables</li>
                    <li>Especialidades múltiples</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-6 bg-light">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="fw-bold mb-3">Nuestra Biblioteca en Números</h2>
              <p className="text-muted">Todo el conocimiento que necesitas a tu alcance</p>
            </Col>
          </Row>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <div className="stat-number text-primary">15,000+</div>
                <div className="stat-label">Artículos Médicos</div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <div className="stat-number text-success">500+</div>
                <div className="stat-label">Protocolos Clínicos</div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <div className="stat-number text-warning">2,000+</div>
                <div className="stat-label">Plantillas</div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <div className="stat-number text-info">12</div>
                <div className="stat-label">Especialidades</div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Demo Section */}
      <section className="demo-section py-6">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="fw-bold mb-4">Acceso intuitivo y búsqueda avanzada</h2>
              <p className="text-muted mb-4">
                Nuestra plataforma te permite encontrar exactamente lo que necesitas en segundos, con filtros avanzados y resultados organizados por relevancia.
              </p>
              <div className="demo-features">
                <div className="demo-feature-item">
                  <div className="demo-badge bg-primary"></div>
                  <span>Búsqueda por palabras clave</span>
                </div>
                <div className="demo-feature-item">
                  <div className="demo-badge bg-success"></div>
                  <span>Filtros por especialidad</span>
                </div>
                <div className="demo-feature-item">
                  <div className="demo-badge bg-warning"></div>
                  <span>Ordenamiento por fecha</span>
                </div>
                <div className="demo-feature-item">
                  <div className="demo-badge bg-info"></div>
                  <span>Resultados en tiempo real</span>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="demo-search">
                <div className="search-preview">
                  <div className="search-header">
                    <FiSearch className="me-2" />
                    <span>Buscar en biblioteca...</span>
                  </div>
                  <div className="search-results">
                    <div className="result-item">
                      <FiFileText className="text-primary me-2" />
                      <div>
                        <strong>Protocolo: Diabetes Mellitus</strong>
                        <span>Endocrinología - 2024</span>
                      </div>
                    </div>
                    <div className="result-item">
                      <FiBook className="text-success me-2" />
                      <div>
                        <strong>Guía: Hipertensión Arterial</strong>
                        <span>Cardiología - 2023</span>
                      </div>
                    </div>
                    <div className="result-item">
                      <FiDatabase className="text-warning me-2" />
                      <div>
                        <strong>CIE-10: E11.9</strong>
                        <span>Diabetes mellitus tipo 2</span>
                      </div>
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
              <h2 className="fw-bold mb-4">¿Listo para acceder al conocimiento médico más completo?</h2>
              <p className="lead mb-4">
                Únete a miles de profesionales que ya utilizan nuestra biblioteca digital
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Button variant="primary" size="lg" className="rounded-pill px-4 shadow hover-scale">
                  Acceder ahora
                </Button>
                <Button variant="outline-primary" size="lg" className="rounded-pill px-4 hover-scale">
                  Ver catálogo completo
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default BibliotecaModern;