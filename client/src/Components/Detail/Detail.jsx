import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from "react";
import { cleanDetailState, getVideogameDetail } from "../../Actions";
import styles from "../Styles/Detail.module.css";
import Loading from "../Loading/Loading";

export default function Detail(props) {
  const dispatch = useDispatch();
  const VideoGameId = props.match.params.id;
  
  useEffect(() => {
    dispatch(cleanDetailState());
    dispatch(getVideogameDetail(VideoGameId));
  }, [dispatch, VideoGameId]);

  const myVideoGame = useSelector((state) => state?.detail);

  return (
    <div className={styles.imageDetail}>
      {myVideoGame.length === 0 ?(
        <Loading/>
        ) : (  
          <div className={styles.DetailDiv}>
          
         
          <div key={myVideoGame.id}>
            <div className={styles.divImagen}>
            <img
            className={styles.imagen}
            src={myVideoGame.image}
            alt="image not found"
          />
          </div>
            <div className={styles.divTexto}>
            <h1>Name: {myVideoGame.name}</h1>
            <h2>
              Genres:{" "}
              {myVideoGame.genres?.map((el) => (
                <p key={el.name}>{el.name}</p>
                ))}
            </h2>
            <h2>Description: {myVideoGame.description}</h2>
            <h2>Released: {myVideoGame.released}</h2>
            <h2>Rating: {myVideoGame.rating}</h2>
            <h2>Platforms {myVideoGame.platforms}</h2>
            </div>
          </div>
        <Link to="/home">
          <button className={styles.goBack}>Go Back</button>
        </Link>
      </div>
      )}
    </div>
  );
}
