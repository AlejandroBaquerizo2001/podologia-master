import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import {
  FaShieldVirus, FaHospitalAlt, FaHandsHelping, FaDumbbell,
  FaBrain, FaHeartbeat
} from 'react-icons/fa';

const Tratamiento = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center text-primary mb-3">Tratamientos Médicos</h2>
      <p className="lead text-center text-muted mb-5">
        Existen diversos tipos de tratamientos médicos que se aplican según la etapa, gravedad y naturaleza de una enfermedad.
        A continuación, se presentan las principales categorías:
      </p>

      <Row className="g-4">
        {/* Preventivos */}
        <Col md={6} lg={4}>
          <Card className="h-100 border-success shadow-sm hover-shadow transition">
            <Card.Header className="bg-success text-white d-flex align-items-center">
              <FaShieldVirus className="me-2" />
              <strong>Preventivos</strong>
            </Card.Header>
            <Card.Body>
              <ul>
                <li>Vacunación</li>
                <li>Suplementos vitamínicos</li>
                <li>Chequeos regulares</li>
              </ul>
            </Card.Body>
            <Card.Footer className="text-muted small">
              Reducen el riesgo de contraer enfermedades antes de que aparezcan.
            </Card.Footer>
          </Card>
        </Col>

        {/* Curativos */}
        <Col md={6} lg={4}>
          <Card className="h-100 border-primary shadow-sm">
            <Card.Header className="bg-primary text-white d-flex align-items-center">
              <FaHospitalAlt className="me-2" />
              <strong>Curativos</strong>
            </Card.Header>
            <Card.Body>
              <ul>
                <li>Antibióticos y antivirales</li>
                <li>Cirugías correctivas</li>
                <li>Quimioterapia</li>
              </ul>
            </Card.Body>
            <Card.Footer className="text-muted small">
              Buscan eliminar la causa de la enfermedad.
            </Card.Footer>
          </Card>
        </Col>

        {/* Paliativos */}
        <Col md={6} lg={4}>
          <Card className="h-100 border-warning shadow-sm">
            <Card.Header className="bg-warning text-dark d-flex align-items-center">
              <FaHandsHelping className="me-2" />
              <strong>Paliativos</strong>
            </Card.Header>
            <Card.Body>
              <ul>
                <li>Manejo del dolor</li>
                <li>Apoyo emocional</li>
                <li>Terapias complementarias</li>
              </ul>
            </Card.Body>
            <Card.Footer className="text-muted small">
              Mejoran la calidad de vida sin curar la enfermedad.
            </Card.Footer>
          </Card>
        </Col>

        {/* Rehabilitación */}
        <Col md={6} lg={4}>
          <Card className="h-100 border-info shadow-sm">
            <Card.Header className="bg-info text-white d-flex align-items-center">
              <FaDumbbell className="me-2" />
              <strong>Rehabilitación</strong>
            </Card.Header>
            <Card.Body>
              <ul>
                <li>Fisioterapia</li>
                <li>Terapia del lenguaje</li>
                <li>Reeducación funcional</li>
              </ul>
            </Card.Body>
            <Card.Footer className="text-muted small">
              Ayudan a recuperar habilidades físicas o cognitivas.
            </Card.Footer>
          </Card>
        </Col>

        {/* Psicoterapéuticos */}
        <Col md={6} lg={4}>
          <Card className="h-100 border-danger shadow-sm">
            <Card.Header className="bg-danger text-white d-flex align-items-center">
              <FaBrain className="me-2" />
              <strong>Psicoterapéuticos</strong>
            </Card.Header>
            <Card.Body>
              <ul>
                <li>Psicoterapia individual o grupal</li>
                <li>Terapia cognitivo-conductual</li>
                <li>Manejo de trastornos emocionales</li>
              </ul>
            </Card.Body>
            <Card.Footer className="text-muted small">
              Abordan aspectos emocionales, mentales y conductuales.
            </Card.Footer>
          </Card>
        </Col>

        {/* Crónicos o prolongados */}
        <Col md={6} lg={4}>
          <Card className="h-100 border-secondary shadow-sm">
            <Card.Header className="bg-secondary text-white d-flex align-items-center">
              <FaHeartbeat className="me-2" />
              <strong>Crónicos</strong>
            </Card.Header>
            <Card.Body>
              <ul>
                <li>Diabetes: control glucémico</li>
                <li>Hipertensión: medicamentos diarios</li>
                <li>Enfermedades respiratorias</li>
              </ul>
            </Card.Body>
            <Card.Footer className="text-muted small">
              Son tratamientos a largo plazo para condiciones persistentes.
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* Sección final de recomendaciones */}
      <Card className="mt-5 border-dark shadow-sm">
        <Card.Body>
          <h4 className="text-dark">Recomendaciones Generales</h4>
          <ul>
            <li>Consulta siempre con un profesional antes de iniciar cualquier tratamiento.</li>
            <li>El diagnóstico oportuno mejora la eficacia terapéutica.</li>
            <li>Combinar tratamientos médicos con hábitos de vida saludables potencia los resultados.</li>
          </ul>
        </Card.Body>
        <Card.Footer className="text-muted text-center small">
          Información general. No sustituye el consejo de un médico.
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Tratamiento;
