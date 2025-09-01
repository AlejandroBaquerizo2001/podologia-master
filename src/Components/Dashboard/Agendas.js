import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Button, Badge, Modal, Form, Alert, 
  Tab, Tabs, InputGroup, ButtonGroup 
} from 'react-bootstrap';
import { 
  FaCalendarAlt, FaClock, FaUserMd, FaNotesMedical, FaPlus, FaSearch, 
  FaFilter, FaHistory, FaMapMarkerAlt, FaCog, FaBell, FaChartBar, 
  FaCalendarDay, FaCalendarWeek, FaCalendar, FaSlidersH, FaChevronLeft, 
  FaChevronRight 
} from 'react-icons/fa';

const Agendas = () => {
  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('todas');
  const [filterLocation, setFilterLocation] = useState('todas');
  const [viewType, setViewType] = useState('semana');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [activeTab, setActiveTab] = useState('proximas');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Ubicaciones disponibles
  const ubicaciones = [
    { id: 'central', nombre: 'Consultorio Central', direccion: 'Av. Principal 123' },
    { id: 'norte', nombre: 'Clínica Norte', direccion: 'Calle Norte 456' },
    { id: 'sur', nombre: 'Centro Médico Sur', direccion: 'Av. Sur 789' }
  ];

  // Médicos disponibles
  const medicos = [
    { id: 1, nombre: 'Dra. María González', especialidad: 'Medicina General' },
    { id: 2, nombre: 'Dr. Carlos López', especialidad: 'Pediatría' },
    { id: 3, nombre: 'Dra. Marta Fernández', especialidad: 'Cirugía' },
    { id: 4, nombre: 'Dr. Roberto Sánchez', especialidad: 'Cardiología' },
    { id: 5, nombre: 'Dra. Elena Ramírez', especialidad: 'Dermatología' }
  ];

  // Estado para nueva cita
  const [nuevaCita, setNuevaCita] = useState({
    paciente: '',
    fecha: '',
    hora: '',
    medico: '',
    tipo: 'consulta',
    notas: '',
    ubicacion: 'central'
  });

  // Simular carga de datos desde una API o almacenamiento
  useEffect(() => {
    // Datos de ejemplo para pacientes
    const pacientesEjemplo = [
      {
        id: 1,
        nombre: 'Juan Pérez',
        rut: '12.345.678-9',
        telefono: '+56 9 1234 5678',
        email: 'juan@email.com',
        prevision: 'FONASA',
        historial: ['Control anual 2022', 'Vacunación influenza 2023']
      },
      {
        id: 2,
        nombre: 'Ana Rodríguez',
        rut: '23.456.789-0',
        telefono: '+56 9 2345 6789',
        email: 'ana@email.com',
        prevision: 'ISAPRE',
        historial: ['Consulta pediátrica', 'Control crecimiento']
      },
      {
        id: 3,
        nombre: 'Luis García',
        rut: '34.567.890-1',
        telefono: '+56 9 3456 7890',
        email: 'luis@email.com',
        prevision: 'FONASA',
        historial: ['Cirugía menor 2022', 'Seguimiento postoperatorio']
      },
      {
        id: 4,
        nombre: 'Laura Martínez',
        rut: '45.678.901-2',
        telefono: '+56 9 4567 8901',
        email: 'laura@email.com',
        prevision: 'ISAPRE',
        historial: ['Consulta ginecológica']
      },
      {
        id: 5,
        nombre: 'Pedro Gómez',
        rut: '56.789.012-3',
        telefono: '+56 9 5678 9012',
        email: 'pedro@email.com',
        prevision: 'FONASA',
        historial: ['Control diabetes']
      }
    ];

    // Datos de ejemplo para citas
    const citasEjemplo = [
      {
        id: 1,
        paciente: 'Juan Pérez',
        pacienteId: 1,
        fecha: new Date(new Date().getFullYear(), new Date().getMonth(), 15).toISOString().split('T')[0],
        hora: '10:00',
        medico: 'Dra. María González',
        tipo: 'consulta',
        notas: 'Control postoperatorio',
        estado: 'confirmada',
        ubicacion: 'central',
        recordatorio: true
      },
      {
        id: 2,
        paciente: 'Ana Rodríguez',
        pacienteId: 2,
        fecha: new Date(new Date().getFullYear(), new Date().getMonth(), 16).toISOString().split('T')[0],
        hora: '11:30',
        medico: 'Dr. Carlos López',
        tipo: 'examen',
        notas: 'Análisis de sangre',
        estado: 'pendiente',
        ubicacion: 'norte',
        recordatorio: false
      },
      {
        id: 3,
        paciente: 'Luis García',
        pacienteId: 3,
        fecha: new Date(new Date().getFullYear(), new Date().getMonth(), 17).toISOString().split('T')[0],
        hora: '09:15',
        medico: 'Dra. Marta Fernández',
        tipo: 'urgencia',
        notas: 'Dolor abdominal',
        estado: 'confirmada',
        ubicacion: 'sur',
        recordatorio: true
      },
      {
        id: 4,
        paciente: 'Laura Martínez',
        pacienteId: 4,
        fecha: new Date(new Date().getFullYear(), new Date().getMonth(), 20).toISOString().split('T')[0],
        hora: '16:45',
        medico: 'Dr. Roberto Sánchez',
        tipo: 'consulta',
        notas: 'Revisión anual',
        estado: 'confirmada',
        ubicacion: 'central',
        recordatorio: true
      },
      {
        id: 5,
        paciente: 'Pedro Gómez',
        pacienteId: 5,
        fecha: new Date(new Date().getFullYear(), new Date().getMonth(), 10).toISOString().split('T')[0],
        hora: '14:00',
        medico: 'Dra. Elena Ramírez',
        tipo: 'control',
        notas: 'Control de medicación',
        estado: 'completada',
        ubicacion: 'norte',
        recordatorio: false
      }
    ];

    setPacientes(pacientesEjemplo);
    setCitas(citasEjemplo);
  }, []);

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaCita(prev => ({ ...prev, [name]: value }));
  };

  const agregarCita = () => {
    if (!nuevaCita.paciente || !nuevaCita.fecha || !nuevaCita.hora || !nuevaCita.medico) {
      showAlert('Por favor, complete todos los campos obligatorios', 'danger');
      return;
    }

    const nuevaCitaConId = {
      ...nuevaCita,
      id: citas.length + 1,
      estado: 'pendiente',
      recordatorio: true
    };

    setCitas([...citas, nuevaCitaConId]);
    setShowModal(false);
    setNuevaCita({
      paciente: '',
      fecha: '',
      hora: '',
      medico: '',
      tipo: 'consulta',
      notas: '',
      ubicacion: 'central'
    });
    showAlert('Cita agregada correctamente');
  };

  const cancelarCita = (id) => {
    setCitas(citas.map(cita => 
      cita.id === id ? { ...cita, estado: 'cancelada' } : cita
    ));
    showAlert('Cita cancelada correctamente');
  };

  const confirmarCita = (id) => {
    setCitas(citas.map(cita => 
      cita.id === id ? { ...cita, estado: 'confirmada' } : cita
    ));
    showAlert('Cita confirmada correctamente');
  };

  const completarCita = (id) => {
    setCitas(citas.map(cita => 
      cita.id === id ? { ...cita, estado: 'completada' } : cita
    ));
    showAlert('Cita marcada como completada');
  };

  const toggleRecordatorio = (id) => {
    setCitas(citas.map(cita => 
      cita.id === id ? { ...cita, recordatorio: !cita.recordatorio } : cita
    ));
    showAlert('Recordatorio actualizado');
  };

  // Filtrar citas según búsqueda y filtros
  const citasFiltradas = citas.filter(cita => {
    const matchesSearch = cita.paciente.toLowerCase().includes(searchText.toLowerCase()) ||
                         cita.medico.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = filterStatus === 'todas' || cita.estado === filterStatus;
    const matchesLocation = filterLocation === 'todas' || cita.ubicacion === filterLocation;
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Separar citas en futuras y pasadas
  const hoy = new Date().toISOString().split('T')[0];
  
  const citasProximas = citasFiltradas
    .filter(cita => cita.fecha >= hoy)
    .sort((a, b) => new Date(a.fecha + 'T' + a.hora) - new Date(b.fecha + 'T' + b.hora));
  
  const citasPasadas = citasFiltradas
    .filter(cita => cita.fecha < hoy)
    .sort((a, b) => new Date(b.fecha + 'T' + b.hora) - new Date(a.fecha + 'T' + a.hora));

  const getBadgeVariant = (estado) => {
    switch (estado) {
      case 'confirmada': return 'success';
      case 'pendiente': return 'warning';
      case 'cancelada': return 'danger';
      case 'completada': return 'info';
      default: return 'secondary';
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'consulta': return 'primary';
      case 'examen': return 'info';
      case 'urgencia': return 'danger';
      case 'control': return 'success';
      default: return 'secondary';
    }
  };

  const getUbicacionNombre = (id) => {
    const ubicacion = ubicaciones.find(u => u.id === id);
    return ubicacion ? ubicacion.nombre : 'Ubicación no especificada';
  };

  // Funciones para navegación del calendario
  const goToPreviousPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'dia') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewType === 'semana') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const goToNextPeriod = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'dia') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewType === 'semana') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Generar días para la vista actual
  const generateDays = () => {
    const days = [];
    const startDate = new Date(currentDate);
    
    if (viewType === 'dia') {
      days.push(new Date(startDate));
    } else if (viewType === 'semana') {
      // Ajustar al inicio de la semana (lunes)
      const dayOfWeek = startDate.getDay();
      const diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      startDate.setDate(diff);
      
      for (let i = 0; i < 7; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        days.push(day);
      }
    } else {
      // Vista mensual: obtener primer día del mes
      startDate.setDate(1);
      const firstDayOfMonth = startDate.getDay();
      // Ajustar para que la semana comience en lunes
      const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
      
      for (let i = 0; i < 42; i++) {
        const day = new Date(startDate);
        day.setDate(i - startOffset + 1);
        days.push(day);
      }
    }
    
    return days;
  };

  // Obtener citas para una fecha específica
  const getCitasForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return citasFiltradas.filter(cita => cita.fecha === dateString);
  };

  // Componente para la vista de calendario
  const VistaCalendario = () => {
    const days = generateDays();
    
    return (
      <div className="my-4">
        <Card>
          <Card.Header className="bg-light d-flex justify-content-between align-items-center">
            <div>
              <Button variant="outline-secondary" size="sm" onClick={goToPreviousPeriod}>
                <FaChevronLeft />
              </Button>
              <Button variant="outline-primary" size="sm" className="mx-2" onClick={goToToday}>
                Hoy
              </Button>
              <Button variant="outline-secondary" size="sm" onClick={goToNextPeriod}>
                <FaChevronRight />
              </Button>
            </div>
            
            <h5 className="mb-0">
              {viewType === 'dia' 
                ? selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                : viewType === 'semana'
                  ? `Semana del ${days[0].toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} al ${days[6].toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`
                  : currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
              }
            </h5>
            
            <ButtonGroup size="sm">
              <Button 
                variant={viewType === 'dia' ? 'primary' : 'outline-primary'} 
                onClick={() => setViewType('dia')}
              >
                <FaCalendarDay className="me-1" /> Día
              </Button>
              <Button 
                variant={viewType === 'semana' ? 'primary' : 'outline-primary'} 
                onClick={() => setViewType('semana')}
              >
                <FaCalendarWeek className="me-1" /> Semana
              </Button>
              <Button 
                variant={viewType === 'mes' ? 'primary' : 'outline-primary'} 
                onClick={() => setViewType('mes')}
              >
                <FaCalendar className="me-1" /> Mes
              </Button>
            </ButtonGroup>
          </Card.Header>
          
          <Card.Body className="p-0">
            {viewType === 'mes' ? (
              <div className="calendar-month-view">
                <div className="calendar-header d-flex">
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                    <div key={day} className="calendar-cell fw-bold text-center py-2 border">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="calendar-grid">
                  {days.map((day, index) => {
                    const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                    const isToday = day.toDateString() === new Date().toDateString();
                    const dayCitas = getCitasForDate(day);
                    
                    return (
                      <div 
                        key={index} 
                        className={`calendar-cell border p-1 ${!isCurrentMonth ? 'bg-light text-muted' : ''} ${isToday ? 'bg-info bg-opacity-10' : ''}`}
                        style={{ minHeight: '100px' }}
                        onClick={() => {
                          setSelectedDate(day);
                          setViewType('dia');
                        }}
                      >
                        <div className="d-flex justify-content-between">
                          <span className={isToday ? 'fw-bold text-primary' : ''}>
                            {day.getDate()}
                          </span>
                          {dayCitas.length > 0 && (
                            <Badge bg="primary" pill>{dayCitas.length}</Badge>
                          )}
                        </div>
                        
                        <div className="mt-1">
                          {dayCitas.slice(0, 2).map(cita => (
                            <div 
                              key={cita.id} 
                              className={`p-1 mb-1 rounded small text-white bg-${getTipoColor(cita.tipo)}`}
                              title={`${cita.paciente} - ${cita.hora}`}
                            >
                              <div>{cita.hora}</div>
                              <div className="text-truncate">{cita.paciente.split(' ')[0]}</div>
                            </div>
                          ))}
                          {dayCitas.length > 2 && (
                            <div className="text-center small text-muted">
                              +{dayCitas.length - 2} más
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : viewType === 'semana' ? (
              <div className="calendar-week-view">
                <div className="d-flex">
                  {days.map(day => {
                    const isToday = day.toDateString() === new Date().toDateString();
                    const dayCitas = getCitasForDate(day);
                    
                    return (
                      <div 
                        key={day.toISOString()} 
                        className={`flex-fill border-end ${isToday ? 'bg-info bg-opacity-10' : ''}`}
                        style={{ minWidth: '14.28%' }}
                      >
                        <div className={`text-center p-2 ${isToday ? 'fw-bold text-primary' : ''}`}>
                          <div>{day.toLocaleDateString('es-ES', { weekday: 'short' })}</div>
                          <div>{day.getDate()}</div>
                        </div>
                        
                        <div className="p-1" style={{ minHeight: '400px' }}>
                          {dayCitas.map(cita => (
                            <div 
                              key={cita.id} 
                              className="p-2 mb-2 rounded small shadow-sm"
                              style={{ 
                                backgroundColor: `var(--bs-${getTipoColor(cita.tipo)}-bg-subtle)`,
                                borderLeft: `4px solid var(--bs-${getTipoColor(cita.tipo)})`,
                                cursor: 'pointer'
                              }}
                              onClick={() => {
                                setSelectedDate(day);
                                setViewType('dia');
                              }}
                            >
                              <div className="fw-bold">{cita.hora}</div>
                              <div>{cita.paciente}</div>
                              <div className="text-muted small">{cita.tipo}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="calendar-day-view">
                <div className="text-center p-3 border-bottom">
                  <h5 className="mb-0">
                    {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </h5>
                </div>
                
                <div className="p-3">
                  <Row>
                    {Array.from({ length: 12 }).map((_, hourIndex) => {
                      const hour = hourIndex + 8; // Desde las 8:00 AM
                      const timeCitas = getCitasForDate(selectedDate).filter(
                        cita => parseInt(cita.hora.split(':')[0]) === hour
                      );
                      
                      return (
                        <React.Fragment key={hourIndex}>
                          <Col md={1} className="text-end pe-4 py-2 border-bottom">
                            <div className="fw-bold">{hour}:00</div>
                          </Col>
                          <Col md={11} className="py-2 border-bottom">
                            {timeCitas.length > 0 ? (
                              timeCitas.map(cita => (
                                <Card 
                                  key={cita.id} 
                                  className="mb-2 shadow-sm"
                                  style={{ 
                                    borderLeft: `4px solid var(--bs-${getTipoColor(cita.tipo)})`
                                  }}
                                >
                                  <Card.Body className="py-2">
                                    <div className="d-flex justify-content-between align-items-start">
                                      <div>
                                        <div className="fw-bold">{cita.paciente}</div>
                                        <div className="small text-muted">
                                          {cita.hora} - {cita.medico}
                                        </div>
                                        <Badge bg={getBadgeVariant(cita.estado)} className="me-1 mt-1">
                                          {cita.estado}
                                        </Badge>
                                        <Badge bg={getTipoColor(cita.tipo)}>
                                          {cita.tipo}
                                        </Badge>
                                      </div>
                                      <div>
                                        <Button 
                                          variant="outline-secondary" 
                                          size="sm"
                                          onClick={() => {
                                            setSelectedDate(new Date(cita.fecha));
                                            setViewType('dia');
                                          }}
                                        >
                                          Ver
                                        </Button>
                                      </div>
                                    </div>
                                  </Card.Body>
                                </Card>
                              ))
                            ) : (
                              <div className="text-muted small">No hay citas programadas</div>
                            )}
                          </Col>
                        </React.Fragment>
                      );
                    })}
                  </Row>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  };

  // Componente para estadísticas
  const Estadisticas = () => {
    const citasEsteMes = citas.filter(c => {
      const fechaCita = new Date(c.fecha);
      const hoy = new Date();
      return fechaCita.getMonth() === hoy.getMonth() && fechaCita.getFullYear() === hoy.getFullYear();
    }).length;

    const tasaConfirmacion = citas.length > 0 
      ? Math.round((citas.filter(c => c.estado === 'confirmada').length / citas.length) * 100) 
      : 0;

    return (
      <Card className="mb-4">
        <Card.Header className="bg-light">
          <h5 className="mb-0 d-flex align-items-center">
            <FaChartBar className="me-2" />
            Estadísticas de Citas
          </h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={3} className="text-center">
              <h3>{citas.length}</h3>
              <p className="text-muted">Total Citas</p>
            </Col>
            <Col md={3} className="text-center">
              <h3 className="text-success">{citas.filter(c => c.estado === 'confirmada').length}</h3>
              <p className="text-muted">Confirmadas</p>
            </Col>
            <Col md={3} className="text-center">
              <h3>{citasEsteMes}</h3>
              <p className="text-muted">Este Mes</p>
            </Col>
            <Col md={3} className="text-center">
              <h3 className="text-info">{tasaConfirmacion}%</h3>
              <p className="text-muted">Tasa de Confirmación</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container fluid className="py-4">
      {alert.show && (
        <Alert variant={alert.type} className="mb-3" dismissible onClose={() => setAlert({ show: false, message: '', type: '' })}>
          {alert.message}
        </Alert>
      )}
      
      <Row className="mb-4">
        <Col>
          <h2 className="d-flex align-items-center">
            <FaCalendarAlt className="me-2 text-primary" />
            Agenda Médica Centralizada
          </h2>
          <p className="text-muted">Sistema integral de gestión de citas y pacientes</p>
        </Col>
        <Col md="auto" className="d-flex align-items-center">
          <Button variant="outline-secondary" className="me-2" onClick={() => setShowConfigModal(true)}>
            <FaCog />
          </Button>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <FaPlus className="me-2" />
            Nueva Cita
          </Button>
        </Col>
      </Row>

      <Estadisticas />

      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-light">
          <h5 className="mb-0 d-flex align-items-center">
            <FaFilter className="me-2" />
            Filtros de Búsqueda Avanzada
          </h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Buscar paciente o médico</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Nombre de paciente, médico o notas..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Button variant="outline-secondary">
                    <FaSearch />
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Filtrar por estado</Form.Label>
                <Form.Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="todas">Todos los estados</option>
                  <option value="pendiente">Pendientes</option>
                  <option value="confirmada">Confirmadas</option>
                  <option value="completada">Completadas</option>
                  <option value="cancelada">Canceladas</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Filtrar por ubicación</Form.Label>
                <Form.Select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                >
                  <option value="todas">Todas las ubicaciones</option>
                  {ubicaciones.map(ubicacion => (
                    <option key={ubicacion.id} value={ubicacion.id}>{ubicacion.nombre}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-end">
              <Button variant="outline-secondary" className="w-100">
                <FaSlidersH className="me-1" /> Más Filtros
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <VistaCalendario />

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="proximas" title={
          <span>
            <FaClock className="me-1" />
            Próximas Citas ({citasProximas.length})
          </span>
        }>
          {citasProximas.length > 0 ? (
            <Row>
              {citasProximas.map(cita => (
                <Col md={6} lg={4} key={cita.id} className="mb-3">
                  <Card className="h-100 shadow-sm">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <div>
                        <Badge bg={getBadgeVariant(cita.estado)} className="me-1">{cita.estado}</Badge>
                        <Badge bg={getTipoColor(cita.tipo)}>{cita.tipo}</Badge>
                      </div>
                      <Button 
                        variant={cita.recordatorio ? "outline-warning" : "outline-secondary"} 
                        size="sm" 
                        onClick={() => toggleRecordatorio(cita.id)}
                        title={cita.recordatorio ? "Desactivar recordatorio" : "Activar recordatorio"}
                      >
                        <FaBell />
                      </Button>
                    </Card.Header>
                    <Card.Body>
                      <h6 className="card-title">{cita.paciente}</h6>
                      <div className="d-flex align-items-center mb-2">
                        <FaCalendarAlt className="me-2 text-muted" />
                        <span>{new Date(cita.fecha).toLocaleDateString()}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <FaClock className="me-2 text-muted" />
                        <span>{cita.hora}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <FaUserMd className="me-2 text-muted" />
                        <span>{cita.medico}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <FaMapMarkerAlt className="me-2 text-muted" />
                        <small>{getUbicacionNombre(cita.ubicacion)}</small>
                      </div>
                      {cita.notas && (
                        <div className="d-flex align-items-start mb-2">
                          <FaNotesMedical className="me-2 text-muted mt-1" />
                          <small className="text-muted">{cita.notas}</small>
                        </div>
                      )}
                    </Card.Body>
                    <Card.Footer className="bg-transparent">
                      <div className="d-flex justify-content-between">
                        {cita.estado === 'pendiente' && (
                          <>
                            <Button variant="outline-success" size="sm" onClick={() => confirmarCita(cita.id)}>
                              Confirmar
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={() => cancelarCita(cita.id)}>
                              Cancelar
                            </Button>
                          </>
                        )}
                        {cita.estado === 'confirmada' && (
                          <>
                            <Button variant="outline-info" size="sm" onClick={() => completarCita(cita.id)}>
                              Completar
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={() => cancelarCita(cita.id)}>
                              Cancelar
                            </Button>
                          </>
                        )}
                        {(cita.estado === 'completada' || cita.estado === 'cancelada') && (
                          <Button variant="outline-secondary" size="sm" disabled>
                            {cita.estado === 'completada' ? 'Completada' : 'Cancelada'}
                          </Button>
                        )}
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5">
              <FaCalendarAlt size={48} className="text-muted mb-3" />
              <h5>No hay citas próximas</h5>
              <p className="text-muted">No se encontraron citas futuras con los filtros aplicados.</p>
            </div>
          )}
        </Tab>

        <Tab eventKey="pasadas" title={
          <span>
            <FaHistory className="me-1" />
            Historial ({citasPasadas.length})
          </span>
        }>
          {citasPasadas.length > 0 ? (
            <Row>
              {citasPasadas.map(cita => (
                <Col md={6} lg={4} key={cita.id} className="mb-3">
                  <Card className="h-100 shadow-sm">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <div>
                        <Badge bg={getBadgeVariant(cita.estado)} className="me-1">{cita.estado}</Badge>
                        <Badge bg={getTipoColor(cita.tipo)}>{cita.tipo}</Badge>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <h6 className="card-title">{cita.paciente}</h6>
                      <div className="d-flex align-items-center mb-2">
                        <FaCalendarAlt className="me-2 text-muted" />
                        <span>{new Date(cita.fecha).toLocaleDateString()}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <FaClock className="me-2 text-muted" />
                        <span>{cita.hora}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <FaUserMd className="me-2 text-muted" />
                        <span>{cita.medico}</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <FaMapMarkerAlt className="me-2 text-muted" />
                        <small>{getUbicacionNombre(cita.ubicacion)}</small>
                      </div>
                      {cita.notas && (
                        <div className="d-flex align-items-start mb-2">
                          <FaNotesMedical className="me-2 text-muted mt-1" />
                          <small className="text-muted">{cita.notas}</small>
                        </div>
                      )}
                    </Card.Body>
                    <Card.Footer className="bg-transparent">
                      <small className="text-muted">
                        {cita.estado === 'completada' 
                          ? 'Cita completada' 
                          : cita.estado === 'cancelada' 
                            ? 'Cita cancelada' 
                            : 'Cita no atendida'}
                      </small>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5">
              <FaHistory size={48} className="text-muted mb-3" />
              <h5>No hay citas en el historial</h5>
              <p className="text-muted">No se encontraron citas pasadas con los filtros aplicados.</p>
            </div>
          )}
        </Tab>
      </Tabs>

      {/* Modal para agregar nueva cita */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agendar Nueva Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Paciente *</Form.Label>
                <Form.Select
                  name="paciente"
                  value={nuevaCita.paciente}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar paciente...</option>
                  {pacientes.map(paciente => (
                    <option key={paciente.id} value={paciente.nombre}>
                      {paciente.nombre} ({paciente.rut})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Médico *</Form.Label>
                <Form.Select
                  name="medico"
                  value={nuevaCita.medico}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccionar médico...</option>
                  {medicos.map(medico => (
                    <option key={medico.id} value={medico.nombre}>
                      {medico.nombre} ({medico.especialidad})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha *</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha"
                  value={nuevaCita.fecha}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Hora *</Form.Label>
                <Form.Control
                  type="time"
                  name="hora"
                  value={nuevaCita.hora}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Ubicación</Form.Label>
                <Form.Select
                  name="ubicacion"
                  value={nuevaCita.ubicacion}
                  onChange={handleInputChange}
                >
                  {ubicaciones.map(ubicacion => (
                    <option key={ubicacion.id} value={ubicacion.id}>
                      {ubicacion.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tipo de cita</Form.Label>
                <Form.Select
                  name="tipo"
                  value={nuevaCita.tipo}
                  onChange={handleInputChange}
                >
                  <option value="consulta">Consulta general</option>
                  <option value="examen">Examen</option>
                  <option value="control">Control</option>
                  <option value="urgencia">Urgencia</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label>Notas adicionales</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notas"
              value={nuevaCita.notas}
              onChange={handleInputChange}
              placeholder="Notas o observaciones sobre la cita..."
            />
          </Form.Group>

          <Form.Check
            type="checkbox"
            label="Enviar recordatorio al paciente"
            defaultChecked
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={agregarCita}>
            Agendar Cita
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de configuración */}
      <Modal show={showConfigModal} onHide={() => setShowConfigModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Configuración de la Agenda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Preferencias de Visualización</h6>
          <Form.Check
            type="checkbox"
            label="Vista diaria por defecto"
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            label="Mostrar recordatorios automáticos"
            className="mb-2"
          />
          <Form.Check
            type="checkbox"
            label="Sincronización en tiempo real"
            className="mb-3"
          />

          <h6>Configuración de Ubicaciones</h6>
          {ubicaciones.map(ubicacion => (
            <div key={ubicacion.id} className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <div>{ubicacion.nombre}</div>
                <small className="text-muted">{ubicacion.direccion}</small>
              </div>
              <Form.Check
                type="switch"
                defaultChecked
              />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfigModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => setShowConfigModal(false)}>
            Guardar Configuración
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Agendas;