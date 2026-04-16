import React, { useState } from "react";
import styles from "./Home.module.css";
import Modal from "../../Components/Modal/Modal";
import Boton from "../../Components/Boton/Boton";
import BarraBusqueda from "../../Components/BarraBusqueda/BarraBusqueda";
import Contador from "../../Components/Contador/Contador";
import TarjetaContenido from "../../Components/TarjetaContenido/TarjetaContenido";
import Filtro from "../../Components/Filtro/Filtro";

import useLocalStorage from "../../Hooks/useLocalStorage";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemAEditar, setItemAEditar] = useState(null);
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

  const handleGuardarItem = (datosForm) => {
    const idItem = itemAEditar ? itemAEditar.id : Date.now();
    const itemProcesado = { ...datosForm, id: idItem };

    // Limpiamos el ítem viejo de ambas listas por si lo modificó
    const vistasLimpias = vistas.filter((i) => i.id !== idItem);
    const porVerLimpias = porVer.filter((i) => i.id !== idItem);

    if (itemProcesado.estado === "vista") {
      setVistas([...vistasLimpias, itemProcesado]);
      setPorVer(porVerLimpias);
    } else {
      setPorVer([...porVerLimpias, itemProcesado]);
      setVistas(vistasLimpias);
    }

    // Cerramos el modal limpiando el estado
    setItemAEditar(null);
    setIsModalOpen(false);
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

  const abrirModalNuevo = () => {
    setItemAEditar(null);
    setIsModalOpen(true);
  };

  const handleEditar = (item) => {
    setItemAEditar(item);
    setIsModalOpen(true);
  };

  const [generosSeleccionados, setGenerosSeleccionados] = useState([]); // Array vacío al inicio

  const [tiposSeleccionados, setTiposSeleccionados] = useState([]); // ["Pelicula", "Serie"]

  const handleToggleTipo = (tipo) => {
    setTiposSeleccionados((prev) =>
      prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo],
    );
  };

  // Función para agregar o quitar géneros del array
  const handleToggleGenero = (genero) => {
    setGenerosSeleccionados(
      (prev) =>
        prev.includes(genero)
          ? prev.filter((g) => g !== genero) // Si ya estaba, lo saco
          : [...prev, genero], // Si no estaba, lo agrego
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
          onClick={abrirModalNuevo}
          title="Agregar nuevo ítem"
        />

        <Filtro
          onToggleGenero={handleToggleGenero}
          seleccionados={generosSeleccionados}
          onToggleTipo={handleToggleTipo} // Nueva prop
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
                  estado: item.estado,
                };
                return (
                  <TarjetaContenido
                    key={item.id}
                    objContenido={objContenido}
                    onDelete={handleBorrar}
                    onEdit={handleEditar}
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
                    onEdit={handleEditar}
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
        onClose={() => {
          setIsModalOpen(false);
          setItemAEditar(null);
        }}
        onSave={handleGuardarItem}
        itemEditando={itemAEditar}
      />
    </div>
  );
}
