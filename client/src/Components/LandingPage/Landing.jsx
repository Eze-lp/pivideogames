import React from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Landing.module.css";
import audio from "../../Audio/songPi.mp3";

export default function LandingPage() {
  return (
    <div className={styles.LandingPage}>
      <button className={styles.audioButton}>
        <audio  controls autoPlay loop >
          <source src={audio} type="audio/mpeg"></source>
        </audio>
      </button>
      <h1 className={styles.landingH1}>HENRYGAMES</h1>
      <Link to="/home">
        <button className={styles.homeBotton}>HOME</button>
      </Link>
    </div>
  );
}
