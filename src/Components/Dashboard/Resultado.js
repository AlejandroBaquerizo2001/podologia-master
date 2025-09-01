import React, { useState } from 'react';
import { Card, Row, Col, ProgressBar, Button, Dropdown, Table, Nav, Badge, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Resultado = () => {
  // Estado para los datos del dashboard
  const [dashboardData, setDashboardData] = useState({
    citasTotales: 156,
    crecimientoCitas: 12,
    ingresos: 8450,
    crecimientoIngresos: 8,
    metricasAdicionales: [
      { titulo: 'Pacientes Nuevos', valor: 42, crecimiento: 5 },
      { titulo: 'Procedimientos', valor: 89, crecimiento: -2 },
      { titulo: 'Satisfacción', valor: 94, crecimiento: 3, esPorcentaje: true }
    ]
  });

  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Estado para los resultados de exámenes
  const [resultadosExamenes, setResultadosExamenes] = useState([
    { id: 1, paciente: 'María González', examen: 'Hemograma Completo', fecha: '2024-01-15', resultado: 'Normal', estado: 'Completado' },
    { id: 2, paciente: 'Carlos Rodríguez', examen: 'Perfil Lipídico', fecha: '2024-01-14', resultado: 'Colesterol elevado', estado: 'Completado' },
    { id: 3, paciente: 'Ana Martínez', examen: 'Glucosa en Ayunas', fecha: '2024-01-16', resultado: 'Pendiente', estado: 'En proceso' },
    { id: 4, paciente: 'Jorge López', examen: 'Prueba Tiroidea', fecha: '2024-01-13', resultado: 'Hipotiroidismo', estado: 'Completado' }
  ]);

  // Estado para las citas de pacientes
  const [citasPacientes, setCitasPacientes] = useState([
    { id: 1, paciente: 'María González', fecha: '2024-01-15', hora: '10:00', motivo: 'Consulta general', estado: 'Completada' },
    { id: 2, paciente: 'Carlos Rodríguez', fecha: '2024-01-16', hora: '11:30', motivo: 'Seguimiento tratamiento', estado: 'Completada' },
    { id: 3, paciente: 'Ana Martínez', fecha: '2024-01-17', hora: '09:15', motivo: 'Control anual', estado: 'Programada' },
    { id: 4, paciente: 'Jorge López', fecha: '2024-01-18', hora: '16:45', motivo: 'Resultados de exámenes', estado: 'Programada' }
  ]);

  // Estado para el modal de detalles
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Función para exportar datos
  const exportarDatos = (formato) => {
    alert(`Exportando datos en formato ${formato.toUpperCase()}`);
    // Aquí iría la lógica real de exportación
  };

  // Función para abrir detalles
  const verDetalles = (item, tipo) => {
    setSelectedItem({...item, tipo});
    setShowModal(true);
  };

  // Función para renderizar el badge de estado
  const renderBadge = (estado) => {
    switch(estado) {
      case 'Completado':
      case 'Completada':
        return <Badge bg="success">{estado}</Badge>;
      case 'En proceso':
        return <Badge bg="warning">{estado}</Badge>;
      case 'Programada':
        return <Badge bg="info">{estado}</Badge>;
      default:
        return <Badge bg="secondary">{estado}</Badge>;
    }
  };

  return (
    <div className="container-fluid py-4">
      <h1 className="h2 mb-4">Sistema de Gestión Médica</h1>
      
      {/* Navegación entre secciones */}
      <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab} className="mb-4">
        <Nav.Item>
          <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="examenes">Resultados de Exámenes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="citas">Citas de Pacientes</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Contenido según la pestaña activa */}
      {activeTab === 'dashboard' && (
        <>
          <h2 className="h4 mb-4">Dashboard Resumen - Enero 2024</h2>
          
          {/* Tarjetas principales */}
          <Row className="mb-4">
            <Col md={6} lg={3} className="mb-3">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-title text-muted mb-1">Citas Totales</h6>
                      <h3 className="fw-bold mb-0">{dashboardData.citasTotales}</h3>
                      <span className="text-success small">
                        <i className="fas fa-arrow-up"></i> +{dashboardData.crecimientoCitas}%
                      </span>
                    </div>
                    <div className="bg-primary rounded-circle p-3">
                      <i className="fas fa-calendar-check text-white"></i>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="mb-3">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="card-title text-muted mb-1">Ingresos</h6>
                      <h3 className="fw-bold mb-0">${dashboardData.ingresos.toLocaleString()}</h3>
                      <span className="text-success small">
                        <i className="fas fa-arrow-up"></i> +{dashboardData.crecimientoIngresos}%
                      </span>
                    </div>
                    <div className="bg-success rounded-circle p-3">
                      <i className="fas fa-dollar-sign text-white"></i>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            {dashboardData.metricasAdicionales.map((metrica, index) => (
              <Col md={6} lg={3} key={index} className="mb-3">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="card-title text-muted mb-1">{metrica.titulo}</h6>
                        <h3 className="fw-bold mb-0">
                          {metrica.valor}{metrica.esPorcentaje ? '%' : ''}
                        </h3>
                        <span className={metrica.crecimiento >= 0 ? "text-success small" : "text-danger small"}>
                          <i className={metrica.crecimiento >= 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"}></i> 
                          {metrica.crecimiento >= 0 ? '+' : ''}{metrica.crecimiento}%
                        </span>
                      </div>
                      <div className="bg-info rounded-circle p-3">
                        <i className="fas fa-user-md text-white"></i>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          
          {/* Sección de características */}
          <Row className="mb-4">
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <h5 className="card-title mb-4">Visualización clara y comprensible</h5>
                  <p className="text-muted">
                    Nuestros dashboards transforman datos complejos en información fácil de entender, 
                    con gráficos interactivos y reportes ejecutivos.
                  </p>
                  
                  <Row className="mt-4">
                    <Col md={6} lg={3} className="mb-3">
                      <div className="d-flex align-items-center">
                        <div className="bg-light rounded p-2 me-3">
                          <i className="fas fa-chart-line text-primary"></i>
                        </div>
                        <div>
                          <h6 className="mb-0">Gráficos interactivos</h6>
                          <small className="text-muted">Visualización avanzada de datos</small>
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6} lg={3} className="mb-3">
                      <div className="d-flex align-items-center">
                        <div className="bg-light rounded p-2 me-3">
                          <i className="fas fa-file-alt text-primary"></i>
                        </div>
                        <div>
                          <h6 className="mb-0">Reportes personalizables</h6>
                          <small className="text-muted">Adaptados a tus necesidades</small>
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6} lg={3} className="mb-3">
                      <div className="d-flex align-items-center">
                        <div className="bg-light rounded p-2 me-3">
                          <i className="fas fa-history text-primary"></i>
                        </div>
                        <div>
                          <h6 className="mb-0">Comparativas históricas</h6>
                          <small className="text-muted">Evolución temporal</small>
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={6} lg={3} className="mb-3">
                      <div className="d-flex align-items-center">
                        <div className="bg-light rounded p-2 me-3">
                          <i className="fas fa-download text-primary"></i>
                        </div>
                        <div>
                          <h6 className="mb-0">Exportación múltiple</h6>
                          <small className="text-muted">Varios formatos disponibles</small>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {activeTab === 'examenes' && (
        <>
          <h2 className="h4 mb-4">Resultados de Exámenes</h2>
          
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Form.Group className="w-50">
                  <Form.Control type="text" placeholder="Buscar por paciente o examen..." />
                </Form.Group>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-primary" id="filter-exams">
                    <i className="fas fa-filter me-2"></i>Filtrar
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Todos</Dropdown.Item>
                    <Dropdown.Item>Completados</Dropdown.Item>
                    <Dropdown.Item>En proceso</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>Examen</th>
                    <th>Fecha</th>
                    <th>Resultado</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {resultadosExamenes.map(examen => (
                    <tr key={examen.id}>
                      <td>{examen.paciente}</td>
                      <td>{examen.examen}</td>
                      <td>{examen.fecha}</td>
                      <td>{examen.resultado}</td>
                      <td>{renderBadge(examen.estado)}</td>
                      <td>
                        <Button variant="outline-primary" size="sm" onClick={() => verDetalles(examen, 'examen')}>
                          <i className="fas fa-eye me-1"></i> Ver
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      )}

      {activeTab === 'citas' && (
        <>
          <h2 className="h4 mb-4">Citas de Pacientes</h2>
          
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Form.Group className="w-50">
                  <Form.Control type="text" placeholder="Buscar por paciente o motivo..." />
                </Form.Group>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-primary" id="filter-appointments">
                    <i className="fas fa-filter me-2"></i>Filtrar
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Todas</Dropdown.Item>
                    <Dropdown.Item>Completadas</Dropdown.Item>
                    <Dropdown.Item>Programadas</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Motivo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {citasPacientes.map(cita => (
                    <tr key={cita.id}>
                      <td>{cita.paciente}</td>
                      <td>{cita.fecha}</td>
                      <td>{cita.hora}</td>
                      <td>{cita.motivo}</td>
                      <td>{renderBadge(cita.estado)}</td>
                      <td>
                        <Button variant="outline-primary" size="sm" onClick={() => verDetalles(cita, 'cita')}>
                          <i className="fas fa-eye me-1"></i> Ver
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      )}
      
      {/* Botones de acción */}
      <Row className="mt-4">
        <Col>
          <div className="d-flex justify-content-end">
            <Dropdown className="me-2">
              <Dropdown.Toggle variant="outline-primary" id="export-dropdown">
                <i className="fas fa-download me-2"></i>Exportar
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => exportarDatos('pdf')}>PDF</Dropdown.Item>
                <Dropdown.Item onClick={() => exportarDatos('excel')}>Excel</Dropdown.Item>
                <Dropdown.Item onClick={() => exportarDatos('csv')}>CSV</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary">
              <i className="fas fa-sync-alt me-2"></i>Actualizar
            </Button>
          </div>
        </Col>
      </Row>

      {/* Modal de detalles */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Detalles de {selectedItem?.tipo === 'examen' ? 'Examen' : 'Cita'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              {selectedItem.tipo === 'examen' ? (
                <Row>
                  <Col md={6}>
                    <p><strong>Paciente:</strong> {selectedItem.paciente}</p>
                    <p><strong>Examen:</strong> {selectedItem.examen}</p>
                    <p><strong>Fecha:</strong> {selectedItem.fecha}</p>
                  </Col>
                  <Col md={6}>
                    <p><strong>Resultado:</strong> {selectedItem.resultado}</p>
                    <p><strong>Estado:</strong> {renderBadge(selectedItem.estado)}</p>
                  </Col>
                  <Col md={12} className="mt-3">
                    <h6>Observaciones:</h6>
                    <p className="text-muted">
                      {selectedItem.resultado === 'Normal' 
                        ? 'Todos los valores dentro de los parámetros normales.' 
                        : 'Se recomienda seguimiento con especialista.'}
                    </p>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col md={6}>
                    <p><strong>Paciente:</strong> {selectedItem.paciente}</p>
                    <p><strong>Fecha:</strong> {selectedItem.fecha}</p>
                    <p><strong>Hora:</strong> {selectedItem.hora}</p>
                  </Col>
                  <Col md={6}>
                    <p><strong>Motivo:</strong> {selectedItem.motivo}</p>
                    <p><strong>Estado:</strong> {renderBadge(selectedItem.estado)}</p>
                  </Col>
                  <Col md={12} className="mt-3">
                    <h6>Notas de la cita:</h6>
                    <p className="text-muted">
                      {selectedItem.estado === 'Completada' 
                        ? 'Consulta realizada con éxito. Paciente respondió bien al tratamiento.' 
                        : 'Cita programada. Confirmar con paciente un día antes.'}
                    </p>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary">
            <i className="fas fa-print me-2"></i>Imprimir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Resultado;