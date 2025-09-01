import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Tab, Tabs, Table, Badge } from 'react-bootstrap';
import { FaUser, FaNotesMedical, FaPills, FaAllergies, FaProcedures, FaFileMedicalAlt, FaHistory } from 'react-icons/fa';

const FichaMedica = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los datos
    console.log({
      paciente,
      antecedentes,
      tratamientos,
      notas
    });
    alert('Ficha médica guardada exitosamente');
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 d-flex align-items-center">
        <FaFileMedicalAlt className="me-2 text-primary" />
        Ficha Médica del Paciente
      </h2>
      
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="datos" title="Datos Paciente">
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-light">
              <h5 className="mb-0 d-flex align-items-center">
                <FaUser className="me-2" />
                Información Personal
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="nombre">
                      <Form.Label>Nombre Completo</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={paciente.nombre}
                        onChange={handlePacienteChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="rut">
                      <Form.Label>RUT</Form.Label>
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
                    <Form.Group controlId="fechaNacimiento">
                      <Form.Label>Fecha de Nacimiento</Form.Label>
                      <Form.Control
                        type="date"
                        name="fechaNacimiento"
                        value={paciente.fechaNacimiento}
                        onChange={handlePacienteChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="genero">
                      <Form.Label>Género</Form.Label>
                      <Form.Select
                        name="genero"
                        value={paciente.genero}
                        onChange={handlePacienteChange}
                        required
                      >
                        <option value="">Seleccionar...</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="previsionsalud">
                      <Form.Label>Previsión de Salud</Form.Label>
                      <Form.Select
                        name="previsionsalud"
                        value={paciente.previsionsalud}
                        onChange={handlePacienteChange}
                        required
                      >
                        <option value="">Seleccionar...</option>
                        <option value="fonasa">FONASA</option>
                        <option value="isapre">ISAPRE</option>
                        <option value="particular">Particular</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="direccion">
                      <Form.Label>Dirección</Form.Label>
                      <Form.Control
                        type="text"
                        name="direccion"
                        value={paciente.direccion}
                        onChange={handlePacienteChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="telefono">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control
                        type="tel"
                        name="telefono"
                        value={paciente.telefono}
                        onChange={handlePacienteChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={paciente.email}
                        onChange={handlePacienteChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
        
        <Tab eventKey="antecedentes" title="Antecedentes">
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-light">
              <h5 className="mb-0 d-flex align-items-center">
                <FaHistory className="me-2" />
                Antecedentes Médicos
              </h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Antecedentes Médicos</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="medicos"
                  value={antecedentes.medicos}
                  onChange={handleAntecedentesChange}
                  placeholder="Enfermedades crónicas, hospitalizaciones previas, etc."
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Antecedentes Quirúrgicos</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="quirurgicos"
                  value={antecedentes.quirurgicos}
                  onChange={handleAntecedentesChange}
                  placeholder="Cirugías previas, fechas, etc."
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Antecedentes Alérgicos</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="alergicos"
                  value={antecedentes.alergicos}
                  onChange={handleAntecedentesChange}
                  placeholder="Alergias a medicamentos, alimentos, etc."
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Antecedentes Familiares</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="familiares"
                  value={antecedentes.familiares}
                  onChange={handleAntecedentesChange}
                  placeholder="Enfermedades hereditarias en la familia"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Tab>
        
        <Tab eventKey="tratamientos" title="Tratamientos">
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <h5 className="mb-0 d-flex align-items-center">
                <FaPills className="me-2" />
                Tratamientos Actuales
              </h5>
              <Button variant="primary" size="sm" onClick={addTratamiento}>
                Agregar Tratamiento
              </Button>
            </Card.Header>
            <Card.Body>
              {tratamientos.map((tratamiento, index) => (
                <div key={index} className="border-bottom pb-3 mb-3">
                  <Row className="mb-2">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Medicamento</Form.Label>
                        <Form.Control
                          type="text"
                          name="medicamento"
                          value={tratamiento.medicamento}
                          onChange={(e) => handleTratamientoChange(index, e)}
                          required
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
                          required
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
                          required
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
                    <Col md={6} className="d-flex align-items-end justify-content-end">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeTratamiento(index)}
                      >
                        Eliminar
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
              
              {tratamientos.length === 0 && (
                <div className="text-center text-muted py-3">
                  No hay tratamientos registrados
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>
        
        <Tab eventKey="notas" title="Notas Clínicas">
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <h5 className="mb-0 d-flex align-items-center">
                <FaNotesMedical className="me-2" />
                Notas Clínicas
              </h5>
              <Button variant="primary" size="sm" onClick={addNota}>
                Agregar Nota
              </Button>
            </Card.Header>
            <Card.Body>
              {notas.map((nota, index) => (
                <Card key={index} className="mb-3">
                  <Card.Header className="d-flex justify-content-between align-items-center py-2">
                    <div className="d-flex align-items-center">
                      <Badge bg="light" text="dark" className="me-2">
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
                      rows={3}
                      name="contenido"
                      value={nota.contenido}
                      onChange={(e) => handleNotaChange(index, e)}
                      placeholder="Registre aquí la evolución, diagnóstico, tratamiento, etc."
                    />
                  </Card.Body>
                </Card>
              ))}
              
              {notas.length === 0 && (
                <div className="text-center text-muted py-3">
                  No hay notas clínicas registradas
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
      
      <div className="text-end">
        <Button variant="primary" size="lg" onClick={handleSubmit}>
          Guardar Ficha Médica
        </Button>
      </div>
    </Container>
  );
};

export default FichaMedica;