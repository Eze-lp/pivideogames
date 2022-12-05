import React from "react";
import styles from "../Styles/Paginado.module.css";

export default function Paginado({ gamesPerPage, allVideogames, paginado, currentPage }) {
  const pageNumbers = [];


  for (let i = 0; i <= Math.floor(allVideogames / gamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav className={styles.navPaginado}>
      <ul>
        {pageNumbers && 
        pageNumbers.map(number => {
            return (
              <button
                id={number === currentPage? styles.Paginado: styles.Paginado2}
                onClick={() => paginado(number)}
                key={number}
              >
                {number}
              </button>
            );
          })}
      </ul>
    </nav>
  );
}
