import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Container, Row, Col, Form, Button, Card, ListGroup, Badge, 
  FloatingLabel, InputGroup, Spinner, Image 
} from 'react-bootstrap';
import { FiSend, FiUpload, FiMic, FiMicOff } from 'react-icons/fi';

const AsistenteAi = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const messagesEndRef = useRef(null);

  // Mensaje de bienvenida con temática Natlan
  useEffect(() => {
    setMessages([
      { 
        text: '¡Saludos, viajero! Soy tu guía en las tierras de Natlan. ¿En qué puedo servirte hoy? 🔥', 
        sender: 'bot',
        avatar: 'https://i.pinimg.com/564x/69/bf/93/69bf93e9e35d54b832cbb55d38191ae1.jpg' // Avatar estilo Natlan
      }
    ]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Enviar mensaje
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages([...messages, { 
      text: inputMessage, 
      sender: 'user',
      avatar: 'https://i.pinimg.com/564x/69/bf/93/69bf93e9e35d54b832cbb55d38191ae1.jpg' // Avatar usuario
    }]);
    setInputMessage('');
    setIsLoading(true);

    // Simular respuesta de IA (reemplaza con tu API)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: `Las llamas de Natlan revelan: "${inputMessage.toUpperCase()}" es tu próximo paso. 🔮`, 
        sender: 'bot',
        avatar: 'https://i.pinimg.com/564x/69/bf/93/69bf93e9e35d54b832cbb55d38191ae1.jpg'
      }]);
      setIsLoading(false);
    }, 1500);
  };

  // Voz a texto (Web Speech API)
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Tu navegador no soporta reconocimiento de voz.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.start();
    setIsListening(true);

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInputMessage(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };
  };

  // Subir archivo
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile.name);
      setMessages([...messages, { 
        text: `Archivo cargado: ${uploadedFile.name} (${(uploadedFile.size / 1024).toFixed(2)} KB)`,
        sender: 'system',
        avatar: 'https://i.pinimg.com/564x/69/bf/93/69bf93e9e35d54b832cbb55d38191ae1.jpg'
      }]);
    }
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column p-0 bg-dark">
      {/* Header estilo Natlan */}
      <Row className="bg-gradient-red-black text-gold p-3 shadow-lg">
        <Col className="d-flex align-items-center">
          <Image 
            src="https://i.pinimg.com/564x/69/bf/93/69bf93e9e35d54b832cbb55d38191ae1.jpg" 
            roundedCircle 
            width="40" 
            height="40" 
            className="me-3 border border-warning"
          />
          <div>
            <h4 className="mb-0 text-uppercase">Guía de Natlan</h4>
            <small className="text-gold-opacity">Domina el fuego de la sabiduría</small>
          </div>
        </Col>
      </Row>

      {/* Área de mensajes */}
      <Row className="flex-grow-1 overflow-auto p-3 bg-natlan-dark">
        <Col>
          <Card className="h-100 border border-warning bg-transparent">
            <Card.Body className="d-flex flex-column p-0">
              <ListGroup variant="flush" className="flex-grow-1 overflow-auto p-3 bg-natlan-chat">
                {messages.map((msg, index) => (
                  <ListGroup.Item 
                    key={index} 
                    className={`mb-3 border-0 p-3 ${msg.sender === 'user' 
                      ? 'bg-natlan-user ms-auto rounded-start-4' 
                      : msg.sender === 'bot' 
                        ? 'bg-natlan-bot me-auto rounded-end-4' 
                        : 'bg-natlan-system mx-auto rounded-4'}`
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
                      <div>
                        <small className="text-gold-opacity fw-bold">
                          {msg.sender === 'user' ? 'Tú' : msg.sender === 'bot' ? 'Guía Natlan' : 'Sistema'}
                        </small>
                        <p className={`mb-0 ${msg.sender === 'user' ? 'text-white' : 'text-gold-light'}`}>
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
                {isLoading && (
                  <ListGroup.Item className="bg-transparent border-0 me-auto" style={{ maxWidth: '50%' }}>
                    <Spinner animation="border" variant="warning" size="sm" className="me-2"/>
                    <span className="text-gold-light">El chamán está consultando las llamas...</span>
                  </ListGroup.Item>
                )}
                <div ref={messagesEndRef} />
              </ListGroup>

              {/* Input con funcionalidades */}
              <Form onSubmit={handleSendMessage} className="p-3 border-top border-warning bg-ligth">
                <InputGroup>
                  <Button 
                    variant="outline-warning" 
                    onClick={handleVoiceInput}
                    title="Voz a texto"
                  >
                    {isListening ? <FiMicOff className="text-danger"/> : <FiMic className="text-dark"/>}
                  </Button>
                  <Form.Control
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Escribe o habla..."
                    className="bg-white border-warning text-dark"
                  />
                  <label className="btn btn-outline-warning">
                    <FiUpload className="text-dark"/>
                    <input 
                      type="file" 
                      onChange={handleFileUpload}
                      hidden 
                    />
                  </label>
                  <Button 
                    variant="warning" 
                    type="submit"
                    disabled={!inputMessage.trim()}
                  >
                    <FiSend className="text-white"/>
                  </Button>
                </InputGroup>
                {file && (
                  <small className="d-block mt-2 text-muted">
                    Archivo listo: <Badge bg="warning" text="dark">{file}</Badge>
                  </small>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AsistenteAi;