import React, { useState } from "react";
import styles from "./Home.module.css";
import Modal from "../../Components/Modal/Modal";
import Boton from "../../Components/Boton/Boton";
import BarraBusqueda from "../../Components/BarraBusqueda/BarraBusqueda";
import Contador from "../../Components/Contador/Contador";
import TarjetaContenido from "../../Components/TarjetaContenido/TarjetaContenido";
import useLocalStorage from "../../hooks/useLocalStorage";
import Filtro from "../../Components/Filtro/Filtro";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [vistas, setVistas] = useLocalStorage("lista-vistas", []);
  const [porVer, setPorVer] = useLocalStorage("lista-por-ver", []);
  
  const [generosSeleccionados, setGenerosSeleccionados] = useState([]); // Array vacío al inicio

// Home.jsx
const [tiposSeleccionados, setTiposSeleccionados] = useState([]); // ["Pelicula", "Serie"]

const handleToggleTipo = (tipo) => {
  setTiposSeleccionados((prev) =>
    prev.includes(tipo)
      ? prev.filter((t) => t !== tipo)
      : [...prev, tipo]
  );
};

// Función para agregar o quitar géneros del array
const handleToggleGenero = (genero) => {
  setGenerosSeleccionados((prev) =>
    prev.includes(genero)
      ? prev.filter((g) => g !== genero) // Si ya estaba, lo saco
      : [...prev, genero]               // Si no estaba, lo agrego
  );
};

  const handleBorrar = (id, estado) => {
    const confirmed = window.confirm('¿Seguro que querés eliminar este elemento?');
    if (!confirmed) return;


    if (estado === "vista") {
    // Filtramos la lista de 'vistas'
    setVistas((prev) => prev.filter((item) => item.id !== id));
  } else {
    // Filtramos la lista de 'por ver'
    setPorVer((prev) => prev.filter((item) => item.id !== id));
  }
  };


  const handleGuardarItem = (nuevoItem) => {
    if (nuevoItem.estado === "vista") {
      setVistas([...vistas, nuevoItem]);
    } else {
      setPorVer([...porVer, nuevoItem]);
    }
  };


  const filtrarItems = (lista) => {
  return lista.filter((item) => {
    // 1. Filtro Texto
    const coincideTexto = 
      item.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.director.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Filtro Género
    const coincideGenero = 
      generosSeleccionados.length === 0 || 
      generosSeleccionados.includes(item.genero);

    // 3. Filtro Tipo (AQUÍ LO NUEVO)
    const coincideTipo = 
      tiposSeleccionados.length === 0 || 
      tiposSeleccionados.includes(item.tipo);

    return coincideTexto && coincideGenero && coincideTipo;
  });
};

  const vistasFiltradas = filtrarItems(vistas);
  const porVerFiltrados = filtrarItems(porVer);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.toolbar}>
        <Boton
          texto="+"
          className={styles.btnIcono}
          onClick={() => setIsModalOpen(true)}
          title="Agregar nuevo ítem"
        />

        <Filtro 
          onToggleGenero={handleToggleGenero} 
          seleccionados={generosSeleccionados}
          onToggleTipo={handleToggleTipo}       // Nueva prop
          tiposSeleccionados={tiposSeleccionados} // Nueva prop
          setSearchQuery={setSearchQuery}
        />

        
      </div>
      <div className={styles.board}>
        {/* Columna de Vistas */}
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <Contador titulo="Vistas" items={vistasFiltradas} />
          </div>

          <div className={styles.columnContent}>
            {vistasFiltradas.length === 0 ? (
              <p className={styles.placeholder}>No hay contenido visto</p>
            ) : (
              vistasFiltradas.map((item) => {
                const objContenido = {
                  id: item.id,
                  titulo: item.titulo,
                  anio: item.anio,
                  director: item.director,
                  genero: item.genero,
                  rating: item.rating,
                  tipo: item.tipo,
                  estado: item.estado
                };
                return (<TarjetaContenido key={item.id} objContenido={objContenido} onDelete={handleBorrar} />
                );
              })
            )}
          </div>
        </div>

        {/* Columna de Por Ver */}
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <Contador titulo="Por Ver" items={porVerFiltrados} />
          </div>

          <div className={styles.columnContent}>
            {porVerFiltrados.length === 0 ? (
              <p className={styles.placeholder}>No hay contenido por ver</p>
            ) : (
              porVerFiltrados.map((item) => {
                const objContenido = {
                  id: item.id,
                  titulo: item.titulo,
                  anio: item.anio,
                  director: item.director,
                  genero: item.genero,
                  rating: item.rating,
                  tipo: item.tipo,
                  estado: item.estado
                };
                return (<TarjetaContenido key={item.id} objContenido={objContenido} onDelete={handleBorrar} />
                );
              })
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleGuardarItem}
      />
    </div>
  );
}
