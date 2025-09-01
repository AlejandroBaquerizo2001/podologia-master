import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Tab, Tabs, Table, Badge, Alert, Modal, Nav } from 'react-bootstrap';
import { FaUser, FaNotesMedical, FaPills, FaAllergies, FaProcedures, FaFileMedicalAlt, FaHistory, FaFilePdf, FaFileExcel, FaPrint, FaDownload, FaPlus, FaTrash, FaSave } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

const FichaMedicas = () => {
  const [activeTab, setActiveTab] = useState('datos');
  const [paciente, setPaciente] = useState({
    nombre: '',
    rut: '',
    fechaNacimiento: '',
    genero: '',
    direccion: '',
    telefono: '',
    email: '',
    previsionsalud: ''
  });
  
  const [antecedentes, setAntecedentes] = useState({
    medicos: '',
    quirurgicos: '',
    alergicos: '',
    familiares: ''
  });
  
  const [tratamientos, setTratamientos] = useState([{
    medicamento: '',
    dosis: '',
    frecuencia: '',
    inicio: ''
  }]);
  
  const [notas, setNotas] = useState([{
    fecha: new Date().toISOString().split('T')[0],
    profesional: '',
    contenido: ''
  }]);

  const [showExportModal, setShowExportModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
  };

  const handlePacienteChange = (e) => {
    const { name, value } = e.target;
    setPaciente(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAntecedentesChange = (e) => {
    const { name, value } = e.target;
    setAntecedentes(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTratamientoChange = (index, e) => {
    const { name, value } = e.target;
    const newTratamientos = [...tratamientos];
    newTratamientos[index][name] = value;
    setTratamientos(newTratamientos);
  };
  
  const addTratamiento = () => {
    setTratamientos([...tratamientos, {
      medicamento: '',
      dosis: '',
      frecuencia: '',
      inicio: ''
    }]);
  };
  
  const removeTratamiento = (index) => {
    const newTratamientos = [...tratamientos];
    newTratamientos.splice(index, 1);
    setTratamientos(newTratamientos);
  };
  
  const addNota = () => {
    setNotas([...notas, {
      fecha: new Date().toISOString().split('T')[0],
      profesional: '',
      contenido: ''
    }]);
  };
  
  const handleNotaChange = (index, e) => {
    const { name, value } = e.target;
    const newNotas = [...notas];
    newNotas[index][name] = value;
    setNotas(newNotas);
  };

  const validateForm = () => {
    if (!paciente.nombre || !paciente.rut) {
      showAlert('Por favor, complete los datos obligatorios del paciente', 'danger');
      return false;
    }
    
    const rutRegex = /^[0-9]{7,8}-[0-9kK]{1}$/;
    if (!rutRegex.test(paciente.rut)) {
      showAlert('El formato del RUT no es válido. Use el formato: 12345678-9', 'danger');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    console.log({
      paciente,
      antecedentes,
      tratamientos,
      notas
    });
    
    showAlert('Ficha médica guardada exitosamente');
  };

  const exportToPDF = () => {
    if (!validateForm()) return;
    
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text('Ficha Médica', 105, 15, { align: 'center' });
      doc.setFontSize(12);
      doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 105, 22, { align: 'center' });
      
      doc.setFontSize(16);
      doc.text('Datos del Paciente', 14, 35);
      doc.setFontSize(10);
      
      let yPosition = 45;
      
      const addTextWithLineBreak = (text, x, y, maxWidth) => {
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y);
        return lines.length * 7;
      };
      
      yPosition += addTextWithLineBreak(`Nombre: ${paciente.nombre}`, 14, yPosition, 180);
      yPosition += addTextWithLineBreak(`RUT: ${paciente.rut}`, 14, yPosition, 180);
      yPosition += addTextWithLineBreak(`Fecha de Nacimiento: ${paciente.fechaNacimiento}`, 14, yPosition, 180);
      yPosition += addTextWithLineBreak(`Género: ${paciente.genero}`, 14, yPosition, 180);
      yPosition += addTextWithLineBreak(`Dirección: ${paciente.direccion}`, 14, yPosition, 180);
      yPosition += addTextWithLineBreak(`Teléfono: ${paciente.telefono}`, 14, yPosition, 180);
      yPosition += addTextWithLineBreak(`Email: ${paciente.email}`, 14, yPosition, 180);
      yPosition += addTextWithLineBreak(`Previsión de Salud: ${paciente.previsionsalud}`, 14, yPosition, 180);
      
      yPosition += 10;
      
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(16);
      doc.text('Antecedentes Médicos', 14, yPosition);
      yPosition += 10;
      doc.setFontSize(10);
      
      if (antecedentes.medicos) {
        yPosition += addTextWithLineBreak(`Médicos: ${antecedentes.medicos}`, 14, yPosition, 180);
      }
      
      if (antecedentes.quirurgicos) {
        yPosition += addTextWithLineBreak(`Quirúrgicos: ${antecedentes.quirurgicos}`, 14, yPosition, 180);
      }
      
      if (antecedentes.alergicos) {
        yPosition += addTextWithLineBreak(`Alérgicos: ${antecedentes.alergicos}`, 14, yPosition, 180);
      }
      
      if (antecedentes.familiares) {
        yPosition += addTextWithLineBreak(`Familiares: ${antecedentes.familiares}`, 14, yPosition, 180);
      }
      
      yPosition += 10;
      
      if (tratamientos.length > 0) {
        if (yPosition > 220) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(16);
        doc.text('Tratamientos', 14, yPosition);
        yPosition += 10;
        doc.setFontSize(10);
        
        tratamientos.forEach((tratamiento, index) => {
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          
          yPosition += addTextWithLineBreak(`Medicamento ${index + 1}: ${tratamiento.medicamento}`, 14, yPosition, 180);
          yPosition += addTextWithLineBreak(`Dosis: ${tratamiento.dosis}`, 20, yPosition, 180);
          yPosition += addTextWithLineBreak(`Frecuencia: ${tratamiento.frecuencia}`, 20, yPosition, 180);
          yPosition += addTextWithLineBreak(`Inicio: ${tratamiento.inicio}`, 20, yPosition, 180);
          yPosition += 5;
        });
      }
      
      if (notas.length > 0) {
        if (yPosition > 220) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(16);
        doc.text('Notas Clínicas', 14, yPosition);
        yPosition += 10;
        doc.setFontSize(10);
        
        notas.forEach((nota, index) => {
          if (yPosition > 230) {
            doc.addPage();
            yPosition = 20;
          }
          
          yPosition += addTextWithLineBreak(`${nota.fecha} - ${nota.profesional}`, 14, yPosition, 180);
          yPosition += addTextWithLineBreak(nota.contenido, 20, yPosition, 180);
          yPosition += 10;
        });
      }
      
      doc.save(`ficha_medica_${paciente.rut}.pdf`);
      setShowExportModal(false);
      showAlert('PDF exportado correctamente');
    } catch (error) {
      console.error('Error al generar PDF:', error);
      showAlert('Error al generar el PDF. Consulte la consola para más detalles.', 'danger');
    }
  };

  const exportToExcel = () => {
    if (!validateForm()) return;
    
    try {
      const wb = XLSX.utils.book_new();
      
      const pacienteData = [
        ['Campo', 'Valor'],
        ['Nombre', paciente.nombre],
        ['RUT', paciente.rut],
        ['Fecha de Nacimiento', paciente.fechaNacimiento],
        ['Género', paciente.genero],
        ['Dirección', paciente.direccion],
        ['Teléfono', paciente.telefono],
        ['Email', paciente.email],
        ['Previsión de Salud', paciente.previsionsalud]
      ];
      
      const pacienteWS = XLSX.utils.aoa_to_sheet(pacienteData);
      XLSX.utils.book_append_sheet(wb, pacienteWS, 'Datos Paciente');
      
      const antecedentesData = [
        ['Tipo', 'Contenido'],
        ['Médicos', antecedentes.medicos],
        ['Quirúrgicos', antecedentes.quirurgicos],
        ['Alérgicos', antecedentes.alergicos],
        ['Familiares', antecedentes.familiares]
      ];
      
      const antecedentesWS = XLSX.utils.aoa_to_sheet(antecedentesData);
      XLSX.utils.book_append_sheet(wb, antecedentesWS, 'Antecedentes');
      
      if (tratamientos.length > 0) {
        const tratamientosData = [
          ['Medicamento', 'Dosis', 'Frecuencia', 'Inicio'],
          ...tratamientos.map(t => [t.medicamento, t.dosis, t.frecuencia, t.inicio])
        ];
        
        const tratamientosWS = XLSX.utils.aoa_to_sheet(tratamientosData);
        XLSX.utils.book_append_sheet(wb, tratamientosWS, 'Tratamientos');
      }
      
      if (notas.length > 0) {
        const notasData = [
          ['Fecha', 'Profesional', 'Contenido'],
          ...notas.map(n => [n.fecha, n.profesional, n.contenido])
        ];
        
        const notasWS = XLSX.utils.aoa_to_sheet(notasData);
        XLSX.utils.book_append_sheet(wb, notasWS, 'Notas Clínicas');
      }
      
      XLSX.writeFile(wb, `ficha_medica_${paciente.rut}.xlsx`);
      setShowExportModal(false);
      showAlert('Excel exportado correctamente');
    } catch (error) {
      console.error('Error al generar Excel:', error);
      showAlert('Error al generar el Excel. Consulte la consola para más detalles.', 'danger');
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age} años`;
  };

  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      {alert.show && (
        <Alert variant={alert.type} className="mb-3" dismissible onClose={() => setAlert({ show: false, message: '', type: '' })}>
          {alert.message}
        </Alert>
      )}
      
      <Card className="shadow border-0 mb-4">
        <Card.Header className="bg-primary text-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0 d-flex align-items-center">
              <FaFileMedicalAlt className="me-2" />
              Ficha Médica del Paciente
            </h2>
            <Button variant="light" onClick={() => setShowExportModal(true)}>
              <FaDownload className="me-2" />
              Exportar
            </Button>
          </div>
        </Card.Header>
        
        <Card.Body className="p-0">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="px-3 pt-3"
            fill
          >
            <Tab eventKey="datos" title={
              <span><FaUser className="me-1" /> Datos Paciente</span>
            }>
              <Card className="shadow-sm mb-4 border-0">
                <Card.Header className="bg-light">
                  <h5 className="mb-0 d-flex align-items-center">
                    <FaUser className="me-2 text-primary" />
                    Información Personal
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group controlId="nombre" className="mb-3">
                          <Form.Label>Nombre Completo <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            name="nombre"
                            value={paciente.nombre}
                            onChange={handlePacienteChange}
                            required
                            placeholder="Ingrese nombre completo"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="rut" className="mb-3">
                          <Form.Label>RUT <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            name="rut"
                            value={paciente.rut}
                            onChange={handlePacienteChange}
                            placeholder="Ej: 12345678-9"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group controlId="fechaNacimiento" className="mb-3">
                          <Form.Label>Fecha de Nacimiento</Form.Label>
                          <Form.Control
                            type="date"
                            name="fechaNacimiento"
                            value={paciente.fechaNacimiento}
                            onChange={handlePacienteChange}
                          />
                          {paciente.fechaNacimiento && (
                            <Form.Text className="text-muted">
                              Edad: {calculateAge(paciente.fechaNacimiento)}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="genero" className="mb-3">
                          <Form.Label>Género</Form.Label>
                          <Form.Select
                            name="genero"
                            value={paciente.genero}
                            onChange={handlePacienteChange}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="otro">Otro</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="previsionsalud" className="mb-3">
                          <Form.Label>Previsión de Salud</Form.Label>
                          <Form.Select
                            name="previsionsalud"
                            value={paciente.previsionsalud}
                            onChange={handlePacienteChange}
                          >
                            <option value="">Seleccionar...</option>
                            <option value="fonasa">FONASA</option>
                            <option value="isapre">ISAPRE</option>
                            <option value="particular">Particular</option>
                            <option value="otra">Otra</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group controlId="direccion" className="mb-3">
                          <Form.Label>Dirección</Form.Label>
                          <Form.Control
                            type="text"
                            name="direccion"
                            value={paciente.direccion}
                            onChange={handlePacienteChange}
                            placeholder="Ingrese dirección completa"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group controlId="telefono" className="mb-3">
                          <Form.Label>Teléfono</Form.Label>
                          <Form.Control
                            type="tel"
                            name="telefono"
                            value={paciente.telefono}
                            onChange={handlePacienteChange}
                            placeholder="+56 9 1234 5678"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group controlId="email" className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={paciente.email}
                            onChange={handlePacienteChange}
                            placeholder="ejemplo@correo.com"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Tab>
            
            <Tab eventKey="antecedentes" title={
              <span><FaHistory className="me-1" /> Antecedentes</span>
            }>
              <Card className="shadow-sm mb-4 border-0">
                <Card.Header className="bg-light">
                  <h5 className="mb-0 d-flex align-items-center">
                    <FaHistory className="me-2 text-primary" />
                    Antecedentes Médicos
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Antecedentes Médicos</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="medicos"
                      value={antecedentes.medicos}
                      onChange={handleAntecedentesChange}
                      placeholder="Enfermedades crónicas, hospitalizaciones previas, etc."
                    />
                    <Form.Text className="text-muted">
                      Ej: Diabetes tipo 2 diagnosticada en 2010, Hipertensión arterial
                    </Form.Text>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Antecedentes Quirúrgicos</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="quirurgicos"
                      value={antecedentes.quirurgicos}
                      onChange={handleAntecedentesChange}
                      placeholder="Cirugías previas, fechas, etc."
                    />
                    <Form.Text className="text-muted">
                      Ej: Apendicectomía (2015), Colecistectomía laparoscópica (2018)
                    </Form.Text>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Antecedentes Alérgicos</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="alergicos"
                      value={antecedentes.alergicos}
                      onChange={handleAntecedentesChange}
                      placeholder="Alergias a medicamentos, alimentos, etc."
                    />
                    <Form.Text className="text-muted">
                      Ej: Penicilina (rash cutáneo), Mariscos (edema facial)
                    </Form.Text>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">Antecedentes Familiares</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="familiares"
                      value={antecedentes.familiares}
                      onChange={handleAntecedentesChange}
                      placeholder="Enfermedades hereditarias en la familia"
                    />
                    <Form.Text className="text-muted">
                      Ej: Padre: Infarto a los 65 años, Madre: Cáncer de mama a los 58 años
                    </Form.Text>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Tab>
            
            <Tab eventKey="tratamientos" title={
              <span><FaPills className="me-1" /> Tratamientos</span>
            }>
              <Card className="shadow-sm mb-4 border-0">
                <Card.Header className="bg-light d-flex justify-content-between align-items-center py-3">
                  <h5 className="mb-0 d-flex align-items-center">
                    <FaPills className="me-2 text-primary" />
                    Tratamientos Actuales
                  </h5>
                  <Button variant="primary" size="sm" onClick={addTratamiento}>
                    <FaPlus className="me-1" />
                    Agregar Tratamiento
                  </Button>
                </Card.Header>
                <Card.Body>
                  {tratamientos.map((tratamiento, index) => (
                    <Card key={index} className="mb-3 border">
                      <Card.Header className="bg-light py-2 d-flex justify-content-between align-items-center">
                        <span className="fw-medium">Tratamiento #{index + 1}</span>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeTratamiento(index)}
                        >
                          <FaTrash />
                        </Button>
                      </Card.Header>
                      <Card.Body>
                        <Row className="mb-2">
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Medicamento</Form.Label>
                              <Form.Control
                                type="text"
                                name="medicamento"
                                value={tratamiento.medicamento}
                                onChange={(e) => handleTratamientoChange(index, e)}
                                placeholder="Nombre del medicamento"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group>
                              <Form.Label>Dosis</Form.Label>
                              <Form.Control
                                type="text"
                                name="dosis"
                                value={tratamiento.dosis}
                                onChange={(e) => handleTratamientoChange(index, e)}
                                placeholder="Ej: 500mg"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={3}>
                            <Form.Group>
                              <Form.Label>Frecuencia</Form.Label>
                              <Form.Control
                                type="text"
                                name="frecuencia"
                                value={tratamiento.frecuencia}
                                onChange={(e) => handleTratamientoChange(index, e)}
                                placeholder="Ej: Cada 8 horas"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Fecha de Inicio</Form.Label>
                              <Form.Control
                                type="date"
                                name="inicio"
                                value={tratamiento.inicio}
                                onChange={(e) => handleTratamientoChange(index, e)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                  
                  {tratamientos.length === 0 && (
                    <div className="text-center text-muted py-5">
                      <FaPills size={48} className="mb-3" />
                      <p>No hay tratamientos registrados</p>
                      <Button variant="outline-primary" onClick={addTratamiento}>
                        <FaPlus className="me-1" />
                        Agregar el primer tratamiento
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Tab>
            
            <Tab eventKey="notas" title={
              <span><FaNotesMedical className="me-1" /> Notas Clínicas</span>
            }>
              <Card className="shadow-sm mb-4 border-0">
                <Card.Header className="bg-light d-flex justify-content-between align-items-center py-3">
                  <h5 className="mb-0 d-flex align-items-center">
                    <FaNotesMedical className="me-2 text-primary" />
                    Notas Clínicas
                  </h5>
                  <Button variant="primary" size="sm" onClick={addNota}>
                    <FaPlus className="me-1" />
                    Agregar Nota
                  </Button>
                </Card.Header>
                <Card.Body>
                  {notas.map((nota, index) => (
                    <Card key={index} className="mb-3 border">
                      <Card.Header className="d-flex justify-content-between align-items-center py-2 bg-light">
                        <div className="d-flex align-items-center">
                          <Badge bg="primary" className="me-2">
                            {nota.fecha}
                          </Badge>
                          <Form.Control
                            type="text"
                            name="profesional"
                            value={nota.profesional}
                            onChange={(e) => handleNotaChange(index, e)}
                            placeholder="Nombre del profesional"
                            className="w-auto"
                          />
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="contenido"
                          value={nota.contenido}
                          onChange={(e) => handleNotaChange(index, e)}
                          placeholder="Registre aquí la evolución, diagnóstico, tratamiento, etc."
                        />
                      </Card.Body>
                    </Card>
                  ))}
                  
                  {notas.length === 0 && (
                    <div className="text-center text-muted py-5">
                      <FaNotesMedical size={48} className="mb-3" />
                      <p>No hay notas clínicas registradas</p>
                      <Button variant="outline-primary" onClick={addNota}>
                        <FaPlus className="me-1" />
                        Agregar la primera nota
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Card.Body>
        
        <Card.Footer className="bg-light d-flex justify-content-between py-3">
          <Button variant="outline-secondary" onClick={() => setShowExportModal(true)}>
            <FaDownload className="me-2" />
            Exportar
          </Button>
          <Button variant="primary" size="lg" onClick={handleSubmit}>
            <FaSave className="me-2" />
            Guardar Ficha Médica
          </Button>
        </Card.Footer>
      </Card>

      {/* Modal para exportar */}
      <Modal show={showExportModal} onHide={() => setShowExportModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title className="d-flex align-items-center">
            <FaDownload className="me-2" />
            Exportar Ficha Médica
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">Seleccione el formato de exportación:</p>
          <div className="d-grid gap-2">
            <Button variant="outline-danger" size="lg" onClick={exportToPDF} className="py-3">
              <FaFilePdf className="me-2" />
              Exportar a PDF
            </Button>
            <Button variant="outline-success" size="lg" onClick={exportToExcel} className="py-3">
              <FaFileExcel className="me-2" />
              Exportar a Excel
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowExportModal(false)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FichaMedicas;