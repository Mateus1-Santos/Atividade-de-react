import { useEffect, useState } from 'react';
import './App.css';

function ContadorTempo() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSegundos((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    document.title = `Passaram-se ${segundos} segundos`;
  }, [segundos]);

  return (
    <div className="app">
      <h1>Passaram-se {segundos} segundos</h1>
    </div>
  );
}

export default ContadorTempo;