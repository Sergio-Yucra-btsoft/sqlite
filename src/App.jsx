import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    window.electron.getData().then((receivedData) => {
      setData(receivedData);
    });
  }, []);
  return (
    <div>
      <h1>🚀 Mi Proyecto con React y Vite</h1>
      <p>¡Todo listo para empezar!</p>
      <h2>Datos de SQLite:</h2>
      <ul>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item) => (
            <li key={item.id}>{item.name}</li> // Ajusta según tu estructura de datos
          ))
        ) : (
          <p>Cargando datos...</p>
        )}
      </ul>
    </div>
  );
}

export default App;
