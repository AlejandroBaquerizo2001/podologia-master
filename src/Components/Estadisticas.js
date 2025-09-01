import React from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { 
  FaUserInjured, FaCalendarAlt, FaPills, FaChartLine, 
  FaClinicMedical, FaProcedures, FaSyringe, 
  FaHeartbeat
} from 'react-icons/fa';
import { MdSick } from 'react-icons/md';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const Estadisticas = () => {
  // Configuración común para gráficas
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    animation: {
      duration: 2000,
    },
    maintainAspectRatio: false
  };

  // Datos para las gráficas
  const enfermedadesData = {
    labels: ['Gripe', 'Diabetes', 'Hipertensión', 'Asma', 'Alergias', 'COVID-19'],
    datasets: [
      {
        label: 'Casos reportados',
        data: [120, 85, 76, 45, 92, 68],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const tratamientosData = {
    labels: ['Medicamentos', 'Cirugías', 'Terapias', 'Vacunas', 'Rehabilitación'],
    datasets: [
      {
        label: 'Tratamientos aplicados',
        data: [320, 45, 78, 210, 95],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const pacientesData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Pacientes atendidos',
        data: [65, 59, 80, 81, 56, 72, 85, 78, 92, 88, 76, 95],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2
      },
    ],
  };

  const edadData = {
    labels: ['0-18', '19-30', '31-45', '46-60', '61+'],
    datasets: [
      {
        label: 'Distribución por edad',
        data: [120, 210, 185, 150, 90],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Métricas de progreso
  const progressMetrics = [
    { title: 'Ocupación hospitalaria', value: 75, variant: 'info' },
    { title: 'Pacientes satisfechos', value: 92, variant: 'success' },
    { title: 'Citas completadas', value: 88, variant: 'primary' },
    { title: 'Tratamientos exitosos', value: 85, variant: 'warning' }
  ];

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4 text-center" style={{ color: '#2c3e50' }}>
        <FaChartLine className="me-2" />
        Dashboard Estadístico de Salud
      </h2>
      
      {/* Tarjetas de métricas */}
      <Row className="g-4 mb-4">
        <Col md={6} lg={3}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="text-center">
              <div className="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle mb-3">
                <FaUserInjured size={24} />
              </div>
              <Card.Title className="text-muted">Total de Pacientes</Card.Title>
              <Card.Text className="display-5 fw-bold" style={{ color: '#2c3e50' }}>1,245</Card.Text>
              <small className="text-success">
                <span className="me-1">↑</span> 12.5% desde el mes pasado
              </small>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="text-center">
              <div className="icon-lg bg-info bg-opacity-10 text-info rounded-circle mb-3">
                <FaCalendarAlt size={24} />
              </div>
              <Card.Title className="text-muted">Citas este mes</Card.Title>
              <Card.Text className="display-5 fw-bold" style={{ color: '#2c3e50' }}>186</Card.Text>
              <small className="text-success">
                <span className="me-1">↑</span> 8.3% desde el mes pasado
              </small>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="text-center">
              <div className="icon-lg bg-warning bg-opacity-10 text-warning rounded-circle mb-3">
                <FaPills size={24} />
              </div>
              <Card.Title className="text-muted">Tratamientos</Card.Title>
              <Card.Text className="display-5 fw-bold" style={{ color: '#2c3e50' }}>653</Card.Text>
              <small className="text-danger">
                <span className="me-1">↓</span> 3.2% desde el mes pasado
              </small>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="text-center">
              <div className="icon-lg bg-success bg-opacity-10 text-success rounded-circle mb-3">
                <FaClinicMedical size={24} />
              </div>
              <Card.Title className="text-muted">Cirugías</Card.Title>
              <Card.Text className="display-5 fw-bold" style={{ color: '#2c3e50' }}>45</Card.Text>
              <small className="text-success">
                <span className="me-1">↑</span> 5.7% desde el mes pasado
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Gráficas principales */}
      <Row className="g-4 mb-4">
        <Col lg={8}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <FaChartLine className="me-2 text-primary" />
                Pacientes atendidos por mes
              </Card.Title>
              <div style={{ height: '300px' }}>
                <Line 
                  data={pacientesData} 
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: {
                        display: true,
                        text: 'Tendencia anual de pacientes',
                        font: { size: 16 }
                      }
                    }
                  }} 
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <FaProcedures className="me-2 text-info" />
                Distribución por edad
              </Card.Title>
              <div style={{ height: '300px' }}>
                <Doughnut 
                  data={edadData} 
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: {
                        display: true,
                        text: 'Grupos de edad',
                        font: { size: 16 }
                      }
                    }
                  }} 
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Segunda fila de gráficas */}
      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <MdSick className="me-2 text-danger" />
                Enfermedades más comunes
              </Card.Title>
              <div style={{ height: '300px' }}>
                <Bar 
                  data={enfermedadesData} 
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: {
                        display: true,
                        text: 'Casos reportados en el último trimestre',
                        font: { size: 16 }
                      }
                    }
                  }} 
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <FaSyringe className="me-2 text-success" />
                Distribución de tratamientos
              </Card.Title>
              <div style={{ height: '300px' }}>
                <Pie 
                  data={tratamientosData} 
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: {
                        display: true,
                        text: 'Tipos de tratamientos aplicados',
                        font: { size: 16 }
                      }
                    }
                  }} 
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Barras de progreso */}
      <Row className="g-4">
        <Col md={12}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="d-flex align-items-center mb-4">
                <FaHeartbeat className="me-2 text-danger" />
                Métricas de desempeño
              </Card.Title>
              <Row>
                {progressMetrics.map((metric, index) => (
                  <Col md={3} key={index}>
                    <h6 className="text-muted mb-3">{metric.title}</h6>
                    <ProgressBar 
                      now={metric.value} 
                      variant={metric.variant} 
                      animated 
                      className="mb-3"
                      label={`${metric.value}%`}
                    />
                    <div className="d-flex justify-content-between small">
                      <span>Meta: 90%</span>
                      <span className={metric.value >= 90 ? 'text-success' : 'text-warning'}>
                        {metric.value >= 90 ? '✅ Cumplida' : '⚠️ Pendiente'}
                      </span>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Estadisticas;