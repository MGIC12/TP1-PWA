import React, { useState } from "react";
import styles from "./BarraBusqueda.module.css";

export default function BarraBusqueda({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const valorActualizado = e.target.value;
    setQuery(valorActualizado);
    onSearch(valorActualizado);
  };

  return (
    <input
      className={styles.inputBusqueda}
      type="text"
      placeholder="Buscar..."
      value={query}
      onChange={handleChange}
    />
  );
}
