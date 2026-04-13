import React, { useState } from "react";
import styles from "./Home.module.css";
import Modal from "../../Components/Modal/Modal";
import Etiqueta from "../../Components/Etiqueta/Etiqueta";
import Boton from "../../Components/Boton/Boton";
import BarraBusqueda from "../../Components/BarraBusqueda/BarraBusqueda";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (query) => {
    console.log("Buscando:", query);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.toolbar}>
        <Boton
          texto="+"
          className={styles.btnIcono}
          onClick={() => setIsModalOpen(true)}
          title="Agregar nuevo ítem"
        />

        <div className={styles.searchWrapper}>
          <BarraBusqueda onSearch={handleSearch} />
        </div>

        <Boton
          texto={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          }
          className={styles.btnIcono}
          title="Filtros"
        />
      </div>

      <div className={styles.tagsContainer}>
        <Etiqueta nombre="Animación" />
        <Etiqueta nombre="Acción" />
      </div>

      {/* Tablero con columnas */}
      <div className={styles.board}>
        {/* Columna vistas */}
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <h2>Vistas</h2>
            <span className={styles.badge}>1</span> (Falta el contador)
          </div>
          <div className={styles.columnContent}>
            <p className={styles.placeholder}>
              [ Tendría que ir el componente Tarjeta ]
            </p>
          </div>
        </div>

        {/* Columna por ver */}
        <div className={styles.column}>
          <div className={styles.columnHeader}>
            <h2>Por Ver</h2>
            <span className={styles.badge}>0</span> (Falta el contador)
          </div>
          <div className={styles.columnContent}>
            <p className={styles.placeholder}>
              [ Acá tendría que ir el componente EstadoVacio ]
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
