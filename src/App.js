import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import PlanesCobro from './Components/PlanesCobro';
import FichaMedica from './Components/FichaMedica';
import Estadisticas from './Components/Estadisticas';
import Agendamiento from './Components/Agendamiento';
import Inicio from './Components/Inicio';
import Tratamiento from './Components/Tratamiento';
import Contacto from './Components/Contacto';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgotPassword from './Auth/ForgotPassword';
import Gratis from './Components/Gratis'; // Importación añadida
import AsistenteAi from './Components/AsistenteAi';
import Fichas from './Components/SubComponents/Fichas';
import Agenda from './Components/SubComponents/Agenda';
import Biblioteca from './Components/SubComponents/Biblioteca';
import Resultados from './Components/SubComponents/Resultados';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [user, setUser] = useState(null);

  const isAuthPage = ['login', 'register', 'forgot-password', 'gratis'].includes(activeTab);
   const isDashboard = activeTab === 'dashboard';
   const showSidebar = !isAuthPage && !isDashboard && activeTab !== 'inicio';
  const handleLogin =  (userData) => {
    setUser(userData);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('inicio');
  };

  const renderTab = () => {
     console.log('Active tab:', activeTab);
    switch (activeTab) {
      case 'inicio':
        return <Inicio />;
      case 'ficha-medica':
        return <FichaMedica />;
      case 'estadisticas':
        return <Estadisticas />;
      case 'planes-cobro':
        return <PlanesCobro />;
      case 'agendamiento':
        return <Agendamiento />;
      case 'tratamiento':
        return <Tratamiento />;
      case 'contacto':
        return <Contacto />;
      case 'login':
        return <Login setActiveTab={setActiveTab}  onLogin={handleLogin} />;
      case 'register':
        return <Register setActiveTab={setActiveTab} />;
      case 'forgot-password':
        return <ForgotPassword setActiveTab={setActiveTab} />;
      case 'gratis': // Caso añadido
        return <Gratis setActiveTab={setActiveTab} />;
      case 'fichas':
        return <Fichas />;
      case 'agenda':
        return <Agenda />;
      case 'biblioteca':
        return <Biblioteca />;
      case 'resultados':
        return <Resultados />;
      case 'Ai':
        return <AsistenteAi />;
        case 'dashboard':
        return <Dashboard user={user} onLogout={handleLogout} />;
      default:
        return <Inicio />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header solo visible si no está en el dashboard */}
      {!isDashboard && (
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
            Podiatry for Professionals
          </h1>
          
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            {!isAuthPage ? (
              <>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => setActiveTab('login')}
                  style={{ fontWeight: '600' }}
                >
                  Login
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => setActiveTab('gratis')}
                  style={{ fontWeight: '600' }}
                >
                  Comienza Gratis
                </button>
              </>
            ) : (
              <button
                className="btn btn-outline-light"
                onClick={() => setActiveTab('inicio')}
                style={{ fontWeight: '600' }}
              >
                Back to Home
              </button>
            )}
          </div>
        </header>
      )}
      
      <Container fluid className="flex-grow-1 p-0">
        <Row className="g-0">
          {!isAuthPage && !isDashboard &&  (
            <Col md={3}  className="sidebar p-0" style={{
              background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
              borderRight: '1px solid rgba(0, 0, 0, 0.1)',
              minHeight: 'calc(100vh - 112px)'
            }}>
              <Nav className="flex-column p-3 sticky-top" style={{ top: '20px' }}>
                <Nav.Link 
                  active={activeTab === 'inicio'} 
                  onClick={() => setActiveTab('inicio')}
                  className={`mb-2 nav-link-custom ${activeTab === 'inicio' ? 'active' : ''}`}
                  style={{ color: '#3a7bd5' }}
                >
                  <i className="bi bi-house-door me-2"></i>Home
                </Nav.Link>
                <Nav.Link 
                  active={activeTab === 'ficha-medica'} 
                  onClick={() => setActiveTab('ficha-medica')}
                  className={`mb-2 nav-link-custom ${activeTab === 'ficha-medica' ? 'active' : ''}`}
                  style={{ color: '#3a7bd5' }}
                >

                 <i className="bi bi-heart-pulse me-2"></i>Medical Records
                </Nav.Link>


                {/* Menú Funcionalidades */}
                <Nav.Link 
                  onClick={() => setShowSubmenu(!showSubmenu)}
                  className={`mb-2 nav-link-custom ${showSubmenu ? 'active' : ''}`}
                  style={{ color: '#3a7bd5' }}
                >
                  <i className="bi bi-list me-2"></i>Funcionalidades
                </Nav.Link>
                {showSubmenu && (
                  <div className="ms-3">
                    <Nav.Link 
                      active={activeTab === 'fichas'} 
                      onClick={() => { setActiveTab('fichas'); setShowSubmenu(false); }}
                      className={`mb-2 nav-link-custom ${activeTab === 'fichas' ? 'active' : ''}`}
                    >
                      Fichas
                    </Nav.Link>
                    <Nav.Link 
                      active={activeTab === 'agenda'} 
                      onClick={() => { setActiveTab('agenda'); setShowSubmenu(false); }}
                      className={`mb-2 nav-link-custom ${activeTab === 'agenda' ? 'active' : ''}`}
                    >
                      Agenda
                    </Nav.Link>
                    <Nav.Link 
                      active={activeTab === 'biblioteca'} 
                      onClick={() => { setActiveTab('biblioteca'); setShowSubmenu(false); }}
                      className={`mb-2 nav-link-custom ${activeTab === 'biblioteca' ? 'active' : ''}`}
                    >
                      Biblioteca
                    </Nav.Link>
                    <Nav.Link 
                      active={activeTab === 'resultados'} 
                      onClick={() => { setActiveTab('resultados'); setShowSubmenu(false); }}
                      className={`mb-2 nav-link-custom ${activeTab === 'resultados' ? 'active' : ''}`}
                    >
                      Resultados
                    </Nav.Link>
                  </div>
                )}

                
                <Nav.Link 
                  active={activeTab === 'planes-cobro'} 
                  onClick={() => setActiveTab('planes-cobro')}
                  className={`mb-2 nav-link-custom ${activeTab === 'prevencion' ? 'active' : ''}`}
                  style={{ color: '#3a7bd5' }}
                >
                  <i className="bi bi-shield-check me-2"></i>Subscription Plans
                </Nav.Link>
                <Nav.Link 
                  active={activeTab === 'tratamiento'} 
                  onClick={() => setActiveTab('tratamiento')}
                  className={`mb-2 nav-link-custom ${activeTab === 'tratamiento' ? 'active' : ''}`}
                  style={{ color: '#3a7bd5' }}
                >
                  <i className="bi bi-capsule me-2"></i>Treatments and Tips
                </Nav.Link>
                <Nav.Link 
                  active={activeTab === 'agendamiento'} 
                  onClick={() => setActiveTab('agendamiento')}
                  className={`mb-2 nav-link-custom ${activeTab === 'agendamiento' ? 'active' : ''}`}
                  style={{ color: '#3a7bd5' }}
                >
                  <i className="bi bi-calendar-check me-2"></i>Appointments and Scheduling
                </Nav.Link>
                <Nav.Link 
                  active={activeTab === 'estadisticas'} 
                  onClick={() => setActiveTab('estadisticas')}
                  className={`mb-2 nav-link-custom ${activeTab === 'estadisticas' ? 'active' : ''}`}
                  style={{ color: '#3a7bd5' }}
                >
                  <i className="bi bi-graph-up me-2"></i>Statistical data
                </Nav.Link>
                <Nav.Link 
                  active={activeTab === 'contacto'} 
                  onClick={() => setActiveTab('contacto')}
                  className={`mb-2 nav-link-custom ${activeTab === 'contacto' ? 'active' : ''}`}
                  style={{ color: '#3a7bd5' }}
                >
                  <i className="bi bi-envelope me-2"></i>Contacts
                </Nav.Link>
                <Nav.Link
                active={activeTab === 'Ai'}
                onClick={() => setActiveTab('Ai')}
                className={`mb-2 nav-link-custom ${activeTab === 'Ai' ? 'active' : ''}`}
                style={{ color: '#3a7bd5' }}
              >
                <i className="bi bi-chat me-2"></i>Asistente Virtual 
              </Nav.Link> 
              </Nav>
            </Col>
          )}

          <Col 
             md={isAuthPage || isDashboard ? 12 : 9} 
            lg={isAuthPage || isDashboard ? 12 : 9}
             className="main-content p-4" 
            style={{ 
             backgroundColor: '#fefefe',
             boxShadow: (isAuthPage || isDashboard) ? 'none' : 'inset 5px 0 15px -5px rgba(0, 0, 0, 0.05)'
           }}
            >
             {renderTab()}
          </Col>

        </Row>
      </Container>

      {/* Footer solo visible si no está en el dashboard */}
      {!isDashboard && (
        <footer className="text-white text-center p-3 mt-auto" style={{
          background: 'linear-gradient(135deg, #3a7bd5, #00d2ff)',
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <p className="mb-0">© {new Date().getFullYear()} Información en Salud. Todos los derechos reservados</p>
          <p className="mb-0">Este sitio es solo para fines informativos y no sustituye el consejo médico profesional.</p>
        </footer>
      )}

    </div>
  );
}

export default App;