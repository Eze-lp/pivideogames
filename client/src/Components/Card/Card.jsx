import React from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Cards.module.css";

export default function Card({ name, image, genres, id }) {
  return (
    <div>
      <div className={styles.hcards}>
      <img className={styles.imagen} src={image} alt="img not found" />

      <Link to={`/detail/${id}`} className={styles.titulo}>
        <h3>{name}</h3>
      </Link>
      {genres?.map((g) => (
        <p className={styles.p} key={g}>
          {g.charAt(0).toUpperCase() + g.slice(1)}
        </p>
      ))}
      </div>
    </div>
  );
}