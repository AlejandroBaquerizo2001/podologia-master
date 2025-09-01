import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FiBarChart, FiTrendingUp, FiPieChart, FiDownload, FiEye, FiMessageSquare } from 'react-icons/fi';
import './ResultadosModern.css';

const ResultadosModern = () => {
  return (
    <div className="modern-promo-container">
      {/* Hero Section 1 - Gradient */}
      <section className="gradient-hero py-6">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4 text-white">
                <FiBarChart className="me-3" />
                Análisis de Resultados
              </h1>
              <p className="lead text-white mb-4">
                Monitorea y analiza el desempeño de tu práctica médica con datos en tiempo real
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
              <h2 className="fw-bold mb-4">Toma decisiones basadas en datos reales</h2>
              <p className="lead mb-4">
                Regístrate y descubre insights valiosos sobre tu práctica médica
              </p>
              <Button variant="primary" size="lg" className="rounded-pill px-4 shadow hover-scale">
                Empieza gratis - Sin configuración
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
              <h2 className="fw-bold mb-3">Métricas y Analytics Avanzados</h2>
              <p className="text-muted">Convierte datos en decisiones inteligentes para tu consulta</p>
            </Col>
          </Row>

          <Row className="g-4">
            {/* Feature 1 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-primary-light">
                    <FiTrendingUp className="text-primary" size={24} />
                  </div>
                  <h4 className="my-3">Dashboard en Tiempo Real</h4>
                  <p className="text-muted">
                    Visualiza el desempeño de tu consulta con métricas actualizadas al instante.
                  </p>
                  <ul className="feature-list">
                    <li>Indicadores clave</li>
                    <li>Gráficos interactivos</li>
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
                    <FiPieChart className="text-success" size={24} />
                  </div>
                  <h4 className="my-3">Reportes Personalizados</h4>
                  <p className="text-muted">
                    Genera reportes detallados con los parámetros que necesites para tu análisis.
                  </p>
                  <ul className="feature-list">
                    <li>Filtros avanzados</li>
                    <li>Formatos exportables</li>
                    <li>Plantillas reutilizables</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 3 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-warning-light">
                    <FiBarChart className="text-warning" size={24} />
                  </div>
                  <h4 className="my-3">Análisis Comparativo</h4>
                  <p className="text-muted">
                    Compara tu desempeño con períodos anteriores y establece metas realistas.
                  </p>
                  <ul className="feature-list">
                    <li>Evolución temporal</li>
                    <li>Benchmarks automáticos</li>
                    <li>Proyecciones inteligentes</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 4 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-danger-light">
                    <FiEye className="text-danger" size={24} />
                  </div>
                  <h4 className="my-3">Indicadores Clínicos</h4>
                  <p className="text-muted">
                    Monitorea resultados de tratamientos y efectividad de protocolos médicos.
                  </p>
                  <ul className="feature-list">
                    <li>Métricas de salud</li>
                    <li>Seguimiento de pacientes</li>
                    <li>Resultados por tratamiento</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 5 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-info-light">
                    <FiDownload className="text-info" size={24} />
                  </div>
                  <h4 className="my-3">Exportación de Datos</h4>
                  <p className="text-muted">
                    Descarga tus datos en múltiples formatos para análisis externos o presentaciones.
                  </p>
                  <ul className="feature-list">
                    <li>Formatos: PDF, Excel, CSV</li>
                    <li>Personalización total</li>
                    <li>Gráficos exportables</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 6 */}
            <Col md={6} lg={4}>
              <Card className="h-100 feature-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="icon-wrapper bg-purple-light">
                    <FiBarChart className="text-purple" size={24} />
                  </div>
                  <h4 className="my-3">Alertas Inteligentes</h4>
                  <p className="text-muted">
                    Recibe notificaciones automáticas sobre tendencias y cambios significativos.
                  </p>
                  <ul className="feature-list">
                    <li>Notificaciones personalizables</li>
                    <li>Umbrales configurables</li>
                    <li>Alertas por email/app</li>
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
              <h2 className="fw-bold mb-3">Lo que puedes medir con nuestra plataforma</h2>
              <p className="text-muted">Métricas esenciales para el crecimiento de tu práctica médica</p>
            </Col>
          </Row>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <div className="stat-number text-primary">98%</div>
                <div className="stat-label">Satisfacción Pacientes</div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <div className="stat-number text-success">25%</div>
                <div className="stat-label">Crecimiento Anual</div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <div className="stat-number text-warning">15min</div>
                <div className="stat-label">Tiempo Promedio Espera</div>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="stat-item">
                <div className="stat-number text-info">92%</div>
                <div className="stat-label">Eficiencia Consultas</div>
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
              <h2 className="fw-bold mb-4">Visualización clara y comprensible</h2>
              <p className="text-muted mb-4">
                Nuestros dashboards transforman datos complejos en información fácil de entender, con gráficos interactivos y reportes ejecutivos.
              </p>
              <div className="demo-features">
                <div className="demo-feature-item">
                  <div className="demo-badge bg-primary"></div>
                  <span>Gráficos interactivos</span>
                </div>
                <div className="demo-feature-item">
                  <div className="demo-badge bg-success"></div>
                  <span>Reportes personalizables</span>
                </div>
                <div className="demo-feature-item">
                  <div className="demo-badge bg-warning"></div>
                  <span>Comparativas históricas</span>
                </div>
                <div className="demo-feature-item">
                  <div className="demo-badge bg-info"></div>
                  <span>Exportación múltiple</span>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="demo-dashboard">
                <div className="dashboard-preview">
                  <div className="dashboard-header">
                    <FiBarChart className="me-2" />
                    <span>Dashboard Resumen - Enero 2024</span>
                  </div>
                  <div className="dashboard-content">
                    <div className="metric-row">
                      <div className="metric-item">
                        <span className="metric-label">Citas Totales</span>
                        <span className="metric-value">156</span>
                        <span className="metric-trend positive">+12%</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Ingresos</span>
                        <span className="metric-value">$8,450</span>
                        <span className="metric-trend positive">+8%</span>
                      </div>
                    </div>
                    <div className="chart-placeholder">
                      <div className="chart-bar" style={{height: '60%'}}></div>
                      <div className="chart-bar" style={{height: '80%'}}></div>
                      <div className="chart-bar" style={{height: '45%'}}></div>
                      <div className="chart-bar" style={{height: '90%'}}></div>
                      <div className="chart-bar" style={{height: '70%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-6 bg-light">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="fw-bold mb-3">Lo que dicen nuestros usuarios</h2>
              <p className="text-muted">Médicos que han transformado su práctica con nuestros analytics</p>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Card className="testimonial-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="testimonial-text">
                    "Los reportes me han permitido identificar patrones en mi consulta que no había notado antes. Increíble herramienta."
                  </div>
                  <div className="testimonial-author">
                    <strong>Dra. Elena Torres</strong>
                    <span>Cardióloga</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="testimonial-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="testimonial-text">
                    "La facilidad para exportar datos y crear reportes personalizados ha sido un cambio total para mi administración."
                  </div>
                  <div className="testimonial-author">
                    <strong>Dr. Carlos Mendoza</strong>
                    <span>Pediatra</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="testimonial-card border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="testimonial-text">
                    "Las alertas inteligentes me han ayudado a optimizar mi agenda y mejorar la experiencia de mis pacientes."
                  </div>
                  <div className="testimonial-author">
                    <strong>Dra. Andrea Rojas</strong>
                    <span>Dermatóloga</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-6 final-cta">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="fw-bold mb-4">¿Listo para transformar datos en decisiones?</h2>
              <p className="lead mb-4">
                Únete a médicos que ya toman decisiones inteligentes basadas en analytics avanzados
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Button variant="primary" size="lg" className="rounded-pill px-4 shadow hover-scale">
                  Comenzar ahora
                </Button>
                <Button variant="outline-primary" size="lg" className="rounded-pill px-4 hover-scale">
                  Ver demo interactiva
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ResultadosModern;