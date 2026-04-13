import React, { useState } from "react";
import styles from "./Home.module.css";
import Modal from "../../Components/Modal/Modal";
import Boton from "../../Components/Boton/Boton";
import BarraBusqueda from "../../Components/BarraBusqueda/BarraBusqueda";
import Contador from "../../Components/Contador/Contador";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [vistas, setVistas] = useLocalStorage("lista-vistas", []);
  const [porVer, setPorVer] = useLocalStorage("lista-por-ver", []);

  const handleGuardarItem = (nuevoItem) => {
    if (nuevoItem.estado === "vista") {
      setVistas([...vistas, nuevoItem]);
    } else {
      setPorVer([...porVer, nuevoItem]);
    }
  };

  const filtrarItems = (lista) => {
    return lista.filter(
      (item) =>
        item.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.director.toLowerCase().includes(searchQuery.toLowerCase()),
    );
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

        <div className={styles.searchWrapper}>
          <BarraBusqueda onSearch={(q) => setSearchQuery(q)} />
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
              vistasFiltradas.map((item) => (
                <div key={item.id} className={styles.itemTemp}>
                  {item.titulo} ({item.anio})
                </div>
              ))
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
              porVerFiltrados.map((item) => (
                <div key={item.id} className={styles.itemTemp}>
                  {item.titulo} ({item.anio})
                </div>
              ))
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
