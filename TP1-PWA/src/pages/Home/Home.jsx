import React, { useState } from "react";
import styles from "./Home.module.css";
import Modal from "../../Components/Modal/Modal";
import Boton from "../../Components/Boton/Boton";
import BarraBusqueda from "../../Components/BarraBusqueda/BarraBusqueda";
import Contador from "../../Components/Contador/Contador";
import TarjetaContenido from "../../Components/TarjetaContenido/TarjetaContenido";
import useLocalStorage from "../../Hooks/useLocalStorage";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [vistas, setVistas] = useLocalStorage("lista-vistas", []);
  const [porVer, setPorVer] = useLocalStorage("lista-por-ver", []);

  const handleBorrar = (id, estado) => {
    const confirmed = window.confirm(
      "¿Seguro que querés eliminar este elemento?",
    );
    if (!confirmed) return;

    if (estado === "vista") {
      // Filtramos la lista de 'vistas'
      setVistas((prev) => prev.filter((item) => item.id !== id));
    } else {
      // Filtramos la lista de 'por ver'
      setPorVer((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleCambiarEstado = (id, estado) => {
    if (estado === "vista") {
      // Se busca el ítem y nos aseguramos de que exista
      const itemEncontrado = vistas.find((item) => item.id === id);
      if (!itemEncontrado) return; // Si no lo encuentra, corta acá

      // Si lo encuentra, lo borramos de la lista vieja
      setVistas((prev) => prev.filter((item) => item.id !== id));

      // Lo agregamos a la nueva, PERO actualizando su estado a "por-ver"
      setPorVer((prev) => [...prev, { ...itemEncontrado, estado: "por-ver" }]);
    } else {
      // Buscamos en la otra lista
      const itemEncontrado = porVer.find((item) => item.id === id);
      if (!itemEncontrado) return;

      // Lo borramos
      setPorVer((prev) => prev.filter((item) => item.id !== id));

      // Lo agregamos, actualizando su estado a "vista"
      setVistas((prev) => [...prev, { ...itemEncontrado, estado: "vista" }]);
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
              vistasFiltradas.map((item) => {
                const objContenido = {
                  id: item.id,
                  titulo: item.titulo,
                  anio: item.anio,
                  director: item.director,
                  genero: item.genero,
                  rating: item.rating,
                  tipo: item.tipo,
                  estado: item.estado,
                };
                return (
                  <TarjetaContenido
                    key={item.id}
                    objContenido={objContenido}
                    onDelete={handleBorrar}
                    onCambiarEstado={handleCambiarEstado}
                  />
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
                  estado: item.estado,
                };
                return (
                  <TarjetaContenido
                    key={item.id}
                    objContenido={objContenido}
                    onDelete={handleBorrar}
                    onCambiarEstado={handleCambiarEstado}
                  />
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
