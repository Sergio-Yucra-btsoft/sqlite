import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    window.electron.getData().then(receivedData => {
      setData(receivedData); 
    });
  }, []);
  return (
    <div>
      <h1>🚀 Mi Proyecto con React y Vite</h1>
      <p>¡Todo listo para empezar!</p>
      <p>{data ? data.message : 'Cargando...'}</p>
    </div>
  );
}

export default App;

