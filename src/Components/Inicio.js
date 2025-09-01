import React from 'react';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { 
  FaHeartbeat, 
  FaUserMd, 
  FaNewspaper, 
  FaBookMedical, 
  FaCalendarAlt,
  FaLightbulb,
  FaTint,
  FaGlassWhiskey,
  FaRunning,
  FaAppleAlt,
  FaUtensils,
  FaMoon,
  FaBed
} from 'react-icons/fa';

const Inicio = () => {
  return (
    <div className="container mt-4">
      {/* Card de bienvenida */}
      <Card className="mb-4 shadow-sm border-primary">
        <Card.Body>
          <Card.Title className="text-primary">
            <FaHeartbeat className="me-2" />
            Bienvenido a Información en Salud
          </Card.Title>
          <Card.Text>
            Este sitio proporciona información confiable y actualizada sobre diversos temas de salud.
            Navega por nuestro menú para encontrar información sobre enfermedades comunes, medidas de prevención
            y cómo contactar con profesionales de la salud.
          </Card.Text>
          <Button variant="primary">Más información</Button>
        </Card.Body>
      </Card>

      {/* Cards en grid */}
      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Card className="h-100 shadow-sm border-success">
            <Card.Body>
              <Card.Title className="text-success">
                <FaUserMd className="me-2" />
                Consulta Virtual
              </Card.Title>
              <Card.Text>
                Agenda una consulta con nuestros especialistas desde la comodidad de tu hogar.
              </Card.Text>
              <Button variant="outline-success" size="sm">Agendar cita</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="h-100 shadow-sm border-info">
            <Card.Body>
              <Card.Title className="text-info">
                <FaBookMedical className="me-2" />
                Enciclopedia Médica
              </Card.Title>
              <Card.Text>
                Accede a nuestra base de datos con información detallada sobre enfermedades y tratamientos.
              </Card.Text>
              <Button variant="outline-info" size="sm">Explorar</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="h-100 shadow-sm border-warning">
            <Card.Body>
              <Card.Title className="text-warning">
                <FaCalendarAlt className="me-2" />
                Calendario de Vacunación
              </Card.Title>
              <Card.Text>
                Consulta el calendario de vacunación recomendado para todas las edades.
              </Card.Text>
              <Button variant="outline-warning" size="sm">Ver calendario</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Noticias de salud */}
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-danger text-white">
          <FaNewspaper className="me-2" />
          Últimas Noticias de Salud
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Card className="h-100">
                <Card.Img variant="top" src="https://www.savalnet.bo/medios/cyc/articulos/2020/639198cg001.png" />
                <Card.Body>
                  <Card.Title>Nuevas recomendaciones para la vacunación contra la influenza</Card.Title>
                  <Card.Text>
                    La OMS actualiza sus recomendaciones para la temporada de influenza 2023.
                  </Card.Text>
                  <Button variant="link" className="p-0">Leer más...</Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100">
                <Card.Img variant="top" src="https://diabetes.sjdhospitalbarcelona.org/sites/default/files/styles/big/public/field/image/sensor-glucosa-preguntas-frecuentes-guia-diabetes.jpg?itok=Q14wt79V" />
                <Card.Body>
                  <Card.Title>Avances en el tratamiento de la diabetes tipo 2</Card.Title>
                  <Card.Text>
                    Nuevos estudios revelan tratamientos más efectivos para controlar la diabetes.
                  </Card.Text>
                  <Button variant="link" className="p-0">Leer más...</Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100">
                <Card.Img variant="top" src="https://arc-anglerfish-arc2-prod-infobae.s3.amazonaws.com/public/6TGT6VUP6FAPRFRHTGRRCDMER4.jpg" />
                <Card.Body>
                  <Card.Title>Salud mental en tiempos difíciles</Card.Title>
                  <Card.Text>
                    Expertos comparten consejos para mantener el bienestar emocional durante crisis.
                  </Card.Text>
                  <Button variant="link" className="p-0">Leer más...</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Consejos rápidos - Versión mejorada */}
      <Card className="shadow-sm mt-4">
        <Card.Header className="bg-success text-white d-flex align-items-center">
          <FaLightbulb className="me-2" />
          <strong>Consejos Rápidos de Salud</strong>
        </Card.Header>
        <Card.Body>
          <Row>
            {/* Hidratación */}
            <Col md={3} className="mb-3">
              <Card className="h-100 border-top border-top-4 border-info">
                <Card.Body className="text-center">
                  <FaTint className="text-info mb-3" size={32} />
                  <Card.Title className="text-info">Hidratación</Card.Title>
                  <Card.Text>
                    Bebe al menos 2 litros de agua al día para mantener tu cuerpo hidratado.
                  </Card.Text>
                  <Badge bg="info" pill>
                    <FaGlassWhiskey className="me-1" /> Agua
                  </Badge>
                </Card.Body>
              </Card>
            </Col>

            {/* Ejercicio */}
            <Col md={3} className="mb-3">
              <Card className="h-100 border-top border-top-4 border-primary">
                <Card.Body className="text-center">
                  <FaRunning className="text-primary mb-3" size={32} />
                  <Card.Title className="text-primary">Ejercicio</Card.Title>
                  <Card.Text>
                    30 minutos de actividad física diaria mejoran tu salud cardiovascular.
                  </Card.Text>
                  <Badge bg="primary" pill>
                    <FaHeartbeat className="me-1" /> Movimiento
                  </Badge>
                </Card.Body>
              </Card>
            </Col>

            {/* Alimentación */}
            <Col md={3} className="mb-3">
              <Card className="h-100 border-top border-top-4 border-warning">
                <Card.Body className="text-center">
                  <FaAppleAlt className="text-warning mb-3" size={32} />
                  <Card.Title className="text-warning">Alimentación</Card.Title>
                  <Card.Text>
                    Consume 5 porciones de frutas y verduras al día para una dieta balanceada.
                  </Card.Text>
                  <Badge bg="warning" text="dark" pill>
                    <FaUtensils className="me-1" /> Nutrición
                  </Badge>
                </Card.Body>
              </Card>
            </Col>

            {/* Sueño */}
            <Col md={3} className="mb-3">
              <Card className="h-100 border-top border-top-4 border-secondary">
                <Card.Body className="text-center">
                  <FaMoon className="text-secondary mb-3" size={32} />
                  <Card.Title className="text-secondary">Sueño</Card.Title>
                  <Card.Text>
                    Dormir 7-8 horas diarias es esencial para tu salud física y mental.
                  </Card.Text>
                  <Badge bg="secondary" pill>
                    <FaBed className="me-1" /> Descanso
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Inicio;