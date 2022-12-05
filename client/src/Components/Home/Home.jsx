import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import styles from "../Styles/Home.module.css";
import { getAllGenres } from "../../Actions";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import Loading from "../Loading/Loading";

export default function Home() {
  const dispatch = useDispatch();
  const allVideoGames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state?.genres);
  const [loading, setLoading] = useState(true);
  // paginado -----------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allVideoGames.slice(indexOfFirstGame, indexOfLastGame);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //  ---------------------------------------------------------------------------

  //Me traigo del estado los personajes y los generos cuando los componentes se montan.

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  return (
    <div className={styles.homeImage}>
      <NavBar setCurrentPage={setCurrentPage}></NavBar>
      <div className={styles.hcontent}>
        {!currentGames.length > 0 && loading ? (
          <Loading />
        ) : (
          currentGames?.map((el) => {
            return (
              <Card
                key={el.id}
                id={el.id}
                name={el.name}
                image={el.image}
                genres={el.genres}
              />
            );
          })
        )}
      </div>
      <Paginado
        gamesPerPage={gamesPerPage}
        allVideogames={allVideoGames.length}
        paginado={paginado}
        currentPage= {currentPage}
      ></Paginado>
    </div>
  );
}
