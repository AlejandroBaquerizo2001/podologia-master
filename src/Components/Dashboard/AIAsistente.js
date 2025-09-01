import React, { useState, useRef, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Container, Row, Col, Form, Button, Card, ListGroup, Badge, 
  FloatingLabel, InputGroup, Spinner, Image, Alert, Modal
} from 'react-bootstrap';
import { FiSend, FiUpload, FiMic, FiMicOff, FiHelpCircle, FiX } from 'react-icons/fi';

// Constantes para mejorar mantenibilidad
const AVATARS = {
  bot: 'https://i.pinimg.com/564x/69/bf/93/69bf93e9e35d54b832cbb55d38191ae1.jpg',
  user: 'https://i.pinimg.com/564x/69/bf/93/69bf93e9e35d54b832cbb55d38191ae1.jpg',
  system: 'https://i.pinimg.com/564x/69/bf/93/69bf93e9e35d54b832cbb55d38191ae1.jpg'
};

const MESSAGE_TYPES = {
  BOT: 'bot',
  USER: 'user',
  SYSTEM: 'system'
};

// Simulación de API (reemplazar con tu endpoint real)
const mockApiCall = async (message) => {
  // Simular delay de red variable
  const delay = Math.floor(Math.random() * 1000) + 1000;
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Respuestas temáticas de Natlan
  const responses = [
    `Las llamas de Natlan revelan que "${message}" es significativo en tu camino. Sigue tu instinto, viajero. 🔥`,
    `Los ancestros de Natlan susurran: "${message.toUpperCase()}" contiene la esencia de tu próxima aventura. 🌋`,
    `El fuego sagrado muestra visiones sobre "${message}". Confía en el camino que se abre ante ti. 🔮`,
    `En la tradición de Natlan, "${message}" representa un desafío que fortalecerá tu espíritu. 💪`,
    `Los guerreros de Natlan interpretarían "${message}" como una señal para avanzar con valentía. ⚔️`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const AsistenteAi = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  // Mensaje de bienvenida con temática Natlan
  useEffect(() => {
    setMessages([
      { 
        text: '¡Saludos, viajero! Soy tu guía en las tierras de Natlan. ¿En qué puedo servirte hoy? 🔥', 
        sender: MESSAGE_TYPES.BOT,
        avatar: AVATARS.bot,
        timestamp: new Date()
      }
    ]);
  }, []);

  // Auto-scroll con throttling para mejor rendimiento
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
      });
    };
    
    scrollToBottom();
  }, [messages]);

  // Limpiar recognition al desmontar
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Enviar mensaje con useCallback para optimización
  const handleSendMessage = useCallback(async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      text: inputMessage, 
      sender: MESSAGE_TYPES.USER,
      avatar: AVATARS.user,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      // Reemplazar con tu llamada API real
      const response = await mockApiCall(inputMessage);
      
      const botMessage = {
        text: response, 
        sender: MESSAGE_TYPES.BOT,
        avatar: AVATARS.bot,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError('El fuego sagrado se ha apagado momentáneamente. Por favor, intenta nuevamente.');
      console.error('Error en la API:', err);
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, isLoading]);

  // Voz a texto (Web Speech API) mejorado
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setError('Tu navegador no soporta reconocimiento de voz. Por favor, utiliza Chrome o Edge.');
      return;
    }

    // Detener reconocimiento previo si existe
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'es-ES';
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    
    recognitionRef.current.start();
    setIsListening(true);
    setError(null);

    recognitionRef.current.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInputMessage(prev => prev + transcript);
      setIsListening(false);
      
      // Enfocar el input después de reconocimiento
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    };

    recognitionRef.current.onerror = (e) => {
      setIsListening(false);
      if (e.error === 'not-allowed') {
        setError('Permiso de micrófono no concedido. Por favor, permite el acceso al micrófono.');
      } else {
        setError('Error en el reconocimiento de voz. Intenta nuevamente.');
      }
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  };

  // Subir archivo con validación
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    // Validar tipo de archivo y tamaño (max 5MB)
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(uploadedFile.type)) {
      setError('Tipo de archivo no válido. Solo se permiten JPEG, PNG, PDF o TXT.');
      return;
    }

    if (uploadedFile.size > maxSize) {
      setError('El archivo es demasiado grande. El tamaño máximo permitido es 5MB.');
      return;
    }

    setFile(uploadedFile);
    setMessages(prev => [...prev, { 
      text: `Archivo cargado: ${uploadedFile.name} (${(uploadedFile.size / 1024).toFixed(2)} KB)`,
      sender: MESSAGE_TYPES.SYSTEM,
      avatar: AVATARS.system,
      timestamp: new Date()
    }]);
    setError(null);
  };

  // Eliminar archivo seleccionado
  const handleRemoveFile = () => {
    setFile(null);
    setMessages(prev => [...prev, { 
      text: 'Archivo removido',
      sender: MESSAGE_TYPES.SYSTEM,
      avatar: AVATARS.system,
      timestamp: new Date()
    }]);
  };

  // Formatear timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column p-0 bg-dark">
      {/* Header estilo Natlan */}
      <Row className="bg-danger text-warning p-3 shadow-lg align-items-center">
        <Col className="d-flex align-items-center">
          <Image 
            src={AVATARS.bot}
            roundedCircle 
            width="40" 
            height="40" 
            className="me-3 border border-warning"
          />
          <div className="flex-grow-1">
            <h4 className="mb-0 text-uppercase">Guía de Natlan</h4>
            <small className="text-warning">Domina el fuego de la sabiduría</small>
          </div>
          <Button 
            variant="outline-warning" 
            size="sm"
            onClick={() => setShowHelp(true)}
            title="Ayuda"
          >
            <FiHelpCircle />
          </Button>
        </Col>
      </Row>

      {/* Área de mensajes */}
      <Row className="flex-grow-1 overflow-auto p-3 bg-dark">
        <Col>
          {error && (
            <Alert 
              variant="danger" 
              className="py-2"
              dismissible
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}
          
          <Card className="h-100 border border-warning bg-transparent">
            <Card.Body className="d-flex flex-column p-0">
              <ListGroup variant="flush" className="flex-grow-1 overflow-auto p-3 bg-dark">
                {messages.map((msg, index) => (
                  <ListGroup.Item 
                    key={index} 
                    className={`mb-3 border-0 p-3 ${msg.sender === MESSAGE_TYPES.USER 
                      ? 'bg-primary ms-auto rounded-start-4' 
                      : msg.sender === MESSAGE_TYPES.BOT 
                        ? 'bg-secondary me-auto rounded-end-4' 
                        : 'bg-dark mx-auto rounded-4'}`
                    }
                    style={{ maxWidth: '85%' }}
                  >
                    <div className="d-flex">
                      <Image 
                        src={msg.avatar} 
                        roundedCircle 
                        width="32" 
                        height="32" 
                        className="me-3 align-self-start"
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-warning fw-bold">
                            {msg.sender === MESSAGE_TYPES.USER ? 'Tú' : 
                             msg.sender === MESSAGE_TYPES.BOT ? 'Guía Natlan' : 'Sistema'}
                          </small>
                          <small className="text-muted">
                            {formatTime(msg.timestamp)}
                          </small>
                        </div>
                        <p className={`mb-0 ${msg.sender === MESSAGE_TYPES.USER ? 'text-white' : 'text-warning'}`}>
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
                {isLoading && (
                  <ListGroup.Item className="bg-transparent border-0 me-auto" style={{ maxWidth: '50%' }}>
                    <div className="d-flex align-items-center">
                      <Spinner animation="border" variant="warning" size="sm" className="me-2"/>
                      <span className="text-warning">El chamán está consultando las llamas...</span>
                    </div>
                  </ListGroup.Item>
                )}
                <div ref={messagesEndRef} />
              </ListGroup>

              {/* Input con funcionalidades */}
              <Form onSubmit={handleSendMessage} className="p-3 border-top border-warning bg-dark">
                {file && (
                  <div className="d-flex align-items-center mb-2 p-2 bg-warning rounded">
                    <small className="flex-grow-1 text-dark">
                      <strong>Archivo listo:</strong> {file.name}
                    </small>
                    <Button 
                      variant="outline-dark" 
                      size="sm"
                      onClick={handleRemoveFile}
                      title="Remover archivo"
                    >
                      <FiX />
                    </Button>
                  </div>
                )}
                
                <InputGroup>
                  <Button 
                    variant={isListening ? "danger" : "outline-warning"} 
                    onClick={handleVoiceInput}
                    title="Voz a texto"
                    disabled={isLoading}
                  >
                    {isListening ? <FiMicOff /> : <FiMic />}
                  </Button>
                  
                  <Form.Control
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Escribe o habla..."
                    className="bg-white border-warning text-dark"
                    disabled={isLoading}
                  />
                  
                  <label className={`btn ${file ? "btn-warning" : "btn-outline-warning"}`}>
                    <FiUpload className={file ? "text-white" : "text-dark"}/>
                    <input 
                      type="file" 
                      onChange={handleFileUpload}
                      hidden 
                      disabled={isLoading}
                    />
                  </label>
                  
                  <Button 
                    variant="warning" 
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                  >
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <FiSend className="text-white"/>
                    )}
                  </Button>
                </InputGroup>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal de ayuda */}
      <Modal show={showHelp} onHide={() => setShowHelp(false)} centered>
        <Modal.Header closeButton className="bg-dark text-warning border-warning">
          <Modal.Title>Guía de uso</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <h6 className="text-warning">Bienvenido a la tierra de Natlan</h6>
          <ul className="ps-3">
            <li>Escribe tu pregunta y presiona enviar</li>
            <li>Usa el micrófono para dictar tu mensaje</li>
            <li>Puedes subir archivos para su análisis (JPEG, PNG, PDF o TXT)</li>
            <li>Las respuestas se generan basadas en la sabiduría ancestral de Natlan</li>
          </ul>
          <small className="text-muted">
            Nota: Esta es una demostración. Conecta tu API para funcionalidad completa.
          </small>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AsistenteAi;