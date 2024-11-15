import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { getGroqChatCompletion } from './api/groqApi.js';

function App() {
  const [response, setResponse] = useState("");

  const [question, setQuestion] = useState('');

  const fetchGroqResponse = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/groq-chat?question=${encodeURIComponent(question)}`);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error al obtener la respuesta del backend:", error);
      setResponse("Hubo un error al obtener la respuesta.");
    }
  };




  return (
    <div className="App">

      <h1>Consulta al Modelo Groq</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Escribe tu pregunta"
      />
      <button onClick={fetchGroqResponse}>Enviar</button>
      <p>Respuesta: {response}</p>
      
    </div>
  );
}

export default App;
