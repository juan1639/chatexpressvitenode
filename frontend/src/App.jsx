import io from 'socket.io-client';
import { useState, useEffect } from 'react';

const socket = io('/');

function App() {

  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(mensaje);
    setMensajes([...mensajes, mensaje])
    socket.emit('message', mensaje);
  }

  useEffect(() => {

    socket.on('message', recibeMensajes);

    return () => {
      socket.off('message', recibeMensajes);
    }

  }, []);

  const recibeMensajes = msg => setMensajes(state => [...state, msg]);

  return (
    <>
      <form onSubmit={handleSubmit}>

        <input
          type='text'
          placeholder='escribe mensaje para enviar...'
          onChange={(e) => setMensaje(e.target.value)}
        />

        <button>Enviar</button>

      </form>

      <ul>
        {
          mensajes.map((msg, index) => <li key={index}>{msg}</li>)
        }
      </ul>
    </>
  )
}

export default App
