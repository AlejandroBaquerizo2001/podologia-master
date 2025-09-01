import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Tab, Tabs, Badge, Modal, Alert, ListGroup } from 'react-bootstrap';
import { 
  FaSearch, FaBookMedical, FaFilePdf, FaDownload, FaFilter, 
  FaBook, FaDatabase, FaFileAlt, FaStar, FaCalendarAlt,
  FaBookOpen, FaGlobe, FaUniversity, FaMapMarkerAlt 
} from 'react-icons/fa';

const Bibliotecas = () => {
  const [activeTab, setActiveTab] = useState('protocolos');
  const [searchQuery, setSearchQuery] = useState('');
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('todas');
  const [filtroAnio, setFiltroAnio] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [recursoSeleccionado, setRecursoSeleccionado] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Especialidades médicas
  const especialidades = [
    'Cardiología', 'Pediatría', 'Neurología', 'Oncología', 'Dermatología',
    'Ginecología', 'Traumatología', 'Psiquiatría', 'Medicina Interna', 'Cirugía'
  ];

  // Años para filtro
  const anos = ['2024', '2023', '2022', '2021', '2020', '2019', '2018'];

  // Datos de ejemplo para protocolos clínicos
  const [protocolos, setProtocolos] = useState([
    {
      id: 1,
      titulo: 'Protocolo de Manejo de Hipertensión Arterial',
      especialidad: 'Cardiología',
      organizacion: 'Organización Mundial de la Salud',
      anio: 2024,
      descripcion: 'Guía actualizada para el manejo de pacientes con hipertensión arterial según las últimas evidencias científicas.',
      descargas: 1245,
      rating: 4.8,
      formato: 'PDF',
      tamaño: '2.4 MB',
      codigo: 'HTA-2024'
    },
    {
      id: 2,
      titulo: 'Guía de Práctica Clínica en Diabetes Mellitus',
      especialidad: 'Medicina Interna',
      organizacion: 'American Diabetes Association',
      anio: 2023,
      descripcion: 'Recomendaciones basadas en evidencia para el diagnóstico y tratamiento de la diabetes tipo 1 y 2.',
      descargas: 987,
      rating: 4.7,
      formato: 'PDF',
      tamaño: '3.1 MB',
      codigo: 'DM-2023'
    },
    {
      id: 3,
      titulo: 'Protocolo de Atención en Emergencias Pediátricas',
      especialidad: 'Pediatría',
      organizacion: 'Sociedad de Pediatría',
      anio: 2024,
      descripcion: 'Algoritmos de actuación en situaciones de emergencia en población pediátrica.',
      descargas: 756,
      rating: 4.9,
      formato: 'PDF',
      tamaño: '4.2 MB',
      codigo: 'PED-EMER-2024'
    }
  ]);

  // Datos de ejemplo para artículos científicos
  const [articulos, setArticulos] = useState([
    {
      id: 1,
      titulo: 'Avances en el tratamiento del cáncer de mama triple negativo',
      autores: 'Smith J, Johnson A, Williams R',
      revista: 'Journal of Clinical Oncology',
      anio: 2024,
      volumen: '42',
      numero: '3',
      paginas: '245-256',
      descargas: 542,
      citaciones: 78,
      factorImpacto: 6.8,
      especialidad: 'Oncología',
      doi: '10.1200/JCO.2023.45.6789',
      resumen: 'Estudio prospectivo que evalúa nuevas terapias combinadas para el cáncer de mama triple negativo en estadios avanzados.'
    },
    {
      id: 2,
      titulo: 'Efectividad de nuevas terapias cognitivo-conductuales en depresión resistente',
      autores: 'García M, López P, Rodríguez S',
      revista: 'American Journal of Psychiatry',
      anio: 2023,
      volumen: '180',
      numero: '5',
      paginas: '367-379',
      descargas: 423,
      citaciones: 45,
      factorImpacto: 7.2,
      especialidad: 'Psiquiatría',
      doi: '10.1176/appi.ajp.2022.21090909',
      resumen: 'Ensayo clínico randomizado que compara la efectividad de diferentes abordajes en depresión resistente al tratamiento.'
    }
  ]);

  // Datos de ejemplo para CIE-10
  const [cie10, setCie10] = useState([
    {
      codigo: 'I10',
      descripcion: 'Hipertensión esencial (primaria)',
      categoria: 'Enfermedades del sistema circulatorio',
      subcategoria: 'Hipertensión'
    },
    {
      codigo: 'E11.9',
      descripcion: 'Diabetes mellitus tipo 2 sin complicaciones',
      categoria: 'Enfermedades endocrinas, nutricionales y metabólicas',
      subcategoria: 'Diabetes mellitus'
    },
    {
      codigo: 'J45.909',
      descripcion: 'Asma no especificada, no complicada',
      categoria: 'Enfermedades del sistema respiratorio',
      subcategoria: 'Asma'
    }
  ]);

  // Datos de ejemplo para plantillas médicas
  const [plantillas, setPlantillas] = useState([
    {
      id: 1,
      titulo: 'Formato de Historia Clínica Completa',
      especialidad: 'General',
      descripcion: 'Plantilla estructurada para registro de historia clínica con todos los apartados necesarios.',
      formato: 'DOCX',
      tamaño: '0.8 MB',
      descargas: 1567,
      rating: 4.9
    },
    {
      id: 2,
      titulo: 'Consentimiento Informado para Procedimientos Quirúrgicos',
      especialidad: 'Cirugía',
      descripcion: 'Modelo de consentimiento informado ajustado a normativa vigente.',
      formato: 'DOCX',
      tamaño: '1.2 MB',
      descargas: 987,
      rating: 4.7
    }
  ]);

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
  };

  const handleDescargar = (recurso, tipo) => {
    // Simular descarga
    showAlert(`${tipo} "${recurso.titulo}" se ha descargado correctamente`);
  };

  const abrirDetalles = (recurso, tipo) => {
    setRecursoSeleccionado({ ...recurso, tipo });
    setShowModal(true);
  };

  // Filtrar recursos según búsqueda y filtros
  const filtrarRecursos = (recursos) => {
    return recursos.filter(recurso => {
      const coincideBusqueda = recurso.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              (recurso.descripcion && recurso.descripcion.toLowerCase().includes(searchQuery.toLowerCase())) ||
                              (recurso.autores && recurso.autores.toLowerCase().includes(searchQuery.toLowerCase())) ||
                              (recurso.codigo && recurso.codigo.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const coincideEspecialidad = filtroEspecialidad === 'todas' || 
                                  (recurso.especialidad && recurso.especialidad === filtroEspecialidad);
      
      const coincideAnio = filtroAnio === 'todos' || 
                          (recurso.anio && recurso.anio.toString() === filtroAnio);
      
      return coincideBusqueda && coincideEspecialidad && coincideAnio;
    });
  };

  const protocolosFiltrados = filtrarRecursos(protocolos);
  const articulosFiltrados = filtrarRecursos(articulos);
  const cie10Filtrados = searchQuery ? cie10.filter(item => 
    item.codigo.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
  ) : cie10;
  const plantillasFiltradas = filtrarRecursos(plantillas);

  return (
    <Container className="py-4">
      {alert.show && (
        <Alert variant={alert.type} className="mb-3" dismissible onClose={() => setAlert({ show: false, message: '', type: '' })}>
          {alert.message}
        </Alert>
      )}

      <Row className="mb-4">
        <Col>
          <h2 className="d-flex align-items-center">
            <FaBookMedical className="me-2 text-primary" />
            Biblioteca Médica Digital
          </h2>
          <p className="text-muted">Accede a protocolos, artículos científicos y recursos médicos actualizados</p>
        </Col>
      </Row>

      {/* Barra de búsqueda y filtros */}
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-light">
          <h5 className="mb-0 d-flex align-items-center">
            <FaSearch className="me-2" />
            Búsqueda Inteligente
          </h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Buscar en todos los recursos</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Buscar por título, autor, código, descripción..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button variant="primary">
                    <FaSearch />
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Filtrar por especialidad</Form.Label>
                <Form.Select
                  value={filtroEspecialidad}
                  onChange={(e) => setFiltroEspecialidad(e.target.value)}
                >
                  <option value="todas">Todas las especialidades</option>
                  {especialidades.map(esp => (
                    <option key={esp} value={esp}>{esp}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Filtrar por año</Form.Label>
                <Form.Select
                  value={filtroAnio}
                  onChange={(e) => setFiltroAnio(e.target.value)}
                >
                  <option value="todos">Todos los años</option>
                  {anos.map(ano => (
                    <option key={ano} value={ano}>{ano}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        {/* Pestaña de Protocolos Clínicos */}
        <Tab eventKey="protocolos" title={
          <span>
            <FaBook className="me-1" />
            Protocolos Clínicos ({protocolosFiltrados.length})
          </span>
        }>
          <Row>
            {protocolosFiltrados.length > 0 ? (
              protocolosFiltrados.map(protocolo => (
                <Col md={6} lg={4} key={protocolo.id} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Header className="bg-light">
                      <Badge bg="primary" className="me-1">{protocolo.especialidad}</Badge>
                      <Badge bg="info">{protocolo.anio}</Badge>
                    </Card.Header>
                    <Card.Body>
                      <h6 className="card-title">{protocolo.titulo}</h6>
                      <p className="text-muted small">{protocolo.organizacion}</p>
                      <p className="small">{protocolo.descripcion}</p>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div>
                          <FaDownload className="me-1 text-muted" />
                          <small className="text-muted">{protocolo.descargas} descargas</small>
                        </div>
                        <div>
                          <FaStar className="me-1 text-warning" />
                          <small className="text-muted">{protocolo.rating}</small>
                        </div>
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-transparent">
                      <div className="d-flex justify-content-between">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => abrirDetalles(protocolo, 'protocolo')}
                        >
                          Detalles
                        </Button>
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => handleDescargar(protocolo, 'Protocolo')}
                        >
                          <FaDownload className="me-1" />
                          Descargar
                        </Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <FaBook className="text-muted" size={48} />
                <h5 className="mt-3">No se encontraron protocolos</h5>
                <p className="text-muted">Intenta ajustar los filtros de búsqueda</p>
              </Col>
            )}
          </Row>
        </Tab>

        {/* Pestaña de Artículos Científicos */}
        <Tab eventKey="articulos" title={
          <span>
            <FaFileAlt className="me-1" />
            Artículos Científicos ({articulosFiltrados.length})
          </span>
        }>
          <Row>
            {articulosFiltrados.length > 0 ? (
              articulosFiltrados.map(articulo => (
                <Col md={6} key={articulo.id} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Header className="bg-light d-flex justify-content-between">
                      <Badge bg="primary">{articulo.especialidad}</Badge>
                      <Badge bg="success">FI: {articulo.factorImpacto}</Badge>
                    </Card.Header>
                    <Card.Body>
                      <h6 className="card-title">{articulo.titulo}</h6>
                      <p className="text-muted small">{articulo.autores}</p>
                      <p className="small">{articulo.revista}, {articulo.anio}. Vol.{articulo.volumen}({articulo.numero}):{articulo.paginas}</p>
                      <p className="small">{articulo.resumen}</p>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div>
                          <FaDownload className="me-1 text-muted" />
                          <small className="text-muted">{articulo.descargas} descargas</small>
                        </div>
                        <div>
                          <small className="text-muted">{articulo.citaciones} citaciones</small>
                        </div>
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-transparent">
                      <div className="d-flex justify-content-between">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => abrirDetalles(articulo, 'artículo')}
                        >
                          Detalles
                        </Button>
                        <div>
                          <Button variant="outline-secondary" size="sm" className="me-2">
                            <FaFilePdf />
                          </Button>
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => handleDescargar(articulo, 'Artículo')}
                          >
                            <FaDownload className="me-1" />
                            Descargar
                          </Button>
                        </div>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <FaFileAlt className="text-muted" size={48} />
                <h5 className="mt-3">No se encontraron artículos</h5>
                <p className="text-muted">Intenta ajustar los filtros de búsqueda</p>
              </Col>
            )}
          </Row>
        </Tab>

        {/* Pestaña de CIE-10 */}
        <Tab eventKey="cie10" title={
          <span>
            <FaDatabase className="me-1" />
            CIE-10 ({cie10Filtrados.length})
          </span>
        }>
          <Row>
            <Col md={8} className="mx-auto">
              <Card className="shadow-sm">
                <Card.Header className="bg-light">
                  <h5 className="mb-0">Base de Datos CIE-10</h5>
                  <small className="text-muted">Clasificación Internacional de Enfermedades, 10ª Revisión</small>
                </Card.Header>
                <Card.Body>
                  {cie10Filtrados.length > 0 ? (
                    <ListGroup variant="flush">
                      {cie10Filtrados.map((item, index) => (
                        <ListGroup.Item key={index} className="px-0">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-1 text-primary">{item.codigo}</h6>
                              <p className="mb-1">{item.descripcion}</p>
                              <small className="text-muted">{item.categoria} - {item.subcategoria}</small>
                            </div>
                            <Button variant="outline-primary" size="sm">
                              Copiar código
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <div className="text-center py-4">
                      <FaDatabase className="text-muted" size={48} />
                      <h5 className="mt-3">No se encontraron resultados</h5>
                      <p className="text-muted">Intenta con otros términos de búsqueda</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* Pestaña de Plantillas Médicas */}
        <Tab eventKey="plantillas" title={
          <span>
            <FaFileAlt className="me-1" />
            Plantillas ({plantillasFiltradas.length})
          </span>
        }>
          <Row>
            {plantillasFiltradas.length > 0 ? (
              plantillasFiltradas.map(plantilla => (
                <Col md={6} lg={4} key={plantilla.id} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Header className="bg-light">
                      <Badge bg="info">{plantilla.especialidad}</Badge>
                    </Card.Header>
                    <Card.Body>
                      <h6 className="card-title">{plantilla.titulo}</h6>
                      <p className="small text-muted">{plantilla.descripcion}</p>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <small className="text-muted">Formato: {plantilla.formato}</small>
                        <small className="text-muted">{plantilla.tamaño}</small>
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-transparent">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <FaDownload className="me-1 text-muted" />
                          <small className="text-muted">{plantilla.descargas} descargas</small>
                        </div>
                        <Button 
                          variant="primary" 
                          size="sm"
                          onClick={() => handleDescargar(plantilla, 'Plantilla')}
                        >
                          <FaDownload className="me-1" />
                          Descargar
                        </Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <FaFileAlt className="text-muted" size={48} />
                <h5 className="mt-3">No se encontraron plantillas</h5>
                <p className="text-muted">Intenta ajustar los filtros de búsqueda</p>
              </Col>
            )}
          </Row>
        </Tab>
      </Tabs>

      {/* Modal de detalles del recurso */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {recursoSeleccionado?.tipo === 'protocolo' ? 'Detalles del Protocolo' : 
             recursoSeleccionado?.tipo === 'artículo' ? 'Detalles del Artículo' : 
             'Detalles del Recurso'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {recursoSeleccionado && (
            <div>
              <h5>{recursoSeleccionado.titulo}</h5>
              
              {recursoSeleccionado.tipo === 'protocolo' && (
                <div>
                  <p><strong>Organización:</strong> {recursoSeleccionado.organizacion}</p>
                  <p><strong>Especialidad:</strong> {recursoSeleccionado.especialidad}</p>
                  <p><strong>Año:</strong> {recursoSeleccionado.anio}</p>
                  <p><strong>Código:</strong> {recursoSeleccionado.codigo}</p>
                  <p><strong>Descripción:</strong> {recursoSeleccionado.descripcion}</p>
                  <p><strong>Formato:</strong> {recursoSeleccionado.formato} ({recursoSeleccionado.tamaño})</p>
                  <p><strong>Descargas:</strong> {recursoSeleccionado.descargas}</p>
                  <p><strong>Rating:</strong> {recursoSeleccionado.rating} / 5</p>
                </div>
              )}
              
              {recursoSeleccionado.tipo === 'artículo' && (
                <div>
                  <p><strong>Autores:</strong> {recursoSeleccionado.autores}</p>
                  <p><strong>Revista:</strong> {recursoSeleccionado.revista}</p>
                  <p><strong>Año:</strong> {recursoSeleccionado.anio}</p>
                  <p><strong>Volumen/Número:</strong> Vol.{recursoSeleccionado.volumen}({recursoSeleccionado.numero})</p>
                  <p><strong>Páginas:</strong> {recursoSeleccionado.paginas}</p>
                  <p><strong>DOI:</strong> {recursoSeleccionado.doi}</p>
                  <p><strong>Factor de Impacto:</strong> {recursoSeleccionado.factorImpacto}</p>
                  <p><strong>Resumen:</strong> {recursoSeleccionado.resumen}</p>
                  <p><strong>Citaciones:</strong> {recursoSeleccionado.citaciones}</p>
                  <p><strong>Descargas:</strong> {recursoSeleccionado.descargas}</p>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => {
            handleDescargar(recursoSeleccionado, recursoSeleccionado.tipo === 'protocolo' ? 'Protocolo' : 'Artículo');
            setShowModal(false);
          }}>
            <FaDownload className="me-1" />
            Descargar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Bibliotecas;