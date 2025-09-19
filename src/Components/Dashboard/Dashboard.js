import React, { useState } from 'react';
import { Container, Row, Col, Nav, Card, Dropdown } from 'react-bootstrap';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import FichasMedicas from './FichasMedicas';
import Agendas from './Agendas';
import Bibliotecas from './Bibliotecas';
import Resultado from './Resultado';
import AIAsistente from './AIAsistente';
import Perfil from './Perfil';

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('fichas');
  const [showSubmenu, setShowSubmenu] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case 'fichas':
        return <FichasMedicas />;
      case 'agenda':
        return <Agendas />;
      case 'biblioteca':
        return <Bibliotecas />;
      case 'resultados':
        return <Resultado />;
      case 'ai':
        return <AIAsistente />;
      case 'perfil':
        return <Perfil userData={user} />;
      default:
        return <FichasMedicas />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}

      <header className="p-3 text-white" style={{
        background: 'linear-gradient(135deg, #3a7bd5, #00d2ff)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ flex: 1 }}></div>
        
        <h1 className="text-center" style={{
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          fontWeight: '600',
          letterSpacing: '1px'
        }}>
          Dashboard Podología
        </h1>
        
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Dropdown>
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
              <FaUserCircle className="me-2" />
              {user?.email || 'Usuario'}
            </Dropdown.Toggle>
            
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setActiveTab('perfil')}>
                <FaUserCircle className="me-2" />
                Perfil: {user?.email}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={onLogout}>
                <FaSignOutAlt className="me-2" />
                Cerrar Sesión
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>

      <Container fluid className="flex-grow-1 p-0">
        <Row className="g-0">
          {/* Sidebar */}
          <Col md={3} className="sidebar p-0" style={{
            background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
            borderRight: '1px solid rgba(0, 0, 0, 0.1)',
            minHeight: 'calc(100vh - 112px)'
          }}>
            <Nav className="flex-column p-3 sticky-top" style={{ top: '20px' }}>
              <Nav.Link
                active={activeTab === 'fichas'}
                onClick={() => setActiveTab('fichas')}
                className={`mb-2 nav-link-custom ${activeTab === 'fichas' ? 'active' : ''}`}
                style={{ color: '#3a7bd5' }}
              >
                <i className="bi bi-file-medical me-2"></i>Fichas Médicas
              </Nav.Link>
              
              <Nav.Link
                active={activeTab === 'agenda'}
                onClick={() => setActiveTab('agenda')}
                className={`mb-2 nav-link-custom ${activeTab === 'agenda' ? 'active' : ''}`}
                style={{ color: '#3a7bd5' }}
              >
                <i className="bi bi-calendar-event me-2"></i>Agenda
              </Nav.Link>
              
              <Nav.Link
                active={activeTab === 'biblioteca'}
                onClick={() => setActiveTab('biblioteca')}
                className={`mb-2 nav-link-custom ${activeTab === 'biblioteca' ? 'active' : ''}`}
                style={{ color: '#3a7bd5' }}
              >
                <i className="bi bi-book me-2"></i>Biblioteca
              </Nav.Link>
              
              <Nav.Link
                active={activeTab === 'resultados'}
                onClick={() => setActiveTab('resultados')}
                className={`mb-2 nav-link-custom ${activeTab === 'resultados' ? 'active' : ''}`}
                style={{ color: '#3a7bd5' }}
              >
                <i className="bi bi-graph-up me-2"></i>Resultados
              </Nav.Link>
              
              <Nav.Link
                active={activeTab === 'ai'}
                onClick={() => setActiveTab('ai')}
                className={`mb-2 nav-link-custom ${activeTab === 'ai' ? 'active' : ''}`}
                style={{ color: '#3a7bd5' }}
              >
                <i className="bi bi-robot me-2"></i>Asistente IA
              </Nav.Link>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col md={9} className="main-content p-4" style={{
            backgroundColor: '#fefefe',
            boxShadow: 'inset 5px 0 15px -5px rgba(0, 0, 0, 0.05)'
          }}>
            {renderTab()}
          </Col>
        </Row>
      </Container>

      <footer className="text-white text-center p-3 mt-auto" style={{
        background: 'linear-gradient(135deg, #3a7bd5, #00d2ff)',
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <p className="mb-0">© {new Date().getFullYear()} Información en Salud. Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Dashboard;